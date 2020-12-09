import { configureStore, ThunkAction, Action, createSlice, createSelector, getDefaultMiddleware } from '@reduxjs/toolkit'
import { roundTimeToMinutes } from './utils'
import { TimeCard } from './types'

const selectSelf = (state: RootState) => state
export const selectTimeCards = createSelector(selectSelf, state => state.timeCards)

export interface RootState {
  roundToMinutes: number,
  timeCards: TimeCard[]
}

const initialState: RootState = {
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

export const { addTimeCard } = timeCardsSlice.actions
export const reducer = timeCardsSlice.reducer

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['timeCards/addTimeCard']
    }
  })
});

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
