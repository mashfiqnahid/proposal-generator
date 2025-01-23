import { configureStore } from '@reduxjs/toolkit';
import proposalReducer from '../features/proposalSlice';

export const store = configureStore({
  reducer: {
    proposal: proposalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
