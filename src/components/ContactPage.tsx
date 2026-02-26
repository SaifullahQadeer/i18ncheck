import { useState, useEffect, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Globe, ArrowLeft, Mail, Building2, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  useEffect(() => {
    document.title = 'Contact Us — i18nCheck.dev';
    window.scrollTo(0, 0);
  }, []);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', subject: 'General Inquiry', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-[#f1f5f9] font-sans selection:bg-[#06b6d4]/30 selection:text-[#06b6d4]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e17]/80 backdrop-blur-md border-b border-[#f1f5f9]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <div className="bg-[#06b6d4] p-1.5 rounded-lg shadow-lg shadow-[#06b6d4]/20">
              <Globe className="w-6 h-6 text-[#0a0e17]" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-[#f1f5f9]">i18nCheck.dev</span>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-sm text-[#f1f5f9]/60 hover:text-[#06b6d4] transition-colors">
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
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-[#f1f5f9] to-[#94a3b8]">
              Get in Touch
            </h1>
            <p className="text-xl text-[#f1f5f9]/60 mb-16">
              Have a question, feature request, or partnership inquiry? We'd love to hear from you.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-3">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#111827] border border-[#06b6d4]/30 rounded-2xl p-10 text-center"
                  >
                    <div className="w-16 h-16 bg-[#06b6d4]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Mail className="w-8 h-8 text-[#06b6d4]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-[#f1f5f9]">Message Sent!</h3>
                    <p className="text-[#f1f5f9]/60 text-lg mb-6">
                      Thanks for reaching out! We'll get back to you within 24-48 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-[#06b6d4] hover:underline text-sm"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#f1f5f9]/70 mb-2">
                        Name <span className="text-[#06b6d4]">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#111827] border border-[#f1f5f9]/10 rounded-xl text-[#f1f5f9] placeholder-[#f1f5f9]/30 focus:outline-none focus:border-[#06b6d4]/50 focus:ring-1 focus:ring-[#06b6d4]/50 transition-colors"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#f1f5f9]/70 mb-2">
                        Email <span className="text-[#06b6d4]">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 bg-[#111827] border border-[#f1f5f9]/10 rounded-xl text-[#f1f5f9] placeholder-[#f1f5f9]/30 focus:outline-none focus:border-[#06b6d4]/50 focus:ring-1 focus:ring-[#06b6d4]/50 transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-[#f1f5f9]/70 mb-2">
                        Subject
                      </label>
                      <select
                        id="subject"
                        value={form.subject}
                        onChange={e => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-3 bg-[#111827] border border-[#f1f5f9]/10 rounded-xl text-[#f1f5f9] focus:outline-none focus:border-[#06b6d4]/50 focus:ring-1 focus:ring-[#06b6d4]/50 transition-colors"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Bug Report">Bug Report</option>
                        <option value="Feature Request">Feature Request</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Enterprise / Custom Plan">Enterprise / Custom Plan</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-[#f1f5f9]/70 mb-2">
                        Message <span className="text-[#06b6d4]">*</span>
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={6}
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3 bg-[#111827] border border-[#f1f5f9]/10 rounded-xl text-[#f1f5f9] placeholder-[#f1f5f9]/30 focus:outline-none focus:border-[#06b6d4]/50 focus:ring-1 focus:ring-[#06b6d4]/50 transition-colors resize-none"
                        placeholder="How can we help?"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-[#06b6d4] hover:bg-[#0891b2] text-[#0a0e17] font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#06b6d4]/20 text-lg"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>

              {/* Contact Details */}
              <div className="lg:col-span-2">
                <div className="bg-[#111827] border border-[#f1f5f9]/5 rounded-2xl p-8 space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#06b6d4]/10 rounded-lg flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-[#06b6d4]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#f1f5f9]/70 mb-1">Email</h4>
                      <a href="mailto:contact@i18ncheck.dev" className="text-[#06b6d4] hover:underline">
                        contact@i18ncheck.dev
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#06b6d4]/10 rounded-lg flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-[#06b6d4]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#f1f5f9]/70 mb-1">Company</h4>
                      <p className="text-[#f1f5f9]/60">Alpha Web Creation LLC</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#06b6d4]/10 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-[#06b6d4]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#f1f5f9]/70 mb-1">Based in</h4>
                      <p className="text-[#f1f5f9]/60">Wyoming, United States</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#06b6d4]/10 rounded-lg flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-[#06b6d4]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#f1f5f9]/70 mb-1">Response time</h4>
                      <p className="text-[#f1f5f9]/60">Within 24-48 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-16 border-t border-[#f1f5f9]/5 bg-[#0a0e17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-[#06b6d4] p-1 rounded-md">
                  <Globe className="w-5 h-5 text-[#0a0e17]" />
                </div>
                <span className="font-bold text-xl text-[#f1f5f9]">i18nCheck.dev</span>
              </div>
              <p className="text-[#f1f5f9]/40 leading-relaxed">
                Stop shipping i18n bugs. The industry-standard tool for layout stress-testing.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-[#f1f5f9]">Product</h4>
              <ul className="space-y-4 text-[#f1f5f9]/40 text-sm">
                <li><Link to="/" className="hover:text-[#06b6d4] transition-colors">Home</Link></li>
                <li><Link to="/app" className="hover:text-[#06b6d4] transition-colors">Try It Now</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-[#f1f5f9]">Company</h4>
              <ul className="space-y-4 text-[#f1f5f9]/40 text-sm">
                <li><Link to="/about" className="hover:text-[#06b6d4] transition-colors">About</Link></li>
                <li><Link to="/contact" className="hover:text-[#06b6d4] transition-colors">Contact</Link></li>
                <li><Link to="/privacy" className="hover:text-[#06b6d4] transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-[#06b6d4] transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-[#f1f5f9]/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#f1f5f9]/30">
            <p>&copy; 2026 i18nCheck.dev • <Link to="/privacy" className="hover:text-[#06b6d4] transition-colors">Privacy Policy</Link> • <Link to="/terms" className="hover:text-[#06b6d4] transition-colors">Terms of Service</Link></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
