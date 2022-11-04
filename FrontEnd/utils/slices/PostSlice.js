import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import axios from 'axios';
// import api from '../api';
// import getConfig from '../headers';

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
  extraReducers: {},
});

export const {changeUploadVideo, changeUploadVideoUri} = PostSlice.actions;

export default PostSlice.reducer;
