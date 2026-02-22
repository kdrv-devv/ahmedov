'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

const navItems = [
  { label: "Bosh sahifa", href: "#home" },
  { label: "Biz haqimizda", href: "#about" },
  { label: "Xizmatlar", href: "#services" },
  { label: "Loyihalar", href: "#projects" },
  { label: "Mijozlar fikri", href: "#testimonials" },
  { label: "Bog'lanish", href: "#contact" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when modal open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setTimeout(() => {
        setForm({ firstName: '', lastName: '', phone: '' })
        setStatus('idle')
      }, 400)
    }
    return () => { document.body.style.overflow = '' }
  }, [isModalOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.firstName.trim() || !form.lastName.trim() || !form.phone.trim()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
        }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono&family=Anton&display=swap');

        .nav-link {
          position: relative;
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          transition: color 0.3s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: #dc2626;
          transition: width 0.3s ease;
          box-shadow: 0 0 8px rgba(220,38,38,0.6);
        }
        .nav-link:hover { color: rgba(255,255,255,0.9); }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .nav-link.active { color: rgba(255,255,255,0.85); }

        .logo-text {
          font-family: 'Anton', sans-serif;
          letter-spacing: 0.02em;
          background: linear-gradient(135deg, #ffffff 0%, #dc2626 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 20px rgba(220,38,38,0.35));
        }

        .contact-btn {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(220,38,38,0.5);
          background: transparent;
          color: rgba(255,255,255,0.8);
          padding: 8px 22px;
          cursor: pointer;
          transition: color 0.3s ease, box-shadow 0.3s ease;
        }
        .contact-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #dc2626;
          transform: translateX(-101%);
          transition: transform 0.3s ease;
          z-index: 0;
        }
        .contact-btn:hover::before { transform: translateX(0); }
        .contact-btn:hover { color: #fff; box-shadow: 0 0 20px rgba(220,38,38,0.35); }
        .contact-btn span { position: relative; z-index: 1; }

        .header-line {
          position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(220,38,38,0.4) 30%, rgba(220,38,38,0.4) 70%, transparent 100%);
        }

        .mobile-nav-link {
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: color 0.3s ease;
        }
        .mobile-nav-link:hover { color: rgba(255,255,255,0.9); }
        .mobile-nav-link .num { font-size: 0.6rem; color: rgba(220,38,38,0.6); min-width: 20px; }

        .hamburger-line {
          display: block;
          width: 22px;
          height: 1.5px;
          background: rgba(255,255,255,0.7);
          transition: all 0.3s ease;
        }

        /* Modal input styles */
        .modal-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(220,38,38,0.2);
          color: #fff;
          padding: 14px 16px;
          font-family: 'Space Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
          outline: none;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .modal-input::placeholder { color: rgba(255,255,255,0.2); }
        .modal-input:focus {
          border-color: rgba(220,38,38,0.65);
          box-shadow: 0 0 16px rgba(220,38,38,0.12);
        }

        .modal-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          display: block;
          margin-bottom: 6px;
        }

        .submit-btn {
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          width: 100%;
          padding: 14px;
          background: #dc2626;
          color: #fff;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: background 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .submit-btn:hover:not(:disabled) {
          background: #b91c1c;
          box-shadow: 0 0 30px rgba(220,38,38,0.4);
        }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
      `}</style>

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: isScrolled ? 'rgba(4,0,0,0.88)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(14px)' : 'none',
        }}
      >
        {isScrolled && (
          <motion.div
            className="header-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        <div className="max-w-[90%] mx-auto px-4 py-5 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <Link href="/" className="logo-text text-xl md:text-2xl">
              SHOXRUH AHMEDOV
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                className={`nav-link ${activeItem === i ? 'active' : ''}`}
                onClick={() => setActiveItem(i)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-5">
            <motion.button
              className="contact-btn hidden md:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsModalOpen(true)}
            >
              <span>Aloqa</span>
            </motion.button>

            {/* Hamburger */}
            <motion.button
              className="md:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.span className="hamburger-line" animate={isMobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} />
              <motion.span className="hamburger-line" animate={isMobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} />
              <motion.span className="hamburger-line" animate={isMobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden"
              style={{ background: 'rgba(4,0,0,0.97)', borderTop: '1px solid rgba(220,38,38,0.15)' }}
            >
              <nav className="flex flex-col px-6 py-4">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="mobile-nav-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <span className="num">0{i + 1}</span>
                    {item.label}
                  </motion.a>
                ))}

                <motion.button
                  className="contact-btn mt-5 w-full"
                  onClick={() => { setIsMobileMenuOpen(false); setIsModalOpen(true) }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.06 }}
                >
                  <span>Aloqa</span>
                </motion.button>
              </nav>
              <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(220,38,38,0.6) 0%, transparent 100%)', margin: '0 24px 16px' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── CONTACT MODAL ── */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[100]"
              style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => status !== 'loading' && setIsModalOpen(false)}
            />

            {/* Modal panel */}
            <motion.div
              key="modal"
              className="fixed z-[101] inset-0 flex items-center justify-center px-4"
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="relative w-full max-w-md"
                style={{
                  background: '#0a0000',
                  border: '1px solid rgba(220,38,38,0.25)',
                  boxShadow: '0 0 60px rgba(220,0,0,0.15), 0 0 120px rgba(0,0,0,0.8)',
                }}
                onClick={e => e.stopPropagation()}
              >
                {/* Top red accent line */}
                <div style={{ height: 2, background: 'linear-gradient(90deg, #dc2626 0%, rgba(220,38,38,0.3) 100%)' }} />

                {/* Header */}
                <div className="flex items-start justify-between px-8 pt-7 pb-6">
                  <div>
                    <p style={{ fontFamily: 'Space Mono', fontSize: '0.6rem', letterSpacing: '0.3em', color: 'rgba(220,38,38,0.7)', textTransform: 'uppercase', marginBottom: 8 }}>
                      ▸ Murojaat
                    </p>
                    <h2 style={{ fontFamily: 'Anton', fontSize: '2rem', color: '#fff', letterSpacing: '0.02em', lineHeight: 1 }}>
                      BOG'LANISH
                    </h2>
                  </div>
                  <button
                    onClick={() => status !== 'loading' && setIsModalOpen(false)}
                    style={{
                      width: 32, height: 32,
                      border: '1px solid rgba(220,38,38,0.2)',
                      background: 'transparent',
                      color: 'rgba(255,255,255,0.4)',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1rem',
                      transition: 'all 0.2s',
                    }}
                    onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(220,38,38,0.6)'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
                    onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(220,38,38,0.2)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)' }}
                  >
                    ✕
                  </button>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '0 32px' }} />

                {/* Form or Result */}
                <div className="px-8 pt-6 pb-8">
                  <AnimatePresence mode="wait">
                    {status === 'success' ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-4 py-8 text-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        >
                          <CheckCircle size={52} color="#22c55e" strokeWidth={1.5} />
                        </motion.div>
                        <p style={{ fontFamily: 'Anton', fontSize: '1.4rem', color: '#fff', letterSpacing: '0.04em' }}>
                          YUBORILDI!
                        </p>
                        <p style={{ fontFamily: 'Space Mono', fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', lineHeight: 1.6 }}>
                          Murojaatingiz qabul qilindi.<br />Tez orada siz bilan bog'lanamiz.
                        </p>
                        <button
                          className="contact-btn mt-2"
                          onClick={() => setIsModalOpen(false)}
                        >
                          <span>Yopish</span>
                        </button>
                      </motion.div>
                    ) : status === 'error' ? (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-4 py-8 text-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        >
                          <AlertCircle size={52} color="#dc2626" strokeWidth={1.5} />
                        </motion.div>
                        <p style={{ fontFamily: 'Anton', fontSize: '1.4rem', color: '#fff', letterSpacing: '0.04em' }}>
                          XATOLIK!
                        </p>
                        <p style={{ fontFamily: 'Space Mono', fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', lineHeight: 1.6 }}>
                          Murojaat yuborilmadi.<br />Qayta urinib ko'ring.
                        </p>
                        <button
                          className="contact-btn mt-2"
                          onClick={() => setStatus('idle')}
                        >
                          <span>Qayta urinish</span>
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col gap-5"
                      >
                        {/* First + Last name row */}
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <label className="modal-label">Ism</label>
                            <input
                              className="modal-input"
                              type="text"
                              placeholder="Shoxruh"
                              value={form.firstName}
                              onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                              required
                            />
                          </div>
                          <div className="flex-1">
                            <label className="modal-label">Familiya</label>
                            <input
                              className="modal-input"
                              type="text"
                              placeholder="Ahmedov"
                              value={form.lastName}
                              onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                              required
                            />
                          </div>
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="modal-label">Telefon raqam</label>
                          <input
                            className="modal-input"
                            type="tel"
                            placeholder="+998 90 000 00 00"
                            value={form.phone}
                            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                            required
                          />
                        </div>

                        {/* Submit */}
                        <button
                          type="submit"
                          className="submit-btn mt-1"
                          disabled={status === 'loading'}
                        >
                          {status === 'loading' ? (
                            <>
                              <Loader2 size={15} className="animate-spin" />
                              Yuborilmoqda...
                            </>
                          ) : (
                            'Yuborish'
                          )}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom corner decorations */}
                <div style={{ position: 'absolute', bottom: 10, left: 10, width: 12, height: 12, borderBottom: '1px solid rgba(220,38,38,0.3)', borderLeft: '1px solid rgba(220,38,38,0.3)' }} />
                <div style={{ position: 'absolute', bottom: 10, right: 10, width: 12, height: 12, borderBottom: '1px solid rgba(220,38,38,0.3)', borderRight: '1px solid rgba(220,38,38,0.3)' }} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}