import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api';
import getConfig from '../headers';

const fetchHomeFeed = createAsyncThunk(
  'fetchHomeFeed',
  async (pageNumber, {rejectWithValue}) => {
    try {
      const res = await axios.get(api.homeFeed(pageNumber), await getConfig());
      console.log('홈피드 요청 성공', res.data.length);
      return res.data;
    } catch (err) {
      console.log('홈피드 요청 실패', err);
      return rejectWithValue(err.response.data);
    }
  },
);

const fetchFeedComment = createAsyncThunk(
  'fetchFeedComment',
  async (boardId, {rejectWithValue}) => {
    try {
      const res = await axios.get(api.feedComment(boardId), await getConfig());
      console.log('댓글 요청 성공', res.data);
      return res.data;
    } catch (err) {
      console.log('댓글 요청 실패', err);
      return rejectWithValue(err.response.data);
    }
  },
);

const postAdd = createAsyncThunk('post', async (data, {rejectWithValue}) => {
  try {
    const res = await axios.post(api.postAdd(), data, {});
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const feedLikeSubmit = createAsyncThunk(
  'feedLikeSubmit',
  async (boardId, {rejectWithValue}) => {
    try {
      const res = await axios.post(
        api.feedLike(boardId),
        {},
        await getConfig(),
      );
      console.log('좋아요 성공', res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const feedScrapSubmit = createAsyncThunk(
  'feedScrapSubmit',
  async (boardId, {rejectWithValue}) => {
    try {
      const res = await axios.post(
        api.feedScrap(boardId),
        {},
        await getConfig(),
      );
      console.log('스크랩 성공', res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const fetchDetail = createAsyncThunk(
  'fetchDetail',
  async (boardId, {rejectWithValue}) => {
    console.log('게시글 상세 요청 보냄');
    try {
      const res = await axios.get(api.feedComment(boardId), await getConfig());
      console.log('게시글 요청 성공', res.data);
      return res.data;
    } catch (err) {
      console.log('게시글 요청 실패', err);
      return rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
  boards: [],
  boardInfoComment: {},
  boardInfo: {},
  commentInfo: {},
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
    [fetchDetail.fulfilled]: (state, action) => {
      state.boardInfo = action.payload.boardDto;
      state.commentInfo = action.payload.commentDtos;
    },
    [fetchHomeFeed.fulfilled]: (state, action) => {
      state.boards = action.payload;
    },
    [fetchFeedComment.fulfilled]: (state, action) => {
      state.boardInfoComment = action.payload;
    },
  },
});

export {
  fetchHomeFeed,
  fetchFeedComment,
  postAdd,
  feedLikeSubmit,
  feedScrapSubmit,
  fetchDetail,
};

export const {changeUploadVideo, changeUploadVideoUri} = PostSlice.actions;

export default PostSlice.reducer;
