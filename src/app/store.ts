import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import timeEntriesReducer from '../features/timeentries/timeEntriesSlice'

export const store = configureStore({
  reducer: {
    timeEntries: timeEntriesReducer,
  },
});

if (process.env.NODE_ENV !== 'production') {
  //@ts-ignore
  window.store = store
}

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
