import { useState, useRef, type FormEvent } from 'react';
import { Globe, ArrowRight, RefreshCw, AlertCircle, Check, Layout, Type, Languages, Maximize2, Minimize2, Flame, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
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
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const presets = [
    { name: 'Wikipedia (i18n)', url: 'https://en.wikipedia.org/wiki/Internationalization_and_localization' },
    { name: 'Hacker News', url: 'https://news.ycombinator.com' },
    { name: 'BBC News', url: 'https://www.bbc.com' },
    { name: 'Example.com', url: 'https://example.com' },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!url) return;

    let targetUrl = url;
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }

    setIsLoading(true);
    // Add a timestamp to bust cache if needed, though usually not for this tool
    setPreviewUrl(`/api/preview?url=${encodeURIComponent(targetUrl)}&mode=${mode}&t=${Date.now()}`);
  };

  const handlePresetSelect = (presetUrl: string) => {
    setUrl(presetUrl);
    setShowPresets(false);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const modes = [
    { id: 'pseudo', name: 'Pseudo-loc (Standard)', icon: Type, desc: 'Expands text & replaces chars (Microsoft style)' },
    { id: 'german', name: 'German Expansion', icon: Layout, desc: 'Adds ~30% text length to test overflow' },
    { id: 'finnish', name: 'Finnish (Extreme)', icon: Layout, desc: 'Adds ~45% length + long compound words' },
    { id: 'arabic', name: 'Arabic (RTL)', icon: Globe, desc: 'Flips layout to Right-to-Left' },
    { id: 'japanese', name: 'Japanese (CJK)', icon: Languages, desc: 'Tests vertical height & line wrapping' },
    { id: 'russian', name: 'Russian (Cyrillic)', icon: Type, desc: 'Cyrillic chars & different word widths' },
    { id: 'stress', name: 'Stress Test (Max)', icon: Flame, desc: '+80-100% expansion, breaks everything' },
  ];

  if (showLanding) {
    return <LandingPage onStartTesting={() => setShowLanding(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-sm shadow-indigo-200">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">i18nCheck.dev</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Documentation</a>
            <a href="#" className="text-indigo-600 hover:text-indigo-700 transition-colors">Sign in</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Control Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8"
        >
          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6 items-start lg:items-end">
            <div className="flex-1 w-full">
              <label htmlFor="url" className="block text-sm font-medium text-slate-700 mb-2">
                Website URL
              </label>
              <div className="relative group">
                <input
                  type="text"
                  id="url"
                  placeholder="example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <button
                    type="button"
                    onClick={() => setShowPresets(!showPresets)}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Select a preset"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Presets Dropdown */}
                {showPresets && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Quick Test Presets
                    </div>
                    {presets.map((preset) => (
                      <button
                        key={preset.url}
                        type="button"
                        onClick={() => handlePresetSelect(preset.url)}
                        className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors flex items-center justify-between group/item"
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
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Simulation Mode
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowModeDropdown(!showModeDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all text-left"
                >
                  <div className="flex items-center gap-2">
                    {(() => {
                      const selectedMode = modes.find(m => m.id === mode) || modes[0];
                      const Icon = selectedMode.icon;
                      return (
                        <>
                          <Icon className="w-4 h-4 text-indigo-600" />
                          <span className="font-medium text-slate-700">{selectedMode.name}</span>
                        </>
                      );
                    })()}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showModeDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showModeDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200 max-h-80 overflow-y-auto">
                    {modes.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setMode(m.id);
                          setShowModeDropdown(false);
                        }}
                        className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50 ${
                          mode === m.id ? 'bg-indigo-50/50' : ''
                        }`}
                      >
                        <m.icon className={`w-4 h-4 mt-0.5 ${mode === m.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                        <div>
                          <div className={`text-sm font-medium ${mode === m.id ? 'text-indigo-900' : 'text-slate-700'}`}>
                            {m.name}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {m.desc}
                          </div>
                        </div>
                        {mode === m.id && <Check className="w-4 h-4 text-indigo-600 ml-auto mt-0.5" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              {previewUrl && (
                <button
                  type="button"
                  onClick={() => {
                    setPreviewUrl(null);
                    setUrl('');
                    setIsLoading(false);
                  }}
                  className="px-6 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-xl transition-colors shadow-sm"
                >
                  Clear
                </button>
              )}
              <button
                type="submit"
                disabled={!url || isLoading}
                className="flex-1 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-indigo-200"
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
          </form>
          
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <AlertCircle className="w-3 h-3" />
            <span>Note: Some websites (e.g., Google, Facebook) block proxying via security headers.</span>
          </div>
        </motion.div>

        {/* Preview Area */}
        <div className={`bg-slate-100 border border-slate-200 overflow-hidden flex flex-col transition-all duration-300 ${
          isMaximized 
            ? 'fixed inset-0 z-50 rounded-none' 
            : 'relative h-[800px] rounded-2xl'
        }`}>
          <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
              </div>
              <div className="ml-4 px-3 py-1 bg-slate-100 rounded-md text-xs text-slate-500 font-mono border border-slate-200 max-w-md truncate">
                {previewUrl ? decodeURIComponent(previewUrl.split('url=')[1].split('&')[0]) : 'Ready to test'}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xs font-medium text-slate-400 uppercase tracking-wider hidden sm:block">
                {mode} Preview
              </div>
              <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                title={isMaximized ? "Exit Full Screen" : "Full Screen"}
              >
                {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex-1 relative w-full h-full">
            {!previewUrl ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                <Layout className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-lg font-medium text-slate-500">Enter a URL to start stress-testing</p>
                <p className="text-sm mt-2">We'll apply pseudo-localization to reveal layout bugs.</p>
              </div>
            ) : (
              <>
                {isLoading && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
                      <p className="text-sm font-medium text-indigo-600">Generating preview...</p>
                    </div>
                  </div>
                )}
                <iframe
                  ref={iframeRef}
                  src={previewUrl}
                  className="w-full h-full border-0 bg-white block"
                  onLoad={handleIframeLoad}
                  title="Preview"
                  sandbox="allow-same-origin allow-scripts allow-forms"
                />
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 p-1 rounded-md">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900">i18nCheck.dev</span>
          </div>
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} i18nCheck.dev. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
