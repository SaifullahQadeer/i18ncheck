import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Globe, ArrowLeft, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const sections = [
  { id: 'introduction', num: '1', title: 'Introduction' },
  { id: 'information-we-collect', num: '2', title: 'Information We Collect' },
  { id: 'how-we-use', num: '3', title: 'How We Use Your Information' },
  { id: 'website-scanning', num: '4', title: 'Website Scanning' },
  { id: 'data-sharing', num: '5', title: 'Data Sharing' },
  { id: 'data-storage', num: '6', title: 'Data Storage and Security' },
  { id: 'cookies', num: '7', title: 'Cookies' },
  { id: 'your-rights', num: '8', title: 'Your Rights' },
  { id: 'childrens-privacy', num: '9', title: "Children's Privacy" },
  { id: 'international', num: '10', title: 'International Data Transfers' },
  { id: 'changes', num: '11', title: 'Changes to This Policy' },
  { id: 'contact-us', num: '12', title: 'Contact Us' },
];

export default function PrivacyPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    document.title = 'Privacy Policy — i18nCheck.dev';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#0f172a]">
              Privacy Policy
            </h1>
            <p className="text-[#94a3b8] mb-16">Last Updated: February 26, 2026</p>

            <div className="flex gap-12">
              {/* Sticky TOC Sidebar - Desktop */}
              <aside className="hidden lg:block w-64 shrink-0">
                <nav className="sticky top-28">
                  <h3 className="text-xs uppercase tracking-widest text-[#94a3b8] font-bold mb-4">Contents</h3>
                  <ul className="space-y-2">
                    {sections.map(s => (
                      <li key={s.id}>
                        <button
                          onClick={() => scrollToSection(s.id)}
                          className="text-sm text-[#94a3b8] hover:text-[#0f172a] transition-colors text-left"
                        >
                          {s.num}. {s.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>

              {/* Content */}
              <div className="flex-1 max-w-3xl">
                <div className="space-y-12">
                  <section id="introduction">
                    <h2 className="text-xl font-bold mb-4 text-[#0f172a]">
                      <span className="text-[#94a3b8] mr-2">1.</span>Introduction
                    </h2>
                    <p className="text-[#475569] leading-relaxed">
                      i18nCheck.dev ("we", "our", "us") is operated by Alpha Web Creation LLC. This Privacy Policy explains how we collect, use, and protect your information when you use our website and services at i18ncheck.dev and i18ncheck.dev (the "Service").
                    </p>
                  </section>

                  <section id="information-we-collect">
                    <h2 className="text-xl font-bold mb-4 text-[#0f172a]">
                      <span className="text-[#94a3b8] mr-2">2.</span>Information We Collect
                    </h2>
                    <div className="ml-4 border-l-2 border-[#e2e8f0] pl-6 space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3 text-[#0f172a]">2.1 Information You Provide:</h3>
                        <ul className="list-disc list-inside space-y-2 text-[#475569]">
                          <li>Account information (name, email address) when you create an account</li>
                          <li>URLs you submit for testing</li>
                          <li>Contact form submissions</li>
                          <li>Payment information (processed securely through Stripe — we never store credit card details)</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-3 text-[#0f172a]">2.2 Information Collected Automatically:</h3>
                        <ul className="list-disc list-inside space-y-2 text-[#475569]">
                          <li>IP address and approximate location</li>
                          <li>Browser type and operating system</li>
                          <li>Pages visited and features used</li>
                          <li>Usage data (number of checks performed, simulation types used)</li>
                          <li>Cookies and similar technologies for session management</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section id="how-we-use">
                    <h2 className="text-xl font-bold mb-4 text-[#0f172a]">
                      <span className="text-[#94a3b8] mr-2">3.</span>How We Use Your Information
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-[#475569]">
                      <li>To provide and improve the Service</li>
                      <li>To process your URL checks and generate layout reports</li>
                      <li>To manage your account and subscription</li>
                      <li>To communicate with you about the Service (updates, security alerts)</li>
                      <li>To enforce our Terms of Service</li>
                      <li>To analyze usage patterns and improve performance</li>
                    </ul>
                  </section>

                  <section id="website-scanning">
                    <h2 className="text-xl font-bold mb-4 text-[#0f172a]">
                      <span className="text-[#94a3b8] mr-2">4.</span>Website Scanning
                    </h2>
                    <p className="text-[#475569] leading-relaxed mb-4">
                      When you submit a URL for testing, our Service accesses that website using an automated browser to render and analyze the page. We do <strong className="text-[#0f172a]">NOT</strong>:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-[#475569] mb-4">
                      <li>Store the full content of scanned websites</li>
                      <li>Access password-protected areas unless you explicitly provide authentication credentials</li>
                      <li>Submit forms or modify data on scanned websites</li>
                      <li>Share scanned URLs with third parties</li>
                    </ul>
                    <p className="text-[#475569] leading-relaxed">
                      Screenshots generated during testing are stored temporarily and deleted after 30 days unless you save them to your account.
                    </p>
                  </section>

                  <section id="data-sharing">
                    <h2 className="text-xl font-bold mb-4 text-[#0f172a]">
                      <span className="text-[#94a3b8] mr-2">5.</span>Data Sharing
                    </h2>
                    <p className="text-[#475569] leading-relaxed mb-4">
                      We do <strong className="text-[#0f172a]">NOT</strong> sell your personal information. We may share data with:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-[#475569]">
                      <li>Service providers (hosting, payment processing, analytics) who assist in operating the Service</li>
                      <li>Law enforcement if required by law</li>
                      <li>Business transferees in the event of a merger or acquisition</li>
                    </ul>
                  </section>

                  <section id="data-storage">
                    <h2 className="text-xl font-bold mb-4 text-[#0f172a]">
                      <span className="text-[#94a3b8] mr-2">6.</span>Data Storage and Security
                    </h2>
                    <p className="text-[#475569] leading-relaxed">
                      Your data is stored on secure servers. We use industry-standard encryption (TLS/SSL) for data in transit and at rest. Access to user data is restricted to authorized personnel only.
                    </p>
                  </section>

                  <section id="cookies">
                    <h2 className="text-xl font-bold mb-4 text-[#0f172a]">
                      <span className="text-[#94a3b8] mr-2">7.</span>Cookies
                    </h2>
                    <p className="text-[#475569] leading-relaxed">
                      We use essential cookies for authentication and session management. We use analytics cookies (Google Analytics) to understand usage patterns. You can disable cookies in your browser settings, but some features may not work properly.
                    </p>
                  </section>

                  <section id="your-rights">
                    <h2 className="text-xl font-bold mb-4 text-[#0f172a]">
                      <span className="text-[#94a3b8] mr-2">8.</span>Your Rights
                    </h2>
                    <p className="text-[#475569] leading-relaxed mb-4">You have the right to:</p>
                    <ul className="list-disc list-inside space-y-2 text-[#475569] mb-4">
                      <li>Access your personal data</li>
                      <li>Correct inaccurate data</li>
                      <li>Delete your account and associated data</li>
                      <li>Export your data</li>
                      <li>Opt out of marketing communications</li>
                    </ul>
                    <p className="text-[#475569] leading-relaxed">
                      To exercise these rights, contact us at{' '}
                      <a href="mailto:contact@i18ncheck.dev" className="text-[#0f172a] underline hover:no-underline">contact@i18ncheck.dev</a>.
                    </p>
                  </section>

                  <section id="childrens-privacy">
                    <h2 className="text-xl font-bold mb-4 text-[#0f172a]">
                      <span className="text-[#94a3b8] mr-2">9.</span>Children's Privacy
                    </h2>
                    <p className="text-[#475569] leading-relaxed">
                      The Service is not intended for children under 13. We do not knowingly collect information from children under 13.
                    </p>
                  </section>

                  <section id="international">
                    <h2 className="text-xl font-bold mb-4 text-[#0f172a]">
                      <span className="text-[#94a3b8] mr-2">10.</span>International Data Transfers
                    </h2>
                    <p className="text-[#475569] leading-relaxed">
                      Your data may be transferred to and processed in the United States. By using the Service, you consent to this transfer.
                    </p>
                  </section>

                  <section id="changes">
                    <h2 className="text-xl font-bold mb-4 text-[#0f172a]">
                      <span className="text-[#94a3b8] mr-2">11.</span>Changes to This Policy
                    </h2>
                    <p className="text-[#475569] leading-relaxed">
                      We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on the Service or sending you an email.
                    </p>
                  </section>

                  <section id="contact-us">
                    <h2 className="text-xl font-bold mb-4 text-[#0f172a]">
                      <span className="text-[#94a3b8] mr-2">12.</span>Contact Us
                    </h2>
                    <p className="text-[#475569] leading-relaxed mb-4">
                      If you have questions about this Privacy Policy, contact us at:
                    </p>
                    <ul className="space-y-2 text-[#475569]">
                      <li>Email: <a href="mailto:contact@i18ncheck.dev" className="text-[#0f172a] underline hover:no-underline">contact@i18ncheck.dev</a></li>
                      <li>Company: Alpha Web Creation LLC</li>
                      <li>Location: Wyoming, United States</li>
                    </ul>
                  </section>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-full flex items-center justify-center shadow-sm transition-all hover:scale-110 active:scale-95 z-40"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

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
