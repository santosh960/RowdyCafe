import { ArrowUpRight, Instagram, Phone } from 'lucide-react'
import { cafe, navLinks } from '../data.js'
import logo from '../../image/logo.png'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <a className="brand footer-brand" href="#home" aria-label="Rowdy Cafe home">
          <img className="brand-logo" src={logo} alt="Rowdy Cafe" />
        </a>
        <p className="footer-tagline">BIG FLAVOURS.<br /><span>ROWDY VIBES.</span></p>
        <div className="footer-contact">
          <p className="eyebrow">COME THROUGH</p>
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cafe.mapsQuery)}`} target="_blank" rel="noreferrer">
            {cafe.address}<ArrowUpRight size={15} />
          </a>
          <a href={cafe.phoneLink}><Phone size={15} /> {cafe.phone}</a>
        </div>
        <div className="footer-links">
          <p className="eyebrow">TAKE A LOOK</p>
          {navLinks.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Rowdy Cafe Karve Nagar</span>
        <span>Daily until 11 PM · Opening time to be confirmed</span>
        <a className="footer-social" href={cafe.phoneLink}><Phone size={15} /> Call the cafe</a>
      </div>
    </footer>
  )
}
