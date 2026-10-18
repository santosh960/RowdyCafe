import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const backend = url && key && !url.includes('YOUR_PROJECT')
  ? createClient(url, key)
  : null

export async function getMenuItems({ includeUnavailable = false } = {}) {
  if (!backend) return { data: null, error: null }
  let query = backend.from('menu_items')
    .select('id,name,category,price,emoji,description,available')
    .order('created_at', { ascending: false })
  if (!includeUnavailable) query = query.eq('available', true)
  return query
}

export async function isAdmin(userId) {
  if (!backend) return false
  const { data, error } = await backend.from('user_roles')
    .select('user_id').eq('user_id', userId).eq('role', 'admin').maybeSingle()
  return !error && Boolean(data)
}

export async function addMenuItem(item) {
  if (!backend) return { error: new Error('Supabase is not configured.') }
  return backend.from('menu_items').insert(item)
}

export async function removeMenuItem(id) {
  if (!backend) return { error: new Error('Supabase is not configured.') }
  return backend.from('menu_items').delete().eq('id', id)
}
