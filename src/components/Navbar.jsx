import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/events" className="brand">Event Manager</NavLink>

      <div className="nav-links">
        <NavLink to="/events">Events</NavLink>
        <NavLink to="/my-events">My Events</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </div>
    </nav>
  )
}

export default Navbar
