// resident.jsx — all 9 resident screens

const SCREEN_W = 402;
const SCREEN_H = 874;
const SAFE_TOP = 62;     // under status bar
const SAFE_BOT = 34;     // home indicator

// Reusable: chrome at top of map screens with status bar already covered
function MapChrome({ left, right, style = {} }) {
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, top: SAFE_TOP,
      padding: '12px 16px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      zIndex: 10, gap: 8, ...style,
    }}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

function CircleBtn({ children, onClick, style = {} }) {
  return (
    <button onClick={onClick} style={{
      width: 44, height: 44, borderRadius: 99,
      background: '#fff', border: 'none',
      boxShadow: '0 2px 6px rgba(10,31,21,0.08), 0 8px 20px rgba(10,31,21,0.06)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', color: COLORS.ink, ...style,
    }}>{children}</button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME (Resident)
// ─────────────────────────────────────────────────────────────────────────────
function ResidentHome({ go, lang, mapStyle }) {
  const [showSheet, setShowSheet] = React.useState(true);
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <MapView
        center={BKK.user} zoom={16} pitch={45} bearing={-25}
        mapStyle={mapStyle}
        markers={[
          { type: 'user', coord: BKK.user },
        ]}
      />

      {/* top chrome */}
      <MapChrome
        left={
          <CircleBtn>
            <IconMenu size={22} color={COLORS.ink} />
          </CircleBtn>
        }
        right={
          <div style={{ display: 'flex', gap: 8 }}>
            <StatusPill lang={lang}>
              <span>{lang === 'en' ? 'Mapbox · Standard' : (mapStyle === 'mapbox' ? 'Mapbox · 3D' : 'Streets')}</span>
            </StatusPill>
          </div>
        }
      />

      {/* greeting card */}
      <div style={{
        position: 'absolute', top: SAFE_TOP + 70, left: 16, right: 16,
        zIndex: 5,
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 18, padding: '12px 16px',
          display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: '0 4px 16px rgba(10,31,21,0.08)',
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: 99,
            background: COLORS.greenSoft,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: COLORS.forest, fontWeight: 700, fontSize: 14, fontFamily: TYPE.display,
          }}>P</div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: TYPE.body, fontSize: 14, fontWeight: 600, color: COLORS.ink,
            }}>
              <Ts k="greeting" lang={lang} />
            </div>
            <div style={{
              fontFamily: TYPE.body, fontSize: 12, color: COLORS.muted, marginTop: 2,
            }}>
              <Ts k="whereTo" lang={lang} />
            </div>
          </div>
        </div>
      </div>

      {/* bottom sheet */}
      <BottomSheet pad={20}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* primary CTA */}
          <Btn variant="primary" size="lg" onClick={() => go('schedule')}
               icon={<IconPlus size={20} color="#fff" />}>
            <Ts k="schedulePickup" lang={lang} />
          </Btn>

          {/* quick types */}
          <div>
            <div style={{
              fontSize: 11, fontWeight: 700, color: COLORS.muted,
              letterSpacing: 1.4, textTransform: 'uppercase',
              fontFamily: TYPE.display, marginBottom: 8,
            }}>
              {lang === 'en' ? 'Quick request' : lang === 'th' ? 'นัดด่วน' : 'นัดด่วน · Quick request'}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8 }}>
              {[
                { k: 'recyclables', icon: <IconRecycle size={20} color={COLORS.green} />, color: COLORS.greenSoft },
                { k: 'general', icon: <IconTrash size={20} color={COLORS.inkSoft} />, color: '#f0efea' },
                { k: 'organic', icon: <IconLeafSmall size={20} color="#a36b2b" />, color: '#f5ecdf' },
                { k: 'hazardous', icon: <IconWarn size={20} color={COLORS.coral} />, color: '#ffe9e2' },
              ].map((t) => (
                <button key={t.k} onClick={() => go('schedule', { wasteType: t.k })}
                  style={{
                    border: 'none', background: '#fafaf6',
                    borderRadius: 14, padding: '12px 6px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                    cursor: 'pointer',
                  }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: t.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{t.icon}</div>
                  <div style={{
                    fontSize: 10.5, fontWeight: 600, color: COLORS.ink,
                    fontFamily: TYPE.body, textAlign: 'center', lineHeight: 1.2,
                  }}>
                    <Ts k={t.k} lang={lang} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* recent location */}
          <div style={{
            background: '#fafaf6', borderRadius: 14, padding: 12,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: COLORS.greenSoft,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><IconPin size={20} color={COLORS.forest} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.ink, fontFamily: TYPE.body }}>
                {lang === 'en' ? 'Home · Sukhumvit 39' : 'บ้าน · สุขุมวิท 39'}
              </div>
              <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: TYPE.body, marginTop: 1 }}>
                {lang === 'en' ? '88/12 Soi Promsi 2, Bangkok' : '88/12 ซ.พร้อมศรี 2, กรุงเทพฯ'}
              </div>
            </div>
            <IconChevR size={16} color={COLORS.muted} />
          </div>
        </div>
      </BottomSheet>

      {/* fixed bottom tab nav */}
      <ResidentTabs go={go} active="home" lang={lang} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Bottom tab bar (resident)
// ─────────────────────────────────────────────────────────────────────────────
function ResidentTabs({ go, active, lang }) {
  const tabs = [
    { k: 'home', i: <IconHome size={22} />, label: lang === 'th' ? 'หน้าหลัก' : 'Home' },
    { k: 'history', i: <IconReceipt size={22} />, label: lang === 'th' ? 'ประวัติ' : 'Trips' },
    { k: 'profile', i: <IconLeaf size={22} />, label: lang === 'th' ? 'ผลกระทบ' : 'Impact' },
  ];
  return null; // not used - bottom sheet covers; kept for future
}

// ─────────────────────────────────────────────────────────────────────────────
// SCHEDULE (Resident) - multi-step form
// ─────────────────────────────────────────────────────────────────────────────
function ResidentSchedule({ go, lang, prefill = {}, mapStyle }) {
  const [step, setStep] = React.useState(0); // 0 location, 1 type, 2 volume, 3 time, 4 confirm
  const [wasteType, setWasteType] = React.useState(prefill.wasteType || 'recyclables');
  const [volume, setVolume] = React.useState('medium');
  const [when, setWhen] = React.useState('asap');
  const [notes, setNotes] = React.useState('');
  const fare = volume === 'small' ? 60 : volume === 'medium' ? 95 : 145;

  const wasteOpts = [
    { k: 'recyclables', icon: <IconRecycle size={22} color={COLORS.green} />, color: COLORS.greenSoft },
    { k: 'general', icon: <IconTrash size={22} color={COLORS.inkSoft} />, color: '#f0efea' },
    { k: 'organic', icon: <IconLeafSmall size={22} color="#a36b2b" />, color: '#f5ecdf' },
    { k: 'hazardous', icon: <IconWarn size={22} color={COLORS.coral} />, color: '#ffe9e2' },
  ];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: COLORS.cream, overflow: 'hidden' }}>
      {/* header */}
      <div style={{
        position: 'absolute', top: SAFE_TOP, left: 0, right: 0, zIndex: 5,
        padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 12,
        background: COLORS.cream,
      }}>
        <CircleBtn onClick={() => step === 0 ? go('home') : setStep(step - 1)} style={{ width: 36, height: 36 }}>
          <IconChevL size={18} color={COLORS.ink} />
        </CircleBtn>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: TYPE.body, fontSize: 17, fontWeight: 700, color: COLORS.ink,
            letterSpacing: -0.3,
          }}>
            <Ts k="scheduleTitle" lang={lang} />
          </div>
          <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: TYPE.display, marginTop: 1 }}>
            {lang === 'en' ? `Step ${step + 1} of 5` : lang === 'th' ? `ขั้นที่ ${step + 1} จาก 5` : `${step + 1}/5`}
          </div>
        </div>
        {/* progress dots */}
        <div style={{ display: 'flex', gap: 4 }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{
              width: i === step ? 18 : 6, height: 6, borderRadius: 99,
              background: i <= step ? COLORS.forest : 'rgba(10,31,21,0.12)',
              transition: 'all .2s ease',
            }} />
          ))}
        </div>
      </div>

      {/* content area */}
      <div style={{
        position: 'absolute', top: SAFE_TOP + 56, left: 0, right: 0, bottom: 110,
        overflow: 'auto', padding: '12px 16px 20px',
      }}>
        {/* Step 0 - Location */}
        {step === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ height: 220, borderRadius: 18, overflow: 'hidden', position: 'relative', boxShadow: '0 4px 14px rgba(10,31,21,0.06)' }}>
              <MapView center={BKK.user} zoom={16} pitch={30} bearing={0} mapStyle={mapStyle}
                       markers={[{ type: 'user', coord: BKK.user }]} />
            </div>
            <Card pad={14}>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.muted, letterSpacing: 1.2, textTransform: 'uppercase', fontFamily: TYPE.display, marginBottom: 6 }}>
                <Ts k="pickupAddress" lang={lang} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: COLORS.greenSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconPin size={18} color={COLORS.forest} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: TYPE.body, fontSize: 15, fontWeight: 600, color: COLORS.ink }}>
                    {lang === 'en' ? 'Home · Sukhumvit 39' : 'บ้าน · ซ.สุขุมวิท 39'}
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.muted, fontFamily: TYPE.body, marginTop: 1 }}>
                    {lang === 'en' ? '88/12 Soi Promsi 2, Khlong Tan Nuea' : '88/12 ซ.พร้อมศรี 2 คลองตันเหนือ'}
                  </div>
                </div>
                <IconChevR size={16} color={COLORS.muted} />
              </div>
            </Card>
            <button style={{
              background: 'rgba(10,31,21,0.04)', border: '1px dashed rgba(10,31,21,0.18)',
              borderRadius: 14, padding: '12px 14px',
              display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
              fontFamily: TYPE.body, fontSize: 14, color: COLORS.inkSoft, fontWeight: 500,
            }}>
              <IconPlus size={18} color={COLORS.inkSoft} />
              {lang === 'en' ? 'Add another address' : lang === 'th' ? 'เพิ่มที่อยู่' : 'เพิ่มที่อยู่ · Add another'}
            </button>
          </div>
        )}

        {/* Step 1 - Waste type */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <SectionLabel lang={lang}><Ts k="wasteType" lang={lang} /></SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {wasteOpts.map((o) => {
                const on = wasteType === o.k;
                return (
                  <button key={o.k} onClick={() => setWasteType(o.k)} style={{
                    background: '#fff', border: 'none',
                    boxShadow: on ? `inset 0 0 0 2px ${COLORS.forest}` : 'inset 0 0 0 1px rgba(10,31,21,0.08)',
                    borderRadius: 18, padding: 16, textAlign: 'left',
                    display: 'flex', flexDirection: 'column', gap: 10, cursor: 'pointer',
                    transition: 'box-shadow .15s',
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: o.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{o.icon}</div>
                    <div style={{
                      fontSize: 14, fontWeight: 700, color: COLORS.ink, fontFamily: TYPE.body, lineHeight: 1.3,
                    }}><Ts k={o.k} lang={lang} /></div>
                    <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: TYPE.body, lineHeight: 1.3 }}>
                      {o.k === 'recyclables' && (lang === 'en' ? 'Plastic, paper, metal, glass' : 'พลาสติก, กระดาษ, โลหะ, แก้ว')}
                      {o.k === 'general' && (lang === 'en' ? 'Mixed household waste' : 'ขยะครัวเรือนทั่วไป')}
                      {o.k === 'organic' && (lang === 'en' ? 'Food scraps, garden waste' : 'เศษอาหาร, ใบไม้')}
                      {o.k === 'hazardous' && (lang === 'en' ? 'Batteries, chemicals' : 'ถ่าน, สารเคมี')}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2 - Volume */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <SectionLabel lang={lang}><Ts k="estimatedVolume" lang={lang} /></SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { k: 'small', label: { th: 'น้อย · ถุงเล็ก 1-2 ใบ', en: 'Small · 1-2 small bags' }, kg: '< 5', est: 60 },
                { k: 'medium', label: { th: 'ปานกลาง · 3-6 ถุง', en: 'Medium · 3-6 bags' }, kg: '5-15', est: 95 },
                { k: 'large', label: { th: 'มาก · 7+ ถุง', en: 'Large · 7+ bags' }, kg: '15+', est: 145 },
              ].map((o) => {
                const on = volume === o.k;
                return (
                  <button key={o.k} onClick={() => setVolume(o.k)} style={{
                    background: '#fff', border: 'none',
                    boxShadow: on ? `inset 0 0 0 2px ${COLORS.forest}` : 'inset 0 0 0 1px rgba(10,31,21,0.08)',
                    borderRadius: 16, padding: '14px 16px', textAlign: 'left',
                    display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                  }}>
                    <div style={{
                      width: 8 + (o.k === 'small' ? 12 : o.k === 'medium' ? 24 : 36),
                      height: 8 + (o.k === 'small' ? 12 : o.k === 'medium' ? 24 : 36),
                      borderRadius: 6, background: COLORS.forest, opacity: on ? 1 : 0.25,
                      flexShrink: 0,
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.ink, fontFamily: TYPE.body }}>
                        {o.label[lang === 'en' ? 'en' : 'th']}
                      </div>
                      <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: TYPE.display, marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>
                        {o.kg} kg · ~฿{o.est}
                      </div>
                    </div>
                    {on && <div style={{
                      width: 22, height: 22, borderRadius: 99, background: COLORS.forest,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}><IconCheck size={14} color="#fff" strokeWidth={2.5} /></div>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3 - Time + notes */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <SectionLabel lang={lang}><Ts k="pickupTime" lang={lang} /></SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {['asap', 'later'].map((k) => {
                const on = when === k;
                return (
                  <button key={k} onClick={() => setWhen(k)} style={{
                    background: '#fff', border: 'none',
                    boxShadow: on ? `inset 0 0 0 2px ${COLORS.forest}` : 'inset 0 0 0 1px rgba(10,31,21,0.08)',
                    borderRadius: 16, padding: 14,
                    display: 'flex', flexDirection: 'column', gap: 6, cursor: 'pointer',
                  }}>
                    {k === 'asap' ? (
                      <IconBolt size={20} color={COLORS.green} />
                    ) : (
                      <IconClock size={20} color={COLORS.forest} />
                    )}
                    <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.ink, fontFamily: TYPE.body, textAlign: 'left' }}>
                      <Ts k={k === 'asap' ? 'asap' : 'scheduleLater'} lang={lang} />
                    </div>
                    <div style={{ fontSize: 11, color: COLORS.muted, textAlign: 'left', fontFamily: TYPE.body }}>
                      {k === 'asap'
                        ? (lang === 'en' ? '~6-15 min' : '~6-15 นาที')
                        : (lang === 'en' ? 'Pick a time' : 'เลือกเวลา')}
                    </div>
                  </button>
                );
              })}
            </div>
            <SectionLabel lang={lang}><Ts k="notes" lang={lang} /></SectionLabel>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
              placeholder={STR.notesPh[lang === 'en' ? 'en' : 'th']}
              style={{
                width: '100%', minHeight: 80, border: 'none',
                background: '#fff', borderRadius: 16, padding: 14,
                fontFamily: TYPE.body, fontSize: 14, color: COLORS.ink,
                resize: 'none', outline: 'none', boxSizing: 'border-box',
                boxShadow: 'inset 0 0 0 1px rgba(10,31,21,0.08)',
              }} />
          </div>
        )}

        {/* Step 4 - Confirm */}
        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <SectionLabel lang={lang}>
              {lang === 'en' ? 'Review your request' : lang === 'th' ? 'ตรวจสอบคำขอ' : 'ตรวจสอบ · Review'}
            </SectionLabel>
            <Card pad={0}>
              <SummaryRow icon={<IconPin size={16} color={COLORS.forest} />}
                label={<Ts k="pickupAddress" lang={lang} />}
                value={lang === 'en' ? 'Home · Sukhumvit 39' : 'บ้าน · ซ.สุขุมวิท 39'}
                onEdit={() => setStep(0)} />
              <SummaryRow icon={<IconRecycle size={16} color={COLORS.forest} />}
                label={<Ts k="wasteType" lang={lang} />}
                value={<Ts k={wasteType} lang={lang} />}
                onEdit={() => setStep(1)} />
              <SummaryRow icon={<IconBox size={16} color={COLORS.forest} />}
                label={<Ts k="estimatedVolume" lang={lang} />}
                value={<Ts k={volume} lang={lang} />}
                onEdit={() => setStep(2)} />
              <SummaryRow icon={<IconClock size={16} color={COLORS.forest} />}
                label={<Ts k="pickupTime" lang={lang} />}
                value={<Ts k={when === 'asap' ? 'asap' : 'scheduleLater'} lang={lang} />}
                onEdit={() => setStep(3)} last />
            </Card>
            <Card pad={16} style={{ background: COLORS.greenSoft }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontSize: 13, color: COLORS.forest, fontFamily: TYPE.body, fontWeight: 600 }}>
                  <Ts k="estFare" lang={lang} />
                </div>
                <div style={{ fontFamily: TYPE.display, fontSize: 28, fontWeight: 700, color: COLORS.forest, letterSpacing: -0.6, fontVariantNumeric: 'tabular-nums' }}>
                  ฿{fare}
                </div>
              </div>
              <div style={{ fontSize: 11, color: COLORS.forest, opacity: 0.7, marginTop: 4, fontFamily: TYPE.body }}>
                {lang === 'en' ? 'Final amount based on actual weight at pickup' : 'ราคาสุดท้ายคำนวณจากน้ำหนักจริง'}
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* footer CTA */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: COLORS.cream, padding: `14px 16px ${SAFE_BOT + 14}px`,
        boxShadow: '0 -4px 12px rgba(10,31,21,0.04)',
      }}>
        <Btn variant={step === 4 ? 'accent' : 'primary'} size="md"
             onClick={() => step < 4 ? setStep(step + 1) : go('matching', { wasteType, volume, when, notes, fare })}
             icon={step === 4 ? <IconCheck size={18} color="#062417" strokeWidth={2.5} /> : null}>
          {step === 4 ? <Ts k="request" lang={lang} /> : <Ts k="next" lang={lang} />}
        </Btn>
      </div>
    </div>
  );
}

function SectionLabel({ children, lang }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 700, color: COLORS.muted,
      letterSpacing: 1.2, textTransform: 'uppercase',
      fontFamily: TYPE.display, marginTop: 4,
    }}>{children}</div>
  );
}

function SummaryRow({ icon, label, value, onEdit, last = false }) {
  return (
    <div style={{
      padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
      borderBottom: last ? 'none' : `1px solid ${COLORS.hairline}`,
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 10, background: COLORS.greenSoft,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: TYPE.display, fontWeight: 600, letterSpacing: 0.3 }}>
          {label}
        </div>
        <div style={{ fontSize: 14, color: COLORS.ink, fontFamily: TYPE.body, fontWeight: 600, marginTop: 2 }}>
          {value}
        </div>
      </div>
      <button onClick={onEdit} style={{
        background: 'transparent', border: 'none', color: COLORS.forest,
        fontSize: 13, fontFamily: TYPE.display, fontWeight: 600, cursor: 'pointer',
      }}>Edit</button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MATCHING (Resident) - radar/pulse animation
// ─────────────────────────────────────────────────────────────────────────────
function ResidentMatching({ go, lang, mapStyle }) {
  // After ~3.5s, auto-advance to tracking
  React.useEffect(() => {
    const t = setTimeout(() => go('tracking'), 3800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: COLORS.cream }}>
      <MapView center={BKK.user} zoom={15.5} pitch={50} bearing={-25} mapStyle={mapStyle}
               markers={[
                 { type: 'user', coord: BKK.user },
                 { type: 'driver', coord: [100.5680, 13.7330] },
                 { type: 'driver', coord: [100.5755, 13.7335] },
                 { type: 'driver', coord: [100.5740, 13.7280] },
               ]} />

      {/* radar overlay centered on user */}
      <div style={{
        position: 'absolute', left: '50%', top: '40%', transform: 'translate(-50%,-50%)',
        pointerEvents: 'none', zIndex: 8,
      }}>
        <div className="sg-radar-wrap">
          <div className="sg-radar-ring sg-radar-ring-1" />
          <div className="sg-radar-ring sg-radar-ring-2" />
          <div className="sg-radar-ring sg-radar-ring-3" />
        </div>
      </div>

      {/* top status pill */}
      <MapChrome
        left={
          <CircleBtn onClick={() => go('home')} style={{ width: 36, height: 36 }}>
            <IconClose size={18} color={COLORS.ink} />
          </CircleBtn>
        }
        right={<StatusPill color={COLORS.amber} lang={lang}>
          {lang === 'en' ? 'Matching…' : lang === 'th' ? 'กำลังจับคู่…' : 'จับคู่… · Matching'}
        </StatusPill>}
      />

      {/* bottom card */}
      <BottomSheet>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <div style={{
              fontFamily: TYPE.body, fontSize: 22, fontWeight: 700, color: COLORS.ink,
              letterSpacing: -0.4, lineHeight: 1.2,
            }}>
              <Ts k="finding" lang={lang} />
            </div>
            <div style={{ fontSize: 13, color: COLORS.muted, fontFamily: TYPE.body, marginTop: 6 }}>
              <Ts k="findingSub" lang={lang} />
            </div>
          </div>
          {/* skeleton driver row */}
          <div style={{
            background: '#fafaf6', borderRadius: 14, padding: 12,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div className="sg-skeleton-circle" />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div className="sg-skeleton-line" style={{ width: '60%' }} />
              <div className="sg-skeleton-line" style={{ width: '40%' }} />
            </div>
          </div>
          <Btn variant="ghost" size="md" onClick={() => go('home')}>
            <Ts k="cancel" lang={lang} />
          </Btn>
        </div>
      </BottomSheet>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TRACKING (Resident) - driver moving on map toward user
// ─────────────────────────────────────────────────────────────────────────────
function ResidentTracking({ go, lang, mapStyle }) {
  const { route: liveRoute } = useMapboxRoute(BKK.driverStart, BKK.user, 'driving');
  const [progress, setProgress] = React.useState(0);
  const startRef = React.useRef(performance.now());

  // Use real route coords if loaded, otherwise fall back to the manual polyline
  const path = liveRoute ? liveRoute.coords : BKK.driverPath;
  const totalSec = liveRoute ? Math.max(12, Math.min(20, liveRoute.duration / 8)) : 16;

  React.useEffect(() => {
    let raf;
    const tick = () => {
      const elapsed = (performance.now() - startRef.current) / 1000;
      const p = Math.min(elapsed / totalSec, 1);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [totalSec]);

  const driverPos = pointOnPath(path, progress);
  const remaining = pathSliceFrom(path, progress);
  const totalMin = liveRoute ? Math.max(1, Math.round(liveRoute.duration / 60)) : 7;
  const etaMin = Math.max(1, Math.round((1 - progress) * totalMin));
  const totalKm = liveRoute ? (liveRoute.distance / 1000) : 0.9;
  const remainingKm = (totalKm * (1 - progress)).toFixed(1);

  // Pick the next turn-by-turn step based on which step's location is closest ahead
  const currentStep = React.useMemo(() => {
    if (!liveRoute || !liveRoute.steps.length) return null;
    // walk steps; the "active" one is the next step whose location hasn't been reached yet
    const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
    let best = liveRoute.steps[0];
    let bestD = Infinity;
    for (const s of liveRoute.steps) {
      if (!s.location) continue;
      const d = dist(s.location, driverPos);
      if (d < bestD) { bestD = d; best = s; }
    }
    return best;
  }, [liveRoute, driverPos[0], driverPos[1]]);

  // when arriving (progress nearly done) auto-go to arrived
  React.useEffect(() => {
    if (progress > 0.97) {
      const t = setTimeout(() => go('arrived'), 800);
      return () => clearTimeout(t);
    }
  }, [progress, go]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <MapView
        center={[(driverPos[0] + BKK.user[0]) / 2, (driverPos[1] + BKK.user[1]) / 2]}
        zoom={15.5} pitch={50} bearing={-30} mapStyle={mapStyle}
        markers={[
          { type: 'user', coord: BKK.user },
          { type: 'driver', coord: driverPos },
        ]}
        route={liveRoute ? { coords: path } : null}
        driverPath={liveRoute ? null : { coords: remaining }}
      />

      <MapChrome
        left={<CircleBtn onClick={() => go('home')} style={{ width: 36, height: 36 }}>
          <IconChevL size={18} color={COLORS.ink} />
        </CircleBtn>}
        right={<StatusPill lang={lang}>
          {lang === 'en' ? 'Driver en route' : lang === 'th' ? 'กำลังมา' : 'กำลังมา · En route'}
        </StatusPill>}
      />

      {/* Turn-by-turn banner — only when real route loaded */}
      {currentStep && (
        <div style={{
          position: 'absolute', top: SAFE_TOP + 60, left: 12, right: 12, zIndex: 5,
        }}>
          <div style={{
            background: 'rgba(13,59,46,0.97)', color: '#fff',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 16, padding: '12px 14px',
            display: 'flex', alignItems: 'center', gap: 12,
            boxShadow: '0 8px 24px rgba(13,59,46,0.3)',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'rgba(212,248,122,0.14)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <ManeuverIcon type={currentStep.type} modifier={currentStep.modifier} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: TYPE.body, fontSize: 13, fontWeight: 700, lineHeight: 1.3,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>{currentStep.instruction}</div>
              <div style={{
                fontSize: 10.5, opacity: 0.7, marginTop: 2, fontFamily: TYPE.display,
                fontVariantNumeric: 'tabular-nums', letterSpacing: 0.3,
              }}>
                {currentStep.distance > 50
                  ? `${Math.round(currentStep.distance)} m`
                  : `${Math.round(currentStep.distance)} m`}
                {currentStep.name ? ` · ${currentStep.name}` : ''}
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomSheet pad={20}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 12, color: COLORS.muted, fontFamily: TYPE.body, fontWeight: 600, letterSpacing: 0.3, textTransform: 'uppercase' }}>
              <Ts k="arrivingIn" lang={lang} />
            </span>
            {!liveRoute && (
              <span style={{ fontSize: 10, color: COLORS.muted, fontFamily: TYPE.display, opacity: 0.6 }}>
                · loading Mapbox route…
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: -8 }}>
            <span style={{ fontFamily: TYPE.display, fontSize: 56, fontWeight: 800, color: COLORS.ink, letterSpacing: -2, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{etaMin}</span>
            <span style={{ fontSize: 18, color: COLORS.muted, fontWeight: 600, fontFamily: TYPE.body }}>
              <Ts k="min" lang={lang} />
            </span>
            <span style={{ marginLeft: 'auto', fontSize: 12, color: COLORS.muted, fontFamily: TYPE.display, fontVariantNumeric: 'tabular-nums' }}>
              {remainingKm} km · {Math.round(progress * 100)}%
            </span>
          </div>
          <div style={{ height: 4, background: 'rgba(10,31,21,0.08)', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress * 100}%`, background: COLORS.green, borderRadius: 99, transition: 'width .25s linear' }} />
          </div>
          <div style={{ background: '#fafaf6', borderRadius: 14, padding: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 99, background: 'linear-gradient(135deg,#0d3b2e,#1fb55e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontFamily: TYPE.display, fontSize: 16 }}>SK</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.ink, fontFamily: TYPE.body, display: 'flex', alignItems: 'center', gap: 6 }}>
                {lang === 'en' ? 'Khun Somchai K.' : 'คุณสมชาย ก.'}
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 12, color: COLORS.muted, fontWeight: 500 }}>
                  <IconStar size={12} color={COLORS.amber} strokeWidth={1} style={{ fill: COLORS.amber }} /> 4.9
                </span>
              </div>
              <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: TYPE.display, marginTop: 1, fontVariantNumeric: 'tabular-nums' }}>
                {lang === 'en' ? 'Saleng tricycle · Green' : 'ซาเล้ง · สีเขียว'} · กท 8829
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <CircleBtn style={{ width: 36, height: 36 }}><IconPhone size={16} color={COLORS.forest} /></CircleBtn>
              <CircleBtn style={{ width: 36, height: 36 }}><IconMessage size={16} color={COLORS.forest} /></CircleBtn>
            </div>
          </div>
          <button onClick={() => go('home')} style={{ background: 'transparent', border: 'none', fontFamily: TYPE.body, fontSize: 13, color: COLORS.coral, fontWeight: 600, cursor: 'pointer', textAlign: 'center' }}>
            <Ts k="cancelTrip" lang={lang} />
          </button>
        </div>
      </BottomSheet>
    </div>
  );
}

// Maneuver glyph for turn-by-turn banner
function ManeuverIcon({ type, modifier }) {
  // arrow pointing in the direction of the next maneuver
  const m = (modifier || '').toLowerCase();
  const t = (type || '').toLowerCase();
  const c = '#d4f87a';
  if (t === 'arrive') {
    // flag/destination
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 21V4M5 4h11l-2 4 2 4H5" />
      </svg>
    );
  }
  // rotation by modifier
  const rot = m.includes('sharp left') ? -110 : m.includes('left') ? -60 : m.includes('sharp right') ? 110 : m.includes('right') ? 60 : m.includes('uturn') ? 180 : 0;
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${rot}deg)`, transition: 'transform .3s' }}>
      <path d="M12 19V6" />
      <path d="M6 12l6-6 6 6" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ARRIVED (Resident) — driver on-site
// ─────────────────────────────────────────────────────────────────────────────
function ResidentArrived({ go, lang, mapStyle }) {
  const [phase, setPhase] = React.useState(0); // 0: arrived, 1: weighing
  React.useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2200);
    const t2 = setTimeout(() => go('payment'), 6500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <MapView center={BKK.user} zoom={17.5} pitch={55} bearing={-30} mapStyle={mapStyle}
               markers={[
                 { type: 'user', coord: BKK.user },
                 { type: 'driver', coord: [BKK.user[0] + 0.0002, BKK.user[1] - 0.0001] },
               ]} />
      <MapChrome
        left={<CircleBtn onClick={() => go('home')} style={{ width: 36, height: 36 }}>
          <IconChevL size={18} color={COLORS.ink} />
        </CircleBtn>}
        right={<StatusPill color={COLORS.green} lang={lang}>
          {lang === 'en' ? 'Driver on site' : lang === 'th' ? 'ถึงแล้ว' : 'ถึงแล้ว · On site'}
        </StatusPill>}
      />
      <BottomSheet pad={20}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 99,
              background: phase === 0 ? COLORS.greenSoft : '#fff5e0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background .3s',
            }}>
              {phase === 0 ? <IconCheck size={24} color={COLORS.green} strokeWidth={2.5} /> : <IconBox size={22} color={COLORS.amber} />}
            </div>
            <div>
              <div style={{ fontFamily: TYPE.body, fontSize: 19, fontWeight: 700, color: COLORS.ink, letterSpacing: -0.3 }}>
                {phase === 0 ? <Ts k="driverArrived" lang={lang} /> : <Ts k="weighingIn" lang={lang} />}
              </div>
              <div style={{ fontSize: 12, color: COLORS.muted, fontFamily: TYPE.body, marginTop: 2 }}>
                {phase === 0 ? <Ts k="arrivedSub" lang={lang} /> : (lang === 'en' ? 'Driver is recording your waste' : 'พนักงานกำลังบันทึกน้ำหนัก')}
              </div>
            </div>
          </div>
          {phase === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
              <ProgressLine label={lang === 'en' ? 'Recyclables' : 'รีไซเคิล'} kg="3.2 kg" pct={68} />
              <ProgressLine label={lang === 'en' ? 'General' : 'ทั่วไป'} kg="1.8 kg" pct={32} muted />
            </div>
          )}
        </div>
      </BottomSheet>
    </div>
  );
}

function ProgressLine({ label, kg, pct, muted = false }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
        <span style={{ fontSize: 13, color: COLORS.ink, fontFamily: TYPE.body, fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: 13, color: muted ? COLORS.muted : COLORS.forest, fontFamily: TYPE.display, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{kg}</span>
      </div>
      <div style={{ height: 6, background: 'rgba(10,31,21,0.06)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: muted ? COLORS.muted : COLORS.green,
          borderRadius: 99, transition: 'width .8s ease',
        }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAYMENT (Resident) - PromptPay QR
// ─────────────────────────────────────────────────────────────────────────────
function ResidentPayment({ go, lang }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: COLORS.cream, overflow: 'auto' }}>
      <div style={{
        position: 'sticky', top: 0, padding: `${SAFE_TOP + 8}px 16px 12px`,
        background: COLORS.cream, zIndex: 5,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <CircleBtn onClick={() => go('arrived')} style={{ width: 36, height: 36 }}>
          <IconChevL size={18} color={COLORS.ink} />
        </CircleBtn>
        <div style={{
          fontFamily: TYPE.body, fontSize: 17, fontWeight: 700, color: COLORS.ink,
        }}>
          <Ts k="payTitle" lang={lang} />
        </div>
      </div>

      <div style={{ padding: '4px 16px 120px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* amount */}
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: COLORS.muted,
            letterSpacing: 1.4, textTransform: 'uppercase', fontFamily: TYPE.display,
          }}>
            <Ts k="amount" lang={lang} />
          </div>
          <div style={{
            fontFamily: TYPE.display, fontSize: 56, fontWeight: 800, color: COLORS.ink,
            letterSpacing: -2, lineHeight: 1.1, marginTop: 4,
            fontVariantNumeric: 'tabular-nums',
          }}>฿128.<span style={{ fontSize: 36, opacity: 0.6 }}>50</span></div>
          <div style={{ fontSize: 12, color: COLORS.muted, fontFamily: TYPE.body, marginTop: 4 }}>
            {lang === 'en' ? '5.0 kg · Recyclables + General' : '5.0 กก. · รีไซเคิล + ทั่วไป'}
          </div>
        </div>

        {/* QR card */}
        <Card pad={20} style={{
          background: 'linear-gradient(180deg,#fff,#fafaf6)',
          textAlign: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 10px', borderRadius: 6,
              background: '#003D6A', color: '#fff',
              fontSize: 11, fontWeight: 700, fontFamily: TYPE.display, letterSpacing: 0.5,
            }}>PromptPay</div>
            <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: TYPE.display }}>EMVCo · Standard</div>
          </div>
          <FauxQR />
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 12, color: COLORS.muted, fontFamily: TYPE.body }}>
              <Ts k="scanQr" lang={lang} />
            </div>
            <div style={{ fontSize: 13, color: COLORS.ink, fontFamily: TYPE.display, fontWeight: 600, marginTop: 2 }}>
              {lang === 'en' ? 'Khun Somchai K. · 081-xxx-2829' : 'คุณสมชาย ก. · 081-xxx-2829'}
            </div>
          </div>
        </Card>

        <Btn variant="primary" size="md"
          onClick={() => go('review')}
          icon={<IconCheck size={18} color="#fff" strokeWidth={2.5} />}>
          <Ts k="paidConfirm" lang={lang} />
        </Btn>
      </div>
    </div>
  );
}

// Faux PromptPay QR — generates a unique pixel grid (deterministic) so we don't need a QR library.
function FauxQR() {
  // 25x25 grid; pseudo-random pattern + finder squares at corners.
  const grid = React.useMemo(() => {
    const G = [];
    let seed = 0xfa1e51;
    const rand = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };
    for (let y = 0; y < 25; y++) {
      const row = [];
      for (let x = 0; x < 25; x++) {
        row.push(rand() > 0.5 ? 1 : 0);
      }
      G.push(row);
    }
    // finder squares (top-left, top-right, bottom-left)
    const drawFinder = (sx, sy) => {
      for (let dy = 0; dy < 7; dy++) {
        for (let dx = 0; dx < 7; dx++) {
          const inOuter = dx === 0 || dx === 6 || dy === 0 || dy === 6;
          const inInner = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4;
          G[sy + dy][sx + dx] = inOuter || inInner ? 1 : 0;
        }
      }
    };
    drawFinder(0, 0);
    drawFinder(18, 0);
    drawFinder(0, 18);
    return G;
  }, []);
  const cell = 8;
  return (
    <div style={{ display: 'inline-block', padding: 14, background: '#fff', borderRadius: 14 }}>
      <svg width={25 * cell} height={25 * cell} viewBox={`0 0 ${25 * cell} ${25 * cell}`}>
        {grid.flatMap((row, y) =>
          row.map((v, x) => v ? (
            <rect key={`${x}-${y}`} x={x * cell} y={y * cell} width={cell} height={cell} fill="#0a1f15" />
          ) : null)
        )}
        {/* center logo */}
        <rect x={25 * cell / 2 - 18} y={25 * cell / 2 - 18} width={36} height={36} rx={6} fill="#fff" />
        <rect x={25 * cell / 2 - 14} y={25 * cell / 2 - 14} width={28} height={28} rx={4} fill="#003D6A" />
        <text x={25 * cell / 2} y={25 * cell / 2 + 4} textAnchor="middle" fill="#fff"
              fontFamily="Inter,system-ui" fontSize="9" fontWeight="800">PP</text>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// REVIEW (Resident)
// ─────────────────────────────────────────────────────────────────────────────
function ResidentReview({ go, lang }) {
  const [stars, setStars] = React.useState(5);
  const [tip, setTip] = React.useState(0);
  const tags = lang === 'en'
    ? ['On time', 'Friendly', 'Careful sorting', 'Easy to find', 'Pro driver']
    : ['ตรงเวลา', 'เป็นมิตร', 'แยกขยะดี', 'หาง่าย', 'มืออาชีพ'];
  const [selected, setSelected] = React.useState([0, 2]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: COLORS.cream, overflow: 'hidden' }}>
      <div style={{ padding: `${SAFE_TOP + 8}px 16px 12px`, display: 'flex', alignItems: 'center', gap: 12 }}>
        <CircleBtn onClick={() => go('home')} style={{ width: 36, height: 36 }}>
          <IconClose size={18} color={COLORS.ink} />
        </CircleBtn>
        <div style={{ fontFamily: TYPE.body, fontSize: 17, fontWeight: 700, color: COLORS.ink }}>
          <Ts k="reviewTitle" lang={lang} />
        </div>
      </div>

      <div style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* driver */}
        <Card pad={18} style={{ textAlign: 'center' }}>
          <div style={{
            width: 64, height: 64, borderRadius: 99, margin: '0 auto 10px',
            background: 'linear-gradient(135deg,#0d3b2e,#1fb55e)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontFamily: TYPE.display, fontSize: 22,
          }}>SK</div>
          <div style={{ fontFamily: TYPE.body, fontSize: 16, fontWeight: 700, color: COLORS.ink }}>
            {lang === 'en' ? 'Khun Somchai K.' : 'คุณสมชาย ก.'}
          </div>
          <div style={{ fontSize: 12, color: COLORS.muted, fontFamily: TYPE.body, marginTop: 2 }}>
            <Ts k="reviewSub" lang={lang} />
          </div>
          {/* stars */}
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 14 }}>
            {[1,2,3,4,5].map(n => (
              <button key={n} onClick={() => setStars(n)} style={{
                background: 'transparent', border: 'none', cursor: 'pointer', padding: 4,
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill={n <= stars ? COLORS.amber : 'transparent'}
                     stroke={n <= stars ? COLORS.amber : COLORS.muted} strokeWidth="1.6" strokeLinejoin="round">
                  <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z"/>
                </svg>
              </button>
            ))}
          </div>
        </Card>

        {/* tags */}
        <div>
          <div style={{
            fontSize: 11, fontWeight: 700, color: COLORS.muted,
            letterSpacing: 1.2, textTransform: 'uppercase', fontFamily: TYPE.display, marginBottom: 8,
          }}>
            {lang === 'en' ? 'What went well' : 'สิ่งที่ชอบ'}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {tags.map((t, i) => (
              <Chip key={i} active={selected.includes(i)} color={COLORS.green}
                onClick={() => setSelected(selected.includes(i)
                  ? selected.filter(x => x !== i)
                  : [...selected, i])}>
                {t}
              </Chip>
            ))}
          </div>
        </div>

        {/* tip */}
        <div>
          <div style={{
            fontSize: 11, fontWeight: 700, color: COLORS.muted,
            letterSpacing: 1.2, textTransform: 'uppercase', fontFamily: TYPE.display, marginBottom: 8,
          }}>
            <Ts k="tipDriver" lang={lang} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {[0, 10, 20, 50].map((v) => (
              <button key={v} onClick={() => setTip(v)} style={{
                border: 'none', background: tip === v ? COLORS.forest : '#fff',
                color: tip === v ? '#fff' : COLORS.ink,
                borderRadius: 12, padding: '10px 0',
                fontFamily: TYPE.display, fontWeight: 700, fontSize: 14,
                cursor: 'pointer',
                boxShadow: tip === v ? 'none' : 'inset 0 0 0 1px rgba(10,31,21,0.08)',
                fontVariantNumeric: 'tabular-nums',
              }}>{v === 0 ? (lang === 'en' ? 'No tip' : 'ไม่ทิป') : `฿${v}`}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: `14px 16px ${SAFE_BOT + 14}px`, background: COLORS.cream,
      }}>
        <Btn variant="accent" size="md" onClick={() => go('home')}>
          <Ts k="submitReview" lang={lang} />
        </Btn>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HISTORY (Resident)
// ─────────────────────────────────────────────────────────────────────────────
function ResidentHistory({ go, lang }) {
  const trips = [
    { d: 'Today · 14:32', date: 'วันนี้ · 14:32', kg: 5.0, fare: 128.50, type: 'recyclables', driver: 'Somchai K.' },
    { d: 'Yesterday · 09:15', date: 'เมื่อวาน · 09:15', kg: 3.2, fare: 78, type: 'general', driver: 'Anan P.' },
    { d: 'May 6 · 17:00', date: '6 พ.ค. · 17:00', kg: 8.4, fare: 168, type: 'recyclables', driver: 'Mali J.' },
    { d: 'May 4 · 10:22', date: '4 พ.ค. · 10:22', kg: 2.1, fare: 60, type: 'organic', driver: 'Niran C.' },
    { d: 'Apr 28 · 16:48', date: '28 เม.ย. · 16:48', kg: 11.7, fare: 235, type: 'general', driver: 'Wichit S.' },
  ];
  const typeColor = (t) => t === 'recyclables' ? COLORS.green : t === 'organic' ? '#a36b2b' : t === 'hazardous' ? COLORS.coral : COLORS.muted;
  const typeIcon = (t) => t === 'recyclables' ? <IconRecycle size={18} color={COLORS.green} />
    : t === 'organic' ? <IconLeafSmall size={18} color="#a36b2b" />
    : t === 'hazardous' ? <IconWarn size={18} color={COLORS.coral} />
    : <IconTrash size={18} color={COLORS.inkSoft} />;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: COLORS.cream, overflow: 'auto' }}>
      <div style={{ padding: `${SAFE_TOP + 8}px 16px 12px`, display: 'flex', alignItems: 'center', gap: 12 }}>
        <CircleBtn onClick={() => go('home')} style={{ width: 36, height: 36 }}>
          <IconChevL size={18} color={COLORS.ink} />
        </CircleBtn>
        <div style={{ fontFamily: TYPE.body, fontSize: 17, fontWeight: 700, color: COLORS.ink }}>
          <Ts k="historyTitle" lang={lang} />
        </div>
      </div>

      <div style={{ padding: '4px 16px 120px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* summary card */}
        <Card pad={18} style={{ background: COLORS.forest, color: '#fff' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase', fontFamily: TYPE.display, opacity: 0.65 }}>
            <Ts k="thisMonth" lang={lang} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginTop: 12 }}>
            <StatNum value="12" label={lang === 'en' ? 'pickups' : 'ครั้ง'} color="#fff" />
            <StatNum value="38.4" unit="kg" label={lang === 'en' ? 'collected' : 'รวม'} color="#fff" />
            <StatNum value="฿1,140" label={lang === 'en' ? 'spent' : 'ใช้จ่าย'} color="#fff" />
          </div>
        </Card>

        <div style={{
          fontSize: 11, fontWeight: 700, color: COLORS.muted,
          letterSpacing: 1.2, textTransform: 'uppercase', fontFamily: TYPE.display,
          marginTop: 4,
        }}>
          {lang === 'en' ? 'Recent trips' : 'ล่าสุด'}
        </div>
        <Card pad={0}>
          {trips.map((t, i) => (
            <div key={i} style={{
              padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
              borderBottom: i < trips.length - 1 ? `1px solid ${COLORS.hairline}` : 'none',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `${typeColor(t.type)}1f`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>{typeIcon(t.type)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: TYPE.body, fontSize: 14, fontWeight: 700, color: COLORS.ink, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Ts k={t.type} lang={lang} />
                  <span style={{ color: COLORS.muted, fontSize: 12, fontWeight: 500 }}>· {t.kg} kg</span>
                </div>
                <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: TYPE.display, marginTop: 1 }}>
                  {lang === 'en' ? t.d : t.date} · {t.driver}
                </div>
              </div>
              <div style={{ fontFamily: TYPE.display, fontSize: 14, fontWeight: 700, color: COLORS.ink, fontVariantNumeric: 'tabular-nums' }}>
                ฿{t.fare}
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROFILE / IMPACT (Resident)
// ─────────────────────────────────────────────────────────────────────────────
function ResidentProfile({ go, lang }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: COLORS.cream, overflow: 'auto' }}>
      <div style={{ padding: `${SAFE_TOP + 8}px 16px 12px`, display: 'flex', alignItems: 'center', gap: 12 }}>
        <CircleBtn onClick={() => go('home')} style={{ width: 36, height: 36 }}>
          <IconChevL size={18} color={COLORS.ink} />
        </CircleBtn>
        <div style={{ fontFamily: TYPE.body, fontSize: 17, fontWeight: 700, color: COLORS.ink }}>
          <Ts k="profileTitle" lang={lang} />
        </div>
      </div>

      <div style={{ padding: '4px 16px 120px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Hero impact */}
        <Card pad={20} style={{
          background: `linear-gradient(160deg, ${COLORS.forest} 0%, #0a2c22 60%, #052018 100%)`,
          color: '#fff', position: 'relative', overflow: 'hidden',
        }}>
          {/* decorative leaves */}
          <div style={{ position: 'absolute', right: -20, top: -20, opacity: 0.2 }}>
            <IconLeaf size={140} color="#1fb55e" />
          </div>
          <div style={{ position: 'absolute', right: 60, bottom: -30, opacity: 0.12 }}>
            <IconLeaf size={90} color="#1fb55e" />
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase', fontFamily: TYPE.display, opacity: 0.7 }}>
            {lang === 'en' ? 'Lifetime impact' : 'ผลกระทบสะสม'}
          </div>
          <div style={{
            fontFamily: TYPE.display, fontSize: 64, fontWeight: 800,
            letterSpacing: -2.4, lineHeight: 1, marginTop: 8,
            fontVariantNumeric: 'tabular-nums',
          }}>
            128.4
            <span style={{ fontSize: 22, fontWeight: 600, opacity: 0.7, marginLeft: 6 }}>kg</span>
          </div>
          <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4, fontFamily: TYPE.body }}>
            <Ts k="kgRecycled" lang={lang} />
            <span style={{ opacity: 0.6, marginLeft: 6 }}>· {lang === 'en' ? 'across 47 trips' : '47 ครั้ง'}</span>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
            marginTop: 18, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.15)',
          }}>
            <StatNum value="312.4" unit="kg" label={<Ts k="co2Saved" lang={lang} />} color="#fff" />
            <StatNum value="14" label={<Ts k="treesEq" lang={lang} />} color="#fff" />
          </div>
        </Card>

        {/* Streak */}
        <Card pad={16}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.muted, letterSpacing: 1.2, textTransform: 'uppercase', fontFamily: TYPE.display }}>
                {lang === 'en' ? 'Weekly streak' : 'สถิติรายสัปดาห์'}
              </div>
              <div style={{ fontFamily: TYPE.display, fontSize: 28, fontWeight: 700, color: COLORS.ink, letterSpacing: -0.6, marginTop: 4 }}>
                6 weeks
              </div>
            </div>
            <div style={{ fontSize: 32 }}>🌿</div>
          </div>
          {/* mini bar chart */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 56, marginTop: 12 }}>
            {[3.2, 5.8, 4.1, 7.0, 4.8, 9.3, 4.6].map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                <div style={{
                  width: '100%', height: `${(v / 10) * 100}%`,
                  background: i === 5 ? COLORS.green : 'rgba(13,59,46,0.18)',
                  borderRadius: 4,
                }} />
                <div style={{ fontSize: 9, color: COLORS.muted, fontFamily: TYPE.display, fontWeight: 600 }}>
                  {['M','T','W','T','F','S','S'][i]}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* breakdown */}
        <Card pad={16}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: COLORS.muted,
            letterSpacing: 1.2, textTransform: 'uppercase', fontFamily: TYPE.display, marginBottom: 12,
          }}>
            {lang === 'en' ? 'By type' : 'แยกตามประเภท'}
          </div>
          {[
            { k: 'recyclables', kg: 84.2, color: COLORS.green },
            { k: 'general', kg: 31.5, color: COLORS.muted },
            { k: 'organic', kg: 9.8, color: '#a36b2b' },
            { k: 'hazardous', kg: 2.9, color: COLORS.coral },
          ].map((t, i) => (
            <div key={i} style={{ marginBottom: i === 3 ? 0 : 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: COLORS.ink, fontFamily: TYPE.body, fontWeight: 600 }}>
                  <Ts k={t.k} lang={lang} />
                </span>
                <span style={{ fontSize: 13, color: COLORS.ink, fontFamily: TYPE.display, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                  {t.kg} kg
                </span>
              </div>
              <div style={{ height: 6, background: 'rgba(10,31,21,0.06)', borderRadius: 99 }}>
                <div style={{ width: `${(t.kg / 84.2) * 100}%`, height: '100%', background: t.color, borderRadius: 99 }} />
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

Object.assign(window, {
  ResidentHome, ResidentSchedule, ResidentMatching, ResidentTracking,
  ResidentArrived, ResidentPayment, ResidentReview, ResidentHistory, ResidentProfile,
});
