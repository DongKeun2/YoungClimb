import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api';
import getConfig from '../headers';

import avatar from '../../assets/image/profile/avatar.png';

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
  bords: [],
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
    [searchUser.fulfilled]: (state, action) => {
      state.usurs = action.payload;
    },
  },
});

export {searchUser};

export const {} = SearchSlice.actions;

export default SearchSlice.reducer;
