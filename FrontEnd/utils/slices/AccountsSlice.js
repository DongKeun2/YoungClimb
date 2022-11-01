import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api';
import getConfig from '../headers';

import {
  setAccessToken,
  setRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setCurrentUser,
  removeCurrentUser,
} from '../Token';

const login = createAsyncThunk('login', async (payload, {rejectWithValue}) => {
  try {
    const res = await axios.post(api.login(), payload, {});
    setAccessToken(res.data.accessToken);
    setRefreshToken(res.data.refreshToken);
    setCurrentUser(res.data.user);
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
    removeCurrentUser();
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const checkEmail = createAsyncThunk(
  'checkEmail',
  async (data, {rejectWithValue}) => {
    try {
      const res = await axios.post(api.checkEmail(), data, getConfig());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const checkNickname = createAsyncThunk(
  'checkNickname',
  async (data, {rejectWithValue}) => {
    console.log('요청 데이터', data);
    try {
      const res = await axios.post(api.checkNickname(), data, {});
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const signup = createAsyncThunk(
  'signup',
  async (payload, {rejectWithValue}) => {
    console.log('회원가입 정보', payload);
    try {
      const res = await axios.post(api.signup(), payload, {});
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const profileCreate = createAsyncThunk(
  'profileCreate',
  async (formdata, {rejectWithValue}) => {
    console.log('회원가입 후 프로필, 자기소개 입력', formdata);
    try {
      const res = await axios.post(api.profile(), formdata, getConfig());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const wingspan = createAsyncThunk(
  'wingspan',
  async (formData, {rejectWithValue}) => {
    console.log('측정 요청 감');
    const header = {
      'Content-Type': 'multipart/form-data',
    };
    try {
      const res = await axios({
        method: 'post',
        url: api.wingspan(),
        data: formData,
        headers: header,
      });
      console.log('결과', res.data);
      return res.data;
    } catch (err) {
      console.log('에러...', err);
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
    wingspan: {
      value: '',
      type: 'textInput',
      rules: {},
      valid: false,
    },
  },
  editForm: {
    nickname: {
      value: '',
      type: 'textInput',
      valid: false,
    },
    password: {
      value: '',
      type: 'textInput',
    },
    intro: {
      value: '',
      type: 'textInput',
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
    wingspan: {
      value: '',
      type: 'textInput',
      rules: {},
      valid: false,
    },
  },
  uploadImg: null,
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
    changeSignupForm: (state, action) => {
      state.signupForm[action.payload.name].value = action.payload.value;
    },
    changeEditForm: (state, action) => {
      state.editForm[action.payload.name].value = action.payload.value;
    },
    changeIsCheckTerms: (state, action) => {
      state.isCheckTerms = action.payload;
    },
    changeUploadImg: (state, action) => {
      state.uploadImg = action.payload;
    },
  },
  extraReducers: {
    [login.fulfilled]: state => {
      state.loginState = true;
    },
    [login.rejected]: state => {
      state.loginState = false;
    },
    [signup.fulfilled]: (state, action) => {
      console.log('회원가입 성공');
    },
    [signup.rejected]: (state, action) => {
      console.log('회원가입 실패');
    },
    [checkEmail.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isCheckEmail = action.payload;
    },
    [checkEmail.rejected]: (state, action) => {
      alert('사용 불가능한 이메일');
      console.log(action.payload);
    },
    [checkNickname.fulfilled]: (state, action) => {
      state.isCheckNickname = action.payload;
    },
    [checkNickname.rejected]: (state, action) => {
      alert('사용 불가능한 닉네임');
      console.log(action.payload);
    },
  },
});

export {
  login,
  logout,
  wingspan,
  signup,
  profileCreate,
  checkEmail,
  checkNickname,
};

export const {
  testLogin,
  changeSignupForm,
  changeIsCheckTerms,
  changeUploadImg,
  changeEditForm,
} = AccountsSlice.actions;

export default AccountsSlice.reducer;
