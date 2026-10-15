import { createSlice } from '@reduxjs/toolkit'

// saved like { "user@email.com": [event, event], ... } so every user has their own list
const saved = JSON.parse(localStorage.getItem('registrations')) || {}

const registrationsSlice = createSlice({
  name: 'registrations',
  initialState: saved,
  reducers: {
    registerEvent(state, action) {
      const { email, event } = action.payload

      if (!state[email]) {
        state[email] = []
      }
      if (state[email].some((e) => e.id === event.id)) {
        return
      }
      state[email].push(event)
    },
    cancelRegistration(state, action) {
      const { email, id } = action.payload
      state[email] = (state[email] || []).filter((e) => e.id !== id)
    },
  },
})
export const { registerEvent, cancelRegistration } = registrationsSlice.actions

export default registrationsSlice.reducer
