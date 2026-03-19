import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Phone, Mail, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', cargo: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    gsap.fromTo(titleRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } });
    gsap.fromTo(formRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: formRef.current, start: 'top 82%' } });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  const iStyle = {
    width: '100%', padding: '13px 16px', borderRadius: 'var(--radius)',
    background: 'var(--cream)', border: '1.5px solid var(--border-mid)',
    color: 'var(--ink)', fontSize: '0.9rem', fontFamily: 'var(--font-body)',
    outline: 'none', transition: 'all 0.2s ease',
  };

  return (
    <section id="contact" style={{ padding: 'clamp(80px,12vw,140px) clamp(20px,5vw,80px)', background: 'var(--cream-dark)' }}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>
        {/* CTA Banner */}
        <div style={{
          background: 'linear-gradient(135deg, var(--orange) 0%, #c43d00 100%)',
          borderRadius: 'var(--radius-xl)', padding: 'clamp(36px,5vw,60px)',
          textAlign: 'center', marginBottom: 52, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -60, right: -60, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem,4vw,3rem)', letterSpacing: '-0.04em', color: '#fff', marginBottom: 12, position: 'relative' }}>
            Ready to move smarter?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', marginBottom: 28, position: 'relative' }}>
            Get a custom quote in under 2 minutes. No commitment required.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            {['No setup fees', 'Instant activation', '24/7 support'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)' }}>
                <CheckCircle2 size={13} color="rgba(255,255,255,0.9)" /> {f}
              </div>
            ))}
          </div>
        </div>

        <div ref={titleRef} style={{ textAlign: 'center', marginBottom: 48, opacity: 0 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', letterSpacing: '-0.04em' }}>Get in touch</h2>
          <p style={{ fontSize: '1rem', color: 'var(--ink-muted)', marginTop: 10 }}>Our logistics team responds within 2 business hours.</p>
        </div>

        <div ref={formRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28, opacity: 0 }}>
          {/* Form */}
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 'clamp(24px,4vw,40px)' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '48px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(15,118,110,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'popIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275)' }}>
                  <CheckCircle2 size={30} color="#0f766e" />
                </div>
                <style>{`@keyframes popIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem' }}>Message sent!</h3>
                <p style={{ color: 'var(--ink-muted)', fontSize: '0.9rem' }}>We'll reach out within 2 business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { label: 'YOUR NAME', type: 'text', key: 'name', placeholder: 'Jane Smith' },
                  { label: 'EMAIL ADDRESS', type: 'email', key: 'email', placeholder: 'jane@company.com' },
                ].map(({ label, type, key, placeholder }) => (
                  <div key={key}>
                    <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--ink-muted)', display: 'block', marginBottom: 7, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</label>
                    <input type={type} required placeholder={placeholder} value={form[key]}
                      onChange={e => setForm({ ...form, [key]: e.target.value })}
                      style={iStyle}
                      onFocus={e => { e.target.style.borderColor = 'var(--orange)'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(232,82,10,0.08)'; }}
                      onBlur={e => { e.target.style.borderColor = 'var(--border-mid)'; e.target.style.background = 'var(--cream)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--ink-muted)', display: 'block', marginBottom: 7, letterSpacing: '0.06em', textTransform: 'uppercase' }}>CARGO TYPE</label>
                  <select value={form.cargo} onChange={e => setForm({ ...form, cargo: e.target.value })}
                    style={{ ...iStyle, appearance: 'none', background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235a5245' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat right 16px center, var(--cream)` }}
                    onFocus={e => { e.target.style.borderColor = 'var(--orange)'; e.target.style.boxShadow = '0 0 0 3px rgba(232,82,10,0.08)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border-mid)'; e.target.style.boxShadow = 'none'; }}
                  >
                    <option value="">Select type...</option>
                    <option value="ftl">Full Truckload (FTL)</option>
                    <option value="ltl">Less Than Truckload (LTL)</option>
                    <option value="reefer">Refrigerated Freight</option>
                    <option value="express">Express Delivery</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--ink-muted)', display: 'block', marginBottom: 7, letterSpacing: '0.06em', textTransform: 'uppercase' }}>MESSAGE</label>
                  <textarea rows={4} placeholder="Tell us about your shipping needs..." value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ ...iStyle, resize: 'vertical', minHeight: 100 }}
                    onFocus={e => { e.target.style.borderColor = 'var(--orange)'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(232,82,10,0.08)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border-mid)'; e.target.style.background = 'var(--cream)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
                <button type="submit" disabled={loading}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                    padding: '14px 28px', borderRadius: '100px',
                    background: loading ? 'rgba(232,82,10,0.5)' : 'var(--orange)', color: '#fff',
                    fontSize: '0.95rem', fontWeight: 700,
                    boxShadow: loading ? 'none' : '0 8px 24px rgba(232,82,10,0.3)',
                    transition: 'all 0.25s ease', marginTop: 4,
                  }}
                  onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(232,82,10,0.4)'; }}}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(232,82,10,0.3)'; }}
                >
                  {loading ? (<><div style={{ width: 15, height: 15, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.7s linear infinite' }} /><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>Sending...</>) : (<>Get My Quote <ArrowRight size={16} /></>)}
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 28 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.15rem', marginBottom: 8 }}>Talk to our logistics team</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--ink-muted)', lineHeight: 1.7 }}>Available Mon–Fri 6am–10pm IST. 24/7 support for active shipments.</p>
            </div>
            {[
              { icon: Phone, label: 'Sales Hotline', value: '1800-TRK-VAULT', color: '#e8520a', bg: 'var(--orange-pale)', border: 'var(--orange-border)' },
              { icon: Mail, label: 'Email', value: 'hello@truckvault.in', color: '#2c3e6b', bg: '#eef1f8', border: 'rgba(44,62,107,0.2)' },
              { icon: MapPin, label: 'Headquarters', value: 'Mumbai, Maharashtra', color: '#0f766e', bg: '#f0faf9', border: 'rgba(15,118,110,0.2)' },
            ].map(({ icon: Icon, label, value, color, bg, border }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                background: '#fff', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)', padding: '18px 22px',
                transition: 'all 0.22s ease', cursor: 'default',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = bg; e.currentTarget.style.borderColor = border; e.currentTarget.style.transform = 'translateX(4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateX(0)'; }}
              >
                <div style={{ width: 42, height: 42, borderRadius: 12, background: bg, border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={18} color={color} />
                </div>
                <div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)' }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
