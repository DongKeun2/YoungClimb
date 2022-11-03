import {configureStore} from '@reduxjs/toolkit';
import StoreDetail from '../screens/stores/StoreDetail';

import AccountsSlice from './slices/AccountsSlice';
import ProfileSlice from './slices/ProfileSlice';
import StoreDetailSlice from './slices/StoreDetailSlice';

const store = configureStore({
  reducer: {
    accounts: AccountsSlice,
    profile: ProfileSlice,
    storeDetail: StoreDetailSlice
  },
});

export default store;
