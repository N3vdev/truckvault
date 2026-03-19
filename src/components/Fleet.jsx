import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Gauge, Users, Truck, Star, ArrowRight, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const timerRef = useRef(null);

const fleet = [
  {
    name: 'ProHaul XL 18-Wheeler',
    category: 'Heavy Freight',
    capacity: '44,000 kg',
    range: 'Pan-India',
    crew: 'Solo / Team',
    rating: 4.9,
    reviews: 847,
    features: ['Air Ride Suspension', 'GPS Compliant', 'Satellite Tracking'],
    accent: '#e8520a',
    bgColor: '#fdf0ea',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85&auto=format&fit=crop',
    desc: 'Our flagship long-haul workhorse. Built for Delhi–Mumbai–Bengaluru runs with uncompromising reliability.',
  },
  {
    name: 'ColdLine Reefer 53\'',
    category: 'Refrigerated',
    capacity: '20,000 kg',
    range: 'Metro Cities',
    crew: 'Solo / Team',
    rating: 4.8,
    reviews: 512,
    features: ['-20°C to 18°C Range', 'Dual-Zone Temp', 'Remote Monitor'],
    accent: '#2c3e6b',
    bgColor: '#eef1f8',
    img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=85&auto=format&fit=crop',
    desc: 'Precision temperature control for perishables and pharma. Every degree monitored, every kilometre.',
  },
  {
    name: 'FlexHaul Sprinter 170',
    category: 'Last-Mile Express',
    capacity: '1,500 kg',
    range: 'Urban Zones',
    crew: 'Solo',
    rating: 4.7,
    reviews: 1203,
    features: ['City Agile', 'HVAC Cargo Hold', 'Same-Day Ready'],
    accent: '#0f766e',
    bgColor: '#f0faf9',
    img: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=900&q=85&auto=format&fit=crop',
    desc: 'Fast, nimble, and city-ready. Your go-to for express urban delivery across all major Indian metros.',
  },
  {
    name: 'TitanHaul Flatbed Pro',
    category: 'Oversized Cargo',
    capacity: '35,000 kg',
    range: 'Industrial Routes',
    crew: 'Team Required',
    rating: 4.9,
    reviews: 389,
    features: ['Extendable Deck', 'Tarp-Ready', 'Crane Hook Points'],
    accent: '#c4922a',
    bgColor: '#fdf6e8',
    img: 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=900&q=85&auto=format&fit=crop',
    desc: 'When dimensions exceed the ordinary. For industrial cargo, construction equipment, and project loads.',
  },
  {
    name: 'MetroVan Cargo EV',
    category: 'Electric Delivery',
    capacity: '900 kg',
    range: 'EV Corridors',
    crew: 'Solo',
    rating: 4.6,
    reviews: 291,
    features: ['Zero Emissions', '300km Range', 'Smart Route AI'],
    accent: '#7c3aed',
    bgColor: '#f3f0fd',
    img: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&q=85&auto=format&fit=crop',
    desc: 'The future of urban freight in India. Full electric, zero emissions, AI-optimized route planning.',
  },
];

// ── Card component (rendered once per vehicle, shown/hidden via CSS) ──────────
function FleetCard({ vehicle, position, onClick }) {
  // position: -2, -1, 0, 1, 2 (or beyond = hidden)
  const isActive  = position === 0;
  const isAdjacent = Math.abs(position) === 1;
  const isVisible = Math.abs(position) <= 1;

  const style = {
    position: 'absolute',
    top: 0,
    width: '100%',
    maxWidth: 600,
    left: '50%',
    // Use translate3d for GPU acceleration; combine offset + center
    transform: (() => {
      const pct = position * 105; // percent of own width
      const scale = isActive ? 1 : 0.85;
      return `translateX(calc(-50% + ${pct}%)) scale(${scale})`;
    })(),
    opacity: isActive ? 1 : isAdjacent ? 0.55 : 0,
    pointerEvents: isActive ? 'all' : isAdjacent ? 'all' : 'none',
    zIndex: isActive ? 10 : isAdjacent ? 5 : 1,
    transition: 'transform 0.48s cubic-bezier(0.4,0,0.2,1), opacity 0.48s cubic-bezier(0.4,0,0.2,1)',
    cursor: isAdjacent ? 'pointer' : 'default',
  };

  const Icon = Truck;

  return (
    <div style={style} onClick={isAdjacent ? onClick : undefined}>
      <div style={{
        width: '100%',
        background: '#fff',
        border: `1.5px solid ${isActive ? vehicle.accent + '35' : 'var(--border)'}`,
        borderRadius: 28,
        overflow: 'hidden',
        boxShadow: isActive
          ? `0 32px 72px rgba(26,22,18,0.14), 0 0 0 1px ${vehicle.accent}18`
          : '0 4px 20px rgba(26,22,18,0.07)',
        transition: 'box-shadow 0.48s ease, border-color 0.48s ease',
        pointerEvents: 'none', // handled by outer div
      }}>
        {/* ── Image ── */}
        <div style={{ position: 'relative', height: 240, overflow: 'hidden', background: vehicle.bgColor }}>
          <img
            src={vehicle.img}
            alt={vehicle.name}
            style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              transform: 'scale(1)', transition: 'transform 0.5s ease',
            }}
            onMouseEnter={e => { if (isActive) e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
          {/* gradient */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,22,18,0.35) 0%, transparent 55%)' }} />
          {/* Category pill */}
          <div style={{
            position: 'absolute', top: 14, left: 14,
            padding: '4px 12px', borderRadius: '100px',
            background: 'rgba(250,248,244,0.92)', backdropFilter: 'blur(12px)',
            border: `1px solid ${vehicle.accent}25`,
            fontSize: '0.68rem', fontWeight: 700, color: vehicle.accent, letterSpacing: '0.05em',
          }}>{vehicle.category}</div>
          {/* Rating */}
          <div style={{
            position: 'absolute', top: 14, right: 14,
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '4px 10px', borderRadius: '100px',
            background: 'rgba(250,248,244,0.92)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(26,22,18,0.1)',
            fontSize: '0.7rem', fontWeight: 700, color: 'var(--ink)',
          }}>
            <Star size={11} color="#f59e0b" fill="#f59e0b" />
            {vehicle.rating}
            <span style={{ color: 'var(--ink-muted)', fontWeight: 400 }}>({vehicle.reviews})</span>
          </div>
          {/* Name on image */}
          <div style={{ position: 'absolute', bottom: 14, left: 16, right: 16 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.03em', color: '#fff', textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>{vehicle.name}</h3>
          </div>
        </div>

        {/* ── Info ── */}
        <div style={{ padding: '20px 22px 24px' }}>
          <p style={{ fontSize: '0.86rem', color: 'var(--ink-muted)', lineHeight: 1.7, marginBottom: 18 }}>{vehicle.desc}</p>

          {/* Specs row */}
          <div style={{ display: 'flex', gap: 0, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', marginBottom: 18 }}>
            {[
              { icon: Gauge,   label: 'Capacity', value: vehicle.capacity },
              { icon: MapPin,  label: 'Range',    value: vehicle.range },
              { icon: Users,   label: 'Crew',     value: vehicle.crew },
            ].map(({ icon: Icon2, label, value }, i) => (
              <div key={i} style={{
                flex: 1, padding: '12px 10px', textAlign: 'center',
                borderRight: i < 2 ? '1px solid var(--border)' : 'none',
                background: 'var(--cream)',
              }}>
                <Icon2 size={13} color={vehicle.accent} style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '0.62rem', color: 'var(--ink-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink)' }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Feature tags */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
            {vehicle.features.map((f, i) => (
              <span key={i} style={{
                padding: '4px 11px', borderRadius: '100px',
                background: vehicle.bgColor, border: `1px solid ${vehicle.accent}22`,
                fontSize: '0.68rem', color: vehicle.accent, fontWeight: 600,
              }}>{f}</span>
            ))}
          </div>

          {/* CTA */}
          <button
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              width: '100%', padding: '13px 20px', borderRadius: '100px',
              background: `linear-gradient(135deg, ${vehicle.accent}, ${vehicle.accent}cc)`,
              color: '#fff', fontSize: '0.9rem', fontWeight: 700,
              boxShadow: `0 6px 24px ${vehicle.accent}35`,
              border: 'none',
              transition: 'all 0.25s ease',
              pointerEvents: isActive ? 'all' : 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 36px ${vehicle.accent}50`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 6px 24px ${vehicle.accent}35`; }}
          >
            Request This Vehicle <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Fleet() {
  const [current, setCurrent] = useState(0);
  const [locked, setLocked]   = useState(false);
  const dragStart = useRef(null);
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const trackRef   = useRef(null);

  const total = fleet.length;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } }
      );
      gsap.fromTo(trackRef.current,
        { opacity: 0, y: 44 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: trackRef.current, start: 'top 82%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
  timerRef.current = setInterval(() => {
    setCurrent(c => (c + 1) % total);
  }, 5000);
    return () => clearInterval(timerRef.current);
  }, [total]);


  const goTo = useCallback((idx) => {
    if (locked) return;
    setLocked(true);
    setCurrent(((idx % total) + total) % total);
    // Reset the 5s timer so it doesn't fire immediately after a manual click
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % total);
    }, 5000);
    setTimeout(() => setLocked(false), 500);
  }, [locked, total]);

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  // Swipe
  const onTouchStart = e => { dragStart.current = e.touches[0].clientX; };
  const onTouchEnd   = e => {
    if (dragStart.current === null) return;
    const diff = dragStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    dragStart.current = null;
  };

  const getPosition = (idx) => {
    let p = idx - current;
    // Wrap so we always show ±1 from current
    if (p > Math.floor(total / 2))  p -= total;
    if (p < -Math.floor(total / 2)) p += total;
    return p;
  };

  return (
    <section id="fleet" ref={sectionRef} style={{
      padding: 'clamp(80px,12vw,140px) 0',
      background: 'var(--cream)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient bg */}
      <div style={{ position:'absolute', bottom:'-5%', right:'-5%', width:480, height:480, borderRadius:'50%', background:'radial-gradient(circle, rgba(232,82,10,0.05) 0%, transparent 70%)', pointerEvents:'none' }} />

      {/* Title */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 clamp(20px,5vw,80px)' }}>
        <div ref={titleRef} style={{ textAlign: 'center', marginBottom: 56, opacity: 0 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 16px 5px 8px', borderRadius: '100px',
            background: 'var(--orange-pale)', border: '1px solid var(--orange-border)',
            fontSize: '0.75rem', fontWeight: 700, color: 'var(--orange)',
            letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 18,
          }}>
            <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Truck size={10} color="#fff" />
            </span>
            Our Fleet
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.2rem)', letterSpacing: '-0.04em', marginBottom: 14, lineHeight: 1.1 }}>
            420+ vehicles,{' '}
            <span style={{ color: 'var(--orange)' }}>zero downtime.</span>
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--ink-muted)', maxWidth: 460, margin: '0 auto', lineHeight: 1.7 }}>
            Modern, maintained, GPS-tracked — every vehicle built to move your cargo safely across India.
          </p>
        </div>
      </div>

      {/* ── Carousel Track ── */}
      <div ref={trackRef} style={{ opacity: 0 }}>
        <div
          style={{
            position: 'relative',
            height: 600,            /* fixed height = card height */
            overflow: 'visible',    /* let adjacent cards peek */
            maxWidth: 1160,
            margin: '0 auto',
            padding: '0 clamp(20px,5vw,80px)',
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {fleet.map((vehicle, idx) => (
            <FleetCard
              key={vehicle.name}
              vehicle={vehicle}
              position={getPosition(idx)}
              onClick={() => {
                const pos = getPosition(idx);
                if (pos === 1) next();
                if (pos === -1) prev();
              }}
            />
          ))}
        </div>

        {/* ── Controls ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 20, marginTop: 36, padding: '0 20px',
        }}>
          <button onClick={prev} style={{
            width: 46, height: 46, borderRadius: '50%',
            background: '#fff', border: '1.5px solid var(--border-mid)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--ink)', boxShadow: 'var(--shadow-sm)',
            transition: 'all 0.2s ease', flexShrink: 0,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--orange)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--orange)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(232,82,10,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'var(--border-mid)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
          ><ChevronLeft size={19} /></button>

          {/* Dots */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {fleet.map((v, i) => (
              <button key={i} onClick={() => goTo(i)} style={{
                width: i === current ? 30 : 8, height: 8,
                borderRadius: '100px',
                background: i === current ? v.accent : 'var(--sand)',
                border: 'none',
                transition: 'all 0.38s cubic-bezier(0.4,0,0.2,1)',
                cursor: 'pointer',
              }} />
            ))}
          </div>

          <button onClick={next} style={{
            width: 46, height: 46, borderRadius: '50%',
            background: '#fff', border: '1.5px solid var(--border-mid)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--ink)', boxShadow: 'var(--shadow-sm)',
            transition: 'all 0.2s ease', flexShrink: 0,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--orange)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--orange)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(232,82,10,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'var(--border-mid)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
          ><ChevronRight size={19} /></button>
        </div>

        {/* Counter */}
        <div style={{ textAlign: 'center', marginTop: 14, fontSize: '0.82rem', color: 'var(--ink-muted)', fontWeight: 500 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--orange)', fontSize: '1rem' }}>
            {String(current + 1).padStart(2, '0')}
          </span>
          <span style={{ margin: '0 6px', opacity: 0.4 }}>/</span>
          {String(total).padStart(2, '0')}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          /* On mobile, shrink track height to match shorter card */
        }
      `}</style>
    </section>
  );
}
