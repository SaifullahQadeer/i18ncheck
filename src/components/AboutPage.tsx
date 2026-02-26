import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Globe, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About i18nCheck.dev';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#0f172a] font-sans selection:bg-[#0f172a]/10 selection:text-[#0f172a]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5 cursor-pointer">
            <Globe className="w-6 h-6 text-[#06b6d4]" />
            <span className="font-bold text-2xl tracking-tight text-[#0f172a]"><span className="text-[#06b6d4]">i18n</span>Check.dev</span>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-sm text-[#475569] hover:text-[#0f172a] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-16 text-[#0f172a]">
              About i18nCheck
            </h1>

            {/* Our Mission */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6 text-[#0f172a]">Our Mission</h2>
              <div className="space-y-4 text-[#475569] text-lg leading-relaxed">
                <p>
                  i18nCheck helps developers and teams build websites that work in every language. We believe no user should encounter a broken button, overlapping text, or unreadable layout just because they speak a different language.
                </p>
                <p>
                  Our tool uses pseudo-localization — the same industry-standard technique used by Google, Microsoft, and Netflix — to stress-test website layouts before investing in real translation. Enter any URL, pick a language simulation, and instantly see where your UI breaks.
                </p>
              </div>
            </section>

            {/* The Problem We Solve */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6 text-[#0f172a]">The Problem We Solve</h2>
              <div className="space-y-4 text-[#475569] text-lg leading-relaxed">
                <p>
                  When companies expand globally, they spend thousands on translation — only to discover their UI breaks with longer German words, right-to-left Arabic text, or full-width Japanese characters. Layout bugs slip into production, frustrating users and costing revenue.
                </p>
                <p>
                  i18nCheck catches these bugs in seconds. No signup required. No code changes needed. Just enter a URL and test.
                </p>
              </div>
            </section>

            {/* How It Works */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6 text-[#0f172a]">How It Works</h2>
              <div className="space-y-4 text-[#475569] text-lg leading-relaxed">
                <p>
                  We render your website in a real browser engine, apply scientific text transformations (expansion, RTL flipping, CJK character substitution), and analyze the result for layout issues like overflow, truncation, misalignment, and wrapping bugs. Every issue comes with a severity level and a specific CSS fix recommendation.
                </p>
              </div>
            </section>

            {/* Built By */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6 text-[#0f172a]">Built By</h2>
              <div className="space-y-4 text-[#475569] text-lg leading-relaxed">
                <p>
                  i18nCheck is a product by Alpha Web Creation LLC, a web development company specializing in building tools for developers and businesses going global.
                </p>
                <p>
                  Have questions? Reach us at{' '}
                  <a href="mailto:contact@i18ncheck.dev" className="text-[#0f172a] underline hover:no-underline">
                    contact@i18ncheck.dev
                  </a>
                </p>
              </div>
            </section>

            {/* CTA */}
            <section className="mt-20">
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-3xl p-12 text-center">
                <h2 className="text-3xl font-bold mb-4 text-[#0f172a]">Ready to test your layouts?</h2>
                <p className="text-[#475569] mb-8 text-lg">
                  Catch i18n layout bugs before your users do.
                </p>
                <Link
                  to="/app"
                  className="inline-flex items-center gap-2 px-10 py-4 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all text-lg"
                >
                  Start Testing <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </section>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-16 border-t border-[#e2e8f0] bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-1.5 mb-4">
                <Globe className="w-5 h-5 text-[#06b6d4]" />
                <span className="font-bold text-xl text-[#0f172a]"><span className="text-[#06b6d4]">i18n</span>Check.dev</span>
              </div>
              <p className="text-[#94a3b8] leading-relaxed">
                Stop shipping i18n bugs. The industry-standard tool for layout stress-testing.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-[#0f172a]">Product</h4>
              <ul className="space-y-4 text-[#94a3b8] text-sm">
                <li><Link to="/" className="hover:text-[#0f172a] transition-colors">Home</Link></li>
                <li><Link to="/app" className="hover:text-[#0f172a] transition-colors">Try It Now</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-[#0f172a]">Company</h4>
              <ul className="space-y-4 text-[#94a3b8] text-sm">
                <li><Link to="/about" className="hover:text-[#0f172a] transition-colors">About</Link></li>
                <li><Link to="/contact" className="hover:text-[#0f172a] transition-colors">Contact</Link></li>
                <li><Link to="/privacy" className="hover:text-[#0f172a] transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-[#0f172a] transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-[#e2e8f0] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#94a3b8]">
            <p>&copy; 2026 i18nCheck.dev • <Link to="/privacy" className="hover:text-[#0f172a] transition-colors">Privacy Policy</Link> • <Link to="/terms" className="hover:text-[#0f172a] transition-colors">Terms of Service</Link></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
