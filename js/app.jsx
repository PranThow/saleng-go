// app.jsx — Main app shell: auth gate, responsive layout, screen routing

// ── Screen registries ─────────────────────────────────────────────────────────
const RESIDENT_SCREENS = {
  home:     { Component: () => ResidentHome,     th: 'หน้าหลัก',           en: 'Home',     icon: 'home'     },
  schedule: { Component: () => ResidentSchedule, th: 'นัดหมาย',            en: 'Schedule', icon: 'calendar' },
  matching: { Component: () => ResidentMatching, th: 'กำลังหาซาเล้ง',     en: 'Matching', icon: 'search'   },
  tracking: { Component: () => ResidentTracking, th: 'ติดตาม',             en: 'Track',    icon: 'map'      },
  arrived:  { Component: () => ResidentArrived,  th: 'ซาเล้งมาถึง',       en: 'Arrived',  icon: 'check'    },
  payment:  { Component: () => ResidentPayment,  th: 'ชำระเงิน',           en: 'Payment',  icon: 'pay'      },
  review:   { Component: () => ResidentReview,   th: 'รีวิว',              en: 'Review',   icon: 'star'     },
  history:  { Component: () => ResidentHistory,  th: 'ประวัติ',            en: 'History',  icon: 'history'  },
  profile:  { Component: () => ResidentProfile,  th: 'โปรไฟล์',           en: 'Profile',  icon: 'person'   },
};

const DRIVER_SCREENS = {
  home:     { Component: () => DriverHome,     th: 'หน้าหลัก',   en: 'Home',     icon: 'home'    },
  request:  { Component: () => DriverRequest,  th: 'คำขอใหม่',   en: 'Request',  icon: 'bell'    },
  route:    { Component: () => DriverRoute,    th: 'เส้นทาง',    en: 'Route',    icon: 'map'     },
  stops:    { Component: () => DriverStops,    th: 'จุดรับ',     en: 'Stops',    icon: 'list'    },
  pickup:   { Component: () => DriverPickup,   th: 'รับขยะ',     en: 'Pickup',   icon: 'check'   },
  earnings: { Component: () => DriverEarnings, th: 'รายได้',     en: 'Earnings', icon: 'cash'    },
  profile:  { Component: () => DriverProfile,  th: 'โปรไฟล์',   en: 'Profile',  icon: 'person'  },
};

// Items shown in bottom tab bar (mobile)
const RESIDENT_TABS = ['home', 'schedule', 'history', 'profile'];
const DRIVER_TABS   = ['home', 'stops', 'earnings', 'profile'];

// Items shown in sidebar (tablet/desktop)
const RESIDENT_NAV = ['home', 'schedule', 'history', 'profile'];
const DRIVER_NAV   = ['home', 'stops', 'earnings', 'profile'];

// ── Nav icon SVG renderer ─────────────────────────────────────────────────────
function NavIcon({ name, size = 20, color = 'currentColor' }) {
  const s = { width: size, height: size, display: 'block' };
  const p = { fill: 'none', stroke: color, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'home':     return <svg style={s} viewBox="0 0 24 24"><path {...p} d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path {...p} d="M9 21V12h6v9"/></svg>;
    case 'calendar': return <svg style={s} viewBox="0 0 24 24"><rect {...p} x="3" y="4" width="18" height="18" rx="2"/><path {...p} d="M16 2v4M8 2v4M3 10h18"/></svg>;
    case 'map':      return <svg style={s} viewBox="0 0 24 24"><polygon {...p} points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><path {...p} d="M8 2v16M16 6v16"/></svg>;
    case 'history':  return <svg style={s} viewBox="0 0 24 24"><circle {...p} cx="12" cy="12" r="9"/><polyline {...p} points="12 7 12 12 15 15"/></svg>;
    case 'person':   return <svg style={s} viewBox="0 0 24 24"><circle {...p} cx="12" cy="8" r="4"/><path {...p} d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>;
    case 'list':     return <svg style={s} viewBox="0 0 24 24"><line {...p} x1="8" y1="6" x2="21" y2="6"/><line {...p} x1="8" y1="12" x2="21" y2="12"/><line {...p} x1="8" y1="18" x2="21" y2="18"/><circle cx="3" cy="6" r="1.5" fill={color}/><circle cx="3" cy="12" r="1.5" fill={color}/><circle cx="3" cy="18" r="1.5" fill={color}/></svg>;
    case 'cash':     return <svg style={s} viewBox="0 0 24 24"><rect {...p} x="2" y="6" width="20" height="12" rx="2"/><circle {...p} cx="12" cy="12" r="3"/><path {...p} d="M6 12h.01M18 12h.01"/></svg>;
    case 'bell':     return <svg style={s} viewBox="0 0 24 24"><path {...p} d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>;
    case 'gear':     return <svg style={s} viewBox="0 0 24 24"><circle {...p} cx="12" cy="12" r="3"/><path {...p} d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
    case 'signout':  return <svg style={s} viewBox="0 0 24 24"><path {...p} d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline {...p} points="16 17 21 12 16 7"/><line {...p} x1="21" y1="12" x2="9" y2="12"/></svg>;
    default:         return <svg style={s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" fill={color}/></svg>;
  }
}

// ── Main App ──────────────────────────────────────────────────────────────────
function App() {
  const [authed,   setAuthed]   = React.useState(() => !!localStorage.getItem('sg_authed'));
  const [mode,     setMode]     = React.useState(() => localStorage.getItem('sg_mode')     || 'resident');
  const [lang,     setLang]     = React.useState(() => localStorage.getItem('sg_lang')     || 'th');
  const [mapStyle, setMapStyle] = React.useState(() => localStorage.getItem('sg_mapstyle') || 'mapbox');
  const [route,    setRoute]    = React.useState('home');
  const [showSettings, setShowSettings] = React.useState(false);

  // Reset to home when mode changes
  React.useEffect(() => { setRoute('home'); }, [mode]);

  // ── Sign in ──
  if (!authed) {
    return (
      <SignIn onSignIn={(m, l) => {
        setMode(m); setLang(l); setAuthed(true);
        setRoute('home'); setShowSettings(false);
      }} />
    );
  }

  const isResident = mode === 'resident';
  const registry   = isResident ? RESIDENT_SCREENS : DRIVER_SCREENS;
  const navKeys    = isResident ? RESIDENT_NAV : DRIVER_NAV;
  const tabKeys    = isResident ? RESIDENT_TABS : DRIVER_TABS;

  const CurrentScreen = registry[route]?.Component() || (isResident ? ResidentHome : DriverHome);

  const t = (th, en) => lang === 'en' ? en : th;

  const go = React.useCallback((k) => {
    setShowSettings(false);
    setRoute(k);
  }, []);

  const handleSettingsSave = ({ lang: l, mapStyle: ms, mode: m }) => {
    setLang(l); setMapStyle(ms);
    if (m !== mode) { setMode(m); }
  };

  const handleSignOut = () => {
    ['sg_authed', 'sg_mode', 'sg_lang', 'sg_mapstyle'].forEach(k => localStorage.removeItem(k));
    setAuthed(false); setShowSettings(false);
  };

  // ── Sidebar nav item ──
  function SidebarItem({ routeKey }) {
    const info = registry[routeKey];
    if (!info) return null;
    const active = !showSettings && route === routeKey;
    return (
      <button className={'sg-nav-item' + (active ? ' active' : '')} onClick={() => go(routeKey)}>
        <span className="nav-icon">
          <NavIcon name={info.icon} size={18} color={active ? '#0d3b2e' : '#3b4a42'} />
        </span>
        <span className="nav-label">{lang === 'en' ? info.en : info.th}</span>
      </button>
    );
  }

  // ── Mobile tab item ──
  function TabItem({ routeKey }) {
    const info = registry[routeKey];
    if (!info) return null;
    const active = !showSettings && route === routeKey;
    return (
      <button className={'sg-tab-item' + (active ? ' active' : '')} onClick={() => go(routeKey)}>
        <div className={'tab-icon' + (active ? ' tab-icon-bg' : '')}>
          <NavIcon name={info.icon} size={22} color={active ? '#0d3b2e' : '#7a857f'} />
        </div>
        <span>{lang === 'en' ? info.en : info.th}</span>
      </button>
    );
  }

  const screenContent = showSettings
    ? <SettingsScreen lang={lang} mapStyle={mapStyle} mode={mode}
        onSave={handleSettingsSave} onSignOut={handleSignOut}
        onBack={() => setShowSettings(false)} />
    : <CurrentScreen go={go} lang={lang} mapStyle={mapStyle} />;

  return (
    <div className="sg-app-shell">
      <div className="sg-app-inner">

        {/* ── Sidebar (tablet/desktop) ── */}
        <aside className="sg-sidebar">

          <div className="sg-sidebar-brand">
            <div className="mark">
              <BrandMark size={20} color="#d4f87a" />
            </div>
            <div className="wordmark">saleng<em>·</em>go</div>
          </div>

          <div className="sg-mode-badge">
            <div className="dot" />
            <span>{isResident ? t('ผู้อยู่อาศัย', 'Resident') : t('คนขับซาเล้ง', 'Driver')}</span>
          </div>

          <nav className="sg-sidebar-nav">
            {navKeys.map(k => <SidebarItem key={k} routeKey={k} />)}
          </nav>

          <div className="sg-sidebar-footer">
            <button className={'sg-nav-item' + (showSettings ? ' active' : '')}
              onClick={() => setShowSettings(s => !s)}>
              <span className="nav-icon"><NavIcon name="gear" size={18} color={showSettings ? '#0d3b2e' : '#3b4a42'} /></span>
              <span className="nav-label">{t('ตั้งค่า', 'Settings')}</span>
            </button>
            <button className="sg-nav-item" onClick={handleSignOut}>
              <span className="nav-icon"><NavIcon name="signout" size={18} color="#ff6b4a" /></span>
              <span className="nav-label" style={{ color: '#ff6b4a' }}>{t('ออกจากระบบ', 'Sign out')}</span>
            </button>
          </div>

        </aside>

        {/* ── Main content area ── */}
        <main className="sg-main">
          <div className="sg-screen-wrap">
            {screenContent}
          </div>
        </main>

      </div>

      {/* ── Mobile tab bar (flex column child — sits below screens, not over them) ── */}
      {!showSettings && (
        <nav className="sg-tabbar">
          {tabKeys.map(k => <TabItem key={k} routeKey={k} />)}
          <button className="sg-tab-item" onClick={() => setShowSettings(s => !s)}>
            <div className="tab-icon">
              <NavIcon name="gear" size={22} color="#7a857f" />
            </div>
            <span>{t('ตั้งค่า', 'Settings')}</span>
          </button>
        </nav>
      )}

    </div>
  );
}

// Mount
const appRoot = document.getElementById('app-root');
ReactDOM.createRoot(appRoot).render(<App />);
