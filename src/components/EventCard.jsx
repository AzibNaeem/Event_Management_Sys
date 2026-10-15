import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { formatDate, formatTime } from '../ticketmaster'

function EventCard({ event }) {
  const user = useSelector((state) => state.auth.user)
  const registrations = useSelector((state) => state.registrations)

  const location = [event.city, event.country].filter(Boolean).join(', ')
  const registered = user && (registrations[user.email] || []).some((e) => e.id === event.id)

  return (
    <div className="event-card">
      {event.image ? (
        <img src={event.image} alt={event.name} />
      ) : (
        <div className="no-image">No image</div>
      )}

      <div className="event-info">
        <div className="card-tags">
          {event.category && <span className="tag">{event.category}</span>}
          {registered && <span className="tag tag-green">Registered</span>}
        </div>
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
