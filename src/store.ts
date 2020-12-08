import { configureStore, ThunkAction, Action, createSlice } from '@reduxjs/toolkit';

const initialState = {

}

const timeCardsSlice = createSlice({
  name: 'timeCards',
  initialState,
  reducers: {
    
  }
})

export const store = configureStore({
  reducer: timeCardsSlice.reducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
