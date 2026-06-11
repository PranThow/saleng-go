// driver.jsx — driver-side screens (7)

// Reuse SCREEN_W / SCREEN_H / SAFE_TOP / SAFE_BOT / MapChrome / CircleBtn from resident.jsx (already on window)

// ─────────────────────────────────────────────────────────────────────────────
// DRIVER HOME (online toggle, earnings, area map)
// ─────────────────────────────────────────────────────────────────────────────
function DriverHome({ go, lang, mapStyle }) {
  const [online, setOnline] = React.useState(true);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <MapView
        center={[100.5780, 13.7370]} zoom={14.5} pitch={50} bearing={-22}
        mapStyle={mapStyle}
        markers={[
          { type: 'driver', coord: [100.5780, 13.7370] },
          // requests waiting in area (ghost stops)
          { type: 'stop', coord: [100.5703, 13.7307], label: '1', color: '#0d3b2e' },
          { type: 'stop', coord: [100.5852, 13.7381], label: '2', color: '#0d3b2e' },
          { type: 'stop', coord: [100.5810, 13.7338], label: '3', color: '#0d3b2e' },
        ]}
      />

      <MapChrome
        left={
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 12px', borderRadius: 99,
            background: '#fff',
            boxShadow: '0 4px 12px rgba(10,31,21,0.06)',
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 99,
              background: 'linear-gradient(135deg,#0d3b2e,#1fb55e)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontFamily: TYPE.display, fontWeight: 700, fontSize: 13,
            }}>SK</div>
            <div>
              <div style={{ fontSize: 12, fontFamily: TYPE.body, fontWeight: 700, color: COLORS.ink, lineHeight: 1.1 }}>
                {lang === 'en' ? 'Somchai K.' : 'สมชาย ก.'}
              </div>
              <div style={{ fontSize: 10.5, color: COLORS.muted, fontFamily: TYPE.display, lineHeight: 1.1, display: 'flex', alignItems: 'center', gap: 3 }}>
                <IconStar size={10} color={COLORS.amber} strokeWidth={1} style={{ fill: COLORS.amber }} /> 4.92 · 1,284
              </div>
            </div>
          </div>
        }
        right={
          <button onClick={() => setOnline(!online)} style={{
            border: 'none', background: online ? COLORS.green : '#fff',
            color: online ? '#062417' : COLORS.ink,
            borderRadius: 99, padding: '10px 16px',
            fontFamily: TYPE.display, fontWeight: 700, fontSize: 13,
            display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer',
            boxShadow: online ? '0 4px 14px rgba(31,181,94,0.4)' : '0 4px 14px rgba(10,31,21,0.06)',
            transition: 'all .2s',
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: 99,
              background: online ? '#062417' : COLORS.muted,
              boxShadow: online ? '0 0 0 3px rgba(6,36,23,0.18)' : 'none',
            }} />
            <Ts k={online ? 'online' : 'offline'} lang={lang} />
          </button>
        }
      />

      {/* incoming request banner — shown after a moment */}
      <div style={{
        position: 'absolute', top: SAFE_TOP + 70, left: 16, right: 16,
        zIndex: 5,
      }}>
        <button onClick={() => go('request')} style={{
          width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer',
          background: 'rgba(13,59,46,0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          color: '#fff', borderRadius: 16, padding: '12px 14px',
          display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: '0 8px 24px rgba(13,59,46,0.3)',
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: COLORS.green,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><IconRecycle size={20} color="#062417" /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontFamily: TYPE.body, fontWeight: 700, lineHeight: 1.2 }}>
              <Ts k="newRequest" lang={lang} /> · 0.6 km
            </div>
            <div style={{ fontSize: 11, opacity: 0.7, fontFamily: TYPE.display, marginTop: 2 }}>
              {lang === 'en' ? 'Sukhumvit 39 · Recyclables · ฿95' : 'สุขุมวิท 39 · รีไซเคิล · ฿95'}
            </div>
          </div>
          <IconChevR size={18} color="#fff" />
        </button>
      </div>

      <BottomSheet pad={20}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* earnings card */}
          <Card pad={16} style={{ background: COLORS.cream, border: `1px solid ${COLORS.hairline}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.muted, letterSpacing: 1.2, textTransform: 'uppercase', fontFamily: TYPE.display }}>
                  <Ts k="todayEarnings" lang={lang} />
                </div>
                <div style={{
                  fontFamily: TYPE.display, fontSize: 36, fontWeight: 800, color: COLORS.forest,
                  letterSpacing: -1, lineHeight: 1, marginTop: 6, fontVariantNumeric: 'tabular-nums',
                }}>
                  ฿672.<span style={{ fontSize: 22, opacity: 0.6 }}>50</span>
                </div>
                <div style={{ fontSize: 12, color: COLORS.muted, fontFamily: TYPE.body, marginTop: 4 }}>
                  8 <Ts k="tripsToday" lang={lang} /> · 24.6 kg
                </div>
              </div>
              <button onClick={() => go('earnings')} style={{
                background: '#fff', border: `1px solid ${COLORS.hairline}`,
                color: COLORS.ink, borderRadius: 99, padding: '6px 12px',
                fontSize: 12, fontFamily: TYPE.display, fontWeight: 600,
                cursor: 'pointer',
              }}>
                {lang === 'en' ? 'Details' : 'รายละเอียด'}
              </button>
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
              {[0.6, 0.8, 0.5, 0.9, 0.4, 0.7, 0.85, 1.0].map((h, i) => (
                <div key={i} style={{
                  flex: 1, height: 24,
                  background: COLORS.green, opacity: 0.3 + h * 0.7,
                  borderRadius: 3,
                }} />
              ))}
            </div>
          </Card>

          {/* quick actions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <button onClick={() => go('route')} style={{
              border: 'none', background: COLORS.forest, color: '#fff',
              borderRadius: 14, padding: '14px 16px', textAlign: 'left',
              display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
              fontFamily: TYPE.body,
            }}>
              <IconRoute size={22} color="#fff" />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>
                  <Ts k="optimizedRoute" lang={lang} />
                </div>
                <div style={{ fontSize: 10.5, opacity: 0.7, marginTop: 2, fontFamily: TYPE.display }}>4 stops · 3.4 km</div>
              </div>
            </button>
            <button onClick={() => go('earnings')} style={{
              border: 'none', background: '#fafaf6', color: COLORS.ink,
              borderRadius: 14, padding: '14px 16px', textAlign: 'left',
              display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
              fontFamily: TYPE.body,
            }}>
              <IconWallet size={22} color={COLORS.forest} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>
                  <Ts k="earnings" lang={lang} />
                </div>
                <div style={{ fontSize: 10.5, color: COLORS.muted, marginTop: 2, fontFamily: TYPE.display }}>
                  {lang === 'en' ? 'Week ฿4,840' : 'สัปดาห์ ฿4,840'}
                </div>
              </div>
            </button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DRIVER REQUEST — incoming pickup with countdown
// ─────────────────────────────────────────────────────────────────────────────
function DriverRequest({ go, lang, mapStyle }) {
  const [count, setCount] = React.useState(15);
  React.useEffect(() => {
    if (count <= 0) { go('home'); return; }
    const t = setTimeout(() => setCount(count - 1), 1000);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: 'rgba(10,31,21,0.6)' }}>
      {/* map background */}
      <MapView center={BKK.user} zoom={15.5} pitch={45} bearing={-25} mapStyle={mapStyle}
               markers={[
                 { type: 'user', coord: BKK.user },
                 { type: 'driver', coord: [100.5780, 13.7370] },
               ]} />
      {/* dim overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,31,21,0.35)' }} />

      {/* request modal */}
      <div style={{
        position: 'absolute', left: 12, right: 12, bottom: 24,
        background: '#fff', borderRadius: 24,
        boxShadow: '0 -10px 40px rgba(10,31,21,0.3)',
        overflow: 'hidden',
      }}>
        {/* countdown bar */}
        <div style={{
          height: 4, width: '100%', background: 'rgba(10,31,21,0.06)',
        }}>
          <div style={{
            height: '100%', width: `${(count / 15) * 100}%`,
            background: count > 5 ? COLORS.green : COLORS.coral,
            transition: 'width 1s linear',
          }} />
        </div>
        <div style={{ padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 10px', borderRadius: 6,
              background: COLORS.greenSoft, color: COLORS.forest,
              fontSize: 11, fontWeight: 700, fontFamily: TYPE.display, letterSpacing: 0.4, textTransform: 'uppercase',
            }}>
              <Ts k="newRequest" lang={lang} />
            </div>
            <div style={{ fontSize: 12, color: COLORS.muted, fontFamily: TYPE.display, fontVariantNumeric: 'tabular-nums' }}>
              {count}s
            </div>
          </div>

          {/* fare */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 14 }}>
            <span style={{
              fontFamily: TYPE.display, fontSize: 44, fontWeight: 800, color: COLORS.ink,
              letterSpacing: -1.5, lineHeight: 1, fontVariantNumeric: 'tabular-nums',
            }}>฿95</span>
            <span style={{ fontSize: 13, color: COLORS.muted, fontFamily: TYPE.body }}>
              · 0.6 km · ~6 {lang === 'th' ? 'นาที' : 'min'}
            </span>
          </div>

          {/* trip details */}
          <div style={{ background: '#fafaf6', borderRadius: 14, padding: 14, marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: COLORS.greenSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconRecycle size={18} color={COLORS.forest} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontFamily: TYPE.body, fontWeight: 700, color: COLORS.ink }}>
                  <Ts k="recyclables" lang={lang} /> · 5-15 kg
                </div>
                <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: TYPE.body, marginTop: 1 }}>
                  {lang === 'en' ? 'Pran T. · ★ 4.8 · 24 trips' : 'ปรานต์ ท. · ★ 4.8 · 24 ครั้ง'}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: 99, background: COLORS.green }} />
                <div style={{ width: 1, height: 18, background: 'rgba(10,31,21,0.15)', marginTop: 2, marginBottom: 2 }} />
                <div style={{ width: 8, height: 8, borderRadius: 2, background: COLORS.forest }} />
              </div>
              <div style={{ flex: 1, fontFamily: TYPE.body, fontSize: 12, color: COLORS.ink, lineHeight: 1.4 }}>
                <div style={{ fontWeight: 600 }}>
                  {lang === 'en' ? '88/12 Soi Promsi 2, Sukhumvit 39' : '88/12 ซ.พร้อมศรี 2, สุขุมวิท 39'}
                </div>
                <div style={{ color: COLORS.muted, marginTop: 8 }}>
                  {lang === 'en' ? 'On-Nut Recycling Center, Sukhumvit 77' : 'ศูนย์รีไซเคิลอ่อนนุช, สุขุมวิท 77'}
                </div>
              </div>
            </div>
          </div>

          {/* actions */}
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn variant="ghost" size="md" onClick={() => go('home')}>
              <Ts k="decline" lang={lang} />
            </Btn>
            <Btn variant="accent" size="md" onClick={() => go('route')}
                 icon={<IconCheck size={18} color="#062417" strokeWidth={2.5} />}>
              <Ts k="accept" lang={lang} />
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DRIVER ROUTE - optimized multi-stop map
// ─────────────────────────────────────────────────────────────────────────────
function DriverRoute({ go, lang, mapStyle }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <MapView
        fitBounds={[[100.5660, 13.7290], [100.5880, 13.7410]]}
        zoom={14} pitch={55} bearing={-15} mapStyle={mapStyle}
        markers={[
          { type: 'driver', coord: [100.5790, 13.7395] },
          ...BKK.stops.map((s, i) => ({ type: 'stop', coord: s.coord, label: String(i + 1), color: i === 0 ? COLORS.green : COLORS.forest })),
        ]}
        route={{ coords: BKK.routeStops }}
      />

      <MapChrome
        left={<CircleBtn onClick={() => go('home')} style={{ width: 36, height: 36 }}>
          <IconChevL size={18} color={COLORS.ink} />
        </CircleBtn>}
        right={<StatusPill lang={lang}>
          {lang === 'en' ? 'TSP optimized · Mapbox' : lang === 'th' ? 'เส้นทางดีที่สุด' : 'TSP · ดีที่สุด'}
        </StatusPill>}
      />

      <BottomSheet pad={20} style={{ maxHeight: 460 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* summary row */}
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.muted, letterSpacing: 1.2, textTransform: 'uppercase', fontFamily: TYPE.display }}>
                <Ts k="optimizedRoute" lang={lang} />
              </div>
              <div style={{
                fontFamily: TYPE.body, fontSize: 22, fontWeight: 700, color: COLORS.ink,
                letterSpacing: -0.4, marginTop: 2,
              }}>
                4 <Ts k="stops" lang={lang} />
                <span style={{ color: COLORS.muted, fontWeight: 500, fontSize: 14, marginLeft: 6 }}>· 30.7 kg</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: TYPE.display, fontSize: 22, fontWeight: 700, color: COLORS.forest, letterSpacing: -0.5, fontVariantNumeric: 'tabular-nums' }}>
                ฿486
              </div>
              <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: TYPE.display, marginTop: 2 }}>
                {lang === 'en' ? 'est. earnings' : 'รายได้คาด'}
              </div>
            </div>
          </div>

          {/* metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            <MetricMini label={<Ts k="totalDistance" lang={lang} />} value="3.4 km" />
            <MetricMini label={<Ts k="estimatedTime" lang={lang} />} value={lang === 'th' ? '38 นาที' : '38 min'} />
            <MetricMini label={lang === 'en' ? 'Saved' : 'ประหยัด'} value={lang === 'th' ? '1.2 ลิตร' : '1.2L fuel'} accent />
          </div>

          {/* button */}
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn variant="ghost" size="md" onClick={() => go('stops')}
                 icon={<IconLayers size={18} color={COLORS.ink} />}>
              {lang === 'th' ? 'ดูจุดรับ' : 'View stops'}
            </Btn>
            <Btn variant="primary" size="md" onClick={() => go('pickup')}
                 icon={<IconNav size={18} color="#fff" />}>
              <Ts k="startRoute" lang={lang} />
            </Btn>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}

function MetricMini({ label, value, accent = false }) {
  return (
    <div style={{
      background: accent ? COLORS.greenSoft : '#fafaf6',
      borderRadius: 12, padding: '10px 12px',
    }}>
      <div style={{
        fontSize: 10, fontWeight: 700, color: accent ? COLORS.forest : COLORS.muted,
        letterSpacing: 0.6, textTransform: 'uppercase', fontFamily: TYPE.display,
      }}>{label}</div>
      <div style={{
        fontFamily: TYPE.display, fontSize: 16, fontWeight: 700,
        color: accent ? COLORS.forest : COLORS.ink, marginTop: 2,
        fontVariantNumeric: 'tabular-nums', letterSpacing: -0.3,
      }}>{value}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DRIVER STOPS - list of pickup stops
// ─────────────────────────────────────────────────────────────────────────────
function DriverStops({ go, lang }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: COLORS.cream, overflow: 'auto' }}>
      <div style={{ padding: `${SAFE_TOP + 8}px 16px 12px`, display: 'flex', alignItems: 'center', gap: 12 }}>
        <CircleBtn onClick={() => go('route')} style={{ width: 36, height: 36 }}>
          <IconChevL size={18} color={COLORS.ink} />
        </CircleBtn>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: TYPE.body, fontSize: 17, fontWeight: 700, color: COLORS.ink, letterSpacing: -0.3 }}>
            <Ts k="stops" lang={lang} /> · 4
          </div>
          <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: TYPE.display, marginTop: 1 }}>
            {lang === 'en' ? '3.4 km · 38 min · ฿486 est.' : '3.4 กม. · 38 นาที · ฿486'}
          </div>
        </div>
      </div>

      <div style={{ padding: '4px 16px 120px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {BKK.stops.map((s, i) => {
          const isNext = i === 0;
          return (
            <Card key={i} pad={14} style={isNext ? { boxShadow: `0 0 0 2px ${COLORS.forest}, 0 8px 24px rgba(13,59,46,0.12)` } : {}}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 10,
                  background: isNext ? COLORS.forest : '#fafaf6',
                  color: isNext ? '#fff' : COLORS.ink,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: TYPE.display, fontWeight: 800, fontSize: 14,
                  flexShrink: 0,
                }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <div style={{ fontFamily: TYPE.body, fontSize: 14, fontWeight: 700, color: COLORS.ink }}>
                      {s.name}
                    </div>
                    <div style={{
                      fontFamily: TYPE.display, fontSize: 14, fontWeight: 700,
                      color: COLORS.forest, fontVariantNumeric: 'tabular-nums',
                    }}>฿{Math.round(s.kg * 18 + 30)}</div>
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.muted, fontFamily: TYPE.body, marginTop: 2 }}>
                    {s.addr}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                    <Chip color={s.waste === 'recycle' ? COLORS.green : s.waste === 'organic' ? '#a36b2b' : COLORS.muted} active>
                      {s.waste === 'recycle' && <IconRecycle size={12} color="#062417" />}
                      {s.waste === 'organic' && <IconLeafSmall size={12} color="#fff" />}
                      {s.waste === 'general' && <IconTrash size={12} color="#fff" />}
                      <span>
                        {s.waste === 'recycle' ? <Ts k="recyclables" lang={lang} /> :
                         s.waste === 'organic' ? <Ts k="organic" lang={lang} /> :
                         <Ts k="general" lang={lang} />}
                      </span>
                    </Chip>
                    <span style={{ fontSize: 11, color: COLORS.muted, fontFamily: TYPE.display, fontVariantNumeric: 'tabular-nums' }}>
                      ~{s.kg} kg
                    </span>
                    {isNext && (
                      <div style={{
                        marginLeft: 'auto', fontSize: 11, fontWeight: 700,
                        color: COLORS.forest, fontFamily: TYPE.display, letterSpacing: 0.4,
                        textTransform: 'uppercase',
                      }}>
                        {lang === 'en' ? 'Next' : 'ถัดไป'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: COLORS.cream, padding: `14px 16px ${SAFE_BOT + 14}px`,
      }}>
        <Btn variant="primary" size="md" onClick={() => go('pickup')}
             icon={<IconNav size={18} color="#fff" />}>
          <Ts k="navigate" lang={lang} /> · A
        </Btn>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DRIVER PICKUP - confirm pickup with weight + photo
// ─────────────────────────────────────────────────────────────────────────────
function DriverPickup({ go, lang }) {
  const [weight, setWeight] = React.useState(5.0);
  const [type, setType] = React.useState('recyclables');

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: COLORS.cream, overflow: 'auto' }}>
      <div style={{ padding: `${SAFE_TOP + 8}px 16px 12px`, display: 'flex', alignItems: 'center', gap: 12 }}>
        <CircleBtn onClick={() => go('route')} style={{ width: 36, height: 36 }}>
          <IconChevL size={18} color={COLORS.ink} />
        </CircleBtn>
        <div style={{ fontFamily: TYPE.body, fontSize: 17, fontWeight: 700, color: COLORS.ink }}>
          <Ts k="pickupConfirm" lang={lang} /> · A
        </div>
      </div>

      <div style={{ padding: '4px 16px 120px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* customer */}
        <Card pad={14}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 99,
              background: 'linear-gradient(135deg,#0d3b2e,#1fb55e)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: 14, fontFamily: TYPE.display,
            }}>P</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: TYPE.body, fontSize: 14, fontWeight: 700, color: COLORS.ink }}>
                {lang === 'en' ? 'Pran T.' : 'ปรานต์ ท.'}
              </div>
              <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: TYPE.body, marginTop: 1 }}>
                {lang === 'en' ? '88/12 Soi Promsi 2' : '88/12 ซ.พร้อมศรี 2'}
              </div>
            </div>
            <CircleBtn style={{ width: 36, height: 36 }}>
              <IconPhone size={16} color={COLORS.forest} />
            </CircleBtn>
          </div>
        </Card>

        {/* photo */}
        <div>
          <SectionLabel lang={lang}>
            <Ts k="takePhoto" lang={lang} />
          </SectionLabel>
          <div style={{ marginTop: 8 }}>
            <button style={{
              width: '100%', height: 180, border: `1px dashed ${COLORS.hairline}`,
              background: '#fff', borderRadius: 16, cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontFamily: TYPE.body, color: COLORS.muted,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 99, background: COLORS.greenSoft,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <IconCamera size={26} color={COLORS.forest} />
              </div>
              <div style={{ fontSize: 13, color: COLORS.ink, fontWeight: 600 }}>
                <Ts k="takePhoto" lang={lang} />
              </div>
              <div style={{ fontSize: 11 }}>
                {lang === 'en' ? 'Photo of waste at pickup' : 'ถ่ายภาพขยะ ณ จุดรับ'}
              </div>
            </button>
          </div>
        </div>

        {/* waste type */}
        <div>
          <SectionLabel lang={lang}>
            <Ts k="wasteType" lang={lang} />
          </SectionLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
            {['recyclables', 'general', 'organic', 'hazardous'].map((k) => (
              <Chip key={k} active={type === k} color={
                k === 'recyclables' ? COLORS.green : k === 'organic' ? '#a36b2b' :
                k === 'hazardous' ? COLORS.coral : COLORS.muted
              } onClick={() => setType(k)}>
                <Ts k={k} lang={lang} />
              </Chip>
            ))}
          </div>
        </div>

        {/* weight */}
        <div>
          <SectionLabel lang={lang}>
            <Ts k="recordWeight" lang={lang} />
          </SectionLabel>
          <Card pad={16} style={{ marginTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 6 }}>
              <span style={{
                fontFamily: TYPE.display, fontSize: 56, fontWeight: 800, color: COLORS.ink,
                letterSpacing: -2, lineHeight: 1, fontVariantNumeric: 'tabular-nums',
              }}>{weight.toFixed(1)}</span>
              <span style={{ fontSize: 18, color: COLORS.muted, fontWeight: 600, fontFamily: TYPE.body }}>kg</span>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 16 }}>
              <button onClick={() => setWeight(Math.max(0, +(weight - 0.5).toFixed(1)))} style={{
                width: 44, height: 44, borderRadius: 99, border: 'none',
                background: '#fafaf6', color: COLORS.ink, cursor: 'pointer',
                fontSize: 22, fontWeight: 600, fontFamily: TYPE.display,
              }}>−</button>
              <input type="range" min={0} max={20} step={0.5} value={weight}
                     onChange={(e) => setWeight(+e.target.value)}
                     style={{ flex: 1, maxWidth: 200, accentColor: COLORS.forest }} />
              <button onClick={() => setWeight(+(weight + 0.5).toFixed(1))} style={{
                width: 44, height: 44, borderRadius: 99, border: 'none',
                background: '#fafaf6', color: COLORS.ink, cursor: 'pointer',
                fontSize: 22, fontWeight: 600, fontFamily: TYPE.display,
              }}>+</button>
            </div>
            <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: TYPE.body, textAlign: 'center', marginTop: 12 }}>
              {lang === 'en' ? `Final fare: ฿${Math.round(weight * 18 + 30)}.50` : `ราคาสุดท้าย: ฿${Math.round(weight * 18 + 30)}.50`}
            </div>
          </Card>
        </div>
      </div>

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: COLORS.cream, padding: `14px 16px ${SAFE_BOT + 14}px`,
      }}>
        <Btn variant="accent" size="md" onClick={() => go('home')}
             icon={<IconCheck size={18} color="#062417" strokeWidth={2.5} />}>
          {lang === 'en' ? 'Confirm pickup · ฿' + Math.round(weight * 18 + 30) + '.50' :
           lang === 'th' ? `ยืนยัน · ฿${Math.round(weight * 18 + 30)}.50` :
           `ยืนยัน · ฿${Math.round(weight * 18 + 30)}.50`}
        </Btn>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DRIVER EARNINGS
// ─────────────────────────────────────────────────────────────────────────────
function DriverEarnings({ go, lang }) {
  const [period, setPeriod] = React.useState('week');
  const days = lang === 'en' ? ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] : ['จ','อ','พ','พฤ','ศ','ส','อา'];
  const heights = [420, 380, 540, 460, 720, 980, 672];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: COLORS.cream, overflow: 'auto' }}>
      <div style={{ padding: `${SAFE_TOP + 8}px 16px 12px`, display: 'flex', alignItems: 'center', gap: 12 }}>
        <CircleBtn onClick={() => go('home')} style={{ width: 36, height: 36 }}>
          <IconChevL size={18} color={COLORS.ink} />
        </CircleBtn>
        <div style={{ fontFamily: TYPE.body, fontSize: 17, fontWeight: 700, color: COLORS.ink }}>
          <Ts k="earnings" lang={lang} />
        </div>
      </div>

      <div style={{ padding: '4px 16px 120px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* period seg */}
        <div style={{
          display: 'flex', background: '#fafaf6', borderRadius: 12, padding: 4,
        }}>
          {[
            { k: 'today', l: lang === 'en' ? 'Today' : 'วันนี้' },
            { k: 'week', l: lang === 'en' ? 'Week' : 'สัปดาห์' },
            { k: 'month', l: lang === 'en' ? 'Month' : 'เดือน' },
          ].map((p) => (
            <button key={p.k} onClick={() => setPeriod(p.k)} style={{
              flex: 1, border: 'none',
              background: period === p.k ? '#fff' : 'transparent',
              color: period === p.k ? COLORS.ink : COLORS.muted,
              fontFamily: TYPE.display, fontWeight: 600, fontSize: 13,
              padding: '10px 0', borderRadius: 8, cursor: 'pointer',
              boxShadow: period === p.k ? '0 1px 2px rgba(10,31,21,0.1)' : 'none',
            }}>{p.l}</button>
          ))}
        </div>

        {/* hero */}
        <Card pad={20} style={{
          background: `linear-gradient(155deg, ${COLORS.forest} 0%, #082a20 100%)`,
          color: '#fff', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -30, top: -30, opacity: 0.18 }}>
            <IconWallet size={150} color="#1fb55e" />
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase', fontFamily: TYPE.display, opacity: 0.7 }}>
            {period === 'today' ? <Ts k="todayEarnings" lang={lang} /> :
             period === 'week' ? (lang === 'en' ? 'This week' : 'สัปดาห์นี้') :
             (lang === 'en' ? 'This month' : 'เดือนนี้')}
          </div>
          <div style={{
            fontFamily: TYPE.display, fontSize: 56, fontWeight: 800,
            letterSpacing: -2, lineHeight: 1, marginTop: 6,
            fontVariantNumeric: 'tabular-nums',
          }}>
            ฿{period === 'today' ? '672' : period === 'week' ? '4,840' : '18,920'}
          </div>
          <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4, fontFamily: TYPE.body }}>
            {period === 'today' ? '8' : period === 'week' ? '52' : '218'} {lang === 'en' ? 'pickups' : 'งาน'}
            <span style={{ opacity: 0.6, marginLeft: 6 }}>·</span>
            <span style={{ opacity: 0.6, marginLeft: 6 }}>
              {period === 'today' ? '24.6 kg' : period === 'week' ? '184.2 kg' : '768.4 kg'}
            </span>
          </div>

          {/* bar chart */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 110, marginTop: 18 }}>
            {heights.map((h, i) => {
              const pct = (h / 1000) * 88; // px height out of 88
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 6, height: '100%' }}>
                  <div style={{
                    width: '100%', height: pct,
                    background: i === 6 ? COLORS.green : 'rgba(255,255,255,0.45)',
                    borderRadius: 4,
                  }} />
                  <div style={{ fontSize: 9, opacity: 0.7, fontFamily: TYPE.display, fontWeight: 600, letterSpacing: 0.4 }}>
                    {days[i]}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* breakdown */}
        <Card pad={0}>
          {[
            { l: lang === 'en' ? 'Pickup fares' : 'ค่ารับขยะ', v: '฿4,310', i: <IconRecycle size={16} color={COLORS.green} /> },
            { l: lang === 'en' ? 'Tips received' : 'ทิป', v: '฿340', i: <IconStar size={16} color={COLORS.amber} /> },
            { l: lang === 'en' ? 'Bonuses' : 'โบนัส', v: '฿190', i: <IconBolt size={16} color={COLORS.forest} /> },
            { l: lang === 'en' ? 'Saleng Go fee' : 'ค่าบริการ', v: '−฿0', i: <IconShield size={16} color={COLORS.muted} /> },
          ].map((r, i) => (
            <div key={i} style={{
              padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
              borderBottom: i < 3 ? `1px solid ${COLORS.hairline}` : 'none',
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: '#fafaf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {r.i}
              </div>
              <div style={{ flex: 1, fontSize: 14, fontFamily: TYPE.body, fontWeight: 600, color: COLORS.ink }}>
                {r.l}
              </div>
              <div style={{ fontFamily: TYPE.display, fontSize: 14, fontWeight: 700, color: COLORS.ink, fontVariantNumeric: 'tabular-nums' }}>
                {r.v}
              </div>
            </div>
          ))}
        </Card>
      </div>

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: COLORS.cream, padding: `14px 16px ${SAFE_BOT + 14}px`,
      }}>
        <Btn variant="primary" size="md"
             icon={<IconWallet size={18} color="#fff" />}>
          <Ts k="cashout" lang={lang} /> · ฿4,840
        </Btn>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DRIVER PROFILE
// ─────────────────────────────────────────────────────────────────────────────
function DriverProfile({ go, lang }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: COLORS.cream, overflow: 'auto' }}>
      <div style={{ padding: `${SAFE_TOP + 8}px 16px 12px`, display: 'flex', alignItems: 'center', gap: 12 }}>
        <CircleBtn onClick={() => go('home')} style={{ width: 36, height: 36 }}>
          <IconChevL size={18} color={COLORS.ink} />
        </CircleBtn>
        <div style={{ fontFamily: TYPE.body, fontSize: 17, fontWeight: 700, color: COLORS.ink }}>
          <Ts k="profile" lang={lang} />
        </div>
      </div>

      <div style={{ padding: '4px 16px 40px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Card pad={20} style={{ textAlign: 'center' }}>
          <div style={{
            width: 80, height: 80, borderRadius: 99, margin: '0 auto 12px',
            background: 'linear-gradient(135deg,#0d3b2e,#1fb55e)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: 28, fontFamily: TYPE.display,
            position: 'relative',
          }}>
            SK
            <div style={{
              position: 'absolute', right: -2, bottom: -2,
              width: 24, height: 24, borderRadius: 99,
              background: COLORS.green, border: '3px solid #fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <IconCheck size={12} color="#062417" strokeWidth={3} />
            </div>
          </div>
          <div style={{ fontFamily: TYPE.body, fontSize: 18, fontWeight: 700, color: COLORS.ink }}>
            {lang === 'en' ? 'Khun Somchai K.' : 'คุณสมชาย ก.'}
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            marginTop: 4, fontSize: 13, color: COLORS.muted, fontFamily: TYPE.body,
          }}>
            <IconStar size={14} color={COLORS.amber} strokeWidth={1} style={{ fill: COLORS.amber }} />
            4.92
            <span style={{ opacity: 0.6 }}>· 1,284 {lang === 'en' ? 'trips' : 'ครั้ง'}</span>
            <span style={{ opacity: 0.6 }}>· {lang === 'en' ? 'verified' : 'ยืนยันแล้ว'}</span>
          </div>
        </Card>

        {/* vehicle */}
        <Card pad={0}>
          <div style={{
            padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
            borderBottom: `1px solid ${COLORS.hairline}`,
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: COLORS.greenSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconBike size={22} color={COLORS.forest} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: TYPE.display, fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase' }}>
                <Ts k="vehicle" lang={lang} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.ink, fontFamily: TYPE.body, marginTop: 2 }}>
                {lang === 'en' ? 'Saleng tricycle · Green' : 'ซาเล้ง · สีเขียว'}
              </div>
              <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: TYPE.display, marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>
                กท 8829 · 250 L capacity
              </div>
            </div>
            <IconChevR size={16} color={COLORS.muted} />
          </div>
          {[
            { l: lang === 'en' ? 'PromptPay' : 'พร้อมเพย์', s: '081-xxx-2829', i: <IconQR size={20} color={COLORS.forest} /> },
            { l: lang === 'en' ? 'Service area' : 'พื้นที่บริการ', s: 'Watthana, Khlong Toei', i: <IconPin size={20} color={COLORS.forest} /> },
            { l: lang === 'en' ? 'Documents' : 'เอกสาร', s: lang === 'en' ? 'Verified' : 'ยืนยันแล้ว', i: <IconShield size={20} color={COLORS.green} /> },
          ].map((r, i) => (
            <div key={i} style={{
              padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
              borderBottom: i < 2 ? `1px solid ${COLORS.hairline}` : 'none',
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: '#fafaf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {r.i}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: COLORS.ink, fontFamily: TYPE.body, fontWeight: 600 }}>{r.l}</div>
                <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: TYPE.display, marginTop: 1 }}>{r.s}</div>
              </div>
              <IconChevR size={16} color={COLORS.muted} />
            </div>
          ))}
        </Card>

        {/* impact stats */}
        <Card pad={16}>
          <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.muted, letterSpacing: 1.2, textTransform: 'uppercase', fontFamily: TYPE.display, marginBottom: 12 }}>
            {lang === 'en' ? 'Lifetime impact' : 'ผลกระทบสะสม'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <StatNum value="3.2t" label={lang === 'en' ? 'collected' : 'รวบรวม'} />
            <StatNum value="1.8t" label={lang === 'en' ? 'recycled' : 'รีไซเคิล'} color={COLORS.green} />
            <StatNum value="1,284" label={lang === 'en' ? 'pickups' : 'งาน'} />
            <StatNum value="412" label={lang === 'en' ? 'CO₂ kg saved' : 'CO₂ ลดได้'} color={COLORS.green} />
          </div>
        </Card>
      </div>
    </div>
  );
}

Object.assign(window, {
  DriverHome, DriverRequest, DriverRoute, DriverStops, DriverPickup, DriverEarnings, DriverProfile,
});
