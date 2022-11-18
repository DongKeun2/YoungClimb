import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api';

const fetchCenterInfo = createAsyncThunk(
  'fetchCenterInfo',
  async (arg, {rejectWithValue}) => {
    try {
      const res = await axios.get(api.fetchCenter(), {});
      return res.data;
    } catch (err) {
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
