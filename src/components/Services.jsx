import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Package, Globe2, Thermometer, Zap, MapPin, BarChart3, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: Package,     color: '#e8520a', bg: '#fdf0ea', border: '#f3c4a8', title: 'Full Truckload (FTL)',    desc: 'Dedicated trucks, direct routes, maximum security for large shipments across India.', tag: 'Popular',    number: '01' },
  { icon: Globe2,      color: '#2c3e6b', bg: '#eef1f8', border: '#b8c8e8', title: 'Part Truckload (PTL)',   desc: 'Share space, reduce costs. Optimised routing for smaller freight loads pan-India.', tag: null,         number: '02' },
  { icon: Thermometer, color: '#7c3aed', bg: '#f3f0fd', border: '#c4b5f8', title: 'Refrigerated Freight',   desc: 'Precision temp control from -20°C to 18°C with real-time cold-chain monitoring.', tag: 'Specialised', number: '03' },
  { icon: Zap,         color: '#c4922a', bg: '#fdf6e8', border: '#e8d49a', title: 'Express Delivery',        desc: 'Same-day and next-day freight with guaranteed delivery windows, any Indian city.', tag: null,         number: '04' },
  { icon: MapPin,      color: '#0f766e', bg: '#f0faf9', border: '#a7d8d4', title: 'Live GPS Tracking',       desc: 'Real-time visibility on every shipment with 30-second location updates, 24 × 7.', tag: null,         number: '05' },
  { icon: BarChart3,   color: '#be185d', bg: '#fdf0f6', border: '#f0aacc', title: 'Analytics Dashboard',    desc: 'Deep insights into costs, carrier performance, and carbon footprint across your supply chain.', tag: 'Enterprise', number: '06' },
];

function ServiceCard({ s, index }) {
  const ref = useRef(null);
  const Icon = s.icon;

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
        delay: index * 0.06,
        scrollTrigger: { trigger: ref.current, start: 'top 90%' },
      }
    );
  }, [index]);

  return (
    <div ref={ref} style={{
      opacity: 0,
      background: '#fff',
      border: `1px solid var(--border)`,
      borderRadius: 24,
      padding: '28px 26px 24px',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'default',
      transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-7px)';
        e.currentTarget.style.boxShadow = `0 24px 64px rgba(26,22,18,0.1), 0 0 0 1.5px ${s.color}30`;
        e.currentTarget.style.borderColor = `${s.color}25`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'var(--border)';
      }}
    >
      {/* Big number watermark */}
      <div style={{
        position: 'absolute', top: -8, right: 16,
        fontFamily: 'var(--font-display)', fontWeight: 900,
        fontSize: '5rem', lineHeight: 1,
        color: `${s.color}09`, letterSpacing: '-0.05em',
        pointerEvents: 'none', userSelect: 'none',
      }}>{s.number}</div>

      {/* Top accent line on hover */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${s.color}, ${s.color}55)`,
        borderRadius: '24px 24px 0 0',
        transform: 'scaleX(0)', transformOrigin: 'left',
        transition: 'transform 0.35s ease',
      }} className={`accent-line-${index}`} />

      {/* Tag */}
      {s.tag && (
        <div style={{
          position: 'absolute', top: 18, right: 18,
          padding: '3px 10px', borderRadius: '100px',
          background: s.bg, border: `1px solid ${s.border}`,
          fontSize: '0.65rem', fontWeight: 800, color: s.color,
          letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>{s.tag}</div>
      )}

      {/* Icon */}
      <div style={{
        width: 52, height: 52, borderRadius: 16,
        background: s.bg, border: `1.5px solid ${s.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 20, flexShrink: 0,
        transition: 'transform 0.3s ease',
      }}>
        <Icon size={24} color={s.color} />
      </div>

      <h3 style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: '1.08rem', marginBottom: 10,
        letterSpacing: '-0.025em', color: 'var(--ink)',
      }}>{s.title}</h3>

      <p style={{
        fontSize: '0.855rem', color: 'var(--ink-muted)',
        lineHeight: 1.72, marginBottom: 22,
      }}>{s.desc}</p>

      <div
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          fontSize: '0.82rem', fontWeight: 700, color: s.color,
          padding: '6px 14px 6px 0',
          borderBottom: `1.5px solid ${s.color}30`,
          transition: 'gap 0.2s ease, border-color 0.2s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={e => { e.currentTarget.style.gap = '10px'; e.currentTarget.style.borderColor = s.color; }}
        onMouseLeave={e => { e.currentTarget.style.gap = '5px'; e.currentTarget.style.borderColor = `${s.color}30`; }}
      >
        Learn more <ArrowUpRight size={14} />
      </div>

      <style>{`
        div:hover .accent-line-${index} { transform: scaleX(1) !important; }
      `}</style>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} style={{
      padding: 'clamp(80px,12vw,140px) clamp(20px,5vw,80px)',
      background: 'var(--cream-dark)',
    }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div ref={titleRef} style={{ textAlign: 'center', marginBottom: 60, opacity: 0 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 16px 5px 8px', borderRadius: '100px',
            background: 'var(--orange-pale)', border: '1px solid var(--orange-border)',
            fontSize: '0.75rem', fontWeight: 700, color: 'var(--orange)',
            letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 18,
          }}>
            <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Package size={10} color="#fff" />
            </span>
            What We Offer
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(2rem,4vw,3.2rem)', letterSpacing: '-0.04em',
            marginBottom: 14, lineHeight: 1.1,
          }}>
            Every freight need,{' '}
            <span style={{ color: 'var(--orange)' }}>one platform.</span>
          </h2>
          <p style={{
            fontSize: '1rem', color: 'var(--ink-muted)',
            maxWidth: 480, margin: '0 auto', lineHeight: 1.72,
          }}>
            From parcel to full truckloads — TruckVault handles every kilometre across India with precision.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 20,
        }}>
          {services.map((s, i) => <ServiceCard key={s.title} s={s} index={i} />)}
        </div>
      </div>
    </section>
  );
}
