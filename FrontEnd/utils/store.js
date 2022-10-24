import {configureStore} from '@reduxjs/toolkit';

import AccountsSlice from './slices/AccountsSlice';

const store = configureStore({
  reducer: {
    accounts: AccountsSlice,
  },
});

export default store;
