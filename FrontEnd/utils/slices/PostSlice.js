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
      return res.data;
    } catch (err) {
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
      return res.data;
    } catch (err) {
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
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const postAdd = createAsyncThunk('postAdd', async (data, {rejectWithValue}) => {
  try {
    const res = await axiosTemp.post(api.postAdd(), data, await getConfig());
    return res.data;
  } catch (err) {
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
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const fetchDetail = createAsyncThunk(
  'fetchDetail',
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
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const fetchReels = createAsyncThunk(
  'fetchReels',
  async (pageNumber, {rejectWithValue}) => {
    try {
      const res = await axiosTemp.get(api.reels(pageNumber), await getConfig());
      return res.data;
    } catch (err) {
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
      return res.data;
    } catch (err) {
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
      return res.data;
    } catch (err) {
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
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const deleteComment = createAsyncThunk(
  'deleteComment',
  async (commentId, {rejectWithValue}) => {
    try {
      const res = await axiosTemp.post(
        api.commentDelete(commentId),
        {},
        await getConfig(),
      );
      return res.data;
    } catch (err) {
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
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
  boards: {},
  boardArray: [],
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
    changeBoardArray: (state, action) => {
      state.boardArray = action.payload;
    },
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
    },
    [fetchHomeFeedAdd.fulfilled]: (state, action) => {
      state.boards = action.payload;
      state.boardArray = [...state.boardArray, ...action.payload.boardDtos];
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
  deleteComment,
  viewCount,
};

export const {
  changeBoardArray,
  changeUploadVideo,
  changeCommentIdForRe,
  changeNicknameForRe,
  changeIsFocusedInput,
} = PostSlice.actions;

export default PostSlice.reducer;
