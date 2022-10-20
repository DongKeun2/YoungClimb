import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loginState: false,
};

export const AccountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    testLogin: (state, action) => {
      state.loginState = action.payload;
    },
  },
  extraReducers: {},
});

export const {testLogin} = AccountsSlice.actions;

export default AccountsSlice.reducer;
