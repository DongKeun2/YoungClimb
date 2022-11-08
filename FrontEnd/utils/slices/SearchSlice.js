import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api';
import getConfig from '../headers';

import example1 from '../../assets/image/profile/example1.png';
import example2 from '../../assets/image/profile/example2.png';
import example3 from '../../assets/image/profile/example3.png';
import example4 from '../../assets/image/profile/example4.png';

const fetchUser = createAsyncThunk(
  'fetchUser',
  async (arg, {rejectWithValue}) => {
    console.log('추천 유저 받기');
    try {
      const res = await axios.get(api.searchUser(), {});
      console.log('추천유저정보', res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const search = createAsyncThunk('search', async (data, {rejectWithValue}) => {
  try {
    console.log('검색 요청', data);
    const res = await axios.post(api.search(), data, {});
    console.log('검색 성공', res.data);
    return res.data;
  } catch (err) {
    console.log('검색 실패');
    return rejectWithValue(err.response.data);
  }
});

const searchUser = createAsyncThunk(
  'searchUser',
  async (data, {rejectWithValue}) => {
    console.log('유저 검색 요청');
    try {
      const res = await axios.post(api.searchUser(), data, {});
      console.log('검색결과', res);
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
  starUsers: [],
  boards: [
    // {
    //   id: 1,
    //   createUser: '나는 문어',
    //   createdAt: '2022-10-28',
    //   centerId: 1,
    //   centerLevelId: 3,
    //   mediaId: example1,
    //   wallId: 5,
    //   difficulty: 'V1',
    //   centerLevelColor: '파랑',
    //   centerName: '더클라임 양재점',
    //   wallName: 'A구역',
    //   holdColor: '초록',
    //   solvedDate: '2022-10-27',
    //   content: '하하하',
    //   like: 20,
    //   view: 30,
    //   isFollow: false,
    //   isLiked: true,
    //   isScrap: true,
    //   commentNum: 20,
    //   commentPreview: {nickname: '나는 오징어', content: '오...'},
    // },
    // {
    //   id: 4,
    //   createUser: '나는 문어',
    //   createdAt: '2022-10-28',
    //   centerId: 1,
    //   centerLevelId: 3,
    //   mediaId: example2,
    //   wallId: 5,
    //   difficulty: 'V1',
    //   centerLevelColor: '핑크',
    //   centerName: '더클라임 양재점',
    //   wallName: 'A구역',
    //   holdColor: '갈색',
    //   solvedDate: '2022-10-27',
    //   content: '하하하',
    //   like: 20,
    //   view: 30,
    //   isFollow: false,
    //   isLiked: true,
    //   isScrap: true,
    //   commentNum: 20,
    //   commentPreview: {nickname: '나는 오징어', content: '오...'},
    // },
    // {
    //   id: 2,
    //   createUser: '나는 문어',
    //   createdAt: '2022-10-28',
    //   centerId: 1,
    //   centerLevelId: 3,
    //   mediaId: example3,
    //   wallId: 5,
    //   difficulty: 'V1',
    //   centerLevelColor: '파랑',
    //   centerName: '더클라임 양재점',
    //   wallName: 'A구역',
    //   holdColor: '초록',
    //   solvedDate: '2022-10-27',
    //   content: '하하하',
    //   like: 20,
    //   view: 30,
    //   isFollow: false,
    //   isLiked: true,
    //   isScrap: true,
    //   commentNum: 20,
    //   commentPreview: {nickname: '나는 오징어', content: '오...'},
    // },
    // {
    //   id: 3,
    //   createUser: '나는 문어',
    //   createdAt: '2022-10-28',
    //   centerId: 1,
    //   centerLevelId: 3,
    //   mediaId: example4,
    //   wallId: 5,
    //   difficulty: 'V1',
    //   centerLevelColor: '하늘',
    //   centerName: '더클라임 양재점',
    //   wallName: 'A구역',
    //   holdColor: '파랑',
    //   solvedDate: '2022-10-27',
    //   content: '하하하',
    //   like: 20,
    //   view: 30,
    //   isFollow: false,
    //   isLiked: true,
    //   isScrap: true,
    //   commentNum: 20,
    //   commentPreview: {nickname: '나는 오징어', content: '오...'},
    // },
  ],
  users: [],
};

export const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      state.starUsers = action.payload;
    },
    [search.fulfilled]: (state, action) => {
      state.boards = action.payload;
    },
    [searchUser.fulfilled]: (state, action) => {
      console.log('유저검색 성공함', action.payload);
      state.users = action.payload;
    },
    [searchUser.rejected]: (state, action) => {
      console.log('검색 튕겨짐');
    },
  },
});

export {search, searchUser, fetchUser};

export const {} = SearchSlice.actions;

export default SearchSlice.reducer;
