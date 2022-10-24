import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loginState: false,
  signupInfo: {
    nickname: '',
    email: '',
    password: '',
    confiomPwd: '',
    gender: '',
    height: '',
    shoeSize: '',
    wingSpan: '',
  },
  isCheckTerms: false,
};

export const AccountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    testLogin: (state, action) => {
      state.loginState = action.payload;
    },
    onCheckTerms: (state, action) => {
      state.isCheckTerms = action.payload;
    },
  },
  extraReducers: {},
});

export const {testLogin, onCheckTerms} = AccountsSlice.actions;

export default AccountsSlice.reducer;
