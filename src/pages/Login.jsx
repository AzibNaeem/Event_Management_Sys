import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const users = useSelector((state) => state.auth.users)
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const message = location.state?.message
  const from = location.state?.from || '/events'

  const handleLogin = (e) => {
    e.preventDefault()

    const cleanEmail = email.trim().toLowerCase()

    if (!cleanEmail || !password) {
      setError('Please enter your email and password.')
      return
    }

    const found = users.find((u) => u.email === cleanEmail && u.password === password)
    if (!found) {
      setError('Wrong email or password.')
      return
    }

    // the password is not kept in the logged in user
    dispatch(login({ name: found.name, email: found.email }))
    navigate(from)
  }

  if (user) {
    return <Navigate to="/events" replace />
  }

  return (
    <div className="form-box">
      <h2>Login</h2>

      {message && <p className="success">{message}</p>}

      <form onSubmit={handleLogin} noValidate>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>

      <p>No account yet? <Link to="/register">Register</Link></p>
    </div>
  )
}

export default Login
