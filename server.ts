import express from 'express';
import { createServer as createViteServer } from 'vite';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { URL, fileURLToPath } from 'url';
import https from 'https';
import path, { dirname } from 'path';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Proxying and Pseudo-localization
  app.get('/api/preview', async (req, res) => {
    const targetUrl = req.query.url as string;
    const mode = req.query.mode as string; // 'german', 'arabic', 'japanese', 'pseudo'

    if (!targetUrl) {
      return res.status(400).send('URL is required');
    }

    try {
      // 1. Fetch the external website
      // Add a User-Agent to avoid being blocked by some sites
      const response = await axios.get(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; i18nCheck/1.0; +https://i18ncheck.dev)'
        },
        responseType: 'text', // Ensure we get text/html
        httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Allow self-signed certs
        timeout: 10000 // 10s timeout
      });

      const html = response.data;
      const $ = cheerio.load(html);
      const baseUrl = new URL(targetUrl);

      // 2. Rewrite relative URLs to absolute URLs
      // This is crucial for CSS, JS, and Images to load
      const rewriteUrl = (url: string | undefined) => {
        if (!url) return url;
        if (url.startsWith('data:') || url.startsWith('#') || url.startsWith('mailto:')) return url;
        try {
          return new URL(url, baseUrl).href;
        } catch (e) {
          return url;
        }
      };

      $('link[href]').each((_, el) => {
        $(el).attr('href', rewriteUrl($(el).attr('href')));
      });
      $('script[src]').each((_, el) => {
        $(el).attr('src', rewriteUrl($(el).attr('src')));
      });
      $('img[src]').each((_, el) => {
        $(el).attr('src', rewriteUrl($(el).attr('src')));
      });
      $('a[href]').each((_, el) => {
        $(el).attr('href', rewriteUrl($(el).attr('href')));
      });
      $('form[action]').each((_, el) => {
        $(el).attr('action', rewriteUrl($(el).attr('action')));
      });

      // 3. Apply Pseudo-localization based on mode
      const processTextNodes = (element: any, callback: (text: string) => string) => {
        $(element).contents().each((_, el) => {
          if (el.type === 'text') {
            const text = $(el).text();
            if (text.trim().length > 0) {
              $(el).replaceWith(callback(text));
            }
          } else if (el.type === 'tag' && el.name !== 'script' && el.name !== 'style') {
            processTextNodes(el, callback);
          }
        });
      };

      if (mode === 'german') {
        // German expansion simulation: Add ~30% length, use umlauts
        processTextNodes('body', (text) => {
          // Simple expansion: repeat the last 30% of the word or add filler
          return text.split(' ').map(word => {
            if (word.length < 2) return word;
            return word + 'ö' + word.slice(-Math.ceil(word.length * 0.3));
          }).join(' ');
        });
      } else if (mode === 'finnish') {
        // Finnish: Aggressive expansion (45%) + compound words (simulated by joining some words)
        processTextNodes('body', (text) => {
          return text.split(' ').map((word, i) => {
            if (word.length < 3) return word;
            // Expand
            const expanded = word + 'ää' + word.slice(-Math.ceil(word.length * 0.45));
            // Every 3rd word, join with next (simulate compound) - simplified by just making it very long
            if (i % 5 === 0) return expanded + 'kone'; 
            return expanded;
          }).join(' ');
        });
      } else if (mode === 'russian') {
        // Russian: Cyrillic mapping
        const map: Record<string, string> = {
            'a': 'а', 'b': 'б', 'c': 'ц', 'd': 'д', 'e': 'е', 'f': 'ф', 'g': 'г', 'h': 'х', 'i': 'и', 
            'j': 'й', 'k': 'к', 'l': 'л', 'm': 'м', 'n': 'н', 'o': 'о', 'p': 'п', 'q': 'я', 'r': 'р', 
            's': 'с', 't': 'т', 'u': 'у', 'v': 'в', 'w': 'ш', 'x': 'х', 'y': 'ы', 'z': 'з',
            'A': 'А', 'B': 'Б', 'C': 'Ц', 'D': 'Д', 'E': 'Е', 'F': 'Ф', 'G': 'Г', 'H': 'Х', 'I': 'И',
            'J': 'Й', 'K': 'К', 'L': 'Л', 'M': 'М', 'N': 'Н', 'O': 'О', 'P': 'П', 'Q': 'Я', 'R': 'Р',
            'S': 'С', 'T': 'Т', 'U': 'У', 'V': 'В', 'W': 'Ш', 'X': 'Х', 'Y': 'Ы', 'Z': 'З'
        };
        processTextNodes('body', (text) => {
            return text.split('').map(c => map[c] || c).join('');
        });
      } else if (mode === 'stress') {
        // Stress Test: 100% expansion
        processTextNodes('body', (text) => {
            return text.split(' ').map(word => {
                if (word.length < 1) return word;
                return word + word + '!!!';
            }).join(' ');
        });
      } else if (mode === 'arabic') {
        // RTL simulation
        $('html').attr('dir', 'rtl');
        $('body').attr('dir', 'rtl');
        $('body').css('direction', 'rtl');
        $('body').css('text-align', 'right');
        
        // Inject CSS to force RTL if inline styles fight back
        $('head').append(`
          <style>
            html, body { direction: rtl !important; text-align: right !important; }
            /* Flip floats and positioning if possible (basic heuristic) */
            .pull-left { float: right !important; }
            .pull-right { float: left !important; }
            .text-left { text-align: right !important; }
            .text-right { text-align: left !important; }
          </style>
        `);

        const arabicWords = [
          "الصفحة", "الرئيسية", "حول", "اتصل", "بنا", "خدمات", "منتجات", "أخبار", "مدونة", "تسجيل", "دخول",
          "بحث", "المزيد", "تحميل", "حفظ", "إلغاء", "تأكيد", "مساعدة", "الإعدادات", "الملف", "الشخصي",
          "لوحة", "التحكم", "الإشعارات", "الرسائل", "الأصدقاء", "المجموعات", "الصور", "الفيديو", "الصوت",
          "الموقع", "الخريطة", "التاريخ", "الوقت", "السعر", "العملة", "اللغة", "الدولة", "المدينة", "الشارع",
          "رقم", "الهاتف", "البريد", "الإلكتروني", "كلمة", "المرور", "نسيت", "تذكرني", "سياسة", "الخصوصية",
          "شروط", "الاستخدام", "حقوق", "النشر", "جميع", "الحقوق", "محفوظة", "تصميم", "تطوير", "بواسطة",
          "لوريم", "إيبسوم", "دولار", "سيت", "أميت", "كونسيكتيتور", "أدايبا", "يسكينج", "أليايت", "سيت",
          "دو", "أيوسمود", "تيمبور", "أنكايديديونتيوت", "لابوري", "ات", "دولار", "ماجنا", "أليكيوا"
        ];

        processTextNodes('body', (text) => {
          // Replace words with Arabic words of roughly similar count
          // We don't want to lose the structure (newlines, etc), so we split by whitespace
          return text.replace(/\S+/g, (match) => {
             // Pick a word based on the length of the match to have some variety, 
             // or just random/cyclic. Let's use a hash of the word to be deterministic.
             const index = match.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % arabicWords.length;
             return arabicWords[index];
          });
        });

      } else if (mode === 'japanese') {
        // CJK simulation: Replace text with dummy Japanese to test line height / wrapping
        // Or just append Japanese chars
        processTextNodes('body', (text) => {
           return text + 'の機能テスト'; 
        });
      } else if (mode === 'pseudo') {
        // Standard pseudo-localization (Microsoft style)
        // [ !!! T̃h̃ĩs̃ ĩs̃ ã t̃ẽs̃t̃ !!! ]
        processTextNodes('body', (text) => {
            // Very basic mapping
            const map: Record<string, string> = {
                'a': 'à', 'b': 'ƀ', 'c': 'ç', 'd': 'ð', 'e': 'é', 'f': 'ƒ', 'g': 'ĝ', 'h': 'ĥ', 'i': 'î', 
                'l': 'ł', 'm': 'm', 'n': 'ñ', 'o': 'ö', 'p': 'þ', 'r': 'ŕ', 's': 'š', 't': 'ţ', 'u': 'ü', 
                'w': 'ŵ', 'y': 'ý', 'z': 'ž'
            };
            const transformed = text.split('').map(c => map[c.toLowerCase()] || c).join('');
            return `[!!! ${transformed} !!!]`;
        });
      }

      // 4. Inject a base tag to help with any missed relative URLs (optional, but good backup)
      $('head').prepend(`<base href="${baseUrl.href}">`);
      
      // 5. Inject a small script to disable navigation (optional) or handle clicks
      $('body').append(`<script>
        document.addEventListener('click', function(e) {
          if (e.target.tagName === 'A') {
            e.preventDefault();
            alert('Navigation is disabled in preview mode.');
          }
        });
      </script>`);

      res.setHeader('Content-Type', 'text/html');
      res.send($.html());

    } catch (error: any) {
      console.error('Proxy error:', error.message);
      res.status(500).send(`Error fetching URL: ${error.message}. Note: Some sites block automated requests.`);
    }
  });

  // SMTP transporter for contact form
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.SMTP_PORT || '465', 10),
    secure: true,
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  });

  // Contact form endpoint
  app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    try {
      await transporter.sendMail({
        from: `"i18nCheck Contact" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
        replyTo: email,
        subject: `[i18nCheck Contact] ${subject || 'General Inquiry'} — from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px;">
            <h2 style="color: #0f172a;">New Contact Form Submission</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #94a3b8; width: 100px;">Name</td><td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #94a3b8;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0f172a;">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #94a3b8;">Subject</td><td style="padding: 8px 0; color: #0f172a;">${subject || 'General Inquiry'}</td></tr>
            </table>
            <div style="margin-top: 16px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
              <p style="color: #94a3b8; font-size: 12px; margin: 0 0 8px;">Message</p>
              <p style="color: #0f172a; white-space: pre-wrap; margin: 0;">${message}</p>
            </div>
          </div>
        `,
      });

      res.json({ success: true });
    } catch (error: any) {
      console.error('Email send error:', error.code, error.message);
      res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  // Serve React frontend build files
  const distPath = path.join(__dirname, 'dist');
  app.use(express.static(distPath));

  // Catch-all route: serve index.html for any non-API route (React Router support)
  app.get('*', (req, res) => {
    // Only serve index.html if it exists, otherwise let it fall through
    res.sendFile(path.join(distPath, 'index.html'), (err) => {
      if (err) {
        // If index.html doesn't exist (e.g. build hasn't run), send a helpful message
        res.status(404).send('Frontend build not found. Please run "npm run build" first.');
      }
    });
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
