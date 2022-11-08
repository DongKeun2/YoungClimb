import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api';
import getConfig from '../headers';
// import getConfig from '../headers';

const postAdd = createAsyncThunk('post', async (data, {rejectWithValue}) => {
  try {
    const res = await axios.post(api.postAdd(), data, {});
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const fetchDetail = createAsyncThunk(
  'fetchDetail',
  async (boardId, {rejectWithValue}) => {
    console.log('게시글 상세 요청 보냄');
    try {
      const res = await axios.get(api.detail(boardId), await getConfig());
      console.log('게시글 요청 성공', res.data);
      return res.data;
    } catch (err) {
      console.log('게시글 요청 실패', err);
      return rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
  boardInfo: {
    id: 3,
    createUser: {
      nickname: 'YoungClimb_YoungJunK',
      image: null,
      rank: 'Y1',
    },
    createdAt: '5시간 전',
    centerName: '더 클라임 양재점',
    centerLevelColor: '초록',
    mediaPath:
      'https://s3.ap-northeast-2.amazonaws.com/youngclimb/boardImg/0f446944-8243-452d-b89b-7204e3fe446b.mp4',
    wallName: 'D구역',
    difficulty: 'V1',
    holdColor: '검정',
    solvedDate: '2022.09.24',
    content:
      'T1이 이기겠지..? 이길거야 징동 T1 무서워했다며.. 실력으로 보여줄거야 구마유시 믿는다 황마유시 대상혁도 나오면 더 좋고ㅎ 진짜 무조건 이겨야 해 그래야 Lck 내전 본다~',
    like: 968,
    view: 3160,
    isFollow: true,
    isLiked: false,
    isScrap: true,
    commentNum: 1557,
    commentPreview: {nickname: '0_climb', comment: '무조건 이기지~!!!'},
  },
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
    [fetchDetail.fulfilled]: (state, action) => {
      state.boardInfo = action.payload;
    },
  },
});

export {postAdd, fetchDetail};

export const {changeUploadVideo, changeUploadVideoUri} = PostSlice.actions;

export default PostSlice.reducer;
