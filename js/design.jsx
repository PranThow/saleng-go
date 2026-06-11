// design.jsx — design tokens, i18n helpers, brand mark, primitive UI bits

const COLORS = {
  // surfaces
  cream: '#f7f5ef',
  card: '#ffffff',
  ink: '#0a1f15',
  inkSoft: '#3b4a42',
  muted: '#7a857f',
  hairline: 'rgba(10,31,21,0.08)',
  // brand
  forest: '#0d3b2e',
  forestDeep: '#072117',
  green: '#1fb55e',
  greenSoft: '#e8f7ee',
  // semantic
  coral: '#ff6b4a',
  amber: '#f5a623',
  // waste type chips
  wGeneral: '#7a857f',
  wRecycle: '#1fb55e',
  wHazard: '#ff6b4a',
  wOrganic: '#a36b2b',
};

const TYPE = {
  display: '"Inter", "Noto Sans Thai", system-ui, sans-serif',
  body: '"Noto Sans Thai", "Inter", system-ui, sans-serif',
  mono: '"JetBrains Mono", "SF Mono", ui-monospace, monospace',
};

// ── i18n ──────────────────────────────────────────────────────────────────────
// Text always has TH + EN. Pass a lang ('th' | 'en' | 'both') and a key from STR.
const STR = {
  brand: { th: 'ซาเลงโก', en: 'saleng·go' },
  // global
  back: { th: 'ย้อนกลับ', en: 'Back' },
  cancel: { th: 'ยกเลิก', en: 'Cancel' },
  confirm: { th: 'ยืนยัน', en: 'Confirm' },
  next: { th: 'ถัดไป', en: 'Next' },
  done: { th: 'เสร็จสิ้น', en: 'Done' },
  close: { th: 'ปิด', en: 'Close' },

  // resident · home
  greeting: { th: 'สวัสดี ปรานต์', en: 'Hi, Pran' },
  whereTo: { th: 'มีขยะไหนรอเก็บวันนี้?', en: 'Got waste to pick up today?' },
  schedulePickup: { th: 'นัดเก็บขยะ', en: 'Schedule pickup' },
  recyclables: { th: 'ขยะรีไซเคิล', en: 'Recyclables' },
  general: { th: 'ขยะทั่วไป', en: 'General' },
  hazardous: { th: 'ขยะอันตราย', en: 'Hazardous' },
  organic: { th: 'ขยะอินทรีย์', en: 'Organic' },
  bulky: { th: 'ขยะขนาดใหญ่', en: 'Bulky' },
  history: { th: 'ประวัติ', en: 'History' },
  profile: { th: 'โปรไฟล์', en: 'Profile' },
  nearbyDrivers: { th: 'ซาเล้งใกล้คุณ', en: 'Saleng nearby' },

  // resident · schedule
  scheduleTitle: { th: 'นัดเก็บขยะ', en: 'Schedule pickup' },
  pickupAddress: { th: 'ที่อยู่รับขยะ', en: 'Pickup address' },
  wasteType: { th: 'ประเภทขยะ', en: 'Waste type' },
  estimatedVolume: { th: 'ปริมาณโดยประมาณ', en: 'Estimated volume' },
  pickupTime: { th: 'เวลารับ', en: 'Pickup time' },
  asap: { th: 'ทันที', en: 'ASAP' },
  scheduleLater: { th: 'นัดล่วงหน้า', en: 'Schedule later' },
  small: { th: 'น้อย', en: 'Small' },
  medium: { th: 'ปานกลาง', en: 'Medium' },
  large: { th: 'มาก', en: 'Large' },
  notes: { th: 'หมายเหตุ', en: 'Notes' },
  notesPh: { th: 'เช่น โต๊ะหน้าบ้าน, สุนัขดุ', en: 'e.g. by the front gate, dog on premises' },
  estFare: { th: 'ค่าบริการโดยประมาณ', en: 'Estimated fare' },
  request: { th: 'ส่งคำขอ', en: 'Request pickup' },

  // matching
  finding: { th: 'กำลังหาซาเล้งใกล้คุณ', en: 'Finding a Saleng nearby' },
  findingSub: { th: 'รอสักครู่ ระบบกำลังจับคู่กับผู้ขับ', en: 'Hang tight — matching with a driver' },

  // tracking
  driverEnRoute: { th: 'กำลังมุ่งหน้ามา', en: 'Driver en route' },
  arrivingIn: { th: 'มาถึงในอีก', en: 'Arriving in' },
  min: { th: 'นาที', en: 'min' },
  away: { th: 'ห่าง', en: 'away' },
  callDriver: { th: 'โทร', en: 'Call' },
  message: { th: 'ข้อความ', en: 'Message' },
  cancelTrip: { th: 'ยกเลิกงาน', en: 'Cancel trip' },

  // arrived
  driverArrived: { th: 'ซาเล้งถึงแล้ว', en: 'Saleng has arrived' },
  arrivedSub: { th: 'พบกันที่จุดรับขยะของคุณ', en: 'Meet them at your pickup point' },
  weighingIn: { th: 'กำลังชั่งและตรวจขยะ', en: 'Weighing & sorting waste' },

  // payment
  payTitle: { th: 'ชำระเงินผ่าน PromptPay', en: 'Pay with PromptPay' },
  scanQr: { th: 'สแกน QR ด้วยแอปธนาคาร', en: 'Scan with your bank app' },
  amount: { th: 'จำนวนเงิน', en: 'Amount' },
  paidConfirm: { th: 'ฉันชำระแล้ว', en: 'I’ve paid' },

  // review
  reviewTitle: { th: 'ให้คะแนนงานนี้', en: 'Rate this trip' },
  reviewSub: { th: 'รีวิวของคุณช่วยให้บริการดีขึ้น', en: 'Your rating helps Saleng improve' },
  tipDriver: { th: 'ทิปผู้ขับ', en: 'Tip driver' },
  submitReview: { th: 'ส่งรีวิว', en: 'Submit review' },

  // history
  historyTitle: { th: 'งานย้อนหลัง', en: 'Trip history' },
  thisMonth: { th: 'เดือนนี้', en: 'This month' },
  lastMonth: { th: 'เดือนก่อน', en: 'Last month' },

  // profile / impact
  profileTitle: { th: 'ผลกระทบของคุณ', en: 'Your impact' },
  kgRecycled: { th: 'กก. รีไซเคิล', en: 'kg recycled' },
  co2Saved: { th: 'กก. CO₂ ลดได้', en: 'kg CO₂ saved' },
  treesEq: { th: 'ต้นไม้เทียบเท่า', en: 'trees equivalent' },
  totalTrips: { th: 'ครั้งทั้งหมด', en: 'total trips' },

  // driver
  goOnline: { th: 'เปิดรับงาน', en: 'Go online' },
  online: { th: 'ออนไลน์', en: 'Online' },
  offline: { th: 'ออฟไลน์', en: 'Offline' },
  todayEarnings: { th: 'รายได้วันนี้', en: 'Today’s earnings' },
  tripsToday: { th: 'งานวันนี้', en: 'trips today' },
  newRequest: { th: 'งานใหม่', en: 'New request' },
  accept: { th: 'รับงาน', en: 'Accept' },
  decline: { th: 'ปฏิเสธ', en: 'Decline' },
  optimizedRoute: { th: 'เส้นทางที่ปรับให้ดีที่สุด', en: 'Optimized route' },
  stops: { th: 'จุดรับ', en: 'stops' },
  totalDistance: { th: 'ระยะทางรวม', en: 'Total distance' },
  estimatedTime: { th: 'เวลาโดยประมาณ', en: 'Est. time' },
  startRoute: { th: 'เริ่มเส้นทาง', en: 'Start route' },
  navigate: { th: 'นำทาง', en: 'Navigate' },
  pickupConfirm: { th: 'ยืนยันการรับขยะ', en: 'Confirm pickup' },
  recordWeight: { th: 'บันทึกน้ำหนัก', en: 'Record weight' },
  takePhoto: { th: 'ถ่ายภาพ', en: 'Take photo' },
  earnings: { th: 'รายได้', en: 'Earnings' },
  cashout: { th: 'ถอนเงิน', en: 'Cash out' },
  vehicle: { th: 'ยานพาหนะ', en: 'Vehicle' },
  rating: { th: 'คะแนน', en: 'Rating' },

  // misc
  baht: { th: 'บาท', en: 'THB' },
  km: { th: 'กม.', en: 'km' },
  kg: { th: 'กก.', en: 'kg' },
  bagsLitres: { th: 'ลิตร', en: 'L' },
};

// Renders bilingual text. lang='th' shows only Thai, 'en' only English,
// 'both' stacks Thai (primary) over English (secondary, smaller).
function T({ k, lang, primary = false, style = {}, en, th }) {
  const entry = k ? STR[k] : { th, en };
  if (!entry) return <span style={style}>{k}</span>;
  if (lang === 'en') return <span style={style}>{entry.en}</span>;
  if (lang === 'th') return <span style={style}>{entry.th}</span>;
  // both
  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', lineHeight: 1.15, ...style }}>
      <span>{entry.th}</span>
      <span style={{
        fontSize: primary ? '0.6em' : '0.78em',
        color: 'rgba(10,31,21,0.55)',
        fontFamily: TYPE.display,
        fontWeight: 400,
        marginTop: 1,
        letterSpacing: 0.1,
      }}>{entry.en}</span>
    </span>
  );
}

// Single-line variant for tight spots — picks one based on lang
// (defaults to TH when 'both' would overflow a button).
function Ts({ k, lang, en, th, fallback = 'th' }) {
  const entry = k ? STR[k] : { th, en };
  if (!entry) return null;
  if (lang === 'en') return entry.en;
  if (lang === 'th') return entry.th;
  return entry[fallback];
}

// ── Brand mark ────────────────────────────────────────────────────────────────
function BrandMark({ size = 28, color = COLORS.green }) {
  // simple "leaf-in-circle" — letter S inside a green disc with a leaf cut.
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ display: 'block' }}>
      <circle cx="16" cy="16" r="16" fill={color} />
      <path d="M22 9c-3 .2-7 1.5-9 4.5-1.6 2.4-1 5 1 6.5 2.5 1.8 5.5 1 8-1.2 2.5-2.2 3-6.3 0-9.8z" fill="#fff" opacity=".95"/>
      <path d="M11 22c2-3.5 5-6 10-9" stroke={color} strokeWidth="1.3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function BrandWordmark({ lang = 'both', size = 18, color = COLORS.forest }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      fontFamily: TYPE.display, color,
    }}>
      <BrandMark size={size + 8} />
      <span style={{
        fontSize: size, fontWeight: 700, letterSpacing: -0.5, lineHeight: 1,
        fontFamily: lang === 'th' ? TYPE.body : TYPE.display,
      }}>
        {lang === 'th' ? 'ซาเลงโก' : lang === 'en' ? 'saleng·go' : (
          <span style={{ display: 'inline-flex', flexDirection: 'column' }}>
            <span style={{ fontSize: size, lineHeight: 1 }}>ซาเลงโก</span>
            <span style={{ fontSize: size * 0.5, color: COLORS.muted, fontFamily: TYPE.display, letterSpacing: 0, lineHeight: 1.4 }}>saleng·go</span>
          </span>
        )}
      </span>
    </div>
  );
}

// ── Primitives ────────────────────────────────────────────────────────────────
function Btn({ children, onClick, variant = 'primary', icon, style = {}, full = true, size = 'md' }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    border: 'none', cursor: 'pointer', borderRadius: 14,
    fontFamily: TYPE.display, fontWeight: 600, letterSpacing: -0.1,
    width: full ? '100%' : 'auto',
    transition: 'transform .08s ease, background .15s ease',
  };
  const sizes = {
    sm: { height: 36, padding: '0 14px', fontSize: 14 },
    md: { height: 52, padding: '0 18px', fontSize: 16 },
    lg: { height: 60, padding: '0 22px', fontSize: 17 },
  };
  const variants = {
    primary: { background: COLORS.forest, color: '#fff' },
    accent: { background: COLORS.green, color: '#062417' },
    ghost: { background: 'rgba(10,31,21,0.05)', color: COLORS.ink },
    outline: { background: '#fff', color: COLORS.ink, boxShadow: 'inset 0 0 0 1px rgba(10,31,21,0.12)' },
    danger: { background: '#fff', color: COLORS.coral, boxShadow: 'inset 0 0 0 1px rgba(255,107,74,0.3)' },
    dark: { background: COLORS.forestDeep, color: '#fff' },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
      onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
      {icon}
      {children}
    </button>
  );
}

function Card({ children, style = {}, pad = 16, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: COLORS.card, borderRadius: 20, padding: pad,
      boxShadow: '0 1px 0 rgba(10,31,21,0.04), 0 8px 24px rgba(10,31,21,0.04)',
      ...style,
    }}>{children}</div>
  );
}

function Chip({ children, color = COLORS.green, active = false, onClick, style = {} }) {
  return (
    <div onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '6px 10px', borderRadius: 999,
      background: active ? color : 'rgba(10,31,21,0.05)',
      color: active ? (color === COLORS.green ? '#062417' : '#fff') : COLORS.ink,
      fontSize: 13, fontWeight: 600, fontFamily: TYPE.body,
      cursor: onClick ? 'pointer' : 'default',
      transition: 'background .15s, color .15s',
      ...style,
    }}>{children}</div>
  );
}

// Status pill at top of phone screens (cream, with a status dot)
function StatusPill({ children, color = COLORS.green, lang }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '6px 12px', borderRadius: 999,
      background: '#fff', color: COLORS.ink,
      fontSize: 12, fontWeight: 600, fontFamily: TYPE.body,
      boxShadow: '0 1px 2px rgba(10,31,21,0.08), 0 4px 12px rgba(10,31,21,0.04)',
      letterSpacing: 0.1,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: 99, background: color,
        boxShadow: `0 0 0 3px ${color}33`,
      }} />
      {children}
    </div>
  );
}

// Bottom sheet container — used on top of map screens
function BottomSheet({ children, height = 'auto', style = {}, pad = 18 }) {
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      background: COLORS.card, borderRadius: '24px 24px 0 0',
      padding: pad, paddingBottom: 28,
      boxShadow: '0 -8px 32px rgba(10,31,21,0.12)',
      height, ...style,
    }}>
      <div style={{
        width: 40, height: 4, background: 'rgba(10,31,21,0.15)',
        borderRadius: 99, margin: '0 auto 12px',
      }} />
      {children}
    </div>
  );
}

// Numeric impact pill
function StatNum({ value, unit, label, color = COLORS.forest, style = {} }) {
  return (
    <div style={{ ...style }}>
      <div style={{
        fontFamily: TYPE.display, fontWeight: 700, fontSize: 28, lineHeight: 1,
        color, letterSpacing: -0.6,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {value}
        {unit && <span style={{ fontSize: 14, color: COLORS.muted, fontWeight: 600, marginLeft: 3 }}>{unit}</span>}
      </div>
      {label && <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 4, fontFamily: TYPE.body }}>{label}</div>}
    </div>
  );
}

Object.assign(window, {
  COLORS, TYPE, STR, T, Ts, BrandMark, BrandWordmark,
  Btn, Card, Chip, StatusPill, BottomSheet, StatNum,
});
