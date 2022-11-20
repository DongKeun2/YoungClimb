import { createSlice } from '@reduxjs/toolkit';

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
      countCompleted: 0
    },
    beforeList:[],
    suspendedList:[],
    recentList:[]
  },
  reducers: {
      set_adminInfo: (state, action) => {
          return action.payload;
      },

  }
})

export const { set_adminInfo } = AdminInfoSlice.actions;

export default AdminInfoSlice.reducer;