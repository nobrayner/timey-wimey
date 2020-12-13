import { configureStore, ThunkAction, Action, createSlice, createSelector, getDefaultMiddleware, PayloadAction } from '@reduxjs/toolkit'
import { roundTimeToMinutes } from './utils'
import { TimeCard } from './types'

const selectSelf = (state: RootState) => state
export const selectTimeCards = createSelector(selectSelf, state => state.timeCards)
export const selectTimeSheetDate = createSelector(selectSelf, state => state.timeCards[0]?.start || new Date())
export const selectTimeSpent = createSelector(selectSelf, state => {
  const totalMinutes = state.timeCards.map(tc => {
    const { start, end } = tc
    if (start && end) {
      const diffMilliseconds = end.valueOf() - start.valueOf()

      if (diffMilliseconds >= 0) {
        return diffMilliseconds / 1000 / 60 // Time diff in minutes
      }
    }

    return 0
  }).reduce((total, diffMinutes) => total + diffMinutes, 0)

  const displayHours = totalMinutes / 60 | 0
  let timeSpent = `${displayHours}h`

  const displayMinutes = totalMinutes % 60
  if (displayMinutes > 0) {
    timeSpent += ` ${displayMinutes}m`
  }

  return timeSpent
})
export const selectRoundToMinutes = createSelector(selectSelf, state => state.roundToMinutes)

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
    },
    updateTimeCardDate(state, action: PayloadAction<{ id: number, dateType: 'start' | 'end', newValue: string }>) {
      const { id, dateType, newValue } = action.payload
      const timeCard = state.timeCards.find(timeCard => timeCard.id === id)

      if (timeCard) {
        const [hours, minutes] = newValue.trim().split(':').map(v => Number(v))
        if (!isNaN(hours) && !isNaN(minutes)) {
          const date = selectTimeSheetDate.resultFunc(state)
          timeCard[dateType] = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes)
        }
      }
    },
    updateTimeCardString(state, action: PayloadAction<{ id: number, stringType: 'ticket' | 'details', newValue: string }>) {
      const { id, stringType, newValue } = action.payload
      const timeCard = state.timeCards.find(timeCard => timeCard.id === id)

      if (timeCard) {
        timeCard[stringType] = newValue
      }
    },
  }
})

export const { addTimeCard, updateTimeCardDate, updateTimeCardString } = timeCardsSlice.actions
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
