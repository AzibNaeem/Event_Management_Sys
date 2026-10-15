import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents } from '../store/eventsSlice'
import EventCard from '../components/EventCard'

function Events() {
  const { events, loaded, loading, error } = useSelector((state) => state.events)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!loaded) {
      dispatch(fetchEvents({}))
    }
  }, [loaded, dispatch])

  return (
    <div>
      <h2>Upcoming Events</h2>

      {loading && <p>Loading events...</p>}

      {error && (
        <div>
          <p className="error">{error}</p>
          <button onClick={() => dispatch(fetchEvents({}))}>Try again</button>
        </div>
      )}

      {loaded && !loading && !error && events.length === 0 && <p>No events found.</p>}

      <div className="event-grid">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}

export default Events
