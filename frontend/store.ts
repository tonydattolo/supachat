import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
// import { zebraApi } from "./slices/zebraApi";
// import useNftModal from "./slices/useNftModalSlice";

import { supachatApi } from "@/slices/supachatApi";
import supachat from "@/slices/supachatSlice";

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

const reducers = combineReducers({
  [supachatApi.reducerPath]: supachatApi.reducer,
  supachat,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [supachatApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
      .concat(supachatApi.middleware),
  });

export const store = makeStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// NOTE: normally you would use `useSelector` and `useDispatch` in your app
// However, moving them into their own hooks file avoids circular import dependency
// issues with TypeScript. As such, they have been moved to `hooks/rtkHooks.ts`.
// You can now import from useAppSelector and useAppDispatch from `hooks/rtkHooks.ts`
// and use them as you normally would with JS rtk.
// SEE: https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks

// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// export const useAppDispatch: () => typeof store.dispatch = useDispatch;


// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
