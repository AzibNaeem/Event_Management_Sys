import { Link } from 'react-router-dom'
import { formatDate, formatTime } from '../ticketmaster'

function EventCard({ event }) {
  const location = [event.city, event.country].filter(Boolean).join(', ')

  return (
    <div className="event-card">
      {event.image ? (
        <img src={event.image} alt={event.name} />
      ) : (
        <div className="no-image">No image</div>
      )}

      <div className="event-info">
        {event.category && <span className="tag">{event.category}</span>}
        <h3>{event.name}</h3>

        <p>{formatDate(event.date)} at {formatTime(event.time)}</p>
        <p>{event.venue}</p>
        {location && <p>{location}</p>}

        <Link to={`/events/${event.id}`} className="btn">View details</Link>
      </div>
    </div>
  )
}

export default EventCard
