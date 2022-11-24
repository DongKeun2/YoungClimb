import { createSlice } from '@reduxjs/toolkit'

export const AdminInfoSlice = createSlice({
  name: 'adminInfo',
  initialState: {
    countCenter: 0,
    countMember: 0,
    countBoard: 0,
    reportInfo: {
      totalReport: 0,
      countBefore: 0,
      countIng: 0,
      countCompleted: 0,
    },
    beforeList: [],
    suspendedList: [],
    recentList: [],
    centerTotalInfo: [],
    centerInfo: {},
    userListInfo: [],
  },
  reducers: {
    set_adminInfo: action => {
      return action.payload
    },
    setCenterTotalInfo: (state, action) => {
      console.log('전체 저장직전 데이터', action.payload)
      state.centerTotalInfo = action.payload
    },
    setCenterInfo: (state, action) => {
      console.log('센터 저장직전 데이터', action.payload)
      state.centerInfo = action.payload
    },
    setUserListInfo: (state, action) => {
      state.userListInfo = action.payload
    },
  },
})

export const {
  set_adminInfo,
  setCenterTotalInfo,
  setCenterInfo,
  setUserListInfo,
} = AdminInfoSlice.actions

export default AdminInfoSlice.reducer
