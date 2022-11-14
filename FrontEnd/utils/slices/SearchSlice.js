import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import axiosTemp from '../axios';
import api from '../api';
import getConfig from '../headers';

const fetchUser = createAsyncThunk(
  'fetchUser',
  async (arg, {rejectWithValue}) => {
    console.log('추천 유저 받기');
    try {
      const res = await axiosTemp.get(api.searchUser(), await getConfig());
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
    const res = await axiosTemp.post(api.search(), data, await getConfig());
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const searchUser = createAsyncThunk(
  'searchUser',
  async (data, {rejectWithValue}) => {
    console.log('유저 검색 요청');
    try {
      const res = await axiosTemp.post(
        api.searchUser(),
        data,
        await getConfig(),
      );
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
  starUsers: [],
  boards: [],
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
    [search.rejected]: (state, action) => {
      console.log('검색 실패');
      state.boards = [];
    },
    [searchUser.fulfilled]: (state, action) => {
      console.log('유저검색 성공');
      state.users = action.payload;
    },
    [searchUser.rejected]: (state, action) => {
      state.users = [];
      console.log('검색 실패');
    },
  },
});

export {search, searchUser, fetchUser};

export const {} = SearchSlice.actions;

export default SearchSlice.reducer;
