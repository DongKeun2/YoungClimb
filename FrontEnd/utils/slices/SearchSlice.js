import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosTemp from '../axios';
import api from '../api';
import getConfig from '../headers';

const fetchUser = createAsyncThunk(
  'fetchUser',
  async (arg, {rejectWithValue}) => {
    try {
      const res = await axiosTemp.get(api.searchUser(), await getConfig());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const search = createAsyncThunk('search', async (data, {rejectWithValue}) => {
  try {
    const res = await axiosTemp.post(api.search(), data, await getConfig());
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const searchUser = createAsyncThunk(
  'searchUser',
  async (data, {rejectWithValue}) => {
    try {
      const res = await axiosTemp.post(
        api.searchUser(),
        data,
        await getConfig(),
      );
      return res.data;
    } catch (err) {
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
    [search.rejected]: state => {
      state.boards = [];
    },
    [searchUser.fulfilled]: (state, action) => {
      state.users = action.payload;
    },
    [searchUser.rejected]: state => {
      state.users = [];
    },
  },
});

export {search, searchUser, fetchUser};

export const {} = SearchSlice.actions;

export default SearchSlice.reducer;
