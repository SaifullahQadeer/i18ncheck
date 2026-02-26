import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Globe, ArrowLeft, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const sections = [
  { id: 'acceptance', num: '1', title: 'Acceptance of Terms' },
  { id: 'description', num: '2', title: 'Description of Service' },
  { id: 'user-accounts', num: '3', title: 'User Accounts' },
  { id: 'acceptable-use', num: '4', title: 'Acceptable Use' },
  { id: 'plans', num: '5', title: 'Free and Paid Plans' },
  { id: 'payment', num: '6', title: 'Payment and Billing' },
  { id: 'ip', num: '7', title: 'Intellectual Property' },
  { id: 'third-party', num: '8', title: 'Third-Party Websites' },
  { id: 'api-usage', num: '9', title: 'API Usage' },
  { id: 'disclaimer', num: '10', title: 'Disclaimer of Warranties' },
  { id: 'liability', num: '11', title: 'Limitation of Liability' },
  { id: 'indemnification', num: '12', title: 'Indemnification' },
  { id: 'termination', num: '13', title: 'Termination' },
  { id: 'governing-law', num: '14', title: 'Governing Law' },
  { id: 'changes', num: '15', title: 'Changes to Terms' },
  { id: 'contact-us', num: '16', title: 'Contact' },
];

export default function TermsPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    document.title = 'Terms of Service — i18nCheck.dev';
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-[#f1f5f9] to-[#94a3b8]">
              Terms of Service
            </h1>
            <p className="text-[#f1f5f9]/40 mb-16">Last Updated: February 26, 2026</p>

            <div className="flex gap-12">
              {/* Sticky TOC Sidebar - Desktop */}
              <aside className="hidden lg:block w-64 shrink-0">
                <nav className="sticky top-28">
                  <h3 className="text-xs uppercase tracking-widest text-[#f1f5f9]/30 font-bold mb-4">Contents</h3>
                  <ul className="space-y-2">
                    {sections.map(s => (
                      <li key={s.id}>
                        <button
                          onClick={() => scrollToSection(s.id)}
                          className="text-sm text-[#f1f5f9]/40 hover:text-[#06b6d4] transition-colors text-left"
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
                  {/* 1. Acceptance of Terms */}
                  <section id="acceptance">
                    <h2 className="text-xl font-bold mb-4 text-[#f1f5f9]">
                      <span className="text-[#06b6d4] mr-2">1.</span>Acceptance of Terms
                    </h2>
                    <p className="text-[#f1f5f9]/60 leading-relaxed">
                      By accessing or using i18nCheck.dev and i18ncheck.dev (the "Service"), operated by Alpha Web Creation LLC ("we", "our", "us"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.
                    </p>
                  </section>

                  {/* 2. Description of Service */}
                  <section id="description">
                    <h2 className="text-xl font-bold mb-4 text-[#f1f5f9]">
                      <span className="text-[#06b6d4] mr-2">2.</span>Description of Service
                    </h2>
                    <p className="text-[#f1f5f9]/60 leading-relaxed">
                      i18nCheck is a web-based internationalization (i18n) layout testing tool. The Service allows users to submit website URLs for automated layout stress-testing using pseudo-localization techniques, including text expansion, RTL layout simulation, and CJK character rendering.
                    </p>
                  </section>

                  {/* 3. User Accounts */}
                  <section id="user-accounts">
                    <h2 className="text-xl font-bold mb-4 text-[#f1f5f9]">
                      <span className="text-[#06b6d4] mr-2">3.</span>User Accounts
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-[#f1f5f9]/60">
                      <li>You may use the free tier without creating an account, subject to daily usage limits.</li>
                      <li>To access paid features, you must create an account with accurate and complete information.</li>
                      <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                      <li>You are responsible for all activity that occurs under your account.</li>
                    </ul>
                  </section>

                  {/* 4. Acceptable Use */}
                  <section id="acceptable-use">
                    <h2 className="text-xl font-bold mb-4 text-[#f1f5f9]">
                      <span className="text-[#06b6d4] mr-2">4.</span>Acceptable Use
                    </h2>
                    <p className="text-[#f1f5f9]/60 leading-relaxed mb-4">You agree <strong className="text-[#f1f5f9]/80">NOT</strong> to:</p>
                    <ul className="list-disc list-inside space-y-2 text-[#f1f5f9]/60">
                      <li>Use the Service to scan websites you do not own or have permission to test</li>
                      <li>Attempt to overload, disrupt, or interfere with the Service</li>
                      <li>Circumvent usage limits or access controls</li>
                      <li>Use the Service for any illegal or unauthorized purpose</li>
                      <li>Reverse engineer, decompile, or disassemble the Service</li>
                      <li>Resell or redistribute the Service without written permission</li>
                      <li>Use the Service to scrape, copy, or steal content from third-party websites</li>
                      <li>Submit URLs that contain illegal, harmful, or malicious content</li>
                    </ul>
                  </section>

                  {/* 5. Free and Paid Plans */}
                  <section id="plans">
                    <h2 className="text-xl font-bold mb-4 text-[#f1f5f9]">
                      <span className="text-[#06b6d4] mr-2">5.</span>Free and Paid Plans
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-[#f1f5f9]/60">
                      <li>Free tier: Limited to 3 checks per day with restricted features.</li>
                      <li>Paid plans (Starter, Pro, Team): Provide additional checks, features, and support as described on our Pricing page.</li>
                      <li>Prices may change with 30 days notice. Existing subscriptions will be honored at the current rate until renewal.</li>
                    </ul>
                  </section>

                  {/* 6. Payment and Billing */}
                  <section id="payment">
                    <h2 className="text-xl font-bold mb-4 text-[#f1f5f9]">
                      <span className="text-[#06b6d4] mr-2">6.</span>Payment and Billing
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-[#f1f5f9]/60">
                      <li>Paid subscriptions are billed monthly through Stripe.</li>
                      <li>All fees are non-refundable unless required by law or stated otherwise.</li>
                      <li>We may suspend access if payment fails after reasonable notice.</li>
                      <li>You can cancel your subscription at any time through your account settings. Cancellation takes effect at the end of the current billing period.</li>
                    </ul>
                  </section>

                  {/* 7. Intellectual Property */}
                  <section id="ip">
                    <h2 className="text-xl font-bold mb-4 text-[#f1f5f9]">
                      <span className="text-[#06b6d4] mr-2">7.</span>Intellectual Property
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-[#f1f5f9]/60">
                      <li>The Service, including its design, code, and content, is owned by Alpha Web Creation LLC and protected by intellectual property laws.</li>
                      <li>Reports and screenshots generated by the Service for your URL tests are yours to use.</li>
                      <li>You grant us a limited license to process the URLs you submit solely for the purpose of providing the Service.</li>
                    </ul>
                  </section>

                  {/* 8. Third-Party Websites */}
                  <section id="third-party">
                    <h2 className="text-xl font-bold mb-4 text-[#f1f5f9]">
                      <span className="text-[#06b6d4] mr-2">8.</span>Third-Party Websites
                    </h2>
                    <p className="text-[#f1f5f9]/60 leading-relaxed">
                      The Service accesses third-party websites that you submit for testing. We are not responsible for the content, accuracy, or availability of those websites. Scanning a website does not imply endorsement.
                    </p>
                  </section>

                  {/* 9. API Usage */}
                  <section id="api-usage">
                    <h2 className="text-xl font-bold mb-4 text-[#f1f5f9]">
                      <span className="text-[#06b6d4] mr-2">9.</span>API Usage
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-[#f1f5f9]/60">
                      <li>API access is available on Pro and Team plans, subject to rate limits.</li>
                      <li>API keys are confidential. You are responsible for any usage under your API key.</li>
                      <li>We may revoke API access for abuse or violation of these Terms.</li>
                    </ul>
                  </section>

                  {/* 10. Disclaimer of Warranties */}
                  <section id="disclaimer">
                    <h2 className="text-xl font-bold mb-4 text-[#f1f5f9]">
                      <span className="text-[#06b6d4] mr-2">10.</span>Disclaimer of Warranties
                    </h2>
                    <div className="bg-[#111827] border border-[#f1f5f9]/10 rounded-xl p-6">
                      <p className="text-[#f1f5f9]/60 leading-relaxed mb-4 uppercase text-sm font-medium">
                        THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT GUARANTEE THAT:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-[#f1f5f9]/60">
                        <li>The Service will be uninterrupted or error-free</li>
                        <li>Layout issue detection will be 100% accurate</li>
                        <li>All websites will be compatible with the Service</li>
                        <li>Results will be suitable for any particular purpose</li>
                      </ul>
                    </div>
                  </section>

                  {/* 11. Limitation of Liability */}
                  <section id="liability">
                    <h2 className="text-xl font-bold mb-4 text-[#f1f5f9]">
                      <span className="text-[#06b6d4] mr-2">11.</span>Limitation of Liability
                    </h2>
                    <div className="bg-[#111827] border border-[#f1f5f9]/10 rounded-xl p-6">
                      <p className="text-[#f1f5f9]/60 leading-relaxed uppercase text-sm font-medium">
                        TO THE MAXIMUM EXTENT PERMITTED BY LAW, ALPHA WEB CREATION LLC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM.
                      </p>
                    </div>
                  </section>

                  {/* 12. Indemnification */}
                  <section id="indemnification">
                    <h2 className="text-xl font-bold mb-4 text-[#f1f5f9]">
                      <span className="text-[#06b6d4] mr-2">12.</span>Indemnification
                    </h2>
                    <p className="text-[#f1f5f9]/60 leading-relaxed">
                      You agree to indemnify and hold harmless Alpha Web Creation LLC from any claims, damages, or expenses arising from your use of the Service or violation of these Terms.
                    </p>
                  </section>

                  {/* 13. Termination */}
                  <section id="termination">
                    <h2 className="text-xl font-bold mb-4 text-[#f1f5f9]">
                      <span className="text-[#06b6d4] mr-2">13.</span>Termination
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-[#f1f5f9]/60">
                      <li>We may suspend or terminate your access at any time for violation of these Terms.</li>
                      <li>You may stop using the Service and delete your account at any time.</li>
                      <li>Sections regarding intellectual property, limitation of liability, and indemnification survive termination.</li>
                    </ul>
                  </section>

                  {/* 14. Governing Law */}
                  <section id="governing-law">
                    <h2 className="text-xl font-bold mb-4 text-[#f1f5f9]">
                      <span className="text-[#06b6d4] mr-2">14.</span>Governing Law
                    </h2>
                    <p className="text-[#f1f5f9]/60 leading-relaxed">
                      These Terms are governed by the laws of the State of Wyoming, United States, without regard to conflict of law principles.
                    </p>
                  </section>

                  {/* 15. Changes to Terms */}
                  <section id="changes">
                    <h2 className="text-xl font-bold mb-4 text-[#f1f5f9]">
                      <span className="text-[#06b6d4] mr-2">15.</span>Changes to Terms
                    </h2>
                    <p className="text-[#f1f5f9]/60 leading-relaxed">
                      We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance. We will notify users of significant changes via email or a notice on the Service.
                    </p>
                  </section>

                  {/* 16. Contact */}
                  <section id="contact-us">
                    <h2 className="text-xl font-bold mb-4 text-[#f1f5f9]">
                      <span className="text-[#06b6d4] mr-2">16.</span>Contact
                    </h2>
                    <p className="text-[#f1f5f9]/60 leading-relaxed mb-4">
                      For questions about these Terms, contact us at:
                    </p>
                    <ul className="space-y-2 text-[#f1f5f9]/60">
                      <li>Email: <a href="mailto:contact@i18ncheck.dev" className="text-[#06b6d4] hover:underline">contact@i18ncheck.dev</a></li>
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

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[#06b6d4] hover:bg-[#0891b2] text-[#0a0e17] rounded-full flex items-center justify-center shadow-lg shadow-[#06b6d4]/20 transition-all hover:scale-110 active:scale-95 z-40"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

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
