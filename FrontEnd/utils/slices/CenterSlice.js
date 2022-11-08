import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api';

const fetchCenterInfo = createAsyncThunk(
  'fetchCenterInfo',
  async (nickname, {rejectWithValue}) => {
    console.log('팔로우 정보 요청', nickname);
    try {
      const res = await axios.get(api.fetchCenter(), {});
      console.log('센터 정보 성공', res.data);
      console.log(res.data[0].wallList);
      console.log(res.data[0].centerLevelList);
      return res.data;
    } catch (err) {
      console.log('센터 정보 실패');
      return rejectWithValue(err.response.data);
    }
  },
);

const initialState = {};

export const CenterSlice = createSlice({
  name: 'center',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCenterInfo.fulfilled]: (state, action) => {
      state.centerInfo = action.payload;
    },
  },
});

export {fetchCenterInfo};

export default CenterSlice.reducer;
