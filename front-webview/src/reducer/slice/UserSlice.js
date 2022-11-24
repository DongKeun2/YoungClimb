import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: {},
  isLoggedIn: false,
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchCurrentUser: (state, action) => {
      state.userInfo = action.payload
    },
    changeIsLoggedIn: (state, action) => {
      state.isLoggedIn = state.payload
    },
  },
})

export const { fetchCurrentUser, changeIsLoggedIn } = UserSlice.actions
export default UserSlice.reducer
