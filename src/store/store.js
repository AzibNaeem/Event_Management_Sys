import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import eventsReducer from './eventsSlice'
import registrationsReducer from './registrationsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
    registrations: registrationsReducer,
  },
})

store.subscribe(() => {
  const { auth, registrations } = store.getState()
  localStorage.setItem('users', JSON.stringify(auth.users))
  localStorage.setItem('currentUser', JSON.stringify(auth.user))
  localStorage.setItem('registrations', JSON.stringify(registrations))
})

export default store
