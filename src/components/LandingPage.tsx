import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ArrowRight, CheckCircle2, Layout, Languages, Flame, Zap, Building2, ShoppingCart, Monitor, Wrench, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
            <button onClick={() => scrollToSection('features')} className="text-[#f1f5f9]/70 hover:text-[#06b6d4] transition-colors">Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-[#f1f5f9]/70 hover:text-[#06b6d4] transition-colors">How it works</button>
            <button onClick={() => scrollToSection('pricing')} className="text-[#f1f5f9]/70 hover:text-[#06b6d4] transition-colors">Pricing</button>
            <Link 
              to="/app"
              className="px-5 py-2.5 bg-[#06b6d4] hover:bg-[#0891b2] text-[#0a0e17] font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#06b6d4]/20"
            >
              Try it now
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-40 pb-20 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#06b6d4]/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#06b6d4]/5 blur-[120px] rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-[#f1f5f9] to-[#94a3b8]">
                Does Your Website Break <br className="hidden md:block" /> in Other Languages?
              </h1>
              <p className="text-xl md:text-2xl text-[#f1f5f9]/60 max-w-3xl mx-auto mb-10 leading-relaxed">
                Simulate German text expansion, Arabic RTL flipping, and CJK characters. 
                Catch i18n layout bugs instantly — for free.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Link 
                  to="/app"
                  className="w-full sm:w-auto px-10 py-4 bg-[#06b6d4] hover:bg-[#0891b2] text-[#0a0e17] font-bold rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-lg shadow-xl shadow-[#06b6d4]/20"
                >
                  Start Testing <ArrowRight className="w-5 h-5" />
                </Link>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="w-full sm:w-auto px-10 py-4 bg-[#111827] hover:bg-[#1f2937] text-[#f1f5f9] font-bold rounded-xl border border-[#f1f5f9]/10 transition-all hover:scale-105 active:scale-95 text-lg"
                >
                  Learn more
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-[#f1f5f9]/40 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#06b6d4]" />
                  <span>No signup required</span>
                </div>
                <div className="w-1 h-1 bg-[#f1f5f9]/20 rounded-full" />
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#06b6d4]" />
                  <span>3 free checks/day</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 bg-[#0a0e17]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Global Scale</h2>
              <p className="text-[#f1f5f9]/50 max-w-2xl mx-auto">
                Test your layout against the most common internationalization challenges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCard 
                icon="🇩🇪"
                title="Text Expansion"
                description="German and Finnish words are 30-40% longer. We expand every string to catch overflow and truncation."
              />
              <FeatureCard 
                icon="🇸🇦"
                title="RTL Layout"
                description="Arabic and Hebrew read right-to-left. We flip your entire layout to catch mirroring bugs."
              />
              <FeatureCard 
                icon="🇯🇵"
                title="CJK Characters"
                description="Japanese, Chinese, Korean use full-width characters. We test font fallback and word wrapping."
              />
              <FeatureCard 
                icon="🔥"
                title="Stress Test"
                description="80-100% text expansion. Find every breaking point before launch."
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 bg-[#111827]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
              <p className="text-[#f1f5f9]/50 max-w-2xl mx-auto">
                Three simple steps to internationalization confidence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <Step 
                number="01"
                title="Enter any URL"
                description="Paste the link to your staging site or production app."
              />
              <Step 
                number="02"
                title="Pick a language simulation"
                description="Choose from expansion, RTL, or CJK character sets."
              />
              <Step 
                number="03"
                title="See what breaks"
                description="Identify layout shifts, overlapping text, and broken mirrors."
              />
            </div>
          </div>
        </section>

        {/* What Is Pseudo-Localization? */}
        <section className="py-24 bg-[#0a0e17]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">What Is Pseudo-Localization?</h2>
                <p className="text-[#f1f5f9]/60 text-lg mb-6 leading-relaxed">
                  Pseudo-localization is the industry-standard technique used by Google, Microsoft, and Netflix to test UI layouts before investing in real translation. No actual translation happens — we scientifically expand and transform text to find exactly where your interface breaks.
                </p>
                <p className="text-sm text-[#f1f5f9]/40 italic">
                  The brackets [ ] mark translatable strings. The accented characters prove text flows through a translation pipeline, not hardcoded.
                </p>
              </div>
              <div className="bg-[#111827] border border-[#f1f5f9]/10 rounded-2xl p-8 font-mono shadow-2xl">
                <div className="space-y-6">
                  <div>
                    <div className="text-[#06b6d4] text-xs uppercase tracking-widest mb-2">Original English</div>
                    <div className="text-2xl text-[#f1f5f9]">"Sign Up Now"</div>
                  </div>
                  <div className="h-px bg-[#f1f5f9]/5" />
                  <div>
                    <div className="text-[#06b6d4] text-xs uppercase tracking-widest mb-2">Pseudo-localized</div>
                    <div className="text-2xl text-[#06b6d4] font-bold">"[Šïġñ Ûþ Ñöŵ Ēxţēñðëð]"</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who It's For */}
        <section className="py-24 bg-[#111827]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Who It's For</h2>
              <p className="text-[#f1f5f9]/50 max-w-2xl mx-auto">
                Whether you're a solo dev or a global enterprise, we help you ship localized products with confidence.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <WhoCard 
                icon={<Building2 className="w-6 h-6 text-[#06b6d4]" />}
                title="SaaS Companies"
                description="Expanding to Europe, MENA, or Asia? Test your entire app before spending $10K+ on translators. Catch every overflow, truncation, and RTL bug in minutes."
              />
              <WhoCard 
                icon={<ShoppingCart className="w-6 h-6 text-[#06b6d4]" />}
                title="E-Commerce"
                description="Product pages, checkout flows, and transactional emails must work in every language. One broken button in Arabic = lost sales."
              />
              <WhoCard 
                icon={<Monitor className="w-6 h-6 text-[#06b6d4]" />}
                title="Agencies"
                description="Generate professional i18n audit reports for clients in seconds. PDF export with your branding. Charge clients for localization QA — the tool pays for itself."
              />
              <WhoCard 
                icon={<Wrench className="w-6 h-6 text-[#06b6d4]" />}
                title="Dev Teams"
                description="Add i18n layout checks to your CI/CD pipeline via our API. Catch RTL and overflow bugs automatically before every deploy."
              />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24 bg-[#0a0e17]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-[#f1f5f9]/50 max-w-2xl mx-auto">
                Start for free and scale as your global footprint grows.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <PricingCard 
                tier="FREE"
                price="$0"
                features={[
                  "3 checks per day",
                  "German text expansion only",
                  "Basic before/after screenshots",
                  "Watermarked results"
                ]}
                buttonText="Start Free"
                to="/app"
                active={true}
              />
              <PricingCard 
                tier="STARTER"
                price="$19"
                features={[
                  "50 checks per month",
                  "All language simulations",
                  "Side-by-side comparison view",
                  "Issue detection with severity",
                  "PDF export for client reports"
                ]}
                buttonText="Coming Soon"
                active={false}
              />
              <PricingCard 
                tier="PRO"
                price="$49"
                features={[
                  "200 checks per month",
                  "Everything in Starter",
                  "Batch URL testing (20 pages)",
                  "API access for CI/CD",
                  "Shareable team links",
                  "Slack and email alerts",
                  "Priority rendering queue"
                ]}
                buttonText="Coming Soon"
                active={false}
                popular={true}
              />
              <PricingCard 
                tier="TEAM"
                price="$99"
                features={[
                  "500 checks per month",
                  "Everything in Pro",
                  "Unlimited team members",
                  "Scheduled monitoring",
                  "Webhook integrations",
                  "White-label PDF reports",
                  "Dedicated support"
                ]}
                buttonText="Coming Soon"
                active={false}
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-[#111827]/30">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              <FAQItem 
                index={0}
                openIndex={openFaq}
                setOpenIndex={setOpenFaq}
                question="Does this actually translate my website?"
                answer="No. We use pseudo-localization — expanded and transformed text that stress-tests your layout. No real translation happens. Think of it as a crash test for your UI, not a translation service."
              />
              <FAQItem 
                index={1}
                openIndex={openFaq}
                setOpenIndex={setOpenFaq}
                question="What is pseudo-localization?"
                answer="It's a technique used by Google, Microsoft, and Netflix internally. We replace text with accented, expanded characters to simulate how longer languages like German or Finnish would affect your layout. Developers have used this method for decades to catch i18n bugs early."
              />
              <FAQItem 
                index={2}
                openIndex={openFaq}
                setOpenIndex={setOpenFaq}
                question="Does it work with React, Vue, Angular, and other JavaScript frameworks?"
                answer="Yes. We use a real browser engine (Chromium) that fully executes JavaScript, so single-page apps, dynamic content, and client-side rendered pages all work correctly."
              />
              <FAQItem 
                index={3}
                openIndex={openFaq}
                setOpenIndex={setOpenFaq}
                question="How is this different from just using Chrome DevTools?"
                answer="DevTools can simulate device sizes but cannot simulate text expansion, RTL layout flipping, or CJK character rendering. We test internationalization — a completely different dimension from responsiveness."
              />
              <FAQItem 
                index={4}
                openIndex={openFaq}
                setOpenIndex={setOpenFaq}
                question="Can I test password-protected or staging sites?"
                answer="Not yet on the free plan. Pro and Team plans will support authenticated testing via cookies and custom headers. Coming soon."
              />
              <FAQItem 
                index={5}
                openIndex={openFaq}
                setOpenIndex={setOpenFaq}
                question="What about the European Accessibility Act (EAA)?"
                answer="The EAA, enforced from June 2025, requires digital products serving EU markets to be accessible to all users, including proper internationalization support. i18nCheck helps you verify layout compliance before enforcement deadlines."
              />
              <FAQItem 
                index={6}
                openIndex={openFaq}
                setOpenIndex={setOpenFaq}
                question="Will you add real translation preview?"
                answer="Yes — paid plans will include an AI-powered real translation mode using Google Translate API, so you can see your actual site rendered in German, Arabic, or Japanese. You'll also be able to bring your own API key. Coming soon."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#111827] to-[#0a0e17] border border-[#f1f5f9]/10 rounded-3xl p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#06b6d4]/10 blur-[80px] rounded-full -mr-32 -mt-32" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">Ready to stress-test your layouts?</h2>
              <p className="text-[#f1f5f9]/60 mb-10 text-lg relative z-10">
                Join 500+ developers catching i18n bugs before their users do.
              </p>
              <Link 
                to="/app"
                className="px-12 py-4 bg-[#06b6d4] hover:bg-[#0891b2] text-[#0a0e17] font-bold rounded-xl transition-all hover:scale-105 active:scale-95 text-lg relative z-10 shadow-xl shadow-[#06b6d4]/20"
              >
                Start Testing — It's Free <ArrowRight className="w-5 h-5 inline-block ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </main>

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
                <li><button onClick={() => scrollToSection('features')} className="hover:text-[#06b6d4] transition-colors">Features</button></li>
                <li><button onClick={() => scrollToSection('how-it-works')} className="hover:text-[#06b6d4] transition-colors">How it Works</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="hover:text-[#06b6d4] transition-colors">Pricing</button></li>
                <li><a href="#" className="hover:text-[#06b6d4] transition-colors">Documentation</a></li>
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

function FeatureCard({ icon, title, description }: { icon: string, title: string, description: string }) {
  return (
    <div className="bg-[#111827] border border-[#f1f5f9]/5 p-8 rounded-2xl hover:border-[#06b6d4]/30 transition-all group">
      <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-[#f1f5f9]">{title}</h3>
      <p className="text-[#f1f5f9]/50 leading-relaxed">{description}</p>
    </div>
  );
}

function Step({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="relative">
      <div className="text-6xl font-black text-[#f1f5f9]/5 absolute -top-8 -left-4 z-0">{number}</div>
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-3 text-[#f1f5f9]">{title}</h3>
        <p className="text-[#f1f5f9]/50 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function WhoCard({ icon, title, description }: { icon: ReactNode, title: string, description: string }) {
  return (
    <div className="bg-[#111827] border border-[#f1f5f9]/5 p-8 rounded-2xl hover:border-[#06b6d4]/30 transition-all">
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-[#f1f5f9]">{title}</h3>
      <p className="text-[#f1f5f9]/50 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function PricingCard({ tier, price, features, buttonText, to, active, popular }: { 
  tier: string, 
  price: string, 
  features: string[], 
  buttonText: string, 
  to?: string,
  active: boolean,
  popular?: boolean
}) {
  return (
    <div className={`relative bg-[#111827] border ${popular ? 'border-[#06b6d4]' : 'border-[#f1f5f9]/5'} p-8 rounded-3xl flex flex-col h-full shadow-xl`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#06b6d4] text-[#0a0e17] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}
      <div className="mb-8">
        <div className="text-[#f1f5f9]/40 text-xs font-bold uppercase tracking-widest mb-2">{tier}</div>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-[#f1f5f9]">{price}</span>
          <span className="text-[#f1f5f9]/40 text-sm">/mo</span>
        </div>
      </div>
      <ul className="space-y-4 mb-10 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-[#f1f5f9]/60">
            <Check className="w-4 h-4 text-[#06b6d4] mt-0.5 shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      {to ? (
        <Link 
          to={to}
          className={`w-full py-4 rounded-xl font-bold transition-all text-center ${
            active 
              ? 'bg-[#06b6d4] hover:bg-[#0891b2] text-[#0a0e17] shadow-lg shadow-[#06b6d4]/20' 
              : 'bg-[#f1f5f9]/5 text-[#f1f5f9]/20 cursor-not-allowed'
          }`}
        >
          {buttonText}
        </Link>
      ) : (
        <button 
          disabled={!active}
          className={`w-full py-4 rounded-xl font-bold transition-all ${
            active 
              ? 'bg-[#06b6d4] hover:bg-[#0891b2] text-[#0a0e17] shadow-lg shadow-[#06b6d4]/20' 
              : 'bg-[#f1f5f9]/5 text-[#f1f5f9]/20 cursor-not-allowed'
          }`}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}

function FAQItem({ index, openIndex, setOpenIndex, question, answer }: { 
  index: number, 
  openIndex: number | null, 
  setOpenIndex: (i: number | null) => void,
  question: string, 
  answer: string 
}) {
  const isOpen = openIndex === index;
  return (
    <div className="border border-[#f1f5f9]/5 rounded-2xl overflow-hidden bg-[#111827]/50">
      <button 
        onClick={() => setOpenIndex(isOpen ? null : index)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#f1f5f9]/5 transition-colors"
      >
        <span className="font-bold text-[#f1f5f9]">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-[#06b6d4]" /> : <ChevronDown className="w-5 h-5 text-[#f1f5f9]/40" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 text-[#f1f5f9]/50 text-sm leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
