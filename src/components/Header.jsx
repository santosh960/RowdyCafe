import { useState } from 'react'
import { ArrowUpRight, MapPin, Menu, X } from 'lucide-react'
import { cafe, navLinks } from '../data.js'
import logo from '../../image/logo.png'

export default function Header() {
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="brand-cluster">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Rowdy Cafe home">
          <img className="brand-logo" src={logo} alt="Rowdy Cafe" />
        </a>
        <span className="brand-location"><MapPin size={11} strokeWidth={2.5} /> KARVE NAGAR, PUNE</span>
      </div>

      <button
        className="mobile-menu-toggle"
        type="button"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={23} /> : <Menu size={23} />}
      </button>

      <nav id="primary-navigation" className={`nav-links ${open ? 'nav-open' : ''}`} aria-label="Main navigation">
        {navLinks.map(([label, href]) => (
          <a key={href} href={href} onClick={closeMenu}>
            {label}
          </a>
        ))}
        <a className="nav-order" href={cafe.phoneLink} onClick={closeMenu}>
          Call to order <ArrowUpRight size={15} />
        </a>
      </nav>
    </header>
  )
}
