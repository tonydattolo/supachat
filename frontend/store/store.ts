import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { supachatApi } from "@/slices/supachatApi";
import supachat from "@/slices/supachatSlice";

const reducers = combineReducers({
  // [supachatApi.reducerPath]: supachatApi.reducer,
  supachat,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
  blacklist: ["supachat"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  //@ts-ignore
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(supachatApi.middleware),
});

export default store;

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch);

// NOTE: normally you would use `useSelector` and `useDispatch` in your app
// However, moving them into their own hooks file avoids circular import dependency
// issues with TypeScript. As such, they have been moved to `hooks/rtkHooks.ts`.
// You can now import from useAppSelector and useAppDispatch from `hooks/rtkHooks.ts`
// and use them as you normally would with JS rtk.
// SEE: https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks

// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// export const useAppDispatch: () => typeof store.dispatch = useDispatch;
