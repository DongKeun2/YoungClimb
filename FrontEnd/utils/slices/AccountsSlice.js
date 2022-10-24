import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loginState: false,
  signupForm: {
    email: {
      value: '',
      type: 'textInput',
      rules: {},
      valid: false,
    },
    nickname: {
      value: '',
      type: 'textInput',
      rules: {},
      valid: false,
    },
    password: {
      value: '',
      type: 'textInput',
      rules: {},
      valid: false,
    },
    confirmPwd: {
      value: '',
      type: 'textInput',
      rules: {},
      valid: false,
    },
    gender: {
      value: 'M',
      type: 'radio',
    },
    height: {
      value: '',
      type: 'textInput',
      rules: {},
      valid: false,
    },
    shoeSize: {
      value: '',
      type: 'textInput',
      rules: {},
      valid: false,
    },
    wingSpan: {
      value: '',
      type: 'textInput',
      rules: {},
      valid: false,
    },
  },
  isCheckNickname: false,
  isCheckEmail: false,
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
    changeSignupForm: (state, action) => {
      state.signupForm[action.payload.name].value = action.payload.value;
      console.log(state.signupForm);
    },
    changeIsCheckNickname: (state, action) => {
      state.isCheckNickname = action.payload;
    },
    changeIsCheckEmail: (state, action) => {
      state.isCheckEmail = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  testLogin,
  onCheckTerms,
  changeSignupForm,
  changeIsCheckNickname,
  changeIsCheckEmail,
} = AccountsSlice.actions;

export default AccountsSlice.reducer;
