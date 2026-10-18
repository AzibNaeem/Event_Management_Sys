const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2'

// turns one Ticketmaster event into the small object the app uses
export function formatEvent(e) {
  const venue = e._embedded?.venues?.[0]
  const image = e.images?.find((img) => img.ratio === '16_9' && img.width >= 500) || e.images?.[0]
  const segment = e.classifications?.[0]?.segment?.name
  const genre = e.classifications?.[0]?.genre?.name
  const price = e.priceRanges?.[0]

  return {
    id: e.id,
    name: e.name,
    date: e.dates?.start?.localDate || null,
    time: e.dates?.start?.localTime || null,
    venue: venue?.name || 'Venue TBA',
    city: venue?.city?.name || '',
    country: venue?.country?.name || '',
    address: venue?.address?.line1 || '',
    image: image?.url || null,
    category: segment && segment !== 'Undefined' ? segment : '',
    genre: genre && genre !== 'Undefined' ? genre : '',
    description: e.info || e.pleaseNote || '',
    price: price ? `${price.min} - ${price.max} ${price.currency}` : '',
    status: e.dates?.status?.code || '',
    url: e.url || '',
  }
}

export function formatDate(date) {
  if (!date) return 'Date TBA'
  return new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatTime(time) {
  if (!time) return 'Time TBA'
  const [hours, minutes] = time.split(':')
  const d = new Date()
  d.setHours(hours, minutes)
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

export async function getEvents({ keyword, city, category, date, page = 0 } = {}) {
  if (!API_KEY) {
    throw new Error('Ticketmaster API key is missing. Add VITE_TICKETMASTER_API_KEY to your .env file.')
  }

  // the API wants dates like 2026-10-20T00:00:00Z (no milliseconds)
  const start = date ? date + 'T00:00:00Z' : new Date().toISOString().slice(0, 19) + 'Z'

  const params = new URLSearchParams({
    apikey: API_KEY,
    size: 20,
    page,
    sort: 'date,asc',
    startDateTime: start,
  })
  if (keyword) params.set('keyword', keyword)
  if (city) params.set('city', city)
  if (category) params.set('classificationName', category)

  let res
  try {
    res = await fetch(`${BASE_URL}/events.json?${params}`)
  } catch {
    throw new Error('Could not reach Ticketmaster. Check your internet connection.')
  }

  if (res.status === 429) throw new Error('Too many requests. Please wait a moment and try again.')
  if (res.status === 401) throw new Error('The Ticketmaster API key is not valid.')
  if (!res.ok) throw new Error('Ticketmaster request failed (' + res.status + ').')

  const data = await res.json()

  // the API only lets you page through the first 1000 results (50 pages of 20)
  return {
    events: (data._embedded?.events || []).map(formatEvent),
    totalPages: Math.min(data.page?.totalPages || 0, 50),
  }
}

export async function getEvent(id) {
  if (!API_KEY) {
    throw new Error('Ticketmaster API key is missing. Add VITE_TICKETMASTER_API_KEY to your .env file.')
  }

  let res
  try {
    res = await fetch(`${BASE_URL}/events/${encodeURIComponent(id)}.json?apikey=${API_KEY}`)
  } catch {
    throw new Error('Could not reach Ticketmaster. Check your internet connection.')
  }

  if (res.status === 404) throw new Error('Event not found.')
  if (res.status === 429) throw new Error('Too many requests. Please wait a moment and try again.')
  if (!res.ok) throw new Error('Ticketmaster request failed (' + res.status + ').')

  return formatEvent(await res.json())
}
