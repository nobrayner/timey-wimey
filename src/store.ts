import { configureStore, ThunkAction, Action, createSlice } from '@reduxjs/toolkit'
import { roundTimeToMinutes } from './utils'
import { TimeCard } from './types'

interface StoreState {
  roundToMinutes: number,
  timeCards: TimeCard[]
}

const initialState: StoreState = {
  roundToMinutes: 15,
  timeCards: []
}

const timeCardsSlice = createSlice({
  name: 'timeCards',
  initialState,
  reducers: {
    addTimeCard(state) {
      const now = new Date()
      const nowRounded = roundTimeToMinutes(now, state.roundToMinutes)

      state.timeCards.push({
        id: state.timeCards.length,
        start: nowRounded,
        end: undefined,
        ticket: '',
        details: ''
      })
    }
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
