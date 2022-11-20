import {Alert} from 'react-native';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import axiosTemp from '../axios';
import api from '../api';
import getConfig from '../headers';

const profile = createAsyncThunk(
  'profile',
  async (nickname, {rejectWithValue}) => {
    try {
      const res = await axiosTemp.get(api.profile(nickname), await getConfig());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const followSubmit = createAsyncThunk(
  'followSubmit',
  async (nickname, {rejectWithValue}) => {
    try {
      const res = await axiosTemp.post(
        api.follow(nickname),
        {},
        await getConfig(),
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const followingFollowAfter = createAsyncThunk(
  'followingFollowAfter',
  async (nickname, {rejectWithValue}) => {
    try {
      const res = await axiosTemp.get(api.follow(nickname), await getConfig());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const followerFollowAfter = createAsyncThunk(
  'followerFollowAfter',
  async (nickname, {rejectWithValue}) => {
    try {
      const res = await axiosTemp.get(api.follow(nickname), await getConfig());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const fetchFollowList = createAsyncThunk(
  'fetchFollowList',
  async (nickname, {rejectWithValue}) => {
    try {
      const res = await axiosTemp.get(api.follow(nickname), await getConfig());
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

const deleteBoard = createAsyncThunk(
  'deleteBoard',
  async (boardId, {rejectWithValue}) => {
    try {
      const res = await axiosTemp.post(
        api.deleteBoard(boardId),
        {},
        await getConfig(),
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const fetchIsNotice = createAsyncThunk(
  'fetchIsNotice',
  async (arg, {rejectWithValue}) => {
    try {
      const res = await axiosTemp.get(api.fetchIsNotice(), await getConfig());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
  profileInfo: {},
  followInfo: {
    followings: [],
    followers: [],
    followerNum: 0,
    followingNum: 0,
  },
  uploadImg: null,
};

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    changeUploadImg: (state, action) => {
      state.uploadImg = action.payload;
    },
    profileFollow: (state, action) => {
      state.profileInfo.follow = action.payload;
      if (action.payload) {
        state.profileInfo.user.followerNum += 1;
      } else {
        state.profileInfo.user.followerNum -= 1;
      }
    },
    followingFollow: (state, action) => {
      state.followInfo.followings[action.payload.idx].follow =
        action.payload.follow;
    },
    followerFollow: (state, action) => {
      state.followInfo.followers[action.payload.idx].follow =
        action.payload.follow;
    },
  },
  extraReducers: {
    [profile.fulfilled]: (state, action) => {
      state.profileInfo = action.payload;
    },
    [fetchFollowList.fulfilled]: (state, action) => {
      state.followInfo = action.payload;
    },
    [checkNickname.fulfilled]: (state, action) => {
      if (action.payload === false) {
        Alert.alert('가입정보 확인', '사용 불가능한 닉네임입니다.');
      }
      state.isCheckNickname = action.payload;
    },
    [checkNickname.rejected]: () => {
      Alert.alert('가입정보 확인', '사용 불가능한 이메일입니다.');
    },
    [followingFollowAfter.fulfilled]: (state, action) => {
      state.followInfo.followers = action.payload.followers;
      state.followInfo.followerNum = action.payload.followerNum;
      state.followInfo.followingNum = action.payload.followingNum;
    },
    [followerFollowAfter.fulfilled]: (state, action) => {
      state.followInfo.followings = action.payload.followings;
      state.followInfo.followerNum = action.payload.followerNum;
      state.followInfo.followingNum = action.payload.followingNum;
    },
  },
});

export {
  profile,
  followSubmit,
  fetchFollowList,
  checkNickname,
  deleteBoard,
  followingFollowAfter,
  followerFollowAfter,
  fetchIsNotice,
};

export const {changeUploadImg, profileFollow, followingFollow, followerFollow} =
  ProfileSlice.actions;

export default ProfileSlice.reducer;
