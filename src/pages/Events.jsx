import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents } from '../store/eventsSlice'
import EventCard from '../components/EventCard'

const today = new Date().toISOString().slice(0, 10)

function Events() {
  const { events, filters, page, totalPages, loaded, loading, error } = useSelector((state) => state.events)
  const dispatch = useDispatch()

  // the form starts with whatever was searched last
  const [keyword, setKeyword] = useState(filters.keyword)
  const [city, setCity] = useState(filters.city)
  const [category, setCategory] = useState(filters.category)
  const [date, setDate] = useState(filters.date)

  useEffect(() => {
    if (!loaded) {
      dispatch(fetchEvents({}))
    }
  }, [loaded, dispatch])

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(fetchEvents({ keyword: keyword.trim(), city: city.trim(), category, date, page: 0 }))
  }

  const handleClear = () => {
    setKeyword('')
    setCity('')
    setCategory('')
    setDate('')
    dispatch(fetchEvents({}))
  }

  const goToPage = (newPage) => {
    dispatch(fetchEvents({ ...filters, page: newPage }))
    window.scrollTo(0, 0)
  }

  return (
    <div>
      <h2>Upcoming Events</h2>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search events or artists"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All categories</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Arts & Theatre">Arts & Theatre</option>
          <option value="Film">Film</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>

        <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} />

        <button type="submit" disabled={loading}>Search</button>
        <button type="button" className="secondary" onClick={handleClear} disabled={loading}>Clear</button>
      </form>

      {loading && <p>Loading events...</p>}

      {error && (
        <div>
          <p className="error">{error}</p>
          <button onClick={() => dispatch(fetchEvents({ ...filters, page }))}>Try again</button>
        </div>
      )}

      {loaded && !loading && !error && events.length === 0 && (
        <p>No events found. Try a different search.</p>
      )}

      {!error && (
        <div className="event-grid">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {!error && totalPages > 1 && (
        <div className="pagination">
          <button disabled={loading || page === 0} onClick={() => goToPage(page - 1)}>Previous</button>
          <span>Page {page + 1} of {totalPages}</span>
          <button disabled={loading || page + 1 >= totalPages} onClick={() => goToPage(page + 1)}>Next</button>
        </div>
      )}
    </div>
  )
}

export default Events
