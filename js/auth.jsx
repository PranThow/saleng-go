// auth.jsx — Sign-in screen
// Provides demo quick-start (no real auth) plus a mocked phone/OTP flow.

function SignIn({ onSignIn }) {
  const [mode, setMode] = React.useState('resident');
  const [lang, setLang] = React.useState(() => localStorage.getItem('sg_lang') || 'th');
  const [phase, setPhase] = React.useState('start'); // 'start' | 'otp'
  const [phone, setPhone] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [otpErr, setOtpErr] = React.useState(false);

  const t = (th, en) => lang === 'en' ? en : th;

  const persist = (m, l) => {
    localStorage.setItem('sg_authed', '1');
    localStorage.setItem('sg_mode', m);
    localStorage.setItem('sg_lang', l);
  };

  const handleDemo = () => {
    persist(mode, lang);
    onSignIn(mode, lang);
  };

  const handleSendOTP = () => {
    if (phone.replace(/\D/g, '').length >= 9) setPhase('otp');
  };

  const handleVerifyOTP = () => {
    if (otp === '123456') {
      persist(mode, lang);
      onSignIn(mode, lang);
    } else {
      setOtpErr(true);
      setTimeout(() => setOtpErr(false), 1200);
    }
  };

  const roleCards = [
    { value: 'resident', emoji: '🏠', th: 'ผู้อยู่อาศัย', en: 'Resident', sub: { th: 'นัดเก็บขยะ', en: 'Schedule pickups' } },
    { value: 'driver',   emoji: '🛺', th: 'คนขับซาเล้ง', en: 'Driver',   sub: { th: 'รับงาน · นำทาง', en: 'Accept jobs & navigate' } },
  ];

  const inputBase = {
    width: '100%', padding: '13px 16px', borderRadius: 14,
    border: '1.5px solid rgba(10,31,21,0.12)',
    background: '#ffffff', color: '#0a1f15',
    fontSize: 16, outline: 'none', boxSizing: 'border-box',
    fontFamily: 'inherit', transition: 'border-color 0.15s',
  };

  return (
    <div className="sg-auth">
      <div className="sg-auth-card">

        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 72, height: 72, borderRadius: 22, margin: '0 auto 14px',
            background: 'linear-gradient(135deg, #0d3b2e 0%, #1fb55e 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 28px rgba(13,59,46,0.22)',
          }}>
            <BrandMark size={40} color="#d4f87a" />
          </div>
          <div style={{ fontFamily: TYPE.display, fontSize: 26, fontWeight: 800, letterSpacing: -0.8, color: '#0d3b2e', lineHeight: 1 }}>
            saleng<span style={{ color: '#1fb55e' }}>·</span>go
          </div>
          <div style={{ fontFamily: TYPE.body, fontSize: 13, color: '#7a857f', marginTop: 5 }}>
            {t('บริการรับขยะอัจฉริยะ · กรุงเทพฯ', 'Smart waste collection · Bangkok')}
          </div>
        </div>

        {/* Language selector */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 28 }}>
          {[['th', 'ไทย'], ['en', 'EN'], ['both', 'TH+EN']].map(([v, label]) => (
            <button key={v} onClick={() => setLang(v)} style={{
              padding: '6px 14px', borderRadius: 99, border: 'none',
              background: lang === v ? '#0d3b2e' : 'rgba(10,31,21,0.07)',
              color: lang === v ? '#ffffff' : '#3b4a42',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              transition: 'background 0.15s, color 0.15s',
            }}>{label}</button>
          ))}
        </div>

        {phase === 'start' && <>
          {/* Role selection */}
          <div style={{ fontSize: 13, fontWeight: 600, color: '#7a857f', textAlign: 'center', marginBottom: 12 }}>
            {t('คุณต้องการใช้บริการในฐานะ?', 'What is your role?')}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            {roleCards.map(r => (
              <button key={r.value} onClick={() => setMode(r.value)} style={{
                padding: '18px 12px', borderRadius: 16,
                border: `2px solid ${mode === r.value ? '#0d3b2e' : 'transparent'}`,
                background: mode === r.value ? '#e8f5ec' : '#ffffff',
                cursor: 'pointer', textAlign: 'center',
                boxShadow: '0 2px 8px rgba(10,31,21,0.06)',
                transition: 'border-color 0.15s, background 0.15s',
              }}>
                <div style={{ fontSize: 30, marginBottom: 7 }}>{r.emoji}</div>
                <div style={{ fontFamily: TYPE.body, fontSize: 14, fontWeight: 700, color: '#0d3b2e', lineHeight: 1.2 }}>
                  {lang === 'en' ? r.en : r.th}
                </div>
                {lang === 'both' && (
                  <div style={{ fontFamily: TYPE.display, fontSize: 11, color: '#7a857f', marginTop: 2 }}>{r.en}</div>
                )}
                <div style={{ fontFamily: TYPE.body, fontSize: 11, color: '#7a857f', marginTop: 4 }}>
                  {lang === 'en' ? r.sub.en : r.sub.th}
                </div>
              </button>
            ))}
          </div>

          {/* Demo start */}
          <button onClick={handleDemo} style={{
            width: '100%', height: 52, borderRadius: 14, border: 'none',
            background: '#0d3b2e', color: '#ffffff',
            fontSize: 16, fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            marginBottom: 20, transition: 'background 0.15s',
            fontFamily: TYPE.display,
          }}>
            {t('เริ่มต้นเลย', 'Get Started')}
            <span style={{ fontSize: 18 }}>→</span>
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(10,31,21,0.10)' }} />
            <span style={{ fontSize: 12, color: '#7a857f', fontWeight: 500 }}>
              {t('หรือเข้าสู่ระบบด้วยเบอร์โทร', 'or sign in with phone')}
            </span>
            <div style={{ flex: 1, height: 1, background: 'rgba(10,31,21,0.10)' }} />
          </div>

          {/* Phone input */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <div style={{
              ...inputBase, width: 'auto', flexShrink: 0,
              display: 'flex', alignItems: 'center', gap: 6,
              paddingLeft: 12, paddingRight: 12, fontSize: 15,
            }}>
              🇹🇭 <span style={{ color: '#7a857f', fontSize: 14 }}>+66</span>
            </div>
            <input
              type="tel" inputMode="numeric"
              placeholder={t('เบอร์โทรศัพท์', 'Phone number')}
              value={phone}
              onChange={e => setPhone(e.target.value)}
              style={{ ...inputBase }}
              onFocus={e => e.target.style.borderColor = '#0d3b2e'}
              onBlur={e => e.target.style.borderColor = 'rgba(10,31,21,0.12)'}
            />
          </div>
          <button onClick={handleSendOTP} disabled={phone.replace(/\D/g,'').length < 9}
            style={{
              width: '100%', height: 48, borderRadius: 14, border: '1.5px solid rgba(10,31,21,0.15)',
              background: '#ffffff', color: '#0a1f15',
              fontSize: 15, fontWeight: 600, cursor: 'pointer',
              opacity: phone.replace(/\D/g,'').length < 9 ? 0.4 : 1,
              transition: 'opacity 0.15s', fontFamily: TYPE.display,
            }}>
            {t('ส่ง OTP', 'Send OTP')}
          </button>
        </>}

        {phase === 'otp' && <>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#0a1f15', marginBottom: 6 }}>
              {t('ตรวจสอบรหัส OTP', 'Enter verification code')}
            </div>
            <div style={{ fontSize: 13, color: '#7a857f' }}>
              {t(`ส่งรหัสไปที่ +66 ${phone}`, `Sent to +66 ${phone}`)}
            </div>
          </div>
          <input
            type="text" inputMode="numeric" maxLength={6}
            placeholder="––––––"
            value={otp}
            onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
            style={{
              ...inputBase,
              fontSize: 28, letterSpacing: 10, textAlign: 'center',
              fontFamily: TYPE.mono,
              borderColor: otpErr ? '#ff6b4a' : 'rgba(10,31,21,0.12)',
              marginBottom: 12,
            }}
            onFocus={e => e.target.style.borderColor = '#0d3b2e'}
            onBlur={e => !otpErr && (e.target.style.borderColor = 'rgba(10,31,21,0.12)')}
          />
          {otpErr && (
            <div style={{ fontSize: 13, color: '#ff6b4a', textAlign: 'center', marginBottom: 10, fontWeight: 500 }}>
              {t('รหัสไม่ถูกต้อง ลองใหม่อีกครั้ง', 'Incorrect code — try again')}
            </div>
          )}
          <button onClick={handleVerifyOTP} disabled={otp.length !== 6}
            style={{
              width: '100%', height: 52, borderRadius: 14, border: 'none',
              background: '#0d3b2e', color: '#ffffff',
              fontSize: 16, fontWeight: 700, cursor: 'pointer',
              marginBottom: 12, opacity: otp.length !== 6 ? 0.45 : 1,
              transition: 'opacity 0.15s', fontFamily: TYPE.display,
            }}>
            {t('ยืนยัน', 'Verify')}
          </button>
          <div style={{ textAlign: 'center', fontSize: 12, color: '#7a857f' }}>
            {t('ใช้รหัส ', 'Use code ')}
            <strong style={{ color: '#0d3b2e', fontFamily: TYPE.mono }}>123456</strong>
            {t(' เพื่อทดลอง', ' for the demo')}
          </div>
          <button onClick={() => setPhase('start')} style={{
            background: 'none', border: 'none', color: '#7a857f', cursor: 'pointer',
            fontSize: 13, display: 'block', margin: '14px auto 0',
            fontFamily: TYPE.display,
          }}>
            ← {t('เปลี่ยนเบอร์', 'Change number')}
          </button>
        </>}

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 36, fontSize: 11, color: '#aab8b2', letterSpacing: 0.3 }}>
          saleng·go · NSC 2026 · Bangkok, Thailand
        </div>

      </div>
    </div>
  );
}

Object.assign(window, { SignIn });
