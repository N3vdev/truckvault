import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { name: 'Sarah Chen', title: 'VP of Supply Chain, Reliance Freight Co.', avatar: 'SC', color: '#e8520a', bg: '#fdf0ea', rating: 5,
    text: "We switched our entire freight operation to TruckVault 18 months ago. The real-time tracking eliminated constant check-in calls. Delivery accuracy went from 91% to 98.7% — that's real money saved every quarter." },
  { name: 'Marcus Rivera', title: 'Operations Director, BigBasket Supply Chain', avatar: 'MR', color: '#2c3e6b', bg: '#eef1f8', rating: 5,
    text: "Temperature-controlled freight is unforgiving. One bad shipment can cost us our clients. TruckVault's reefer fleet and thermal monitoring has been absolutely flawless across 2,000+ cold-chain deliveries." },
  { name: 'Jennifer Walsh', title: 'CEO, Adani Industrial Group', avatar: 'JW', color: '#7c3aed', bg: '#f3f0fd', rating: 5,
    text: "The analytics dashboard alone is worth the switch. We identified three inefficient shipping lanes in our first month and restructured. Saved over $180K annually. The platform is genuinely world-class." },
  { name: 'David Kim', title: 'Logistics Manager, Mahindra Logistics', avatar: 'DK', color: '#0f766e', bg: '#f0faf9', rating: 5,
    text: "What sets TruckVault apart is their customer service. When a driver had a medical emergency mid-route, they had a replacement truck dispatched and cargo re-routed within 90 minutes. Absolutely unmatched." },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const titleRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current, { opacity: 0, y: 28 }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
    });
    gsap.fromTo(carouselRef.current, { opacity: 0, y: 36 }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: carouselRef.current, start: 'top 82%' },
    });
    const t = setInterval(() => setCurrent(c => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[current];

  return (
    <section id="testimonials" style={{ padding: 'clamp(80px,12vw,140px) clamp(20px,5vw,80px)', background: 'var(--cream)' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div ref={titleRef} style={{ textAlign: 'center', marginBottom: 56, opacity: 0 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 16px 5px 8px', borderRadius: '100px', background: 'var(--orange-pale)', border: '1px solid var(--orange-border)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--orange)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 18 }}>
            <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Star size={10} color="#fff" fill="#fff" />
            </span>
            Client Stories
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.2rem)', letterSpacing: '-0.04em', marginBottom: 14, lineHeight: 1.1 }}>
            Trusted by <span style={{ color: 'var(--orange)' }}>1,200+ Indian businesses</span>
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--ink-muted)', maxWidth: 420, margin: '0 auto' }}>
            Logistics leaders across India rely on TruckVault every day.
          </p>
        </div>

        <div ref={carouselRef} style={{ opacity: 0 }}>
          {/* Main card */}
          <div style={{
            background: '#fff', border: `1.5px solid ${t.color}25`,
            borderRadius: 'var(--radius-xl)', padding: 'clamp(28px,4vw,48px)',
            position: 'relative', overflow: 'hidden',
            boxShadow: `0 20px 60px rgba(26,22,18,0.08), 0 0 0 1px ${t.color}15`,
            transition: 'all 0.45s cubic-bezier(0.4,0,0.2,1)',
          }}>
            {/* Top accent line */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${t.color}, ${t.color}40)`, borderRadius: '3px 3px 0 0' }} />
            {/* BG tint */}
            <div style={{ position: 'absolute', top: 0, right: 0, width: 200, height: 200, borderRadius: '0 0 0 100%', background: t.bg, opacity: 0.6 }} />

            <Quote size={32} color={`${t.color}30`} style={{ marginBottom: 20, position: 'relative' }} />

            <p style={{ fontSize: 'clamp(1rem,2vw,1.1rem)', lineHeight: 1.8, color: 'var(--ink-soft)', fontStyle: 'italic', marginBottom: 32, position: 'relative' }}>
              "{t.text}"
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: t.bg, border: `2px solid ${t.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.9rem', color: t.color }}>{t.avatar}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--ink)' }}>{t.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', marginTop: 2 }}>{t.title}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 3 }}>
                {[...Array(t.rating)].map((_, i) => <Star key={i} size={15} color={t.color} fill={t.color} />)}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 32 }}>
            <button onClick={() => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length)}
              style={{ width: 42, height: 42, borderRadius: '50%', background: '#fff', border: '1.5px solid var(--border-mid)', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--orange)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = 'var(--ink)'; }}
            ><ChevronLeft size={17} /></button>

            <div style={{ display: 'flex', gap: 8 }}>
              {testimonials.map((tm, i) => (
                <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 28 : 8, height: 8, borderRadius: '100px', background: i === current ? tm.color : 'var(--sand)', transition: 'all 0.3s ease', border: 'none' }} />
              ))}
            </div>

            <button onClick={() => setCurrent(c => (c + 1) % testimonials.length)}
              style={{ width: 42, height: 42, borderRadius: '50%', background: '#fff', border: '1.5px solid var(--border-mid)', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--orange)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = 'var(--ink)'; }}
            ><ChevronRight size={17} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
