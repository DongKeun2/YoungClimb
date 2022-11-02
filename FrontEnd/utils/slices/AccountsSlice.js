import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api';
import getConfig from '../headers';

import {
  setAccessToken,
  setRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from '../Token';

const login = createAsyncThunk('login', async (payload, {rejectWithValue}) => {
  try {
    const res = await axios.post(api.login(), payload, {});
    setAccessToken(res.data.accessToken);
    setRefreshToken(res.data.refreshToken);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const logout = createAsyncThunk('logout', async (arg, {rejectWithValue}) => {
  try {
    const res = await axios.post(api.logout(), {}, getConfig());
    removeAccessToken();
    removeRefreshToken();
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const fetchProfile = createAsyncThunk(
  'fetchProfile',
  async (nickname, {rejectWithValue}) => {
    try {
      const res = await axios.get(api.fetchProfile(nickname), getConfig());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

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
  extraReducers: {
    [login.fulfilled]: state => {
      state.loginState = true;
    },
    [login.rejected]: state => {
      state.loginState = false;
    },
  },
});

export {login};

export const {
  testLogin,
  onCheckTerms,
  changeSignupForm,
  changeIsCheckNickname,
  changeIsCheckEmail,
} = AccountsSlice.actions;

export default AccountsSlice.reducer;
