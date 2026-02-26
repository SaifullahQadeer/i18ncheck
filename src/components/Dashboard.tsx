import { useState, useRef, useEffect, useMemo, type FormEvent, type ReactNode, type MouseEvent } from 'react';
import {
  Globe, ArrowRight, RefreshCw, AlertCircle, Check, Layout, Type, Languages,
  Maximize2, Minimize2, Flame, ChevronDown, ChevronLeft, Search, Copy,
  Download, Share2, Info, AlertTriangle, XCircle, CheckCircle2, ExternalLink,
  Smartphone, Monitor, Tablet, MoreHorizontal, Home, History, Settings, Clock,
  Menu, X, Trash2, Plus, BarChart3, ShieldAlert, TrendingUp, Zap, Target, ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';

// ─── Types ──────────────────────────────────────────────────────────────────

interface CheckResult {
  id: string;
  url: string;
  simulation: string;
  timestamp: string;
  issues: { critical: number; warning: number; info: number };
  status: 'issues_found' | 'clean';
}

// ─── Constants ──────────────────────────────────────────────────────────────

const MAX_FREE_CHECKS = 5;

const CHART_COLORS = {
  cyan: '#06b6d4',
  red: '#ef4444',
  amber: '#f59e0b',
  green: '#22c55e',
  purple: '#a78bfa',
  pink: '#f472b6',
  orange: '#fb923c',
};

const modes = [
  { id: 'german', name: 'German Expansion', icon: Layout, desc: 'Adds ~35% text length' },
  { id: 'finnish', name: 'Finnish Extreme', icon: Layout, desc: 'Adds ~45% + long compound words' },
  { id: 'arabic', name: 'Arabic RTL', icon: Globe, desc: 'Flips layout right-to-left' },
  { id: 'japanese', name: 'Japanese CJK', icon: Languages, desc: 'Full-width character test' },
  { id: 'russian', name: 'Russian Cyrillic', icon: Type, desc: 'Cyrillic script + expansion' },
  { id: 'stress', name: 'Stress Test', icon: Flame, desc: 'Maximum 80-100% expansion' },
];

const presets = [
  { name: 'stripe.com', url: 'https://stripe.com' },
  { name: 'github.com', url: 'https://github.com' },
  { name: 'bbc.com', url: 'https://www.bbc.com' },
  { name: 'amazon.com', url: 'https://amazon.com' },
  { name: 'wikipedia.org', url: 'https://en.wikipedia.org' },
];

const mockIssues = [
  {
    id: 1, severity: 'critical',
    title: "Navigation menu wraps to second line", element: ".main-nav ul",
    description: "Navigation items exceed container width when text is expanded by 35%. Menu items wrap to a second row, breaking the header layout.",
    fix: "Use a responsive hamburger menu for overflow, or reduce the number of visible nav items. Consider CSS flex-wrap with overflow handling."
  },
  {
    id: 2, severity: 'critical',
    title: "CTA button text overflows", element: ".hero .btn-primary",
    description: "The primary call-to-action button text extends 47px beyond the button boundary when expanded.",
    fix: "Add min-width to the button, use padding instead of fixed width, or add text-overflow: ellipsis as a fallback."
  },
  {
    id: 3, severity: 'critical',
    title: "Card content overlaps adjacent cards", element: ".feature-card",
    description: "Feature card text content overflows its container and overlaps with the neighboring card in the grid.",
    fix: "Use overflow: hidden on the card container and add text-overflow: ellipsis to headings. Consider min-height instead of fixed height."
  },
  {
    id: 4, severity: 'warning',
    title: "Heading text truncated", element: ".pricing-card h3",
    description: "Pricing card heading is cut off by overflow:hidden. Users cannot see the full heading text.",
    fix: "Increase card heading area height or use CSS line-clamp: 2 to show two lines with ellipsis."
  },
  {
    id: 5, severity: 'warning',
    title: "Form labels misaligned with inputs", element: ".form-group label",
    description: "Form labels wrap to two lines when text is expanded, causing vertical misalignment with their input fields.",
    fix: "Use a vertical form layout (labels above inputs) instead of horizontal, or use flexible grid with min-width on labels."
  },
  {
    id: 6, severity: 'warning',
    title: "Footer links stack vertically", element: "footer .links",
    description: "Footer navigation links wrap and stack when text length increases, making the footer significantly taller.",
    fix: "Use flex-wrap with controlled spacing, or group footer links into columns for better overflow handling."
  },
  {
    id: 7, severity: 'warning',
    title: "Tooltip text exceeds tooltip container", element: ".tooltip-content",
    description: "Tooltip text overflows the tooltip box when expanded. The tooltip becomes unreadable.",
    fix: "Set max-width on tooltips and allow text wrapping with word-break: break-word."
  },
  {
    id: 8, severity: 'info',
    title: "CSS logical properties not used", element: "Multiple elements",
    description: "The site uses margin-left and padding-right instead of margin-inline-start and padding-inline-end. Logical properties auto-adapt for RTL layouts.",
    fix: "Replace directional CSS properties with logical equivalents for better RTL support."
  },
  {
    id: 9, severity: 'info',
    title: "Missing lang attribute on HTML element", element: "html",
    description: "The <html> tag does not have a lang attribute. This affects accessibility and helps browsers choose correct fonts for different scripts.",
    fix: "Add lang='en' to the opening <html> tag. Change dynamically when serving translated pages."
  }
];

const loadingSteps = [
  "Launching browser...",
  "Loading page...",
  "Applying simulation...",
  "Detecting layout issues...",
  "Generating results..."
];

// ─── Custom Tooltip for Charts ──────────────────────────────────────────────

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1e293b] border border-[#334155] rounded-lg px-3 py-2 shadow-xl">
      <p className="text-xs font-medium text-[#f1f5f9]/60 mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-sm font-bold" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

// ─── Stat Card Component ────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, subtext, color, trend }: {
  icon: any; label: string; value: string | number; subtext?: string;
  color: string; trend?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#111827] rounded-2xl border border-[#1e293b] p-6 hover:border-[#1e293b]/80 transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center`} style={{ backgroundColor: `${color}15` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-xs font-bold text-[#22c55e] bg-[#22c55e]/10 px-2 py-1 rounded-full">
            <ArrowUpRight className="w-3 h-3" />
            {trend}
          </span>
        )}
      </div>
      <div className="text-3xl font-bold text-[#f1f5f9] mb-1">{value}</div>
      <div className="text-xs font-medium text-[#f1f5f9]/40 uppercase tracking-wider">{label}</div>
      {subtext && <div className="text-xs text-[#f1f5f9]/30 mt-1">{subtext}</div>}
    </motion.div>
  );
}

// ─── Main Dashboard Component ───────────────────────────────────────────────

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
  const [usageCount, setUsageCount] = useState(() => {
    const saved = localStorage.getItem('i18n_usage');
    if (saved) {
      const { count, date } = JSON.parse(saved);
      const today = new Date().toDateString();
      if (date === today) return count;
    }
    return 0;
  });
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // ─── Derived Analytics ──────────────────────────────────────────────

  const analytics = useMemo(() => {
    const totalChecks = recentChecks.length;
    const issuesFound = recentChecks.filter(c => c.status === 'issues_found').length;
    const cleanPasses = recentChecks.filter(c => c.status === 'clean').length;
    const totalCritical = recentChecks.reduce((sum, c) => sum + c.issues.critical, 0);
    const totalWarnings = recentChecks.reduce((sum, c) => sum + c.issues.warning, 0);
    const totalInfo = recentChecks.reduce((sum, c) => sum + c.issues.info, 0);

    // Checks by mode
    const byMode: Record<string, number> = {};
    recentChecks.forEach(c => {
      byMode[c.simulation] = (byMode[c.simulation] || 0) + 1;
    });
    const modeData = Object.entries(byMode).map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    // Checks over last 7 days
    const last7 = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
      const dayEnd = dayStart + 86400000;
      const dayChecks = recentChecks.filter(c => {
        const t = new Date(c.timestamp).getTime();
        return t >= dayStart && t < dayEnd;
      });
      last7.push({
        date: dateStr,
        checks: dayChecks.length,
        issues: dayChecks.reduce((s, c) => s + c.issues.critical + c.issues.warning, 0),
      });
    }

    // Severity breakdown
    const severityData = [
      { name: 'Critical', value: totalCritical, color: CHART_COLORS.red },
      { name: 'Warnings', value: totalWarnings, color: CHART_COLORS.amber },
      { name: 'Info', value: totalInfo, color: CHART_COLORS.cyan },
    ];

    // Most tested mode
    const topMode = modeData[0]?.name || 'None';

    return { totalChecks, issuesFound, cleanPasses, totalCritical, totalWarnings, totalInfo, modeData, last7, severityData, topMode };
  }, [recentChecks]);

  // ─── Effects ────────────────────────────────────────────────────────

  useEffect(() => {
    if (isLoading) {
      document.title = `i18nCheck — Checking ${url || 'website'}...`;
    } else if (previewUrl) {
      document.title = `i18nCheck — Results for ${url || 'website'}`;
    } else if (location.pathname === '/app/new') {
      document.title = 'i18nCheck — New Check';
    } else {
      document.title = 'i18nCheck — Dashboard';
    }
  }, [isLoading, previewUrl, url, location.pathname]);

  useEffect(() => {
    const saved = localStorage.getItem('i18n_checks');
    if (saved) {
      setRecentChecks(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('i18n_usage', JSON.stringify({
      count: usageCount,
      date: new Date().toDateString()
    }));
  }, [usageCount]);

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

  // ─── Handlers ───────────────────────────────────────────────────────

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!url) return;

    let targetUrl = url;
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }

    setIsLoading(true);
    setPreviewUrl(`/api/preview?url=${encodeURIComponent(targetUrl)}&mode=${mode}&t=${Date.now()}`);
    setUsageCount(prev => Math.min(MAX_FREE_CHECKS, prev + 1));

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

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://i18ncheck.dev/share/${Math.random().toString(36).substring(7)}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDeleteCheck = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    const updated = recentChecks.filter(c => c.id !== id);
    setRecentChecks(updated);
    localStorage.setItem('i18n_checks', JSON.stringify(updated));
  };

  const handleViewResults = (check: CheckResult) => {
    navigate('/app/new');
    setUrl(check.url);
    setMode(check.simulation);
    setTimeout(() => {
      setIsLoading(true);
      setPreviewUrl(`/api/preview?url=${encodeURIComponent(check.url)}&mode=${check.simulation}&t=${Date.now()}`);
    }, 100);
  };

  // ─── Nav Helper ─────────────────────────────────────────────────────

  const NavLink = ({ to, icon: Icon, children, active, badge }: {
    to: string; icon: any; children: ReactNode; active?: boolean; badge?: number;
  }) => (
    <Link
      to={to}
      onClick={() => setIsSidebarOpen(false)}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active
          ? 'bg-[#06b6d4]/10 text-[#06b6d4] font-bold border border-[#06b6d4]/20'
          : 'text-[#f1f5f9]/50 hover:text-[#f1f5f9] hover:bg-[#1e293b]/50'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="flex-1">{children}</span>
      {badge !== undefined && badge > 0 && (
        <span className="px-2 py-0.5 bg-[#06b6d4]/10 text-[#06b6d4] text-[10px] font-bold rounded-full">{badge}</span>
      )}
    </Link>
  );

  // ─── Determine Active View ──────────────────────────────────────────

  const currentView = (() => {
    if (location.pathname === '/app/settings') return 'settings';
    if (location.pathname === '/app/history') return 'history';
    if (location.pathname === '/app/new') return 'new-check';
    return 'home';
  })();

  // ─── Render ─────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#0a0e17] text-[#f1f5f9] flex">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0f1219]/95 backdrop-blur-xl border-b border-[#1e293b] flex items-center justify-between px-4 z-[70]">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-[#06b6d4] p-1.5 rounded-lg">
            <Globe className="w-4 h-4 text-[#0a0e17]" />
          </div>
          <span className="font-bold text-lg">i18nCheck</span>
        </Link>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-[#f1f5f9]/60">
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Overlay (mobile) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-[75] md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 bottom-0 w-[260px] bg-[#0f1219] border-r border-[#1e293b] flex flex-col z-[80] transition-transform duration-300 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5">
          <Link to="/" className="flex items-center gap-2.5 mb-8">
            <div className="bg-[#06b6d4] p-1.5 rounded-lg shadow-lg shadow-[#06b6d4]/20">
              <Globe className="w-5 h-5 text-[#0a0e17]" />
            </div>
            <span className="font-bold text-lg tracking-tight">i18nCheck<span className="text-[#06b6d4]">.dev</span></span>
          </Link>

          {/* New Check CTA */}
          <Link
            to="/app/new"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 mb-6 bg-[#06b6d4] hover:bg-[#0891b2] text-[#0a0e17] font-bold rounded-xl transition-all shadow-lg shadow-[#06b6d4]/20 text-sm"
          >
            <Plus className="w-4 h-4" />
            New Check
          </Link>

          <nav className="space-y-1">
            <NavLink to="/app" icon={Home} active={currentView === 'home'}>Dashboard</NavLink>
            <NavLink to="/app/history" icon={History} active={currentView === 'history'} badge={recentChecks.length}>History</NavLink>
            <NavLink to="/app/settings" icon={Settings} active={currentView === 'settings'}>Settings</NavLink>
          </nav>
        </div>

        <div className="mt-auto p-5 border-t border-[#1e293b]">
          <div className="bg-[#111827]/80 rounded-xl p-4 border border-[#1e293b]">
            <div className="flex items-center justify-between mb-3">
              <span className="px-2 py-0.5 bg-[#06b6d4]/10 text-[#06b6d4] text-[10px] font-black uppercase rounded">Free</span>
              <button className="text-[10px] font-bold text-[#06b6d4] hover:underline">Upgrade</button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#f1f5f9]/40">
                <span>Today</span>
                <span>{usageCount}/{MAX_FREE_CHECKS}</span>
              </div>
              <div className="h-1.5 w-full bg-[#0a0e17] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(usageCount / MAX_FREE_CHECKS) * 100}%`,
                    backgroundColor: usageCount >= MAX_FREE_CHECKS ? CHART_COLORS.red : CHART_COLORS.cyan
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-[260px] min-h-screen pt-20 md:pt-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* ═══════ SETTINGS VIEW ═══════ */}
          {currentView === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111827] rounded-2xl border border-[#1e293b] p-12 text-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-[#0a0e17] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#1e293b]">
                <Settings className="w-10 h-10 text-[#06b6d4]" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Settings — Coming Soon</h2>
              <p className="text-[#f1f5f9]/60 max-w-md mx-auto leading-relaxed">
                We're working on account settings, API keys, and team management. Stay tuned for updates!
              </p>
            </motion.div>
          )}

          {/* ═══════ HISTORY VIEW ═══════ */}
          {currentView === 'history' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#06b6d4]/10 rounded-xl flex items-center justify-center">
                    <History className="w-5 h-5 text-[#06b6d4]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Check History</h2>
                    <p className="text-sm text-[#f1f5f9]/40">{recentChecks.length} checks total</p>
                  </div>
                </div>
                <Link
                  to="/app/new"
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#06b6d4] hover:bg-[#0891b2] text-[#0a0e17] font-bold rounded-xl transition-all text-sm"
                >
                  <Plus className="w-4 h-4" />
                  New Check
                </Link>
              </div>
              <RecentChecksList
                checks={recentChecks}
                onView={handleViewResults}
                onDelete={handleDeleteCheck}
              />
            </div>
          )}

          {/* ═══════ DASHBOARD HOME (ANALYTICS) ═══════ */}
          {currentView === 'home' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
                  <p className="text-[#f1f5f9]/40 text-sm">Your i18n layout testing overview</p>
                </div>
                <Link
                  to="/app/new"
                  className="flex items-center gap-2 px-5 py-3 bg-[#06b6d4] hover:bg-[#0891b2] text-[#0a0e17] font-bold rounded-xl transition-all shadow-lg shadow-[#06b6d4]/20 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  New Check
                </Link>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  icon={BarChart3}
                  label="Total Checks"
                  value={analytics.totalChecks}
                  subtext="All time"
                  color={CHART_COLORS.cyan}
                />
                <StatCard
                  icon={ShieldAlert}
                  label="Issues Found"
                  value={analytics.totalCritical + analytics.totalWarnings}
                  subtext={`${analytics.totalCritical} critical, ${analytics.totalWarnings} warnings`}
                  color={CHART_COLORS.red}
                />
                <StatCard
                  icon={CheckCircle2}
                  label="Clean Passes"
                  value={analytics.cleanPasses}
                  subtext={analytics.totalChecks > 0 ? `${Math.round((analytics.cleanPasses / analytics.totalChecks) * 100)}% pass rate` : 'No checks yet'}
                  color={CHART_COLORS.green}
                />
                <StatCard
                  icon={Target}
                  label="Top Mode"
                  value={analytics.topMode}
                  subtext="Most used simulation"
                  color={CHART_COLORS.purple}
                />
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Activity Chart (wide) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="lg:col-span-2 bg-[#111827] rounded-2xl border border-[#1e293b] p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-sm font-bold text-[#f1f5f9]/80">Check Activity</h3>
                      <p className="text-xs text-[#f1f5f9]/30 mt-0.5">Last 7 days</p>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-medium">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4]" />
                        <span className="text-[#f1f5f9]/40">Checks</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                        <span className="text-[#f1f5f9]/40">Issues</span>
                      </span>
                    </div>
                  </div>
                  {analytics.totalChecks > 0 ? (
                    <ResponsiveContainer width="100%" height={220}>
                      <AreaChart data={analytics.last7} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                        <defs>
                          <linearGradient id="gradCyan" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="gradAmber" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="date" tick={{ fill: '#f1f5f980', fontSize: 11 }} tickLine={false} axisLine={false} />
                        <YAxis tick={{ fill: '#f1f5f960', fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} />
                        <Tooltip content={<ChartTooltip />} />
                        <Area type="monotone" dataKey="checks" name="Checks" stroke="#06b6d4" strokeWidth={2} fill="url(#gradCyan)" />
                        <Area type="monotone" dataKey="issues" name="Issues" stroke="#f59e0b" strokeWidth={2} fill="url(#gradAmber)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[220px] flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="w-10 h-10 text-[#f1f5f9]/10 mx-auto mb-3" />
                        <p className="text-sm text-[#f1f5f9]/30">Run your first check to see activity</p>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Severity Breakdown (narrow) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-[#111827] rounded-2xl border border-[#1e293b] p-6"
                >
                  <h3 className="text-sm font-bold text-[#f1f5f9]/80 mb-1">Issue Breakdown</h3>
                  <p className="text-xs text-[#f1f5f9]/30 mb-4">By severity</p>
                  {analytics.totalCritical + analytics.totalWarnings + analytics.totalInfo > 0 ? (
                    <>
                      <ResponsiveContainer width="100%" height={140}>
                        <PieChart>
                          <Pie
                            data={analytics.severityData.filter(d => d.value > 0)}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={60}
                            paddingAngle={4}
                            dataKey="value"
                            strokeWidth={0}
                          >
                            {analytics.severityData.filter(d => d.value > 0).map((entry, index) => (
                              <Cell key={index} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip content={<ChartTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="space-y-2.5 mt-2">
                        {analytics.severityData.map((item) => (
                          <div key={item.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                              <span className="text-xs text-[#f1f5f9]/50">{item.name}</span>
                            </div>
                            <span className="text-xs font-bold text-[#f1f5f9]/70">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="h-[220px] flex items-center justify-center">
                      <div className="text-center">
                        <ShieldAlert className="w-10 h-10 text-[#f1f5f9]/10 mx-auto mb-3" />
                        <p className="text-sm text-[#f1f5f9]/30">No issues yet</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Mode Usage Bar Chart */}
              {analytics.modeData.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-[#111827] rounded-2xl border border-[#1e293b] p-6"
                >
                  <h3 className="text-sm font-bold text-[#f1f5f9]/80 mb-1">Simulation Modes Used</h3>
                  <p className="text-xs text-[#f1f5f9]/30 mb-6">Distribution across your checks</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={analytics.modeData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="name" tick={{ fill: '#f1f5f980', fontSize: 11 }} tickLine={false} axisLine={false} />
                      <YAxis tick={{ fill: '#f1f5f960', fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} />
                      <Tooltip content={<ChartTooltip />} />
                      <Bar dataKey="count" name="Checks" fill="#06b6d4" radius={[6, 6, 0, 0]} maxBarSize={50} />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              )}

              {/* Recent Checks Preview */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-5 h-5 text-[#06b6d4]" />
                    <h3 className="text-lg font-bold">Recent Checks</h3>
                  </div>
                  {recentChecks.length > 0 && (
                    <Link to="/app/history" className="text-xs font-bold text-[#06b6d4] hover:underline flex items-center gap-1">
                      View all <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
                <RecentChecksList
                  checks={recentChecks.slice(0, 4)}
                  onView={handleViewResults}
                  onDelete={handleDeleteCheck}
                  compact
                />
              </div>
            </motion.div>
          )}

          {/* ═══════ NEW CHECK VIEW ═══════ */}
          {currentView === 'new-check' && (
            <>
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => navigate('/app')}
                  className="p-2 hover:bg-[#1e293b] rounded-xl transition-colors text-[#f1f5f9]/40 hover:text-[#f1f5f9]"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold">New Check</h1>
                  <p className="text-sm text-[#f1f5f9]/40">Test your website's i18n layout resilience</p>
                </div>
              </div>

              {/* Check Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#111827] rounded-2xl border border-[#1e293b] p-6 sm:p-8 mb-8 shadow-2xl"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
                    <div className="lg:col-span-6">
                      <label htmlFor="url" className="flex items-center gap-2 text-xs font-bold text-[#f1f5f9]/50 mb-2.5 uppercase tracking-wider">
                        <Globe className="w-3.5 h-3.5 text-[#06b6d4]" />
                        Website URL
                      </label>
                      <input
                        type="text"
                        id="url"
                        placeholder="https://example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full px-5 py-4 bg-[#0a0e17] border border-[#1e293b] rounded-xl focus:ring-2 focus:ring-[#06b6d4] focus:border-transparent outline-none transition-all text-base"
                      />
                    </div>

                    <div className="lg:col-span-4">
                      <label className="flex items-center gap-2 text-xs font-bold text-[#f1f5f9]/50 mb-2.5 uppercase tracking-wider">
                        <Layout className="w-3.5 h-3.5 text-[#06b6d4]" />
                        Simulation Mode
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowModeDropdown(!showModeDropdown)}
                          className="w-full flex items-center justify-between px-5 py-4 bg-[#0a0e17] border border-[#1e293b] rounded-xl hover:border-[#06b6d4]/40 transition-all text-left"
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
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 8 }}
                              className="absolute top-full left-0 right-0 mt-2 bg-[#111827] rounded-xl shadow-2xl border border-[#1e293b] overflow-hidden z-50 max-h-80 overflow-y-auto"
                            >
                              {modes.map((m) => (
                                <button
                                  key={m.id}
                                  type="button"
                                  onClick={() => { setMode(m.id); setShowModeDropdown(false); }}
                                  className={`w-full flex items-start gap-4 px-5 py-3.5 text-left transition-colors hover:bg-[#06b6d4]/5 ${
                                    mode === m.id ? 'bg-[#06b6d4]/10' : ''
                                  }`}
                                >
                                  <m.icon className={`w-5 h-5 mt-0.5 ${mode === m.id ? 'text-[#06b6d4]' : 'text-[#f1f5f9]/30'}`} />
                                  <div>
                                    <div className={`text-sm font-bold ${mode === m.id ? 'text-[#06b6d4]' : 'text-[#f1f5f9]'}`}>{m.name}</div>
                                    <div className="text-xs text-[#f1f5f9]/40 mt-0.5">{m.desc}</div>
                                  </div>
                                  {mode === m.id && <Check className="w-5 h-5 text-[#06b6d4] ml-auto mt-0.5" />}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="lg:col-span-2 flex flex-col gap-2">
                      <button
                        type="submit"
                        disabled={!url || isLoading || usageCount >= MAX_FREE_CHECKS}
                        className="w-full py-4 bg-[#06b6d4] hover:bg-[#0891b2] text-[#0a0e17] font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#06b6d4]/20"
                      >
                        {isLoading ? (
                          <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <Zap className="w-5 h-5" />
                            <span>Run Test</span>
                          </>
                        )}
                      </button>
                      {usageCount >= MAX_FREE_CHECKS && (
                        <p className="text-[10px] text-[#ef4444] font-bold text-center leading-tight">
                          Daily limit reached. Upgrade for more.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-4 border-t border-[#1e293b]/60">
                    <span className="text-[10px] font-bold text-[#f1f5f9]/30 uppercase tracking-widest shrink-0">Quick test:</span>
                    <div className="flex flex-wrap gap-2">
                      {presets.map((p) => (
                        <button
                          key={p.url}
                          type="button"
                          onClick={() => setUrl(p.url)}
                          className="px-3 py-1.5 bg-[#0a0e17] border border-[#1e293b] rounded-full text-xs font-medium text-[#f1f5f9]/50 hover:border-[#06b6d4]/50 hover:text-[#06b6d4] transition-all"
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </form>
              </motion.div>

              {/* Preview Area */}
              <AnimatePresence>
                {(previewUrl || isLoading) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`bg-[#0a0e17] border border-[#1e293b] overflow-hidden flex flex-col transition-all duration-500 relative mb-8 ${
                      isMaximized
                        ? 'fixed inset-0 z-[100] rounded-none'
                        : 'h-[650px] rounded-2xl shadow-2xl'
                    }`}
                  >
                    <div className="flex-1 flex flex-col relative">
                      {/* Loading Overlay */}
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
                            <div className="w-full max-w-md space-y-6">
                              <div className="space-y-3">
                                {loadingSteps.map((step, idx) => (
                                  <div key={idx} className={`flex items-center gap-4 transition-all duration-500 ${idx > loadingStep ? 'opacity-20' : 'opacity-100'}`}>
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                                      idx < loadingStep ? 'bg-[#22c55e] text-[#0a0e17]' :
                                      idx === loadingStep ? 'bg-[#06b6d4] text-[#0a0e17]' :
                                      'bg-[#1e293b] text-[#f1f5f9]/20'
                                    }`}>
                                      {idx < loadingStep ? <Check className="w-4 h-4" /> : <span className="text-[10px] font-bold">{idx + 1}</span>}
                                    </div>
                                    <span className={`text-sm font-medium ${idx === loadingStep ? 'text-[#06b6d4]' : 'text-[#f1f5f9]/50'}`}>{step}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="pt-6 text-center">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#111827] rounded-full border border-[#1e293b] text-xs font-medium text-[#f1f5f9]/40">
                                  <RefreshCw className="w-3 h-3 animate-spin" />
                                  Usually takes 5-15 seconds
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Browser Chrome */}
                      <div className="bg-[#111827] border-b border-[#1e293b] px-4 py-3 flex items-center justify-between shrink-0 z-10">
                        <div className="flex items-center gap-5 flex-1">
                          <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-[#ef4444]/60"></div>
                            <div className="w-3 h-3 rounded-full bg-[#f59e0b]/60"></div>
                            <div className="w-3 h-3 rounded-full bg-[#22c55e]/60"></div>
                          </div>
                          <div className="flex-1 max-w-xl px-4 py-1.5 bg-[#0a0e17] rounded-lg text-xs text-[#f1f5f9]/40 font-mono border border-[#1e293b] truncate flex items-center gap-2">
                            <Globe className="w-3 h-3 shrink-0" />
                            {previewUrl ? decodeURIComponent(previewUrl.split('url=')[1].split('&')[0]) : 'Loading...'}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="px-2.5 py-1 bg-[#06b6d4]/10 border border-[#06b6d4]/20 rounded text-[10px] font-black text-[#06b6d4] uppercase tracking-wider hidden sm:block">
                            {modes.find(m => m.id === mode)?.name}
                          </div>
                          <button onClick={copyToClipboard} className="p-1.5 hover:bg-[#1e293b] rounded-md text-[#f1f5f9]/30 hover:text-[#f1f5f9]/60 transition-colors" title="Share">
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => setIsMaximized(!isMaximized)} className="p-1.5 hover:bg-[#1e293b] rounded-md text-[#f1f5f9]/30 hover:text-[#f1f5f9]/60 transition-colors">
                            {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Iframe */}
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
                    className="mb-8"
                  >
                    {/* Issues Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#ef4444]/10 rounded-xl flex items-center justify-center">
                          <AlertCircle className="w-5 h-5 text-[#ef4444]" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold">Layout Issues Detected</h2>
                          <p className="text-xs text-[#f1f5f9]/40">{mockIssues.length} issues across the page</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-[#111827] px-4 py-2.5 rounded-xl border border-[#1e293b]">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
                          <span className="text-xs font-bold text-[#f1f5f9]/50">3 Critical</span>
                        </div>
                        <div className="w-px h-3 bg-[#1e293b]" />
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                          <span className="text-xs font-bold text-[#f1f5f9]/50">4 Warnings</span>
                        </div>
                        <div className="w-px h-3 bg-[#1e293b]" />
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-[#06b6d4]" />
                          <span className="text-xs font-bold text-[#f1f5f9]/50">2 Info</span>
                        </div>
                      </div>
                    </div>

                    {/* Issue Cards */}
                    <div className="space-y-3">
                      {mockIssues.map((issue) => (
                        <div
                          key={issue.id}
                          className={`bg-[#111827] border ${expandedIssue === issue.id ? 'border-[#06b6d4]/40' : 'border-[#1e293b]'} rounded-xl overflow-hidden transition-all`}
                        >
                          <button
                            onClick={() => setExpandedIssue(expandedIssue === issue.id ? null : issue.id)}
                            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#1e293b]/30 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full shrink-0 ${
                                issue.severity === 'critical' ? 'bg-[#ef4444]' :
                                issue.severity === 'warning' ? 'bg-[#f59e0b]' : 'bg-[#06b6d4]'
                              }`} />
                              <div>
                                <h4 className="font-bold text-sm text-[#f1f5f9]">{issue.title}</h4>
                                <code className="text-[10px] text-[#f1f5f9]/30 bg-[#0a0e17] px-1.5 py-0.5 rounded mt-1 inline-block">{issue.element}</code>
                              </div>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-[#f1f5f9]/20 transition-transform shrink-0 ${expandedIssue === issue.id ? 'rotate-180' : ''}`} />
                          </button>

                          <AnimatePresence>
                            {expandedIssue === issue.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-5 pb-5 border-t border-[#1e293b]/50 pt-4">
                                  <div className="space-y-4">
                                    <div>
                                      <div className="text-[10px] font-black uppercase tracking-widest text-[#f1f5f9]/30 mb-1.5">Description</div>
                                      <p className="text-sm text-[#f1f5f9]/60 leading-relaxed">{issue.description}</p>
                                    </div>
                                    <div className="bg-[#0a0e17] p-4 rounded-lg border border-[#1e293b]">
                                      <div className="text-[10px] font-black uppercase tracking-widest text-[#06b6d4] mb-1.5">Suggested Fix</div>
                                      <p className="text-sm font-mono text-[#f1f5f9]/80">{issue.fix}</p>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </main>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-[#06b6d4] text-[#0a0e17] font-bold rounded-full shadow-2xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            Link copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Recent Checks List Component ───────────────────────────────────────────

function RecentChecksList({ checks, onView, onDelete, compact }: {
  checks: CheckResult[];
  onView: (c: CheckResult) => void;
  onDelete: (id: string, e: MouseEvent) => void;
  compact?: boolean;
}) {
  if (checks.length === 0) {
    return (
      <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-10 text-center">
        <div className="w-14 h-14 bg-[#0a0e17] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#1e293b]">
          <History className="w-7 h-7 text-[#f1f5f9]/15" />
        </div>
        <h3 className="text-base font-bold mb-1.5">No checks yet</h3>
        <p className="text-[#f1f5f9]/40 text-sm max-w-xs mx-auto mb-5">
          Run your first i18n layout test to see results here.
        </p>
        <Link
          to="/app/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#06b6d4] hover:bg-[#0891b2] text-[#0a0e17] font-bold rounded-xl transition-all text-sm"
        >
          <Plus className="w-4 h-4" />
          Start First Check
        </Link>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 ${compact ? 'sm:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2'} gap-4`}>
      {checks.map((check) => (
        <motion.div
          key={check.id}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#111827] border border-[#1e293b] rounded-xl p-4 hover:border-[#1e293b]/80 transition-all group relative"
        >
          <button
            onClick={(e) => onDelete(check.id, e)}
            className="absolute top-3 right-3 p-1.5 text-[#f1f5f9]/15 hover:text-[#ef4444] hover:bg-[#ef4444]/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-3 mb-3 pr-6">
            <div className="w-8 h-8 bg-[#0a0e17] rounded-lg flex items-center justify-center border border-[#1e293b] shrink-0">
              <img
                src={`https://www.google.com/s2/favicons?domain=${check.url}&sz=64`}
                alt=""
                className="w-5 h-5"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="truncate flex-1">
              <h4 className="font-bold text-sm text-[#f1f5f9] truncate">{check.url.replace(/^https?:\/\//, '')}</h4>
              <span className="text-[10px] text-[#f1f5f9]/30">
                {new Date(check.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className={`w-2 h-2 rounded-full shrink-0 ${check.status === 'issues_found' ? 'bg-[#ef4444]' : 'bg-[#22c55e]'}`} />
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 bg-[#06b6d4]/10 text-[#06b6d4] text-[10px] font-black uppercase rounded">{check.simulation}</span>
            <div className="flex items-center gap-2 ml-auto text-[10px] text-[#f1f5f9]/30">
              <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] inline-block" /> {check.issues.critical}</span>
              <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] inline-block" /> {check.issues.warning}</span>
              <span className="flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] inline-block" /> {check.issues.info}</span>
            </div>
          </div>

          <button
            onClick={() => onView(check)}
            className="w-full py-2 bg-[#1e293b]/50 hover:bg-[#06b6d4] hover:text-[#0a0e17] text-[#f1f5f9]/60 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5"
          >
            View Results <ArrowRight className="w-3 h-3" />
          </button>
        </motion.div>
      ))}
    </div>
  );
}
