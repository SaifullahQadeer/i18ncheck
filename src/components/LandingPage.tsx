import { useState, type FormEvent } from 'react';
import { Globe, ArrowRight, Layout, Type, Zap, Code, Check, ChevronDown, Flame, Shield } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onStartTest: (url: string) => void;
}

export default function LandingPage({ onStartTest }: LandingPageProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (url) onStartTest(url);
  };

  const faqs = [
    { q: "Does this actually translate my website?", a: "No. We use pseudo-localization — expanded/transformed text that stress-tests your layout. No real translation happens. Think of it as a crash test for your UI." },
    { q: "What is pseudo-localization?", a: "It's a technique used by Google, Microsoft, and Netflix internally. We replace text with accented, expanded characters to simulate how longer languages like German or Finnish would affect your layout." },
    { q: "Does it work with React, Vue, Angular?", a: "Yes. We use a real browser engine (Chromium) that fully executes JavaScript, so SPAs, dynamic content, and client-side rendered pages all work." },
    { q: "Can I test password-protected sites?", a: "Not yet on the free plan. Pro and Team plans will support authenticated testing via cookies and custom headers." },
    { q: "How is this different from Chrome DevTools?", a: "DevTools can simulate device sizes but can't simulate text expansion, RTL layout flipping, or CJK character rendering. We test internationalization, not responsiveness." },
    { q: "What about the European Accessibility Act?", a: "The EAA requires digital products serving EU markets to be accessible to all users, including proper internationalization. i18nCheck helps you verify compliance." },
    { q: "Will you add real translation preview?", a: "Yes — Pro and Team plans will include an AI-powered real translation toggle using DeepL API. Coming soon." },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e17] text-[#f1f5f9] font-sans selection:bg-cyan-900 selection:text-cyan-100">
      {/* Header */}
      <header className="fixed w-full bg-[#0a0e17]/80 backdrop-blur-md border-b border-[#1e293b] z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-cyan-500/10 p-1.5 rounded-lg border border-cyan-500/20">
              <Globe className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="font-bold text-xl tracking-tight text-[#f1f5f9]">
              i18n<span className="text-cyan-400">Check</span>.dev
            </span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-[#94a3b8]">
            <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-cyan-400 transition-colors">Pricing</a>
            <button 
              onClick={() => onStartTest('')}
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              Try it now
            </button>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 font-display">
              Break your layout <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                before translation does.
              </span>
            </h1>
            <p className="text-xl text-[#94a3b8] max-w-3xl mx-auto mb-10 leading-relaxed font-light">
              Enter any URL. Simulate German text expansion, Arabic RTL flipping, and Japanese CJK characters. 
              See exactly where your UI breaks — in seconds, for free.
            </p>
            
            <div className="max-w-xl mx-auto mb-8">
              <form onSubmit={handleSubmit} className="relative group">
                <input
                  type="text"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full pl-6 pr-36 py-4 bg-[#111827] border border-[#1e293b] rounded-2xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none transition-all text-white placeholder:text-slate-600 shadow-xl shadow-black/50"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 px-6 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-900/20 flex items-center gap-2"
                >
                  Test Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#94a3b8]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-500" />
                <span>No signup required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-500" />
                <span>3 free checks/day</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-500" />
                <span>Used by 500+ developers</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 border-y border-[#1e293b] bg-[#0d121f]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">How it works</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div className="relative">
                <div className="w-16 h-16 bg-[#111827] rounded-2xl border border-[#1e293b] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-black/20">
                  <Globe className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">1. Enter Any URL</h3>
                <p className="text-[#94a3b8]">Paste any website URL, even JavaScript-heavy SPAs. We proxy it securely.</p>
              </div>
              <div className="relative">
                <div className="w-16 h-16 bg-[#111827] rounded-2xl border border-[#1e293b] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-black/20">
                  <Layout className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">2. Pick a Simulation</h3>
                <p className="text-[#94a3b8]">German (+35%), Arabic (RTL), Japanese (CJK), or Stress Test (+80%).</p>
              </div>
              <div className="relative">
                <div className="w-16 h-16 bg-[#111827] rounded-2xl border border-[#1e293b] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-black/20">
                  <Shield className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">3. See What Breaks</h3>
                <p className="text-[#94a3b8]">Get an annotated report showing overflow, truncation, and layout bugs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Live Demo / Before-After (Visual Mockup) */}
        <section className="py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Spot layout bugs <br/>
                  <span className="text-cyan-400">instantly.</span>
                </h2>
                <p className="text-lg text-[#94a3b8] mb-8">
                  Don't wait for a customer to tell you your "Sign Up" button is broken in German. 
                  Our tool visualizes exactly how your UI responds to longer text and different writing systems.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                      <span className="text-red-400 text-xs font-bold">!</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Button Overflow</h4>
                      <p className="text-sm text-[#94a3b8]">Text extends beyond container boundaries.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                      <span className="text-red-400 text-xs font-bold">!</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Nav Wrapping</h4>
                      <p className="text-sm text-[#94a3b8]">Menu items break into multiple lines.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                {/* Mockup of comparison */}
                <div className="relative rounded-xl overflow-hidden border border-[#1e293b] shadow-2xl bg-[#111827]">
                  <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur text-white text-xs px-2 py-1 rounded border border-white/10">
                    German Simulation (+35%)
                  </div>
                  {/* Abstract representation of a broken UI */}
                  <div className="p-6 space-y-6 opacity-80">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                      <div className="w-24 h-6 bg-white/10 rounded"></div>
                      <div className="flex gap-4">
                        <div className="w-16 h-4 bg-white/10 rounded"></div>
                        <div className="w-16 h-4 bg-white/10 rounded"></div>
                        <div className="w-32 h-10 bg-cyan-600/20 border border-red-500 rounded flex items-center px-2 relative">
                          <span className="text-cyan-400 text-sm whitespace-nowrap">Kostenlos Registrieren...</span>
                          <div className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded">Overflow</div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="h-40 bg-white/5 rounded border border-white/5 p-4">
                        <div className="w-3/4 h-6 bg-white/10 rounded mb-3"></div>
                        <div className="w-full h-3 bg-white/5 rounded mb-2"></div>
                        <div className="w-full h-3 bg-white/5 rounded mb-2"></div>
                        <div className="w-2/3 h-3 bg-white/5 rounded"></div>
                      </div>
                      <div className="h-40 bg-white/5 rounded border border-red-500/50 p-4 relative">
                        <div className="w-full h-6 bg-white/10 rounded mb-3"></div>
                        <div className="w-full h-3 bg-white/5 rounded mb-2"></div>
                        <div className="w-full h-3 bg-white/5 rounded mb-2"></div>
                        <div className="w-full h-3 bg-white/5 rounded"></div>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded">Truncated</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Test */}
        <section className="py-20 bg-[#0d121f] border-y border-[#1e293b]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#111827] p-6 rounded-2xl border border-[#1e293b] hover:border-cyan-500/30 transition-colors group">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                  <Type className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">German Expansion</h3>
                <p className="text-sm text-[#94a3b8]">Words in German are 30-40% longer. We expand text to catch overflow.</p>
              </div>
              <div className="bg-[#111827] p-6 rounded-2xl border border-[#1e293b] hover:border-purple-500/30 transition-colors group">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                  <Globe className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Arabic RTL</h3>
                <p className="text-sm text-[#94a3b8]">We flip your entire layout to catch mirroring bugs for RTL languages.</p>
              </div>
              <div className="bg-[#111827] p-6 rounded-2xl border border-[#1e293b] hover:border-pink-500/30 transition-colors group">
                <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-pink-500/20 transition-colors">
                  <Type className="w-5 h-5 text-pink-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">CJK Characters</h3>
                <p className="text-sm text-[#94a3b8]">Test font fallback and line-height with Chinese/Japanese characters.</p>
              </div>
              <div className="bg-[#111827] p-6 rounded-2xl border border-[#1e293b] hover:border-red-500/30 transition-colors group">
                <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                  <Flame className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Max Stress Test</h3>
                <p className="text-sm text-[#94a3b8]">The nuclear option. 100% expansion to find every breaking point.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pseudo-loc Explanation */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">What is Pseudo-localization?</h2>
            <div className="bg-[#111827] border border-[#1e293b] rounded-xl p-8 mb-8 font-mono text-sm md:text-base">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="text-left">
                  <div className="text-[#64748b] text-xs uppercase tracking-wider mb-2">Original</div>
                  <div className="text-white text-xl">"Sign Up Now"</div>
                </div>
                <div className="hidden md:block text-[#1e293b]">
                  <ArrowRight className="w-6 h-6 mx-auto" />
                </div>
                <div className="text-left md:text-right">
                  <div className="text-[#64748b] text-xs uppercase tracking-wider mb-2">Pseudo-localized</div>
                  <div className="text-cyan-400 text-xl break-all">[Šïġñ Ûþ Ñöŵ Ēxţēñðëð]</div>
                </div>
              </div>
            </div>
            <p className="text-[#94a3b8] text-lg">
              It's the industry-standard technique used by Google, Microsoft, and Netflix. 
              We scientifically expand and transform text to find where your UI breaks without needing real translation.
            </p>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 bg-[#0d121f] border-y border-[#1e293b]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Who needs this?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#111827] rounded-xl border border-[#1e293b] flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">SaaS Companies</h3>
                  <p className="text-[#94a3b8]">Expanding to Europe or Asia? Test your app before spending $10K+ on translators.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#111827] rounded-xl border border-[#1e293b] flex items-center justify-center flex-shrink-0">
                  <Layout className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">E-Commerce</h3>
                  <p className="text-[#94a3b8]">Product pages and checkout flows must work in every language to maximize conversion.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#111827] rounded-xl border border-[#1e293b] flex items-center justify-center flex-shrink-0">
                  <Code className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Dev Teams</h3>
                  <p className="text-[#94a3b8]">Add i18n layout checks to your CI/CD pipeline. Catch RTL bugs before production.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#111827] rounded-xl border border-[#1e293b] flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Agencies</h3>
                  <p className="text-[#94a3b8]">Generate professional i18n audit reports for clients to show value instantly.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Simple Pricing</h2>
              <p className="text-[#94a3b8]">Start for free, upgrade for power.</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              {/* Free */}
              <div className="bg-[#111827] p-6 rounded-2xl border border-[#1e293b] flex flex-col">
                <h3 className="text-lg font-bold text-white mb-2">Free</h3>
                <div className="text-3xl font-bold text-white mb-6">$0</div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-2 text-sm text-[#94a3b8]"><Check className="w-4 h-4 text-cyan-500" /> 3 checks per day</li>
                  <li className="flex items-center gap-2 text-sm text-[#94a3b8]"><Check className="w-4 h-4 text-cyan-500" /> German expansion only</li>
                  <li className="flex items-center gap-2 text-sm text-[#94a3b8]"><Check className="w-4 h-4 text-cyan-500" /> Basic screenshots</li>
                </ul>
                <button onClick={() => onStartTest('')} className="w-full py-2 bg-[#1e293b] hover:bg-[#334155] text-white rounded-lg transition-colors text-sm font-medium">Get Started</button>
              </div>

              {/* Starter */}
              <div className="bg-[#111827] p-6 rounded-2xl border border-[#1e293b] flex flex-col">
                <h3 className="text-lg font-bold text-white mb-2">Starter</h3>
                <div className="text-3xl font-bold text-white mb-6">$19<span className="text-sm font-normal text-[#64748b]">/mo</span></div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-2 text-sm text-[#94a3b8]"><Check className="w-4 h-4 text-cyan-500" /> 50 checks per month</li>
                  <li className="flex items-center gap-2 text-sm text-[#94a3b8]"><Check className="w-4 h-4 text-cyan-500" /> All simulations</li>
                  <li className="flex items-center gap-2 text-sm text-[#94a3b8]"><Check className="w-4 h-4 text-cyan-500" /> Side-by-side view</li>
                </ul>
                <button className="w-full py-2 bg-[#1e293b] text-[#64748b] rounded-lg cursor-not-allowed text-sm font-medium">Coming Soon</button>
              </div>

              {/* Pro */}
              <div className="bg-[#111827] p-6 rounded-2xl border border-cyan-500/50 relative flex flex-col shadow-lg shadow-cyan-900/10">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-[#0a0e17] text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>
                <h3 className="text-lg font-bold text-white mb-2">Pro</h3>
                <div className="text-3xl font-bold text-white mb-6">$49<span className="text-sm font-normal text-[#64748b]">/mo</span></div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-2 text-sm text-[#f1f5f9]"><Check className="w-4 h-4 text-cyan-500" /> 200 checks per month</li>
                  <li className="flex items-center gap-2 text-sm text-[#f1f5f9]"><Check className="w-4 h-4 text-cyan-500" /> Batch testing</li>
                  <li className="flex items-center gap-2 text-sm text-[#f1f5f9]"><Check className="w-4 h-4 text-cyan-500" /> API Access</li>
                </ul>
                <button className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors text-sm font-medium">Coming Soon</button>
              </div>

              {/* Team */}
              <div className="bg-[#111827] p-6 rounded-2xl border border-[#1e293b] flex flex-col">
                <h3 className="text-lg font-bold text-white mb-2">Team</h3>
                <div className="text-3xl font-bold text-white mb-6">$99<span className="text-sm font-normal text-[#64748b]">/mo</span></div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-2 text-sm text-[#94a3b8]"><Check className="w-4 h-4 text-cyan-500" /> 500 checks per month</li>
                  <li className="flex items-center gap-2 text-sm text-[#94a3b8]"><Check className="w-4 h-4 text-cyan-500" /> Unlimited members</li>
                  <li className="flex items-center gap-2 text-sm text-[#94a3b8]"><Check className="w-4 h-4 text-cyan-500" /> White-label reports</li>
                </ul>
                <button className="w-full py-2 bg-[#1e293b] text-[#64748b] rounded-lg cursor-not-allowed text-sm font-medium">Coming Soon</button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-[#0d121f] border-t border-[#1e293b]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-[#111827] border border-[#1e293b] rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                  <p className="text-[#94a3b8]">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0a0e17] border-t border-[#1e293b] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-cyan-500/10 p-1.5 rounded-lg border border-cyan-500/20">
              <Globe className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="font-bold text-[#f1f5f9]">i18nCheck.dev</span>
            <span className="text-[#64748b] text-sm ml-2">Stop shipping i18n bugs.</span>
          </div>
          <div className="flex gap-6 text-sm text-[#94a3b8]">
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">How it Works</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Blog</a>
          </div>
          <div className="text-sm text-[#64748b]">
            &copy; {new Date().getFullYear()} i18nCheck.dev
          </div>
        </div>
      </footer>
    </div>
  );
}
