import { configureStore } from "@reduxjs/toolkit";
import auth_reducer from "./reducers/auth_reducer";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import user_reducer from "./reducers/user_reducer";
import profile_reducer from "./reducers/profile_reducer";
import post_reducer from "./reducers/post_reducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, auth_reducer);

export const Store = configureStore({
  reducer: {
    // auth:auth_reducer,
    auth: persistedReducer,
    user: user_reducer,
    profile: profile_reducer,
    post: post_reducer,
  },
  // avoids non-serializable warnings
  middleware: [thunk],
});

export const persistor = persistStore(Store);
