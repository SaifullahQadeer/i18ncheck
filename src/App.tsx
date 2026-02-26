import { useState, useRef, useEffect, type FormEvent } from 'react';
import { 
  Globe, ArrowRight, RefreshCw, AlertCircle, Check, Layout, Type, Languages, 
  Maximize2, Minimize2, Flame, ChevronDown, ChevronLeft, Search, Copy, 
  Download, Share2, Info, AlertTriangle, XCircle, CheckCircle2, ExternalLink,
  Smartphone, Monitor, Tablet, MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import LandingPage from './components/LandingPage';

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [url, setUrl] = useState('');
  const [mode, setMode] = useState('pseudo');
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [expandedIssue, setExpandedIssue] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const loadingSteps = [
    "Launching browser...",
    "Loading page...",
    "Applying simulation...",
    "Detecting layout issues...",
    "Generating results..."
  ];

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingStep(prev => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
      }, 1500);
      return () => clearInterval(interval);
    } else {
      setLoadingStep(0);
    }
  }, [isLoading]);

  const presets = [
    { name: 'stripe.com', url: 'https://stripe.com' },
    { name: 'github.com', url: 'https://github.com' },
    { name: 'bbc.com', url: 'https://www.bbc.com' },
    { name: 'amazon.com', url: 'https://amazon.com' },
    { name: 'wikipedia.org', url: 'https://en.wikipedia.org' },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!url) return;

    let targetUrl = url;
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }

    setIsLoading(true);
    setPreviewUrl(`/api/preview?url=${encodeURIComponent(targetUrl)}&mode=${mode}&t=${Date.now()}`);
  };

  const handlePresetSelect = (presetUrl: string) => {
    setUrl(presetUrl);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://i18ncheck.dev/share/${Math.random().toString(36).substring(7)}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const modes = [
    { id: 'german', name: 'German Expansion', icon: Layout, desc: 'Adds ~35% text length' },
    { id: 'finnish', name: 'Finnish Extreme', icon: Layout, desc: 'Adds ~45% + long compound words' },
    { id: 'arabic', name: 'Arabic RTL', icon: Globe, desc: 'Flips layout right-to-left' },
    { id: 'japanese', name: 'Japanese CJK', icon: Languages, desc: 'Full-width character test' },
    { id: 'russian', name: 'Russian Cyrillic', icon: Type, desc: 'Cyrillic script + expansion' },
    { id: 'stress', name: 'Stress Test', icon: Flame, desc: 'Maximum 80-100% expansion' },
  ];

  const mockIssues = [
    {
      id: 1,
      severity: 'critical',
      title: "Navigation menu wraps to second line",
      element: ".main-nav ul",
      description: "Navigation items exceed container width when text is expanded by 35%. Menu items wrap to a second row, breaking the header layout.",
      fix: "Use a responsive hamburger menu for overflow, or reduce the number of visible nav items. Consider CSS flex-wrap with overflow handling."
    },
    {
      id: 2,
      severity: 'critical',
      title: "CTA button text overflows",
      element: ".hero .btn-primary",
      description: "The primary call-to-action button text extends 47px beyond the button boundary when expanded.",
      fix: "Add min-width to the button, use padding instead of fixed width, or add text-overflow: ellipsis as a fallback."
    },
    {
      id: 3,
      severity: 'critical',
      title: "Card content overlaps adjacent cards",
      element: ".feature-card",
      description: "Feature card text content overflows its container and overlaps with the neighboring card in the grid.",
      fix: "Use overflow: hidden on the card container and add text-overflow: ellipsis to headings. Consider min-height instead of fixed height."
    },
    {
      id: 4,
      severity: 'warning',
      title: "Heading text truncated",
      element: ".pricing-card h3",
      description: "Pricing card heading is cut off by overflow:hidden. Users cannot see the full heading text.",
      fix: "Increase card heading area height or use CSS line-clamp: 2 to show two lines with ellipsis."
    },
    {
      id: 5,
      severity: 'warning',
      title: "Form labels misaligned with inputs",
      element: ".form-group label",
      description: "Form labels wrap to two lines when text is expanded, causing vertical misalignment with their input fields.",
      fix: "Use a vertical form layout (labels above inputs) instead of horizontal, or use flexible grid with min-width on labels."
    },
    {
      id: 6,
      severity: 'warning',
      title: "Footer links stack vertically",
      element: "footer .links",
      description: "Footer navigation links wrap and stack when text length increases, making the footer significantly taller.",
      fix: "Use flex-wrap with controlled spacing, or group footer links into columns for better overflow handling."
    },
    {
      id: 7,
      severity: 'warning',
      title: "Tooltip text exceeds tooltip container",
      element: ".tooltip-content",
      description: "Tooltip text overflows the tooltip box when expanded. The tooltip becomes unreadable.",
      fix: "Set max-width on tooltips and allow text wrapping with word-break: break-word."
    },
    {
      id: 8,
      severity: 'info',
      title: "CSS logical properties not used",
      element: "Multiple elements",
      description: "The site uses margin-left and padding-right instead of margin-inline-start and padding-inline-end. Logical properties auto-adapt for RTL layouts.",
      fix: "Replace directional CSS properties with logical equivalents for better RTL support."
    },
    {
      id: 9,
      severity: 'info',
      title: "Missing lang attribute on HTML element",
      element: "html",
      description: "The <html> tag does not have a lang attribute. This affects accessibility and helps browsers choose correct fonts for different scripts.",
      fix: "Add lang='en' to the opening <html> tag. Change dynamically when serving translated pages."
    }
  ];

  if (showLanding) {
    return <LandingPage onStartTesting={() => setShowLanding(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0e17] text-[#f1f5f9] font-sans selection:bg-[#06b6d4]/30 selection:text-[#06b6d4]">
      {/* Header */}
      <header className="bg-[#0a0e17]/80 backdrop-blur-md border-b border-[#1e293b] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setShowLanding(true)}
          >
            <div className="bg-[#06b6d4] p-1.5 rounded-lg shadow-lg shadow-[#06b6d4]/20">
              <Globe className="w-5 h-5 text-[#0a0e17]" />
            </div>
            <span className="font-bold text-xl tracking-tight text-[#f1f5f9]">i18nCheck.dev</span>
          </div>
          <button 
            onClick={() => setShowLanding(true)}
            className="text-sm font-medium text-[#f1f5f9]/60 hover:text-[#06b6d4] transition-colors flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Control Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111827] rounded-2xl border border-[#1e293b] p-8 mb-10 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-6">
                <label htmlFor="url" className="flex items-center gap-2 text-sm font-semibold text-[#f1f5f9]/60 mb-3">
                  <Globe className="w-4 h-4 text-[#06b6d4]" />
                  Website URL
                </label>
                <input
                  type="text"
                  id="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-5 py-4 bg-[#0a0e17] border border-[#1e293b] rounded-xl focus:ring-2 focus:ring-[#06b6d4] focus:border-transparent outline-none transition-all text-lg"
                />
              </div>

              <div className="lg:col-span-4">
                <label className="flex items-center gap-2 text-sm font-semibold text-[#f1f5f9]/60 mb-3">
                  <Layout className="w-4 h-4 text-[#06b6d4]" />
                  Simulation Mode
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowModeDropdown(!showModeDropdown)}
                    className="w-full flex items-center justify-between px-5 py-4 bg-[#0a0e17] border border-[#1e293b] rounded-xl hover:border-[#06b6d4]/50 transition-all text-left"
                  >
                    <div className="flex items-center gap-3">
                      {(() => {
                        const selectedMode = modes.find(m => m.id === mode) || modes[0];
                        const Icon = selectedMode.icon;
                        return (
                          <>
                            <Icon className="w-5 h-5 text-[#06b6d4]" />
                            <span className="font-medium text-[#f1f5f9]">{selectedMode.name}</span>
                          </>
                        );
                      })()}
                    </div>
                    <ChevronDown className={`w-5 h-5 text-[#f1f5f9]/30 transition-transform ${showModeDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {showModeDropdown && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-3 bg-[#111827] rounded-xl shadow-2xl border border-[#1e293b] overflow-hidden z-50 max-h-96 overflow-y-auto"
                      >
                        {modes.map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => {
                              setMode(m.id);
                              setShowModeDropdown(false);
                            }}
                            className={`w-full flex items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-[#06b6d4]/5 ${
                              mode === m.id ? 'bg-[#06b6d4]/10' : ''
                            }`}
                          >
                            <m.icon className={`w-5 h-5 mt-0.5 ${mode === m.id ? 'text-[#06b6d4]' : 'text-[#f1f5f9]/30'}`} />
                            <div>
                              <div className={`text-sm font-bold ${mode === m.id ? 'text-[#06b6d4]' : 'text-[#f1f5f9]'}`}>
                                {m.name}
                              </div>
                              <div className="text-xs text-[#f1f5f9]/40 mt-1">
                                {m.desc}
                              </div>
                            </div>
                            {mode === m.id && <Check className="w-5 h-5 text-[#06b6d4] ml-auto mt-0.5" />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="lg:col-span-2 flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={!url || isLoading}
                  className="w-full py-4 bg-[#06b6d4] hover:bg-[#0891b2] text-[#0a0e17] font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#06b6d4]/20"
                >
                  {isLoading ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Test Layout</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                {previewUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewUrl(null);
                      setUrl('');
                      setIsLoading(false);
                    }}
                    className="text-sm font-medium text-[#f1f5f9]/40 hover:text-[#f1f5f9] transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4 border-t border-[#1e293b]">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#f1f5f9]/40 uppercase tracking-widest">Quick test:</span>
                <div className="flex flex-wrap gap-2">
                  {presets.map((p) => (
                    <button
                      key={p.url}
                      type="button"
                      onClick={() => handlePresetSelect(p.url)}
                      className="px-3 py-1.5 bg-[#0a0e17] border border-[#1e293b] rounded-full text-xs font-medium text-[#f1f5f9]/60 hover:border-[#06b6d4] hover:text-[#06b6d4] transition-all"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 min-w-[200px]">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#f1f5f9]/40">
                  <span>Usage Counter</span>
                  <span>2 of 3 free checks</span>
                </div>
                <div className="h-1.5 w-full bg-[#0a0e17] rounded-full overflow-hidden">
                  <div className="h-full bg-[#06b6d4] w-[66%]" />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-[#f1f5f9]/30">
              <AlertCircle className="w-3 h-3" />
              <span>Some websites (e.g., Google, Facebook) block proxying via security headers.</span>
            </div>
          </form>
        </motion.div>

        {/* Preview Area */}
        <div className={`bg-[#0a0e17] border border-[#1e293b] overflow-hidden flex flex-col transition-all duration-500 relative ${
          isMaximized 
            ? 'fixed inset-0 z-[60] rounded-none' 
            : 'h-[700px] rounded-2xl shadow-2xl'
        }`}>
          {!previewUrl && !isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
              <div className="w-24 h-24 bg-[#111827] rounded-full flex items-center justify-center mb-6 border border-[#1e293b]">
                <Search className="w-10 h-10 text-[#06b6d4]/40" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Enter a URL above to start testing</h3>
              <p className="text-[#f1f5f9]/40 max-w-md mx-auto leading-relaxed">
                We'll simulate how your website handles different languages and show exactly where the layout breaks.
              </p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col relative">
              <AnimatePresence>
                {isLoading && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 bg-[#0a0e17] flex flex-col items-center justify-center p-12"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#111827]">
                      <motion.div 
                        className="h-full bg-[#06b6d4]"
                        initial={{ width: "0%" }}
                        animate={{ width: `${(loadingStep + 1) * 20}%` }}
                        transition={{ duration: 1.5 }}
                      />
                    </div>
                    
                    <div className="w-full max-w-md space-y-8">
                      <div className="space-y-4">
                        {loadingSteps.map((step, idx) => (
                          <div key={idx} className={`flex items-center gap-4 transition-all duration-500 ${idx > loadingStep ? 'opacity-20' : 'opacity-100'}`}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                              idx < loadingStep 
                                ? 'bg-[#22c55e] text-[#0a0e17]' 
                                : idx === loadingStep 
                                  ? 'bg-[#06b6d4] text-[#0a0e17]' 
                                  : 'bg-[#1e293b] text-[#f1f5f9]/20'
                            }`}>
                              {idx < loadingStep ? <Check className="w-4 h-4" /> : <span className="text-[10px] font-bold">{idx + 1}</span>}
                            </div>
                            <span className={`text-sm font-medium ${idx === loadingStep ? 'text-[#06b6d4]' : 'text-[#f1f5f9]/60'}`}>
                              {idx < loadingStep ? step.replace('⏳', '✅') : step}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-8 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#111827] rounded-full border border-[#1e293b] text-xs font-medium text-[#f1f5f9]/40">
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          Usually takes 5-15 seconds
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Browser Mockup Frame (only show when not loading or if we want it as a background) */}
              <div className="bg-[#111827] border-b border-[#1e293b] px-4 py-3 flex items-center justify-between shrink-0 z-10">
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#22c55e]"></div>
                  </div>
                  <div className="flex-1 max-w-2xl px-4 py-1.5 bg-[#0a0e17] rounded-lg text-xs text-[#f1f5f9]/40 font-mono border border-[#1e293b] truncate flex items-center gap-2">
                    <Globe className="w-3 h-3" />
                    {previewUrl ? decodeURIComponent(previewUrl.split('url=')[1].split('&')[0]) : 'Loading...'}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="px-3 py-1 bg-[#06b6d4]/10 border border-[#06b6d4]/20 rounded text-[10px] font-black text-[#06b6d4] uppercase tracking-widest">
                    {modes.find(m => m.id === mode)?.name} PREVIEW
                  </div>
                  <button
                    onClick={() => setIsMaximized(!isMaximized)}
                    className="p-1.5 hover:bg-[#1e293b] rounded-md text-[#f1f5f9]/40 transition-colors"
                    title={isMaximized ? "Exit Full Screen" : "Full Screen"}
                  >
                    {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex-1 relative w-full h-full bg-white">
                <iframe
                  ref={iframeRef}
                  src={previewUrl!}
                  className="w-full h-full border-0 block"
                  onLoad={handleIframeLoad}
                  title="Preview"
                  sandbox="allow-same-origin allow-scripts allow-forms"
                />
              </div>
            </div>
          )}
        </div>

        {/* Results Action Bar */}
        <AnimatePresence>
          {previewUrl && !isLoading && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-[#111827] border border-[#1e293b] rounded-2xl shadow-xl"
            >
              <div className="flex flex-wrap items-center gap-3">
                <button 
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-[#06b6d4]/10 hover:bg-[#06b6d4]/20 text-[#06b6d4] text-sm font-bold rounded-lg transition-all flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Re-run Test
                </button>
                <button 
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-[#1e293b] hover:bg-[#2d3748] text-[#f1f5f9] text-sm font-bold rounded-lg transition-all flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Copy Share Link
                </button>
                <div className="relative group">
                  <button 
                    disabled
                    className="px-4 py-2 bg-[#1e293b]/50 text-[#f1f5f9]/20 text-sm font-bold rounded-lg cursor-not-allowed flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#f1f5f9] text-[#0a0e17] text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    Coming soon on Starter plan
                  </div>
                </div>
              </div>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-sm font-bold text-[#06b6d4] hover:underline flex items-center gap-2"
              >
                Try Another Language
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Issue Detection Panel */}
        <AnimatePresence>
          {previewUrl && !isLoading && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h2 className="text-2xl font-bold">Layout Issues Detected</h2>
                <div className="flex items-center gap-4 bg-[#111827] px-4 py-2 rounded-full border border-[#1e293b]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
                    <span className="text-xs font-bold text-[#f1f5f9]/60">3 Critical</span>
                  </div>
                  <div className="w-px h-3 bg-[#1e293b]" />
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                    <span className="text-xs font-bold text-[#f1f5f9]/60">4 Warnings</span>
                  </div>
                  <div className="w-px h-3 bg-[#1e293b]" />
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#06b6d4]" />
                    <span className="text-xs font-bold text-[#f1f5f9]/60">2 Info</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {mockIssues.map((issue, idx) => (
                  <motion.div
                    key={issue.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`bg-[#111827] border ${expandedIssue === issue.id ? 'border-[#06b6d4]/50' : 'border-[#1e293b]'} rounded-xl overflow-hidden transition-all`}
                  >
                    <button 
                      onClick={() => setExpandedIssue(expandedIssue === issue.id ? null : issue.id)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#1e293b]/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                          issue.severity === 'critical' ? 'bg-[#ef4444]' : 
                          issue.severity === 'warning' ? 'bg-[#f59e0b]' : 'bg-[#06b6d4]'
                        }`} />
                        <div>
                          <h4 className="font-bold text-[#f1f5f9]">{issue.title}</h4>
                          <code className="text-[10px] text-[#f1f5f9]/30 bg-[#0a0e17] px-1.5 py-0.5 rounded mt-1 inline-block">
                            {issue.element}
                          </code>
                        </div>
                      </div>
                      {expandedIssue === issue.id ? <ChevronDown className="w-5 h-5 text-[#06b6d4] rotate-180 transition-transform" /> : <ChevronDown className="w-5 h-5 text-[#f1f5f9]/20 transition-transform" />}
                    </button>
                    
                    <AnimatePresence>
                      {expandedIssue === issue.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 pb-6 border-t border-[#1e293b]/50 pt-4"
                        >
                          <div className="space-y-6">
                            <div>
                              <div className="text-[10px] font-black uppercase tracking-widest text-[#f1f5f9]/30 mb-2">Description</div>
                              <p className="text-sm text-[#f1f5f9]/60 leading-relaxed">{issue.description}</p>
                            </div>
                            <div className="bg-[#0a0e17] p-4 rounded-lg border border-[#1e293b]">
                              <div className="text-[10px] font-black uppercase tracking-widest text-[#06b6d4] mb-2">Suggested Fix</div>
                              <p className="text-sm font-mono text-[#f1f5f9]/80">{issue.fix}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-[#06b6d4] text-[#0a0e17] font-bold rounded-full shadow-2xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            Link copied!
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-12 border-t border-[#1e293b] mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-[#06b6d4] p-1 rounded-md">
              <Globe className="w-4 h-4 text-[#0a0e17]" />
            </div>
            <span className="font-bold text-[#f1f5f9]">i18nCheck.dev</span>
          </div>
          <p className="text-sm text-[#f1f5f9]/30">
            &copy; {new Date().getFullYear()} i18nCheck.dev. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
