import {configureStore} from '@reduxjs/toolkit';

import AccountsSlice from './slices/AccountsSlice';
import ProfileSlice from './slices/ProfileSlice';
import SearchSlice from './slices/SearchSlice';

const store = configureStore({
  reducer: {
    accounts: AccountsSlice,
    profile: ProfileSlice,
    search: SearchSlice,
  },
});

export default store;
