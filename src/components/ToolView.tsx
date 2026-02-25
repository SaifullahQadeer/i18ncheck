import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Globe, ArrowRight, RefreshCw, AlertCircle, Check, Layout, Type, Languages, Maximize2, Minimize2, Flame, ChevronDown, Download, Share2, Info, AlertTriangle, XCircle, SplitSquareHorizontal, Columns, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface ToolViewProps {
  initialUrl?: string;
  onBack: () => void;
}

export default function ToolView({ initialUrl, onBack }: ToolViewProps) {
  const [url, setUrl] = useState(initialUrl || '');
  const [mode, setMode] = useState('pseudo');
  const [loadingState, setLoadingState] = useState<'idle' | 'launching' | 'loading' | 'simulating' | 'detecting' | 'generating'>('idle');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [viewMode, setViewMode] = useState<'single' | 'side-by-side'>('single');
  const [usageCount, setUsageCount] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const originalIframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Load usage count from localStorage
    const stored = localStorage.getItem('i18nCheck_usage');
    const date = localStorage.getItem('i18nCheck_date');
    const today = new Date().toDateString();

    if (date !== today) {
      setUsageCount(0);
      localStorage.setItem('i18nCheck_date', today);
      localStorage.setItem('i18nCheck_usage', '0');
    } else if (stored) {
      setUsageCount(parseInt(stored, 10));
    }

    if (initialUrl) {
      startTest(initialUrl);
    }
  }, []);

  const incrementUsage = () => {
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem('i18nCheck_usage', newCount.toString());
  };

  const startTest = async (targetUrl: string) => {
    if (!targetUrl) return;
    
    // Basic validation
    let formattedUrl = targetUrl;
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    if (usageCount >= 3) {
      alert("Daily limit reached! (Mock: Sign up to continue)");
      return;
    }

    setLoadingState('launching');
    
    // Simulate loading steps
    setTimeout(() => setLoadingState('loading'), 1500);
    setTimeout(() => setLoadingState('simulating'), 3500);
    setTimeout(() => setLoadingState('detecting'), 5500);
    setTimeout(() => {
      setLoadingState('generating');
      setPreviewUrl(`/api/preview?url=${encodeURIComponent(formattedUrl)}&mode=${mode}&t=${Date.now()}`);
      setOriginalUrl(`/api/preview?url=${encodeURIComponent(formattedUrl)}&mode=original&t=${Date.now()}`);
      incrementUsage();
    }, 7500);
  };

  const handleIframeLoad = () => {
    setLoadingState('idle');
  };

  const handleDownloadReport = async () => {
    const element = document.getElementById('report-content');
    if (!element) return;
    
    try {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('i18n-report.pdf');
    } catch (err) {
      console.error("PDF generation failed", err);
      alert("Could not generate PDF. Please try again.");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`https://i18ncheck.dev/share/mock-id`);
    alert("Link copied to clipboard!");
  };

  const presets = [
    { name: 'Wikipedia (i18n)', url: 'https://en.wikipedia.org/wiki/Internationalization_and_localization' },
    { name: 'Hacker News', url: 'https://news.ycombinator.com' },
    { name: 'BBC News', url: 'https://www.bbc.com' },
    { name: 'Example.com', url: 'https://example.com' },
  ];

  const modes = [
    { id: 'pseudo', name: 'Pseudo-loc (Standard)', icon: Type, desc: 'Expands text & replaces chars' },
    { id: 'german', name: 'German Expansion', icon: Layout, desc: 'Adds ~30% text length' },
    { id: 'finnish', name: 'Finnish (Extreme)', icon: Layout, desc: 'Adds ~45% length + compounds' },
    { id: 'arabic', name: 'Arabic (RTL)', icon: Globe, desc: 'Flips layout to Right-to-Left' },
    { id: 'japanese', name: 'Japanese (CJK)', icon: Languages, desc: 'Vertical height & wrapping' },
    { id: 'russian', name: 'Russian (Cyrillic)', icon: Type, desc: 'Cyrillic chars & widths' },
    { id: 'stress', name: 'Stress Test (Max)', icon: Flame, desc: '+100% expansion' },
  ];

  const mockIssues = [
    { severity: 'critical', title: 'Button text overflows', element: '.btn-primary', desc: 'Text extends beyond container boundaries.' },
    { severity: 'critical', title: 'Nav wrapping', element: '.nav-menu', desc: 'Navigation items wrap to a second line.' },
    { severity: 'warning', title: 'Truncated Heading', element: 'h2.title', desc: 'Heading text is cut off by overflow:hidden.' },
    { severity: 'info', title: 'Missing Lang Attribute', element: 'html', desc: 'The html element is missing a lang attribute.' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e17] text-[#f1f5f9] font-sans selection:bg-cyan-900 selection:text-cyan-100" id="report-content">
      {/* Header */}
      <header className="bg-[#111827] border-b border-[#1e293b] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
            <div className="bg-cyan-500/10 p-1.5 rounded-lg border border-cyan-500/20">
              <Globe className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="font-bold text-xl tracking-tight text-[#f1f5f9]">
              i18n<span className="text-cyan-400">Check</span>.dev
            </span>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-sm text-[#94a3b8] hidden sm:block">
               <span className="font-mono text-cyan-400">{usageCount}/3</span> free checks used
             </div>
             <button onClick={onBack} className="text-sm font-medium text-[#94a3b8] hover:text-white transition-colors">
               Back to Home
             </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Control Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111827] rounded-2xl shadow-lg border border-[#1e293b] p-6 mb-8"
        >
          <form onSubmit={(e) => { e.preventDefault(); startTest(url); }} className="flex flex-col lg:flex-row gap-6 items-start lg:items-end">
            <div className="flex-1 w-full">
              <label htmlFor="url" className="block text-sm font-medium text-[#94a3b8] mb-2">
                Website URL
              </label>
              <div className="relative group">
                <input
                  type="text"
                  id="url"
                  placeholder="example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 bg-[#0a0e17] border border-[#1e293b] rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none transition-all text-white placeholder:text-slate-700"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <button
                    type="button"
                    onClick={() => setShowPresets(!showPresets)}
                    className="p-1.5 text-[#64748b] hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>
                
                {showPresets && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-[#111827] rounded-xl shadow-xl border border-[#1e293b] overflow-hidden z-20">
                    <div className="px-4 py-2 bg-[#0a0e17] border-b border-[#1e293b] text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                      Quick Test Presets
                    </div>
                    {presets.map((preset) => (
                      <button
                        key={preset.url}
                        type="button"
                        onClick={() => { setUrl(preset.url); setShowPresets(false); }}
                        className="w-full text-left px-4 py-3 text-sm text-[#94a3b8] hover:bg-[#1e293b] hover:text-white transition-colors flex items-center justify-between group/item"
                      >
                        <span>{preset.name}</span>
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="w-full lg:w-72">
              <label className="block text-sm font-medium text-[#94a3b8] mb-2">
                Simulation Mode
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowModeDropdown(!showModeDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-[#0a0e17] border border-[#1e293b] rounded-xl hover:border-[#334155] transition-all text-left"
                >
                  <div className="flex items-center gap-2">
                    {(() => {
                      const selectedMode = modes.find(m => m.id === mode) || modes[0];
                      const Icon = selectedMode.icon;
                      return (
                        <>
                          <Icon className="w-4 h-4 text-cyan-400" />
                          <span className="font-medium text-[#f1f5f9]">{selectedMode.name}</span>
                        </>
                      );
                    })()}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-[#64748b] transition-transform ${showModeDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showModeDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#111827] rounded-xl shadow-xl border border-[#1e293b] overflow-hidden z-20 max-h-80 overflow-y-auto">
                    {modes.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setMode(m.id);
                          setShowModeDropdown(false);
                        }}
                        className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-[#1e293b] ${
                          mode === m.id ? 'bg-cyan-500/10' : ''
                        }`}
                      >
                        <m.icon className={`w-4 h-4 mt-0.5 ${mode === m.id ? 'text-cyan-400' : 'text-[#64748b]'}`} />
                        <div>
                          <div className={`text-sm font-medium ${mode === m.id ? 'text-white' : 'text-[#94a3b8]'}`}>
                            {m.name}
                          </div>
                          <div className="text-xs text-[#64748b] mt-0.5">
                            {m.desc}
                          </div>
                        </div>
                        {mode === m.id && <Check className="w-4 h-4 text-cyan-400 ml-auto mt-0.5" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              {previewUrl && loadingState === 'idle' && (
                <button
                  type="button"
                  onClick={() => {
                    setPreviewUrl(null);
                    setOriginalUrl(null);
                    setUrl('');
                  }}
                  className="px-6 py-3 bg-[#1e293b] hover:bg-[#334155] text-white font-medium rounded-xl transition-colors shadow-sm"
                >
                  Clear
                </button>
              )}
              <button
                type="submit"
                disabled={!url || loadingState !== 'idle'}
                className="flex-1 px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-900/20"
              >
                {loadingState !== 'idle' ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Test Layout</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Loading State Overlay */}
        <AnimatePresence>
          {loadingState !== 'idle' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0a0e17]/90 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <div className="text-center max-w-md w-full px-6">
                <div className="relative w-24 h-24 mx-auto mb-8">
                  <div className="absolute inset-0 rounded-full border-4 border-[#1e293b]"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-t-cyan-500 animate-spin"></div>
                  <Globe className="absolute inset-0 m-auto w-10 h-10 text-cyan-400 animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {loadingState === 'launching' && "Launching browser..."}
                  {loadingState === 'loading' && "Loading page..."}
                  {loadingState === 'simulating' && `Applying ${mode} simulation...`}
                  {loadingState === 'detecting' && "Detecting layout issues..."}
                  {loadingState === 'generating' && "Generating results..."}
                </h3>
                <p className="text-[#94a3b8] mb-6">This usually takes 5-15 seconds.</p>
                <div className="h-2 bg-[#1e293b] rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-cyan-500"
                    initial={{ width: "0%" }}
                    animate={{ 
                      width: loadingState === 'launching' ? "20%" :
                             loadingState === 'loading' ? "40%" :
                             loadingState === 'simulating' ? "60%" :
                             loadingState === 'detecting' ? "80%" : "100%"
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Area */}
        {previewUrl && loadingState === 'idle' && (
          <div className="space-y-8">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex bg-[#111827] rounded-lg p-1 border border-[#1e293b]">
                <button
                  onClick={() => setViewMode('single')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                    viewMode === 'single' ? 'bg-[#1e293b] text-white' : 'text-[#94a3b8] hover:text-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  Single View
                </button>
                <button
                  onClick={() => setViewMode('side-by-side')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                    viewMode === 'side-by-side' ? 'bg-[#1e293b] text-white' : 'text-[#94a3b8] hover:text-white'
                  }`}
                >
                  <Columns className="w-4 h-4" />
                  Side-by-Side
                </button>
              </div>

              <div className="flex gap-3">
                <button onClick={handleShare} className="px-4 py-2 bg-[#111827] hover:bg-[#1e293b] border border-[#1e293b] rounded-lg text-sm font-medium text-white flex items-center gap-2 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button onClick={handleDownloadReport} className="px-4 py-2 bg-[#111827] hover:bg-[#1e293b] border border-[#1e293b] rounded-lg text-sm font-medium text-white flex items-center gap-2 transition-colors">
                  <Download className="w-4 h-4" />
                  Download Report
                </button>
              </div>
            </div>

            {/* Preview Container */}
            <div className={`bg-[#0a0e17] border border-[#1e293b] overflow-hidden flex flex-col transition-all duration-300 ${
              isMaximized ? 'fixed inset-0 z-50 rounded-none' : 'relative h-[800px] rounded-2xl'
            }`}>
              <div className="bg-[#111827] border-b border-[#1e293b] px-4 py-2 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#334155]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#334155]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#334155]"></div>
                  </div>
                  <div className="ml-4 px-3 py-1 bg-[#0a0e17] rounded-md text-xs text-[#94a3b8] font-mono border border-[#1e293b] max-w-md truncate">
                    {url}
                  </div>
                </div>
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="p-1.5 hover:bg-[#1e293b] rounded-md text-[#94a3b8] transition-colors"
                >
                  {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex-1 relative w-full h-full flex">
                {viewMode === 'side-by-side' && originalUrl && (
                  <div className="w-1/2 h-full border-r border-[#1e293b] relative">
                    <div className="absolute top-2 left-2 z-10 bg-black/50 backdrop-blur text-white text-xs px-2 py-1 rounded">Original</div>
                    <iframe
                      ref={originalIframeRef}
                      src={originalUrl}
                      className="w-full h-full border-0 bg-white"
                      title="Original"
                      sandbox="allow-same-origin allow-scripts allow-forms"
                    />
                  </div>
                )}
                <div className={`${viewMode === 'side-by-side' ? 'w-1/2' : 'w-full'} h-full relative`}>
                   <div className="absolute top-2 left-2 z-10 bg-cyan-900/80 backdrop-blur text-cyan-100 text-xs px-2 py-1 rounded border border-cyan-500/30">
                     {modes.find(m => m.id === mode)?.name}
                   </div>
                  <iframe
                    ref={iframeRef}
                    src={previewUrl}
                    className="w-full h-full border-0 bg-white"
                    onLoad={handleIframeLoad}
                    title="Preview"
                    sandbox="allow-same-origin allow-scripts allow-forms"
                  />
                </div>
              </div>
            </div>

            {/* Issue Detection Panel */}
            <div className="bg-[#111827] rounded-2xl border border-[#1e293b] p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Detected Issues</h3>
                <div className="flex gap-3 text-sm">
                  <span className="flex items-center gap-1.5 text-red-400"><AlertCircle className="w-4 h-4" /> 2 Critical</span>
                  <span className="flex items-center gap-1.5 text-yellow-400"><AlertTriangle className="w-4 h-4" /> 1 Warning</span>
                  <span className="flex items-center gap-1.5 text-blue-400"><Info className="w-4 h-4" /> 1 Info</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {mockIssues.map((issue, i) => (
                  <div key={i} className="bg-[#0a0e17] border border-[#1e293b] rounded-xl p-4 flex gap-4 items-start">
                    <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border ${
                      issue.severity === 'critical' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                      issue.severity === 'warning' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/10 border-blue-500/20 text-blue-400'
                    }`}>
                      {issue.severity === 'critical' ? <XCircle className="w-4 h-4" /> :
                       issue.severity === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
                       <Info className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-white">{issue.title}</h4>
                        <code className="text-xs bg-[#1e293b] px-1.5 py-0.5 rounded text-[#94a3b8] font-mono">{issue.element}</code>
                      </div>
                      <p className="text-sm text-[#94a3b8] mb-2">{issue.desc}</p>
                      <div className="text-xs text-[#64748b] flex items-center gap-1">
                        <span className="font-semibold">Fix:</span> Add overflow: hidden; or use min-width.
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
