import {Alert} from 'react-native';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import axiosTemp from '../axios';
import api from '../api';
import getConfig from '../headers';

import {
  setAccessToken,
  removeAccessToken,
  setCurrentUser,
  removeCurrentUser,
  setRefreshToken,
  removeRefreshToken,
} from '../Token';

const login = createAsyncThunk('login', async (data, {rejectWithValue}) => {
  try {
    const res = await axios.post(api.login(), data, {});
    setAccessToken(res.data.accessToken);
    setRefreshToken(res.data.refreshToken);
    setCurrentUser(res.data.user);
    return res.data;
  } catch (err) {
    Alert.alert('로그인 정보', '이메일과 비밀번호를 확인해주세요.');
    return rejectWithValue(err.response.data);
  }
});

const logout = createAsyncThunk('logout', async (arg, {rejectWithValue}) => {
  try {
    // await axios.post(api.fcmtokendelete(), {}, await getConfig());
    const res = await axiosTemp.post(api.logout(), {}, await getConfig());
    removeAccessToken();
    removeRefreshToken();
    removeCurrentUser();
    return res.data;
  } catch (err) {
    removeAccessToken();
    removeRefreshToken();
    removeCurrentUser();
    return rejectWithValue(err.response.data);
  }
});

const checkEmail = createAsyncThunk(
  'checkEmail',
  async (data, {rejectWithValue}) => {
    try {
      const res = await axios.post(api.checkEmail(), data, {});
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const checkNickname = createAsyncThunk(
  'checkNickname',
  async (data, {rejectWithValue}) => {
    try {
      const res = await axios.post(api.checkNickname(), data, {});
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

// 회원가입시에도 스토리지에 저장
const signup = createAsyncThunk('signup', async (data, {rejectWithValue}) => {
  try {
    const res = await axios.post(api.signup(), data, {});
    setAccessToken(res.data.accessToken);
    setRefreshToken(res.data.refreshToken);
    setCurrentUser(res.data.user);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const saveImage = createAsyncThunk(
  'saveImage',
  async (formData, {rejectWithValue}) => {
    try {
      const res = await axios({
        method: 'POST',
        url: api.saveImage(),
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const profileCreate = createAsyncThunk(
  'profileCreate',
  async (data, {rejectWithValue}) => {
    try {
      const res = await axiosTemp.post(
        api.profileCreate(),
        data,
        await getConfig(),
      );
      setCurrentUser(res.data.user);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const profileEdit = createAsyncThunk(
  'profileEdit',
  async (data, {rejectWithValue}) => {
    try {
      const res = await axiosTemp.post(
        api.profileEdit(),
        data,
        await getConfig(),
      );
      Alert.alert('프로필  수정', '수정이 완료되었습니다.');
      setCurrentUser(res.data.user);
      return res.data;
    } catch (err) {
      Alert.alert('프로필  수정', '수정 실패');
      return rejectWithValue(err.response.data);
    }
  },
);

const wingspan = createAsyncThunk(
  'wingspan',
  async (formData, {rejectWithValue}) => {
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
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
  loginState: false,
  currentUser: {},
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
    fetchCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      state.loginState = true;
    },
    changeSignupForm: (state, action) => {
      if (
        action.payload.name === 'height' ||
        action.payload.name === 'shoeSize' ||
        action.payload.name === 'wingspan'
      ) {
        state.signupForm[action.payload.name].value =
          action.payload.value.replace(/[^0-9]/g, '');
      } else {
        switch (action.payload.name) {
          case 'email':
            state.isCheckEmail = false;
            break;
          case 'nickname':
            state.isCheckNickname = false;
            break;
          default:
            break;
        }
        state.signupForm[action.payload.name].value = action.payload.value;
      }
    },
    changeEditForm: (state, action) => {
      if (action.payload.value === 0) {
        state.editForm[action.payload.name].value = '';
      } else if (
        !action.payload.reset &&
        (action.payload.name === 'height' ||
          action.payload.name === 'shoeSize' ||
          action.payload.name === 'wingspan')
      ) {
        state.editForm[action.payload.name].value =
          action.payload.value.replace(/[^0-9]/g, '');
      } else {
        state.editForm[action.payload.name].value = action.payload.value;
      }
    },
    changeIsCheckTerms: (state, action) => {
      state.isCheckTerms = action.payload;
    },
    changeUploadImg: (state, action) => {
      state.uploadImg = action.payload;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.loginState = true;
      state.currentUser = action.payload.user;
    },
    [login.rejected]: state => {
      state.loginState = false;
    },
    [signup.fulfilled]: (state, action) => {
      state.currentUser = action.payload.user;
    },
    [checkEmail.fulfilled]: (state, action) => {
      if (action.payload === false) {
        Alert.alert('가입정보 확인', '사용 불가능한 이메일입니다.');
      }
      state.isCheckEmail = action.payload;
    },
    [checkEmail.rejected]: () => {
      Alert.alert('가입정보 확인', '사용 불가능한 이메일입니다.');
    },
    [checkNickname.fulfilled]: (state, action) => {
      if (action.payload === false) {
        Alert.alert('가입정보 확인', '사용 불가능한 닉네임입니다.');
      }
      state.isCheckNickname = action.payload;
    },
    [checkNickname.rejected]: (state, action) => {
      Alert.alert('가입정보 확인', '사용 불가능한 이메일입니다.');
    },
    [logout.fulfilled]: state => {
      state.loginState = false;
    },
    [logout.rejected]: state => {
      state.loginState = false;
    },
    [profileCreate.fulfilled]: (state, action) => {
      state.loginState = true;
      state.currentUser = action.payload.user;
    },
    [profileEdit.fulfilled]: (state, action) => {
      console.log('여기', action.payload);
      state.currentUser = action.payload.user;
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
  profileEdit,
  saveImage,
};

export const {
  changeSignupForm,
  changeIsCheckTerms,
  changeUploadImg,
  changeEditForm,
  fetchCurrentUser,
} = AccountsSlice.actions;

export default AccountsSlice.reducer;
