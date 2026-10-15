import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getEvent, formatDate, formatTime } from '../ticketmaster'

function EventDetails() {
  const { id } = useParams()

  // use the event from the list if we already have it, otherwise ask the API
  const listEvent = useSelector((state) => state.events.events.find((e) => e.id === id))
  const [fetched, setFetched] = useState(null)
  const [loading, setLoading] = useState(!listEvent)
  const [error, setError] = useState('')

  useEffect(() => {
    if (listEvent) return

    let ignore = false
    getEvent(id)
      .then((data) => {
        if (!ignore) setFetched(data)
      })
      .catch((err) => {
        if (!ignore) setError(err.message)
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [id, listEvent])

  const event = listEvent || fetched

  if (loading) return <p>Loading event...</p>

  if (error || !event) {
    return (
      <div>
        <p className="error">{error || 'Event not found.'}</p>
        <Link to="/events">Back to events</Link>
      </div>
    )
  }

  const location = [event.address, event.city, event.country].filter(Boolean).join(', ')
  const cancelled = event.status === 'cancelled' || event.status === 'postponed'

  return (
    <div className="details">
      <Link to="/events">&larr; Back to events</Link>

      {event.image ? (
        <img src={event.image} alt={event.name} className="details-image" />
      ) : (
        <div className="no-image details-image">No image</div>
      )}

      <div className="details-tags">
        {event.category && <span className="tag">{event.category}</span>}
        {event.genre && <span className="tag">{event.genre}</span>}
        {cancelled && <span className="tag tag-red">{event.status}</span>}
      </div>

      <h2>{event.name}</h2>

      <p><strong>Date:</strong> {formatDate(event.date)}</p>
      <p><strong>Time:</strong> {formatTime(event.time)}</p>
      <p><strong>Venue:</strong> {event.venue}</p>
      {location && <p><strong>Location:</strong> {location}</p>}
      {event.price && <p><strong>Price:</strong> {event.price}</p>}

      <h3>About this event</h3>
      <p>{event.description || 'No description available for this event.'}</p>

      {event.url && (
        <p>
          <a href={event.url} target="_blank" rel="noreferrer">View on Ticketmaster</a>
        </p>
      )}
    </div>
  )
}

export default EventDetails
