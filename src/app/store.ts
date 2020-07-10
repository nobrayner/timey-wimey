import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import timesheetsReducer from '../features/timesheets/timesheetsSlice'

export const store = configureStore({
  reducer: {
    timesheets: timesheetsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
