import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api';
import getConfig from '../headers';

import sampleImg from '../../assets/image/main/wingspanExample.png';

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
  profileInfo: {
    isMine: 'F',
    isFollow: 'F',
    user: {
      image: sampleImg,
      nickname: '닉네임입니다',
      gender: 'M',
      intro: '안녕하세요ㅎㅎ',
      height: 177,
      shoeSize: 270,
      wingspan: 190,
      rank: 2,
      exp: 50,
      followingNum: 33,
      followerNum: 35,
    },
  },
};

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    testLogin: (state, action) => {
      state.loginState = action.payload;
    },
  },
  extraReducers: {
    [fetchProfile.fulfilled]: state => {
      state.loginState = true;
    },
  },
});

export {fetchProfile};

export const {} = ProfileSlice.actions;

export default ProfileSlice.reducer;
