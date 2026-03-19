import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, ShieldCheck, Clock, Star, MapPin } from 'lucide-react';

const TRUCK_IMG = 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=85&auto=format&fit=crop';

const stats = [
  { value: '18K+', label: 'Deliveries/mo' },
  { value: '99.1%', label: 'On-time rate' },
  { value: '420+', label: 'Fleet vehicles' },
  { value: '28', label: 'States covered' },
];

export default function Hero() {
  const sectionRef   = useRef(null);
  const badgeRef     = useRef(null);
  const h1Ref        = useRef(null);
  const subRef       = useRef(null);
  const ctaRef       = useRef(null);
  const trustRef     = useRef(null);
  const imgWrapRef   = useRef(null);
  const statsRef     = useRef(null);
  const floatTween   = useRef(null);

  useEffect(() => {
    // Kill any leftover tweens on unmount
    return () => { floatTween.current?.kill(); };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      tl.fromTo(badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
      .fromTo(h1Ref.current.querySelectorAll('.h1-line'),
        { opacity: 0, y: 50, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, stagger: 0.12, duration: 0.85, ease: 'power3.out' },
        '-=0.25'
      )
      .fromTo(subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(ctaRef.current.querySelectorAll('button'),
        { opacity: 0, y: 18, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.55, ease: 'back.out(1.7)' },
        '-=0.3'
      )
      .fromTo(trustRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.2'
      )
      .fromTo(imgWrapRef.current,
        { opacity: 0, x: 60, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: 'power3.out' },
        0.6 // absolute start time so it overlaps text animation
      )
      .fromTo(statsRef.current.querySelectorAll('.stat-cell'),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      );

      // Gentle float — start AFTER enter animation completes
      tl.call(() => {
        floatTween.current = gsap.to(imgWrapRef.current, {
          y: -12,
          duration: 3.8,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={sectionRef} id="hero" style={{
      minHeight: '100vh',
      padding: '120px clamp(20px, 5vw, 80px) 80px',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(160deg, #faf8f4 50%, #f2ece1 100%)',
    }}>
      {/* Decorative bg shapes */}
      <div style={{ position:'absolute', top:'-8%', right:'-6%', width:560, height:560, borderRadius:'50%', background:'radial-gradient(circle, rgba(232,82,10,0.07) 0%, transparent 68%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'8%', left:'-4%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(44,62,107,0.05) 0%, transparent 68%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', opacity:0.3, backgroundImage:'radial-gradient(rgba(26,22,18,0.22) 1px, transparent 1px)', backgroundSize:'38px 38px', maskImage:'radial-gradient(ellipse 75% 75% at 50% 50%, black 0%, transparent 100%)', WebkitMaskImage:'radial-gradient(ellipse 75% 75% at 50% 50%, black 0%, transparent 100%)' }} />

      {/* ── Two-column layout ── */}
      <div style={{
        maxWidth: 1160,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px 60px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }} className="hero-grid">

        {/* LEFT — copy */}
        <div>
          {/* Badge */}
          <div ref={badgeRef} style={{ opacity: 0, marginBottom: 28 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px 6px 8px', borderRadius: '100px',
              background: 'var(--orange-pale)', border: '1px solid var(--orange-border)',
              fontSize: '0.78rem', fontWeight: 600, color: 'var(--orange)',
            }}>
              <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Star size={11} color="#fff" fill="#fff" />
              </span>
              India's #1 Rated Freight Platform — 2026
            </span>
          </div>

          {/* Headline */}
          <h1 ref={h1Ref} style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(2.6rem, 4.5vw, 4.6rem)',
            lineHeight: 1.06, letterSpacing: '-0.04em',
            marginBottom: 24,
          }}>
            <span className="h1-line" style={{ display: 'block', opacity: 0 }}>Move freight</span>
            <span className="h1-line" style={{ display: 'block', opacity: 0 }}>
              <span style={{ color: 'var(--orange)', position: 'relative', display: 'inline-block' }}>
                faster
                <svg style={{ position: 'absolute', bottom: -4, left: 0, width: '100%' }} viewBox="0 0 180 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 7 Q90 1 178 7" stroke="#e8520a" strokeWidth="2.5" strokeLinecap="round" opacity="0.45"/>
                </svg>
              </span>
              {' '}& smarter.
            </span>
            <span className="h1-line" style={{ display: 'block', opacity: 0, color: 'var(--ink-soft)', fontWeight: 500, fontSize: 'clamp(1.6rem, 2.8vw, 2.8rem)' }}>
              Pan-India logistics, trusted.
            </span>
          </h1>

          <p ref={subRef} style={{
            opacity: 0,
            fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
            color: 'var(--ink-muted)', lineHeight: 1.8,
            maxWidth: 480, marginBottom: 36,
          }}>
            Real-time GPS tracking, enterprise fleet management, and instant quotes — all in one platform built for businesses that move across India.
          </p>

          {/* CTA buttons */}
          <div ref={ctaRef} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 28 }}>
            <button onClick={() => scrollTo('contact')} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '14px 30px', borderRadius: '100px',
              background: 'var(--orange)', color: '#fff',
              fontSize: '1rem', fontWeight: 700,
              boxShadow: '0 8px 28px rgba(232,82,10,0.35)',
              transition: 'all 0.25s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(232,82,10,0.45)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(232,82,10,0.35)'; }}
            >Start Shipping <ArrowRight size={17} /></button>

            <button onClick={() => scrollTo('fleet')} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '14px 30px', borderRadius: '100px',
              background: 'transparent', color: 'var(--ink)',
              fontSize: '1rem', fontWeight: 500,
              border: '1.5px solid var(--border-mid)',
              transition: 'all 0.25s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--cream-dark)'; e.currentTarget.style.borderColor = 'var(--sand)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border-mid)'; }}
            >View Our Fleet</button>
          </div>

          {/* Trust badges */}
          <div ref={trustRef} style={{ opacity: 0, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[
              { Icon: ShieldCheck, text: 'MoRTH Certified & Insured' },
              { Icon: MapPin,      text: '28 States · Pan-India Coverage' },
              { Icon: Clock,       text: 'Same-day Quote Guarantee' },
            ].map(({ Icon, text }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
                <Icon size={13} color="var(--success)" />
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — truck image (position: relative so float stays inside grid) */}
        <div ref={imgWrapRef} style={{
          opacity: 0,
          position: 'relative',          /* ← key fix: relative, not absolute */
          width: '100%',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(26,22,18,0.16), 0 0 0 1px rgba(26,22,18,0.06)',
          aspectRatio: '4/3',
        }}>
          <img
            src={TRUCK_IMG}
            alt="Modern freight truck on highway"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* Live tracking badge overlay */}
          <div style={{
            position: 'absolute', bottom: 16, left: 16, right: 16,
            background: 'rgba(250,248,244,0.88)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(26,22,18,0.1)',
            borderRadius: 'var(--radius)',
            padding: '13px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)', marginBottom: 3 }}>Live tracking active</div>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--ink)' }}>TRK-4821 · Mumbai → Bengaluru</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: '100px', background: 'rgba(45,122,79,0.1)', border: '1px solid rgba(45,122,79,0.2)', flexShrink: 0 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', animation: 'blink 1.5s ease-in-out infinite' }} />
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--success)' }}>On time</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip — full width below grid */}
      <div style={{ maxWidth: 1160, margin: '56px auto 0', padding: '0 clamp(20px,5vw,80px) 0', position: 'relative', zIndex: 1 }}>
        <div ref={statsRef} style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1px', background: 'var(--border)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)',
        }} className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-cell" style={{
              padding: '22px 16px', textAlign: 'center',
              background: 'rgba(250,248,244,0.9)',
              opacity: 0,
              backdropFilter: 'blur(8px)',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--orange-pale)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(250,248,244,0.9)'}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.04em', color: 'var(--orange)' }}>{s.value}</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--ink-muted)', fontWeight: 500, marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
