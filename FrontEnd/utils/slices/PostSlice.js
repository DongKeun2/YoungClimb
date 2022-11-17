import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api';
import axiosTemp from '../axios';
import getConfig, {getHeader} from '../headers';

const fetchHomeFeed = createAsyncThunk(
  'fetchHomeFeed',
  async (pageNumber, {rejectWithValue}) => {
    try {
      const res = await axiosTemp.get(
        api.homeFeed(pageNumber),
        await getConfig(),
      );
      console.log(pageNumber, '홈피드 요청 성공', res.data.boardDtos.length);
      return res.data;
    } catch (err) {
      console.log('홈피드 요청 실패', err);
      return rejectWithValue(err.response.data);
    }
  },
);

const fetchHomeFeedAdd = createAsyncThunk(
  'fetchHomeFeedAdd',
  async (pageNumber, {rejectWithValue}) => {
    try {
      const res = await axiosTemp.get(
        api.homeFeedAdd(pageNumber),
        await getConfig(),
      );
      console.log(pageNumber, '홈피드 추가 요청 성공', res.data.boardDtos.length);
      return res.data;
    } catch (err) {
      console.log('홈피드 추가 요청 실패', err);
      return rejectWithValue(err.response.data);
    }
  },
);

const fetchFeedComment = createAsyncThunk(
  'fetchFeedComment',
  async (boardId, {rejectWithValue}) => {
    try {
      const res = await axiosTemp.get(
        api.feedComment(boardId),
        await getConfig(),
      );
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
    const res = await axiosTemp.post(api.postAdd(), data, await getConfig());
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
      const res = await axiosTemp.post(
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
      const res = await axiosTemp.post(
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
      const res = await axiosTemp.get(
        api.feedComment(boardId),
        await getConfig(),
      );
      console.log('게시물 정보', res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const fetchComment = createAsyncThunk(
  'fetchComment',
  async (boardId, {rejectWithValue}) => {
    try {
      const res = await axiosTemp.get(
        api.feedComment(boardId),
        await getConfig(),
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const likeBoard = createAsyncThunk(
  'likeBoard',
  async (boardId, {rejectWithValue}) => {
    try {
      const res = await axiosTemp.post(
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
      const res = await axiosTemp.post(
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
      const res = await axiosTemp.post(api.videoToUrl(), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: await getHeader(),
        },
      });
      console.log('비디오 uri 가져오기', res.data);
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
      const res = await axiosTemp.get(
        api.homeFeed(pageNumber),
        await getConfig(),
      );
      console.log(pageNumber, '릴스 요청 성공', res.data.boardDtos.length);
      return res.data;
    } catch (err) {
      console.log('릴스 요청 실패', err);
      return rejectWithValue(err.response.data);
    }
  },
);

const commentAdd = createAsyncThunk(
  'commentAdd',
  async (data, {rejectWithValue}) => {
    try {
      const res = await axiosTemp.post(
        api.comment(data.boardId),
        data.comment,
        await getConfig(),
      );
      console.log('댓글 성공');
      return res.data;
    } catch (err) {
      console.log('댓글 실패', err);
      return rejectWithValue(err.response.data);
    }
  },
);

const commentLikeSubmit = createAsyncThunk(
  'commentLikeSubmit',
  async (commentId, {rejectWithValue}) => {
    try {
      const res = await axiosTemp.post(
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

const recommentAdd = createAsyncThunk(
  'recommentAdd',
  async (data, {rejectWithValue}) => {
    try {
      const res = await axiosTemp.post(
        api.recomment(data.boardId, data.commentId),
        data.comment,
        await getConfig(),
      );
      console.log('대댓글 성공');
      return res.data;
    } catch (err) {
      console.log('대댓글 실패', err);
      return rejectWithValue(err.response.data);
    }
  },
);

const viewCount = createAsyncThunk(
  'viewCount',
  async (boardId, {rejectWithValue}) => {
    try {
      const res = await axiosTemp.post(
        api.viewCount(boardId),
        {},
        await getConfig(),
      );
      console.log('조회수 증가 성공', res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
  boards: {},
  boardArray: [],
  isNext: true,
  isFinish: true,
  boardInfoComment: {},
  boardInfo: {},
  commentInfo: {},
  uploadVideo: null,
  reels: {},
  reelsArray: [],
  commentIdForRe: 0,
  nicknameForRe: '',
  isFocusedInput: false,
};

export const PostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    changeUploadVideo: (state, action) => {
      state.uploadVideo = action.payload;
    },
    changeCommentIdForRe: (state, action) => {
      state.commentIdForRe = action.payload;
    },
    changeNicknameForRe: (state, action) => {
      state.nicknameForRe = action.payload;
    },
    changeIsFocusedInput: (state, action) => {
      state.isFocusedInput = action.payload;
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
    [fetchComment.fulfilled]: (state, action) => {
      state.commentInfo = action.payload.commentDtos;
    },
    [fetchHomeFeed.fulfilled]: (state, action) => {
      state.boards = action.payload;
      state.boardArray = [...state.boardArray, ...action.payload.boardDtos];
      state.isNext = action.payload.nextPage;
    },
    [fetchHomeFeedAdd.fulfilled]: (state, action) => {
      state.boards = action.payload;
      state.boardArray = [...state.boardArray, ...action.payload.boardDtos];
      state.isFinish = action.payload.nextPage;
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
    [fetchReels.fulfilled]: (state, action) => {
      state.reels = action.payload;
      state.reelsArray = [...state.reelsArray, ...action.payload.boardDtos];
    },
  },
});

export {
  fetchHomeFeed,
  fetchHomeFeedAdd,
  fetchFeedComment,
  postAdd,
  feedLikeSubmit,
  feedScrapSubmit,
  fetchDetail,
  fetchComment,
  likeBoard,
  scrapBoard,
  getVideoPath,
  fetchReels,
  commentLikeSubmit,
  commentAdd,
  recommentAdd,
  viewCount,
};

export const {
  changeUploadVideo,
  changeCommentIdForRe,
  changeNicknameForRe,
  changeIsFocusedInput,
} = PostSlice.actions;

export default PostSlice.reducer;
