import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { cancelRegistration } from '../store/registrationsSlice'
import { formatDate, formatTime } from '../ticketmaster'

const today = new Date().toLocaleDateString('en-CA')

function MyEvents() {
  const user = useSelector((state) => state.auth.user)
  const registrations = useSelector((state) => state.registrations)
  const dispatch = useDispatch()

  const myEvents = [...(registrations[user.email] || [])].sort((a, b) =>
    (a.date || '9999').localeCompare(b.date || '9999')
  )

  const upcoming = myEvents.filter((e) => !e.date || e.date >= today)
  const completed = myEvents.filter((e) => e.date && e.date < today)

  const handleCancel = (event) => {
    if (window.confirm(`Cancel your registration for "${event.name}"?`)) {
      dispatch(cancelRegistration({ email: user.email, id: event.id }))
    }
  }

  const showEvent = (event, isPast) => {
    const location = [event.city, event.country].filter(Boolean).join(', ')

    return (
      <div className="event-card" key={event.id}>
        {event.image ? (
          <img src={event.image} alt={event.name} />
        ) : (
          <div className="no-image">No image</div>
        )}

        <div className="event-info">
          <div className="card-tags">
            <span className={isPast ? 'tag' : 'tag tag-green'}>
              {isPast ? 'Completed' : 'Registered'}
            </span>
          </div>
          <h3>{event.name}</h3>

          <p>{formatDate(event.date)} at {formatTime(event.time)}</p>
          <p>{event.venue}</p>
          {location && <p>{location}</p>}

          <Link to={`/events/${event.id}`} className="btn">View details</Link>
          {!isPast && (
            <button className="secondary" onClick={() => handleCancel(event)}>Cancel registration</button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>My Events</h2>

      {myEvents.length === 0 && (
        <p>
          You have not registered for any events yet. <Link to="/events">Browse events</Link>
        </p>
      )}

      {upcoming.length > 0 && (
        <>
          <h3>Upcoming ({upcoming.length})</h3>
          <div className="event-grid">
            {upcoming.map((event) => showEvent(event, false))}
          </div>
        </>
      )}

      {completed.length > 0 && (
        <>
          <h3 className="section-title">Completed ({completed.length})</h3>
          <div className="event-grid">
            {completed.map((event) => showEvent(event, true))}
          </div>
        </>
      )}
    </div>
  )
}

export default MyEvents
