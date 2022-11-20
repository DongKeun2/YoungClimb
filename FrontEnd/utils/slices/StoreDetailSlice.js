import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api';

const storeDetail = createAsyncThunk(
  'storeDetail',
  async (id, {rejectWithValue}) => {
    try {
      const res = await axios.get(api.center(id), {});
      console.log(res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
  detailInfo: [
    {
      name: '',
      phoneNumber: '',
      address: '',
      centerNumber: 0,
      imageURL: '',
      centerLevelList: [],
      event: [
        {
          date: '',
          content: '',
        },
      ],
      centerTimeList: [],
      centerPriceList: [
        {
          name: '',
          price: '',
        },
      ],
      latitude: 0,
      longitude: 0,
    },
  ],
  isTimeToggleOpen: false,
  isPriceToggleOpen: false,
};

export const StoreDetailSlice = createSlice({
  name: 'storeDetail',
  initialState,
  reducers: {
    setIsTimeToggleOpen: state => {
      state.isTimeToggleOpen = !state.isTimeToggleOpen;
    },
    setIsPriceToggleOpen: state => {
      state.isPriceToggleOpen = !state.isPriceToggleOpen;
    },
  },
  extraReducers: {
    [storeDetail.fulfilled]: (state, action) => {
      state.detailInfo = action.payload;
    },
  },
});

export {storeDetail};
export const {setIsTimeToggleOpen, setIsPriceToggleOpen} =
  StoreDetailSlice.actions;
export default StoreDetailSlice.reducer;
