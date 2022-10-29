import {configureStore} from '@reduxjs/toolkit';

import AccountsSlice from './slices/AccountsSlice';
import ProfileSlice from './slices/ProfileSlice';

const store = configureStore({
  reducer: {
    accounts: AccountsSlice,
    profile: ProfileSlice,
  },
});

export default store;
