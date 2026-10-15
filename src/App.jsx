import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Events from './pages/Events'
import EventDetails from './pages/EventDetails'
import MyEvents from './pages/MyEvents'

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/events" replace />} />

          <Route path="/login" element={<Login />} />


          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<Events />} />

          <Route path="/events/:id" element={<EventDetails />} />
          <Route
            path="/my-events"
            element={
              <ProtectedRoute>
                <MyEvents />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h2>Page not found</h2>} />
          
        </Routes>
      </div>
    </>
  )
}

export default App
