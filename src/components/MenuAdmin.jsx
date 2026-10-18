import { useEffect, useState } from 'react'
import { LogIn, LogOut, Plus, RefreshCw, Settings, Trash2, X } from 'lucide-react'
import { addMenuItem as saveMenuItem, backend, getMenuItems, isAdmin as checkAdminRole, removeMenuItem as deleteMenuItem } from '../backend.js'

const emptyForm = { name: '', category: '', price: '', emoji: '🍽️', description: '' }

export default function MenuAdmin({ onMenuChanged }) {
  const [open, setOpen] = useState(false)
  const [session, setSession] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [form, setForm] = useState(emptyForm)
  const [items, setItems] = useState([])
  const [notice, setNotice] = useState('')
  const [busy, setBusy] = useState(false)

  async function loadItems() {
    if (!backend) return
    const { data, error } = await getMenuItems({ includeUnavailable: true })
    if (error) { setNotice(`Could not load menu: ${error.message}`); return }
    setItems(data || [])
  }

  async function checkAdmin(userId) {
    if (!backend) return
    const admin = await checkAdminRole(userId)
    setIsAdmin(admin)
    if (admin) loadItems()
  }

  useEffect(() => {
    if (!backend) return undefined
    let alive = true
    backend.auth.getSession().then(({ data }) => {
      if (!alive) return
      setSession(data.session)
      if (data.session) checkAdmin(data.session.user.id)
    })
    const { data: { subscription } } = backend.auth.onAuthStateChange((_event, next) => {
      setSession(next)
      if (!next) { setIsAdmin(false); setItems([]) }
      else checkAdmin(next.user.id)
    })
    return () => { alive = false; subscription.unsubscribe() }
  }, [])

  async function signIn(event) {
    event.preventDefault()
    setBusy(true)
    const { error } = await backend.auth.signInWithPassword({ email, password })
    setBusy(false)
    setPassword('')
    setNotice(error ? `Sign-in failed: ${error.message}` : 'Signed in. Checking admin access…')
  }

  async function addItem(event) {
    event.preventDefault()
    setBusy(true)
    const payload = { ...form, name: form.name.trim(), category: form.category.trim(), price: Number(form.price), description: form.description.trim(), emoji: form.emoji.trim() || '🍽️', available: true }
    const { error } = await saveMenuItem(payload)
    setBusy(false)
    if (error) { setNotice(`Could not add item: ${error.message}`); return }
    setForm(emptyForm)
    setNotice('Menu item added.')
    await loadItems()
    onMenuChanged()
  }

  async function deleteItem(id) {
    const { error } = await deleteMenuItem(id)
    if (error) { setNotice(`Could not remove item: ${error.message}`); return }
    setItems(current => current.filter(item => item.id !== id))
    setNotice('Menu item removed.')
    onMenuChanged()
  }

  return <>
    <button type="button" className="menu-admin-trigger" onClick={() => { setOpen(true); setNotice('') }}><Settings size={15} /> Menu Admin</button>
    {open && <div className="admin-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setOpen(false) }}>
      <section className="admin-dialog" role="dialog" aria-modal="true" aria-labelledby="admin-title">
        <div className="admin-dialog-head"><div><p className="eyebrow">PRIVATE MENU TOOLS</p><h2 id="admin-title">Menu Manager</h2></div><button className="admin-icon-button" onClick={() => setOpen(false)} aria-label="Close menu manager"><X size={19} /></button></div>
        {!backend ? <p className="admin-notice">Connect Supabase with the root .env settings and run <code>supabase/schema.sql</code> to enable menu management.</p> : !session ? <form className="admin-login" onSubmit={signIn}><p>Sign in with an existing cafe admin account. Public sign-up is disabled.</p><label>Email<input type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} required /></label><label>Password<input type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required /></label><button className="button button-primary" disabled={busy}><LogIn size={15} /> {busy ? 'Signing in…' : 'Sign in'}</button></form> : !isAdmin ? <div className="admin-notice">Signed in as {session.user.email}, but this account has no admin role. Assign it in Supabase using the README instructions.<button className="button button-outline" onClick={() => backend.auth.signOut()}><LogOut size={15} /> Sign out</button></div> : <>
          <form className="admin-add-form" onSubmit={addItem}><h3>Add a menu item</h3><label>Item name<input maxLength="80" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></label><div className="admin-form-row"><label>Category<input maxLength="40" placeholder="e.g. Ramen" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required /></label><label>Price (₹)<input type="number" min="1" max="100000" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required /></label></div><div className="admin-form-row"><label>Emoji<input maxLength="12" value={form.emoji} onChange={e => setForm({ ...form, emoji: e.target.value })} /></label><label>Description<input maxLength="180" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></label></div><button className="button button-primary" disabled={busy}><Plus size={15} /> Add item</button></form>
          <div className="admin-list-head"><h3>Live menu items</h3><button className="admin-icon-button" onClick={loadItems} aria-label="Refresh menu"><RefreshCw size={16} /></button></div>
          <ul className="admin-item-list">{items.map(item => <li key={item.id}><span>{item.emoji} <strong>{item.name}</strong><small>{item.category} · ₹{Number(item.price).toLocaleString('en-IN')}</small></span><button className="admin-icon-button" onClick={() => deleteItem(item.id)} aria-label={`Remove ${item.name}`}><Trash2 size={16} /></button></li>)}</ul>
          <button className="button button-outline admin-signout" onClick={() => backend.auth.signOut()}><LogOut size={15} /> Sign out</button>
        </>}
        {notice && <p className="admin-notice" role="status">{notice}</p>}
      </section>
    </div>}
  </>
}
