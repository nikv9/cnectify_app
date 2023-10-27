import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import userReducer from "./reducers/userReducer";
import profileReducer from "./reducers/profileReducer";
import postReducer from "./reducers/postReducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const Store = configureStore({
  reducer: {
    // auth:authReducer,
    auth: persistedReducer,
    user: userReducer,
    profile: profileReducer,
    post: postReducer,
  },
  // avoids non-serializable warnings
  middleware: [thunk],
});

export const persistor = persistStore(Store);
