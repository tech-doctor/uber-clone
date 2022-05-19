import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { currentAddress } from '../Service/address';
import counterReducer from './slice';

export const store = configureStore({
  reducer: {
    root: counterReducer,
    [currentAddress.reducerPath]: currentAddress.reducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(currentAddress.middleware),
});

setupListeners(store.dispatch);


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType <typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;