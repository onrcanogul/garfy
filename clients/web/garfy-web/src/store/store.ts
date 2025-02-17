import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/social-media/postSlice"; // Post Slice'ı import ediyoruz.

export const store = configureStore({
  reducer: {
    posts: postReducer, // Redux Store'da 'posts' state'ini yöneten reducer
  },
});

// Redux Store'un tiplerini çıkar (TypeScript kullanıyorsan)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
