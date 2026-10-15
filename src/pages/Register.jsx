import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../store/authSlice'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const users = useSelector((state) => state.auth.users)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const cleanEmail = email.trim().toLowerCase()

    if (!name.trim() || !cleanEmail || !password) {
      setError('Please fill in all the fields.')
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      setError('Please enter a valid email address.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (users.find((u) => u.email === cleanEmail)) {
      setError('An account with this email already exists.')
      return
    }

    dispatch(registerUser({ name: name.trim(), email: cleanEmail, password }))
    navigate('/login', { state: { message: 'Account created. You can login now.' } })
  }

  return (
    <div className="form-box">
      <h2>Register</h2>

      <form onSubmit={handleSubmit} noValidate>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />


        {error && <p className="error">{error}</p>}

        <button type="submit">Create account</button>
      </form>

      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}

export default Register
