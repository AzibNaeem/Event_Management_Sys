import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getEvents } from '../ticketmaster'

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (params, { rejectWithValue }) => {
    try {
      return await getEvents(params)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  },
  {
    // do not start a second request while one is already running
    condition: (params, { getState }) => !getState().events.loading,
  }
)

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    totalPages: 0,
    loaded: false,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false
        state.loaded = true
        state.events = action.payload.events
        state.totalPages = action.payload.totalPages
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Something went wrong.'
      })
  },
})

export default eventsSlice.reducer
