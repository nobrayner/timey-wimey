import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import db from '../db'
import timeEntriesReducer, { loadState } from '../features/timeentries/timeEntriesSlice'

export const store = configureStore({
  reducer: {
    timeEntries: timeEntriesReducer,
  },
});

db.timeEntries.toArray().then(entries => {
  setTimeout(() => store.dispatch(loadState(entries)), 300)
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
