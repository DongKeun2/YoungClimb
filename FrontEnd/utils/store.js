import {configureStore} from '@reduxjs/toolkit';

import AccountsSlice from './slices/AccountsSlice';
import ProfileSlice from './slices/ProfileSlice';

import StoreDetailSlice from './slices/StoreDetailSlice';
import SearchSlice from './slices/SearchSlice';

import PostSlice from './slices/PostSlice';
import CenterSlice from './slices/CenterSlice';
import notificationSlice from './slices/notificationSlice';

const store = configureStore({
  reducer: {
    accounts: AccountsSlice,
    profile: ProfileSlice,
    storeDetail: StoreDetailSlice,
    search: SearchSlice,
    post: PostSlice,
    center: CenterSlice,
    notification: notificationSlice
  },
});

export default store;
