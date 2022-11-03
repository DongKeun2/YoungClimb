import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api';
import getConfig from '../headers';

import avatar from '../../assets/image/profile/avatar.png';

import example1 from '../../assets/image/profile/example1.png';
import example2 from '../../assets/image/profile/example2.png';
import example3 from '../../assets/image/profile/example3.png';
import example4 from '../../assets/image/profile/example4.png';

const search = createAsyncThunk('search', async (data, {rejectWithValue}) => {
  try {
    const res = await axios.post(api.search(), data, getConfig());
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const searchUser = createAsyncThunk(
  'searchUser',
  async (data, {rejectWithValue}) => {
    try {
      const res = await axios.post(api.searchUser(), data, getConfig());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
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
      centerLevelColor: '파랑',
      centerName: '더클라임 양재점',
      wallName: 'A구역',
      holdColor: '초록',
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
      centerLevelColor: '핑크',
      centerName: '더클라임 양재점',
      wallName: 'A구역',
      holdColor: '갈색',
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
      centerLevelColor: '파랑',
      centerName: '더클라임 양재점',
      wallName: 'A구역',
      holdColor: '초록',
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
      centerLevelColor: '하늘',
      centerName: '더클라임 양재점',
      wallName: 'A구역',
      holdColor: '파랑',
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
  users: [
    {
      nickname: '하하',
      image: avatar,
      rank: 'Y2',
    },
    {
      nickname: '호호',
      image: avatar,
      rank: 'Y4',
    },
    {
      nickname: '히히',
      image: avatar,
      rank: 'Y6',
    },
  ],
};

export const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: {
    [search.fulfilled]: (state, action) => {
      state.bords = action.payload;
    },
    [searchUser.fulfilled]: (state, action) => {
      state.users = action.payload;
    },
  },
});

export {search, searchUser};

export const {} = SearchSlice.actions;

export default SearchSlice.reducer;
