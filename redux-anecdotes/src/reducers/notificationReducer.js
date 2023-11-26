import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
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

export const setNotification = (text, seconds) => {
  return async (dispatch) => {
    dispatch(addNotification(text))
    setTimeout(() => {
      dispatch(cleanNotification())
    }, seconds * 1000)
  }
}

export const { addNotification, cleanNotification } = notificationSlice.actions
export default notificationSlice.reducer
