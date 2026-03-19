import { useState, useEffect, useRef } from 'react';
import { Truck, Menu, X, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';

const links = ['Services', 'Fleet', 'Tracking', 'Testimonials', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  const handleNav = (e, section) => {
    e.preventDefault();
    setOpen(false);
    document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav ref={navRef} style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '14px 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: '100%', maxWidth: '1160px',
        background: scrolled ? 'rgba(250,248,244,0.82)' : 'rgba(250,248,244,0.65)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: `1px solid ${scrolled ? 'rgba(26,22,18,0.12)' : 'rgba(26,22,18,0.07)'}`,
        borderRadius: '100px',
        padding: '9px 9px 9px 22px',
        boxShadow: scrolled ? '0 8px 40px rgba(26,22,18,0.12)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #e8520a, #c43d00)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(232,82,10,0.35)',
          }}>
            <Truck size={17} color="#fff" />
          </div>
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: '1.15rem', letterSpacing: '-0.03em', color: 'var(--ink)',
          }}>TruckVault</span>
        </div>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }} className="nav-desktop">
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`}
              onClick={e => handleNav(e, link)}
              style={{
                padding: '8px 16px', borderRadius: '100px',
                fontSize: '0.875rem', fontWeight: 500,
                color: 'var(--ink-soft)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.background = 'rgba(26,22,18,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-soft)'; e.currentTarget.style.background = 'transparent'; }}
            >{link}</a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={e => handleNav(e, 'contact')}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '10px 22px', borderRadius: '100px',
              background: 'var(--orange)', color: '#fff',
              fontSize: '0.875rem', fontWeight: 600,
              boxShadow: '0 4px 16px rgba(232,82,10,0.3)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(232,82,10,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(232,82,10,0.3)'; }}
          >Get Quote <ChevronRight size={14} /></button>

          <button className="hamburger" onClick={() => setOpen(!open)}
            style={{
              width: 38, height: 38, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(26,22,18,0.07)', color: 'var(--ink)',
              transition: 'all 0.2s',
            }}>
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: '16px', right: '16px',
          background: 'rgba(250,248,244,0.96)', backdropFilter: 'blur(24px)',
          border: '1px solid rgba(26,22,18,0.1)',
          borderRadius: 'var(--radius-lg)', padding: '10px',
          display: 'flex', flexDirection: 'column', gap: '2px',
          boxShadow: 'var(--shadow)',
          animation: 'slideDown 0.22s ease',
        }}>
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`}
              onClick={e => handleNav(e, link)}
              style={{
                padding: '12px 18px', borderRadius: 'var(--radius-sm)',
                fontSize: '0.95rem', fontWeight: 500, color: 'var(--ink-soft)',
                transition: 'all 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--orange)'; e.currentTarget.style.background = 'var(--orange-pale)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-soft)'; e.currentTarget.style.background = 'transparent'; }}
            >{link}</a>
          ))}
        </div>
      )}

      <style>{`
        .hamburger { display: none !important; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </nav>
  );
}
