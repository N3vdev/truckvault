import { Truck, Twitter, Linkedin, Github } from 'lucide-react';

const footerLinks = {
  Services: ['Full Truckload', 'LTL Freight', 'Reefer Transport', 'Express Delivery', 'White Glove'],
  Company: ['About Us', 'Careers', 'Press', 'Partners', 'Blog'],
  Support: ['Documentation', 'Status', 'Contact', 'API Access', 'Compliance'],
};

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: 'clamp(48px,8vw,80px) clamp(20px,5vw,80px) clamp(24px,4vw,40px)', background: 'var(--cream)' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px,1.5fr) repeat(3,1fr)', gap: '48px 40px', marginBottom: 48 }} className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #e8520a, #c43d00)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(232,82,10,0.3)' }}>
                <Truck size={16} color="#fff" />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.03em', color: 'var(--ink)' }}>TruckVault</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', lineHeight: 1.75, maxWidth: 240, marginBottom: 22 }}>
              America's most trusted freight and logistics platform. Moving cargo smarter since 2014.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <button key={i} style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--cream-dark)', border: '1px solid var(--border)', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--orange)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--orange)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--cream-dark)'; e.currentTarget.style.color = 'var(--ink-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                ><Icon size={14} /></button>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--ink)', textTransform: 'uppercase', marginBottom: 16 }}>{group}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(link => (
                  <a key={link} href="#" style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', transition: 'color 0.18s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--orange)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-muted)'}
                  >{link}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>© 2026 TruckVault Inc. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
              <a key={l} href="#" style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', transition: 'color 0.18s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--orange)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-muted)'}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 540px) { .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; } }
      `}</style>
    </footer>
  );
}
