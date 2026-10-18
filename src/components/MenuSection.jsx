import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, Phone } from 'lucide-react'
import { cafe } from '../data.js'
import { allMenuItems, menuCategoryNames } from '../menuData.js'
import { backend, getMenuItems } from '../backend.js'
import MenuAdmin from './MenuAdmin.jsx'

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(menuCategoryNames[0])
  const [liveItems, setLiveItems] = useState(null)
  const [loadNotice, setLoadNotice] = useState('')

  async function loadMenu() {
    if (!backend) return
    const { data, error } = await getMenuItems()
    if (error) { setLoadNotice('Could not load live menu. Showing the supplied menu.'); return }
    setLiveItems(data || [])
    setLoadNotice('')
  }

  useEffect(() => { loadMenu() }, [])

  const items = useMemo(() => liveItems?.length
    ? liveItems.map(item => ({ ...item, price: Number(item.price), live: true }))
    : allMenuItems, [liveItems])
  const categories = useMemo(() => [...new Set(items.map(item => item.category))], [items])
  useEffect(() => {
    if (!categories.includes(activeCategory)) setActiveCategory(categories[0])
  }, [activeCategory, categories])

  const products = items.filter(item => item.category === activeCategory)

  return (
    <section className="section menu-section" id="menu">
      <div className="section-heading menu-heading">
        <div>
          <p className="eyebrow"><span>01</span> WHAT’S COOKING</p>
          <h2>THE ROWDY<br /><em>MENU.</em></h2>
        </div>
        <div className="menu-intro">
          <p className="section-intro">Browse the cafe’s food and drink menu. Availability and prices may change; please confirm when ordering.</p>
          <MenuAdmin onMenuChanged={loadMenu} />
        </div>
      </div>

      <div className="menu-toolbar">
        <div className="filter-list menu-tabs" role="tablist" aria-label="Menu categories">
          {categories.map(category => (
            <button
              type="button"
              role="tab"
              key={category}
              id={`menu-tab-${category.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`}
              aria-selected={activeCategory === category}
              aria-controls="menu-products"
              className={`filter-chip ${activeCategory === category ? 'filter-active' : ''}`}
              onClick={event => {
                setActiveCategory(category)
                event.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
              }}
            >
              {category}
            </button>
          ))}
        </div>
        <a className="text-link desktop-menu-link" href={cafe.phoneLink}>
          Call to order <ArrowUpRight size={16} />
        </a>
      </div>

      <div className="menu-order-bar">
        <div><strong>Get pickup or delivery</strong><span>Call to check availability and ordering options</span></div>
        <a href={cafe.phoneLink}><Phone size={17} /> Order by phone</a>
      </div>

      <div className="menu-products" id="menu-products" role="tabpanel" aria-labelledby={`menu-tab-${activeCategory.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`}>
        {products.map(item => (
          <article className="menu-product" key={item.id || `${item.category}-${item.name}`}>
            <div className="menu-product-copy">
              <h3>{item.name}</h3>
              {item.description && <p>{item.description}</p>}
            </div>
            <span className="menu-product-price">₹{Number(item.price).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </article>
        ))}
        {!products.length && <p className="menu-empty">No items are listed in this category yet. Call us to ask what’s available.</p>}
      </div>
      <p className="image-disclaimer">{loadNotice || (liveItems?.length ? 'Menu items are managed by the cafe.' : 'Menu items and prices are transcribed from the supplied cafe menu screenshots.')}</p>
    </section>
  )
}
