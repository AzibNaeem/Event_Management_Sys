import { createSlice } from '@reduxjs/toolkit'

const users = JSON.parse(localStorage.getItem('users')) || []
const user = JSON.parse(localStorage.getItem('currentUser')) || null

const authSlice = createSlice({
  name: 'auth',
  initialState: { users, user },
  reducers: {
    registerUser(state, action) {
      state.users.push(action.payload)
    },
    login(state, action) {
      state.user = action.payload
    },
    logout(state) {
      state.user = null
    },
  },
})
export const { registerUser, login, logout } = authSlice.actions

export default authSlice.reducer
