import { useState, useRef, useEffect, type FormEvent, type ReactNode } from 'react';
import { 
  Globe, ArrowRight, RefreshCw, AlertCircle, Check, Layout, Type, Languages, 
  Maximize2, Minimize2, Flame, ChevronDown, ChevronLeft, Search, Copy, 
  Download, Share2, Info, AlertTriangle, XCircle, CheckCircle2, ExternalLink,
  Smartphone, Monitor, Tablet, MoreHorizontal, Home, History, Settings, Clock, Menu, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

interface CheckResult {
  id: string;
  url: string;
  simulation: string;
  timestamp: string;
  issues: { critical: number; warning: number; info: number };
  status: 'issues_found' | 'clean';
}

export default function Dashboard() {
  const [url, setUrl] = useState('');
  const [mode, setMode] = useState('german');
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [expandedIssue, setExpandedIssue] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [recentChecks, setRecentChecks] = useState<CheckResult[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const location = useLocation();

  const loadingSteps = [
    "Launching browser...",
    "Loading page...",
    "Applying simulation...",
    "Detecting layout issues...",
    "Generating results..."
  ];

  useEffect(() => {
    const saved = localStorage.getItem('i18n_checks');
    if (saved) {
      setRecentChecks(JSON.parse(saved));
    }
  }, []);

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
    
    // Save to recent checks
    const newCheck: CheckResult = {
      id: `chk_${Math.random().toString(36).substring(7)}`,
      url: targetUrl,
      simulation: mode,
      timestamp: new Date().toISOString(),
      issues: { critical: 3, warning: 4, info: 2 },
      status: 'issues_found'
    };

    const updated = [newCheck, ...recentChecks].slice(0, 20);
    setRecentChecks(updated);
    localStorage.setItem('i18n_checks', JSON.stringify(updated));
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

  const handleViewResults = (check: CheckResult) => {
    setUrl(check.url);
    setMode(check.simulation);
    setIsLoading(true);
    setPreviewUrl(`/api/preview?url=${encodeURIComponent(check.url)}&mode=${check.simulation}&t=${Date.now()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const NavLink = ({ to, icon: Icon, children, active }: { to: string, icon: any, children: ReactNode, active?: boolean }) => (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active 
          ? 'bg-[#06b6d4] text-[#0a0e17] font-bold shadow-lg shadow-[#06b6d4]/20' 
          : 'text-[#f1f5f9]/60 hover:text-[#f1f5f9] hover:bg-[#1e293b]'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{children}</span>
    </Link>
  );

  return (
    <div className="min-h-screen bg-[#0a0e17] text-[#f1f5f9] flex">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0f1219] border-b border-[#1e293b] flex items-center justify-between px-4 z-[70]">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-[#06b6d4] p-1 rounded-lg">
            <Globe className="w-5 h-5 text-[#0a0e17]" />
          </div>
          <span className="font-bold text-lg">i18nCheck.dev</span>
        </Link>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-[#f1f5f9]/60">
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 bottom-0 w-[280px] bg-[#0f1219] border-r border-[#1e293b] flex flex-col z-[80] transition-transform duration-300 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="bg-[#06b6d4] p-1.5 rounded-lg shadow-lg shadow-[#06b6d4]/20">
              <Globe className="w-6 h-6 text-[#0a0e17]" />
            </div>
            <span className="font-bold text-xl tracking-tight">i18nCheck.dev</span>
          </Link>

          <nav className="space-y-2">
            <NavLink to="/app" icon={Home} active={location.pathname === '/app'}>Dashboard</NavLink>
            <NavLink to="/app" icon={Search}>New Check</NavLink>
            <NavLink to="/app" icon={History}>Check History</NavLink>
            <NavLink to="/app" icon={Settings}>Settings</NavLink>
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-[#1e293b]">
          <div className="bg-[#111827] rounded-2xl p-4 border border-[#1e293b]">
            <div className="flex items-center justify-between mb-3">
              <span className="px-2 py-0.5 bg-[#06b6d4]/10 text-[#06b6d4] text-[10px] font-black uppercase rounded">Free Plan</span>
              <button className="text-[10px] font-bold text-[#06b6d4] hover:underline">Upgrade →</button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#f1f5f9]/40">
                <span>Usage</span>
                <span>2 of 3 checks</span>
              </div>
              <div className="h-1.5 w-full bg-[#0a0e17] rounded-full overflow-hidden">
                <div className="h-full bg-[#06b6d4] w-[66%]" />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-[280px] min-h-screen pt-20 md:pt-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* New Check Section */}
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
              </div>
            </form>
          </motion.div>

          {/* Preview Area */}
          <AnimatePresence>
            {(previewUrl || isLoading) && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`bg-[#0a0e17] border border-[#1e293b] overflow-hidden flex flex-col transition-all duration-500 relative mb-12 ${
                  isMaximized 
                    ? 'fixed inset-0 z-[100] rounded-none' 
                    : 'h-[700px] rounded-2xl shadow-2xl'
                }`}
              >
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
              </motion.div>
            )}
          </AnimatePresence>

          {/* Issues Panel */}
          <AnimatePresence>
            {previewUrl && !isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
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
                    <div
                      key={issue.id}
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
                        <ChevronDown className={`w-5 h-5 text-[#f1f5f9]/20 transition-transform ${expandedIssue === issue.id ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {expandedIssue === issue.id && (
                        <div className="px-6 pb-6 border-t border-[#1e293b]/50 pt-4">
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
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recent Checks Section */}
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-8">
              <Clock className="w-6 h-6 text-[#06b6d4]" />
              <h2 className="text-2xl font-bold">Recent Checks</h2>
            </div>

            {recentChecks.length === 0 ? (
              <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-12 text-center">
                <div className="w-16 h-16 bg-[#0a0e17] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#1e293b]">
                  <History className="w-8 h-8 text-[#f1f5f9]/20" />
                </div>
                <h3 className="text-lg font-bold mb-2">No checks yet</h3>
                <p className="text-[#f1f5f9]/40 max-w-sm mx-auto">
                  Enter a URL above to run your first i18n layout test.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentChecks.map((check) => (
                  <motion.div 
                    key={check.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#111827] border border-[#1e293b] rounded-2xl p-6 hover:border-[#06b6d4]/30 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3 truncate">
                        <div className="w-10 h-10 bg-[#0a0e17] rounded-lg flex items-center justify-center border border-[#1e293b] shrink-0">
                          <img 
                            src={`https://www.google.com/s2/favicons?domain=${check.url}&sz=64`} 
                            alt="favicon" 
                            className="w-6 h-6"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="truncate">
                          <h4 className="font-bold text-[#f1f5f9] truncate">{check.url}</h4>
                          <span className="text-[10px] text-[#f1f5f9]/40 uppercase font-bold tracking-widest">
                            {new Date(check.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${check.status === 'issues_found' ? 'bg-[#ef4444]' : 'bg-[#22c55e]'}`} />
                    </div>

                    <div className="flex items-center gap-2 mb-6">
                      <span className="px-2 py-0.5 bg-[#06b6d4]/10 text-[#06b6d4] text-[10px] font-black uppercase rounded">
                        {check.simulation}
                      </span>
                      <div className="flex items-center gap-3 ml-auto">
                        <span className="text-[10px] flex items-center gap-1">🔴 {check.issues.critical}</span>
                        <span className="text-[10px] flex items-center gap-1">🟡 {check.issues.warning}</span>
                        <span className="text-[10px] flex items-center gap-1">🟢 {check.issues.info}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleViewResults(check)}
                      className="w-full py-3 bg-[#1e293b] hover:bg-[#06b6d4] hover:text-[#0a0e17] text-[#f1f5f9] text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      View Results <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
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
    </div>
  );
}
