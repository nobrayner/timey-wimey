import { configureStore } from "@reduxjs/toolkit"
import timeEntriesReducer, { addTimeEntry } from '../features/timeentries/timeEntriesSlice'

describe('timeEntries', () => {
  describe('addTimeEntry action', () => {
    it('stores the time entries', () => {
      const records = [
        { id: 0, start: '09:00 AM', end: '10:00 AM', ticket: '1234', details: 'Did stuff' },
        { id: 1, start: '10:00 AM', end: '03:15 PM', ticket: '4321', details: 'More stuff' },
      ]

      const store = configureStore({
        reducer: {
          timeEntries: timeEntriesReducer
        }
      })

      store.dispatch(addTimeEntry(records[0]))
      store.dispatch(addTimeEntry(records[1]))

      expect(store.getState().timeEntries).toEqual(records)
    })
  })

})