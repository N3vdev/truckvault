import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, CheckCircle2, Clock, Package, Bell, Activity, Navigation } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stops = [
  { city: 'Mumbai, MH', status: 'completed', time: 'May 12, 08:14', label: 'Origin' },
  { city: 'Pune, MH', status: 'completed', time: 'May 12, 17:40', label: 'Transit Hub' },
  { city: 'Nagpur, MH', status: 'active', time: 'In Progress', label: 'Current' },
  { city: 'Hyderabad, TS', status: 'pending', time: 'Est. May 13, 14:00', label: 'Next' },
  { city: 'Bengaluru, KA', status: 'pending', time: 'Est. May 14, 09:00', label: 'Destination' },
];

const metrics = [
  { icon: Navigation, label: 'Speed', value: '82 km/h', color: '#e8520a' },
  { icon: Clock, label: 'ETA', value: '18h 24m', color: '#2c3e6b' },
  { icon: Activity, label: 'Temp.', value: '22°C', color: '#0f766e' },
  { icon: Package, label: 'Weight', value: '12.8 tonnes', color: '#7c3aed' },
];

export default function Tracking() {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const titleRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    gsap.fromTo(titleRef.current, { opacity: 0, y: 28 }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
    });
    gsap.fromTo(panelRef.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: panelRef.current, start: 'top 82%',
        onEnter: () => { let p = 0; const t = setInterval(() => { p++; setProgress(p); if (p >= 47) clearInterval(t); }, 18); }
      },
    });
  }, []);

  return (
    <section id="tracking" ref={sectionRef} style={{ padding: 'clamp(80px,12vw,140px) clamp(20px,5vw,80px)', background: 'var(--cream-dark)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '20%', right: '-8%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(44,62,107,0.05), transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div ref={titleRef} style={{ textAlign: 'center', marginBottom: 60, opacity: 0 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 16px 5px 8px', borderRadius: '100px',
            background: '#eef1f8', border: '1px solid rgba(44,62,107,0.2)',
            fontSize: '0.75rem', fontWeight: 700, color: '#2c3e6b',
            letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 18,
          }}>
            <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#2c3e6b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={10} color="#fff" />
            </span>
            Live Tracking
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.2rem)', letterSpacing: '-0.04em', marginBottom: 14, lineHeight: 1.1 }}>
            Know exactly <span style={{ color: '#2c3e6b' }}>where it is.</span>
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--ink-muted)', maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>
            30-second GPS updates, predictive ETAs, and instant exception alerts — all in one dashboard.
          </p>
        </div>

        <div ref={panelRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, opacity: 0 }}>
          {/* Map Panel */}
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', minHeight: 480 }}>
            {/* Simulated map bg */}
            <div style={{ position: 'relative', height: '100%', background: 'linear-gradient(160deg, #e8f0f8 0%, #dde8f0 40%, #e4eef5 100%)', overflow: 'hidden', minHeight: 480 }}>
              {[...Array(12)].map((_, i) => (
                <div key={`h${i}`} style={{ position: 'absolute', left: 0, right: 0, top: `${i * 8.5}%`, height: 1, background: 'rgba(44,62,107,0.07)' }} />
              ))}
              {[...Array(12)].map((_, i) => (
                <div key={`v${i}`} style={{ position: 'absolute', top: 0, bottom: 0, left: `${i * 8.5}%`, width: 1, background: 'rgba(44,62,107,0.07)' }} />
              ))}

              {/* Road-like shapes */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 400 480" preserveAspectRatio="none">
                <path d="M30 460 Q80 420 130 390 Q180 350 220 310 Q260 265 300 220 Q340 170 370 80" fill="none" stroke="rgba(200,210,225,0.9)" strokeWidth="14" strokeLinecap="round" />
                <path d="M30 460 Q80 420 130 390 Q180 350 220 310 Q260 265 300 220 Q340 170 370 80" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" />
                {/* Completed segment */}
                <path d="M30 460 Q80 420 130 390 Q180 350 220 310" fill="none" stroke="#e8520a" strokeWidth="4" strokeLinecap="round" />
                {/* Active portion dashed */}
                <path d="M220 310 Q260 265 300 220" fill="none" stroke="#2c3e6b" strokeWidth="3" strokeDasharray="8 5" strokeLinecap="round" />
                <path d="M300 220 Q340 170 370 80" fill="none" stroke="#2c3e6b" strokeWidth="2" strokeDasharray="5 7" strokeLinecap="round" opacity="0.35" />
              </svg>

              {/* Stops */}
              {[
                { x: '7%', y: '94%', done: true },
                { x: '32%', y: '79%', done: true },
                { x: '54%', y: '63%', done: false, active: true },
                { x: '74%', y: '44%', done: false },
                { x: '91%', y: '15%', done: false },
              ].map((pin, i) => (
                <div key={i} style={{ position: 'absolute', left: pin.x, top: pin.y, transform: 'translate(-50%,-50%)', zIndex: 5 }}>
                  {pin.active ? (
                    <div style={{ position: 'relative' }}>
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#2c3e6b', boxShadow: '0 0 0 5px rgba(44,62,107,0.18)', animation: 'pulse2 2s ease-in-out infinite' }} />
                      <style>{`@keyframes pulse2 { 0%,100%{box-shadow:0 0 0 5px rgba(44,62,107,0.15)} 50%{box-shadow:0 0 0 14px rgba(44,62,107,0.04)} }`}</style>
                    </div>
                  ) : (
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: pin.done ? '#e8520a' : 'rgba(26,22,18,0.15)', border: `2px solid ${pin.done ? '#e8520a' : 'rgba(26,22,18,0.1)'}` }} />
                  )}
                </div>
              ))}

              {/* Truck popup */}
              <div style={{
                position: 'absolute', left: '52%', top: '58%', transform: 'translate(-50%, -130%)',
                background: 'white', border: '1px solid var(--border)', borderRadius: 12,
                padding: '8px 14px', boxShadow: 'var(--shadow)',
                fontSize: '0.75rem', whiteSpace: 'nowrap',
                display: 'flex', alignItems: 'center', gap: 7,
              }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#0f766e', animation: 'blink 1.5s ease-in-out infinite' }} />
                <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
                <span style={{ fontWeight: 600, color: 'var(--ink)' }}>TRK-4821</span>
                <span style={{ color: 'var(--ink-muted)' }}>· Live</span>
              </div>

              {/* Map attribution strip */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)', borderTop: '1px solid var(--border)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <MapPin size={13} color="var(--orange)" />
                <span style={{ fontSize: '0.72rem', color: 'var(--ink-soft)', fontWeight: 500 }}>Currently near Nagpur, MH · 47% complete</span>
              </div>
            </div>
          </div>

          {/* Info panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Header card */}
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)', marginBottom: 4 }}>Shipment #TV-48219-IN</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.03em' }}>Mumbai → Bengaluru</h3>
                </div>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: '100px', background: 'rgba(15,118,110,0.08)', border: '1px solid rgba(15,118,110,0.2)', fontSize: '0.7rem', fontWeight: 700, color: '#0f766e' }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#0f766e' }} /> In Transit
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--ink-muted)', marginBottom: 8 }}>
                <span>Progress</span><span style={{ fontWeight: 700, color: 'var(--orange)' }}>{progress}%</span>
              </div>
              <div style={{ height: 6, background: 'var(--cream-mid)', borderRadius: '100px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #e8520a, #c4922a)', borderRadius: '100px', transition: 'width 0.05s linear' }} />
              </div>
            </div>

            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {metrics.map(({ icon: Icon, label, value, color }) => (
                <div key={label} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '16px', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--cream-dark)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
                    <Icon size={12} color={color} />
                    <span style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color, letterSpacing: '-0.02em' }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Route stops */}
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px', flex: 1 }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)', marginBottom: 18 }}>Route</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {stops.map((stop, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, position: 'relative' }}>
                    {i < stops.length - 1 && (
                      <div style={{ position: 'absolute', left: 8, top: 22, width: 2, height: 'calc(100% - 10px)', background: stop.status === 'completed' ? '#e8520a' : 'var(--cream-mid)' }} />
                    )}
                    <div style={{ width: 18, height: 18, borderRadius: '50%', flexShrink: 0, marginTop: 2, zIndex: 1, background: stop.status === 'completed' ? '#e8520a' : stop.status === 'active' ? '#2c3e6b' : 'var(--sand)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: stop.status === 'active' ? '3px solid rgba(44,62,107,0.2)' : 'none' }}>
                      {stop.status === 'completed' && <CheckCircle2 size={10} color="#fff" />}
                      {stop.status === 'active' && <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff' }} />}
                    </div>
                    <div style={{ paddingBottom: 18, flex: 1 }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: stop.status === 'active' ? '#2c3e6b' : 'var(--ink)', marginBottom: 2 }}>{stop.city}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--ink-muted)' }}>{stop.label} · {stop.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alert */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, background: '#fdf6e8', border: '1px solid rgba(196,146,42,0.3)', borderRadius: 'var(--radius)', padding: '14px 16px' }}>
              <Bell size={14} color="#c4922a" style={{ flexShrink: 0, marginTop: 1 }} />
              <div style={{ fontSize: '0.78rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                <strong style={{ color: '#c4922a' }}>Weather notice:</strong> Possible delay in Dallas corridor — estimated +30 min added to ETA.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
