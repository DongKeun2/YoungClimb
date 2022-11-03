import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api';
import getConfig from '../headers';

import sampleImg from '../../assets/image/main/wingspanExample.png';
import example1 from '../../assets/image/profile/example1.png';
import example2 from '../../assets/image/profile/example2.png';
import example3 from '../../assets/image/profile/example3.png';
import example4 from '../../assets/image/profile/example4.png';
import avatar from '../../assets/image/profile/avatar.png';

const profile = createAsyncThunk(
  'profile',
  async (nickname, {rejectWithValue}) => {
    try {
      const res = await axios.get(api.profile(nickname), getConfig());
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
    isMine: false,
    isFollow: false,
    user: {
      image: sampleImg,
      nickname: '닉네임입니다',
      gender: 'M',
      intro: '안녕하세요ㅎㅎ',
      height: 177,
      shoeSize: 270,
      wingspan: 190,
      rank: 'Y4',
      exp: 70,
      expleft: 200,
      upto: 1,
      boardNum: 12,
      followingNum: 33,
      followerNum: 35,
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
        difficulty: 'V1',
        centerLevelColor: 'red',
        centerName: '더클라임 양재점',
        wallName: 'A구역',
        holdColor: 'red',
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
        difficulty: 'V1',
        centerLevelColor: 'red',
        centerName: '더클라임 양재점',
        wallName: 'A구역',
        holdColor: 'red',
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
        difficulty: 'V1',
        centerLevelColor: 'blue',
        centerName: '더클라임 양재점',
        wallName: 'A구역',
        holdColor: 'red',
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
        difficulty: 'V1',
        centerLevelColor: 'blue',
        centerName: '더클라임 양재점',
        wallName: 'A구역',
        holdColor: 'red',
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
        difficulty: 'V1',
        centerLevelColor: 'red',
        centerName: '더클라임 양재점',
        wallName: 'A구역',
        holdColor: 'red',
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
        difficulty: 'V1',
        centerName: '더클라임 양재점',
        centerLevelColor: 'red',
        wallName: 'A구역',
        holdColor: 'red',
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
        difficulty: 'V1',
        centerName: '더클라임 양재점',
        centerLevelColor: 'red',
        wallName: 'A구역',
        holdColor: 'red',
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
  },
  followInfo: {
    followings: [
      {
        image: avatar,
        nickname: '나의 팔로워1',
        height: 180,
        shoeSize: 260,
        wingspan: 190,
        rank: 2,
        gender: 'M',
      },
      {
        image: avatar,
        nickname: '나의 팔로워2',
        height: 180,
        shoeSize: 260,
        wingspan: 190,
        rank: 2,
        gender: 'M',
      },
      {
        image: avatar,
        nickname: '나의 팔로워3',
        height: 180,
        shoeSize: 260,
        wingspan: 190,
        rank: 2,
        gender: 'M',
      },
      {
        image: avatar,
        nickname: '나의 팔로워4',
        height: 180,
        shoeSize: 260,
        wingspan: 190,
        rank: 2,
        gender: 'M',
      },
      {
        image: avatar,
        nickname: '나의 팔로워5',
        height: 180,
        shoeSize: 260,
        wingspan: 190,
        rank: 2,
        gender: 'M',
      },
    ],
    followers: [
      {
        image: avatar,
        nickname: '팔로우해주세요',
        height: 180,
        shoeSize: 260,
        wingspan: 190,
        rank: 2,
        gender: 'M',
      },
      {
        image: avatar,
        nickname: '제발요',
        height: 180,
        shoeSize: 260,
        wingspan: 190,
        rank: 2,
        gender: 'M',
      },
    ],
  },
  isOpen: false,
};

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setIsOpen: state => {
      state.isOpen = !state.isOpen;
    },
    setIsClose: state => {
      state.isOpen = false;
    },
  },
  extraReducers: {
    [profile.fulfilled]: (state, action) => {
      state.profileInfo = action.payload;
    },
    [follow.fulfilled]: (state, action) => {
      state.profileInfo.isFollow = action.payload;
    },
    [fetchFollowList.fulfilled]: (state, action) => {
      state.followInfo = action.payload;
    },
  },
});

export {profile, follow, fetchFollowList};

export const {setIsOpen, setIsClose} = ProfileSlice.actions;

export default ProfileSlice.reducer;
