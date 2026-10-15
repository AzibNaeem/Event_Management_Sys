import { useParams } from 'react-router-dom'

function EventDetails() {
  const { id } = useParams()

  return <h2>Event details: {id}</h2>
}

export default EventDetails
