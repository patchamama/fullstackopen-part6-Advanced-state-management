import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Test notification'
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    cleanNotification(state, action) {
      return ''
    },
    addNotification(state, action) {
      return action.payload
    },
  },
})

export const { addNotification, cleanNotification } = notificationSlice.actions
export default notificationSlice.reducer
