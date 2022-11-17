import { combineReducers } from "redux";


// Redcer-Persist
import { persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage";

import TokenSlice from "./slice/TokenSlice";
import UserSlice from "./slice/UserSlice";
import AdminInfoSlice from "./slice/AdminInfoSlice";

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

const rootReducer = combineReducers({
  authToken: TokenSlice,
  user: UserSlice,
  info: AdminInfoSlice,
});


export default persistReducer(persistConfig, rootReducer);