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
  },
})
export const { registerUser } = authSlice.actions

export default authSlice.reducer
