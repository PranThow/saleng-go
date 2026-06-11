// settings.jsx — Settings / profile screen

function SettingsScreen({ lang, mapStyle, mode, onSave, onSignOut, onBack }) {
  const [localLang, setLocalLang] = React.useState(lang);
  const [localMap, setLocalMap] = React.useState(mapStyle);
  const [localMode, setLocalMode] = React.useState(mode);

  // Auto-save on change
  React.useEffect(() => {
    localStorage.setItem('sg_lang', localLang);
    localStorage.setItem('sg_mapstyle', localMap);
    localStorage.setItem('sg_mode', localMode);
    onSave({ lang: localLang, mapStyle: localMap, mode: localMode });
  }, [localLang, localMap, localMode]);

  const t = (th, en) => localLang === 'en' ? en : th;

  function Seg({ value, onChange, options }) {
    return (
      <div className="sg-seg">
        {options.map(o => (
          <button key={o.value} className={'sg-seg-btn' + (value === o.value ? ' active' : '')}
            onClick={() => onChange(o.value)}>
            {o.label}
          </button>
        ))}
      </div>
    );
  }

  function Row({ label, children, last = false }) {
    return (
      <div className="sg-settings-row" style={last ? { borderBottom: 'none' } : {}}>
        <span className="sg-settings-label">{label}</span>
        <div>{children}</div>
      </div>
    );
  }

  function SectionHead({ label }) {
    return (
      <div style={{
        fontFamily: TYPE.display, fontSize: 11, fontWeight: 700,
        color: '#7a857f', letterSpacing: 0.8, textTransform: 'uppercase',
        padding: '14px 16px 4px',
      }}>{label}</div>
    );
  }

  return (
    <div className="sg-settings">
      {/* Sticky header */}
      <div className="sg-settings-header">
        <button onClick={onBack} style={{
          width: 36, height: 36, borderRadius: 99, border: 'none',
          background: 'rgba(10,31,21,0.07)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a1f15',
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div style={{ fontFamily: TYPE.display, fontWeight: 700, fontSize: 17, color: '#0a1f15' }}>
          {t('การตั้งค่า', 'Settings')}
        </div>
      </div>

      <div style={{ padding: '16px 0 32px' }}>

        {/* Profile card */}
        <div style={{ margin: '0 16px 16px' }}>
          <div style={{
            background: '#ffffff', borderRadius: 18, padding: '16px',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 99, flexShrink: 0,
              background: '#e8f5ec',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#0d3b2e', fontWeight: 800, fontSize: 20, fontFamily: TYPE.display,
            }}>P</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: TYPE.display, fontWeight: 700, fontSize: 16, color: '#0a1f15', marginBottom: 2 }}>
                Pran T.
              </div>
              <div style={{ fontFamily: TYPE.display, fontSize: 13, color: '#7a857f', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                pthowrungrueang@gmail.com
              </div>
            </div>
            <div style={{
              padding: '4px 10px', borderRadius: 99,
              background: localMode === 'resident' ? '#e8f5ec' : '#f0f5e8',
              color: '#0d3b2e', fontSize: 12, fontWeight: 700, fontFamily: TYPE.display,
            }}>
              {localMode === 'resident' ? t('ผู้ใช้', 'Resident') : t('ซาเล้ง', 'Driver')}
            </div>
          </div>
        </div>

        {/* Preferences */}
        <SectionHead label={t('การตั้งค่า', 'Preferences')} />
        <div className="sg-settings-section" style={{ margin: '0 16px 14px' }}>
          <Row label={t('ภาษา', 'Language')}>
            <Seg value={localLang} onChange={setLocalLang} options={[
              { value: 'th', label: 'ไทย' },
              { value: 'en', label: 'EN' },
              { value: 'both', label: 'TH+EN' },
            ]} />
          </Row>
          <Row label={t('แผนที่', 'Map style')}>
            <Seg value={localMap} onChange={setLocalMap} options={[
              { value: 'mapbox', label: '3D' },
              { value: 'google', label: 'Streets' },
            ]} />
          </Row>
          <Row label={t('โหมด', 'Mode')} last>
            <Seg value={localMode} onChange={setLocalMode} options={[
              { value: 'resident', label: t('ผู้ใช้', 'Resident') },
              { value: 'driver', label: t('ซาเล้ง', 'Driver') },
            ]} />
          </Row>
        </div>

        {/* Notifications */}
        <SectionHead label={t('การแจ้งเตือน', 'Notifications')} />
        <div className="sg-settings-section" style={{ margin: '0 16px 14px' }}>
          <Row label={t('แจ้งเตือนทางแอป', 'Push notifications')} last>
            <span className="sg-settings-value">{t('เปิด', 'On')}</span>
          </Row>
        </div>

        {/* About */}
        <SectionHead label="About" />
        <div className="sg-settings-section" style={{ margin: '0 16px 16px' }}>
          <Row label="Version">
            <span className="sg-settings-value">1.0.0</span>
          </Row>
          <Row label="Project">
            <span className="sg-settings-value">NSC 2026</span>
          </Row>
          <Row label={t('ภูมิภาค', 'Region')} last>
            <span className="sg-settings-value">Bangkok, Thailand</span>
          </Row>
        </div>

        {/* Sign out */}
        <div style={{ padding: '0 16px' }}>
          <button onClick={onSignOut} style={{
            width: '100%', padding: '15px 20px', borderRadius: 16,
            border: '1.5px solid rgba(255,107,74,0.3)',
            background: '#ffffff', color: '#ff6b4a',
            fontFamily: TYPE.display, fontSize: 15, fontWeight: 700,
            cursor: 'pointer', transition: 'background 0.15s',
          }}>
            {t('ออกจากระบบ', 'Sign out')}
          </button>
        </div>

      </div>
    </div>
  );
}

Object.assign(window, { SettingsScreen });
