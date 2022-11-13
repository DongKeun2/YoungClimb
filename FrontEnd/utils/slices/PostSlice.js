import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api';
import getConfig, {getHeader} from '../headers';

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

const postAdd = createAsyncThunk('postAdd', async (data, {rejectWithValue}) => {
  try {
    const res = await axios.post(api.postAdd(), data, await getConfig());
    console.log('게시글 성공');
    return res.data;
  } catch (err) {
    console.log('게시글 실패', err);
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

const likeBoard = createAsyncThunk(
  'likeBoard',
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

const scrapBoard = createAsyncThunk(
  'scrapBoard',
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

const getVideoPath = createAsyncThunk(
  'getVideoPath',
  async (formData, {rejectWithValue}) => {
    try {
      const res = await axios.post(api.videoToUrl(), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: await getHeader(),
        },
      });
      return res.data;
    } catch (err) {
      console.log('동영상 실패', err);
      return rejectWithValue(err.response.data);
    }
  },
);

const fetchReels = createAsyncThunk(
  'fetchReels',
  async (pageNumber, {rejectWithValue}) => {
    try {
      const res = await axios.get(api.homeFeed(pageNumber), await getConfig());
      console.log('릴스 요청 성공', res.data.length, res.data);
      return res.data;
    } catch (err) {
      console.log('릴스 요청 실패', err);
      return rejectWithValue(err.response.data);
    }
  },
);

const commentLikeSubmit = createAsyncThunk(
  'commentLikeSubmit',
  async (commentId, {rejectWithValue}) => {
    try {
      const res = await axios.post(
        api.commentLike(commentId),
        {},
        await getConfig(),
      );
      console.log('댓글 좋아요 성공', res.data);
      return res.data;
    } catch (err) {
      console.log('댓글 좋아요 실패', err);
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
  videoPath: '',
  reels: [],
};

export const PostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    changeUploadVideo: (state, action) => {
      state.uploadVideo = action.payload;
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
    [likeBoard.fulfilled]: (state, action) => {
      state.boardInfo.isLiked = action.payload.isLike;
      state.boardInfo.like = action.payload.like;
    },
    [scrapBoard.fulfilled]: (state, action) => {
      state.boardInfo.isScrap = action.payload;
    },
    [getVideoPath.fulfilled]: (state, action) => {
      state.videoPath = action.payload;
    },
    [fetchReels.fulfilled]: (state, action) => {
      state.reels = action.payload;
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
  likeBoard,
  scrapBoard,
  getVideoPath,
  fetchReels,
  commentLikeSubmit,
};

export const {changeUploadVideo} = PostSlice.actions;

export default PostSlice.reducer;
