import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api';
// import getConfig from '../headers';

const postAdd = createAsyncThunk('post', async (data, {rejectWithValue}) => {
  try {
    const res = await axios.post(api.postAdd(), data, {});
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const initialState = {
  postInfo: {
    media: null,
    centerId: null,
    centerLevelId: null,
    content: '',
    holdColor: '',
    memberId: 0,
    solvedDate: null,
    wallId: null,
  },
  uploadVideo: null,
  uploadVideoUri: null,
};

export const PostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    changeUploadVideo: (state, action) => {
      state.uploadVideo = action.payload;
    },
    changeUploadVideoUri: (state, action) => {
      state.uploadVideoUri = action.payload;
    },
  },
  extraReducers: {
    [postAdd.fulfilled]: state => {
      console.log('성공');
    },
    [postAdd.rejected]: state => {
      console.log('실패');
    },
  },
});

export {postAdd};

export const {changeUploadVideo, changeUploadVideoUri} = PostSlice.actions;

export default PostSlice.reducer;
