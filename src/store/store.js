import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import eventsReducer from './eventsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
  },
})

store.subscribe(() => {
  const { users, user } = store.getState().auth
  localStorage.setItem('users', JSON.stringify(users))
  localStorage.setItem('currentUser', JSON.stringify(user))
})

export default store
