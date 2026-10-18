import { useEffect, useState } from 'react'
import { ArrowDownRight, X } from 'lucide-react'
import { gallery } from '../data.js'

export default function GallerySection() {
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (selected === null) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selected])

  return (
    <section className="section gallery-section" id="gallery">
      <div className="section-heading gallery-heading">
        <div>
          <p className="eyebrow"><span>03</span> A FEAST FOR YOUR FEED</p>
          <h2>GOOD FOOD.<br /><em>GOOD MOOD.</em></h2>
        </div>
        <p className="section-intro">A little taste of the kind of good stuff we’re here for.</p>
      </div>
      <div className="gallery-grid">
        {gallery.map((item, index) => (
          <button
            className={`gallery-tile gallery-${item.shape}`}
            key={item.label}
            type="button"
            onClick={() => setSelected(index)}
            aria-label={`View larger: ${item.alt}`}
          >
            <img src={item.image} alt={item.alt} loading="lazy" />
            <span className="gallery-label">{item.label}<ArrowDownRight size={18} /></span>
          </button>
        ))}
      </div>
      <p className="image-disclaimer">Illustrative photography, not photos of the cafe or its customers.</p>

      {selected !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image preview"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null)
          }}
        >
          <button className="lightbox-close" type="button" onClick={() => setSelected(null)} aria-label="Close image preview">
            <X size={24} />
          </button>
          <img src={gallery[selected].image} alt={gallery[selected].alt} />
          <p>{gallery[selected].label}</p>
        </div>
      )}
    </section>
  )
}
