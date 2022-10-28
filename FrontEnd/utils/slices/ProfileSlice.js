import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api';
import getConfig from '../headers';

import sampleImg from '../../assets/image/main/wingspanExample.png';
import example1 from '../../assets/image/profile/example1.png';
import example2 from '../../assets/image/profile/example2.png';
import example3 from '../../assets/image/profile/example3.png';
import example4 from '../../assets/image/profile/example4.png';

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

const follow = createAsyncThunk(
  'follow',
  async (nickname, {rejectWithValue}) => {
    try {
      const res = await axios.post(api.follow(nickname), {}, getConfig());
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
      const res = await axios.get(api.follow(nickname), getConfig());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
  profileInfo: {
    isMine: 'F',
    isFollow: true,
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
      boardNum: 12,
      followingNum: 33,
      followerNum: 35,
    },
  },
  boards: [
    {
      id: 1,
      createUser: '나는 문어',
      createdAt: '2022-10-28',
      centerId: 1,
      centerLevelId: 3,
      mediaId: example1,
      wallId: 5,
      difficulty: 5,
      holdColor: 2,
      solvedDate: '2022-10-27',
      content: '하하하',
      like: 20,
      view: 30,
      isFollow: false,
      isLiked: true,
      isScrap: true,
      commentNum: 20,
      commentPreview: {nickname: '나는 오징어', content: '오...'},
    },
    {
      id: 4,
      createUser: '나는 문어',
      createdAt: '2022-10-28',
      centerId: 1,
      centerLevelId: 3,
      mediaId: example2,
      wallId: 5,
      difficulty: 5,
      holdColor: 2,
      solvedDate: '2022-10-27',
      content: '하하하',
      like: 20,
      view: 30,
      isFollow: false,
      isLiked: true,
      isScrap: true,
      commentNum: 20,
      commentPreview: {nickname: '나는 오징어', content: '오...'},
    },
    {
      id: 2,
      createUser: '나는 문어',
      createdAt: '2022-10-28',
      centerId: 1,
      centerLevelId: 3,
      mediaId: example3,
      wallId: 5,
      difficulty: 5,
      holdColor: 2,
      solvedDate: '2022-10-27',
      content: '하하하',
      like: 20,
      view: 30,
      isFollow: false,
      isLiked: true,
      isScrap: true,
      commentNum: 20,
      commentPreview: {nickname: '나는 오징어', content: '오...'},
    },
    {
      id: 3,
      createUser: '나는 문어',
      createdAt: '2022-10-28',
      centerId: 1,
      centerLevelId: 3,
      mediaId: example4,
      wallId: 5,
      difficulty: 5,
      holdColor: 2,
      solvedDate: '2022-10-27',
      content: '하하하',
      like: 20,
      view: 30,
      isFollow: false,
      isLiked: true,
      isScrap: true,
      commentNum: 20,
      commentPreview: {nickname: '나는 오징어', content: '오...'},
    },
  ],
  scraps: [
    {
      id: 4,
      createUser: '나는 문어',
      createdAt: '2022-10-28',
      centerId: 1,
      centerLevelId: 3,
      mediaId: example2,
      wallId: 5,
      difficulty: 5,
      holdColor: 2,
      solvedDate: '2022-10-27',
      content: '하하하',
      like: 20,
      view: 30,
      isFollow: false,
      isLiked: true,
      isScrap: true,
      commentNum: 20,
      commentPreview: {nickname: '나는 오징어', content: '오...'},
    },
    {
      id: 2,
      createUser: '나는 문어',
      createdAt: '2022-10-28',
      centerId: 1,
      centerLevelId: 3,
      mediaId: example3,
      wallId: 5,
      difficulty: 5,
      holdColor: 2,
      solvedDate: '2022-10-27',
      content: '하하하',
      like: 20,
      view: 30,
      isFollow: false,
      isLiked: true,
      isScrap: true,
      commentNum: 20,
      commentPreview: {nickname: '나는 오징어', content: '오...'},
    },
    {
      id: 1,
      createUser: '나는 문어',
      createdAt: '2022-10-28',
      centerId: 1,
      centerLevelId: 3,
      mediaId: example1,
      wallId: 5,
      difficulty: 5,
      holdColor: 2,
      solvedDate: '2022-10-27',
      content: '하하하',
      like: 20,
      view: 30,
      isFollow: false,
      isLiked: true,
      isScrap: true,
      commentNum: 20,
      commentPreview: {nickname: '나는 오징어', content: '오...'},
    },

    {
      id: 3,
      createUser: '나는 문어',
      createdAt: '2022-10-28',
      centerId: 1,
      centerLevelId: 3,
      mediaId: example4,
      wallId: 5,
      difficulty: 5,
      holdColor: 2,
      solvedDate: '2022-10-27',
      content: '하하하',
      like: 20,
      view: 30,
      isFollow: false,
      isLiked: true,
      isScrap: true,
      commentNum: 20,
      commentPreview: {nickname: '나는 오징어', content: '오...'},
    },
  ],
  followInfo: {
    followings: [
      {
        image: '',
        nickname: '',
        height: 180,
        shoeSize: 260,
        wingspan: 190,
        rank: 2,
        gender: 'M',
      },
      ,
    ],
    followers: [],
  },
};

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProfile.fulfilled]: state => {
      state.loginState = true;
    },
    [follow.fulfilled]: (state, action) => {
      state.isFollow = action.payload;
    },
  },
});

export {fetchProfile, follow};

export const {} = ProfileSlice.actions;

export default ProfileSlice.reducer;
