import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import authStore from "./authStore";
import userStore from "./userStore";
import postStore from "./postStore";
import profileStore from "./profileStore";

const persistConfig = {
  key: "root",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authStore);

export const Store = configureStore({
  reducer: {
    // auth:authStore,
    auth: persistedAuthReducer,
    user: userStore,
    profile: profileStore,
    post: postStore,
  },
  // avoids non-serializable warnings
  middleware: [thunk],
});

export const persistor = persistStore(Store);
