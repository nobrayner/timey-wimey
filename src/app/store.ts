import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import db from '../db'
import timeEntriesReducer, { loadState, TimeEntry } from '../features/timeentries/timeEntriesSlice'

export const store = configureStore({
  reducer: {
    timeEntries: timeEntriesReducer,
  },
});

const testEntries: TimeEntry[] = [
  { id: 0, start: '09:00 AM', end: '10:00 AM', ticket: '1234', details: 'Did stuff' },
  { id: 1, start: '10:00 AM', end: '03:15 PM', ticket: '4321', details: 'More stuff' },
]
db.timeEntries.toArray().then(entries => {
  //@ts-ignore
  if (process.env.NODE_ENV !== 'production' && window.Cypress) {
    setTimeout(() => store.dispatch(loadState(testEntries)), 300)
  } else {
    setTimeout(() => store.dispatch(loadState(entries)), 300)
  }
}).catch(error => {
  console.log(error)
})

store.subscribe(onChange)

function onChange() {
  db.timeEntries.clear().then(() => {
    db.timeEntries.bulkPut(store.getState().timeEntries.entries)
  })
}

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
