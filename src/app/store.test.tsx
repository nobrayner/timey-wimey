import { configureStore, EnhancedStore } from "@reduxjs/toolkit"
import timeEntriesReducer, { addTimeEntry, updateTimeEntry, removeTimeEntry } from '../features/timeentries/timeEntriesSlice'

describe('timeEntries', () => {
  let store: EnhancedStore

  const records = [
    { id: 0, start: '09:00 AM', end: '10:00 AM', ticket: '1234', details: 'Did stuff' },
    { id: 1, start: '10:00 AM', end: '03:15 PM', ticket: '4321', details: 'More stuff' },
  ]

  beforeEach(() => {
    store = configureStore({
      reducer: {
        timeEntries: timeEntriesReducer
      }
    })

    store.dispatch(addTimeEntry(records[0]))
    store.dispatch(addTimeEntry(records[1]))
  })

  describe('addTimeEntry action', () => {
    it('stores the time entries', () => {
      expect(store.getState().timeEntries.entries).toEqual(records)
    })

    it('uses last entries end time as new entries start time if no start time is provided', () => {
      store.dispatch(addTimeEntry({}))

      expect(store.getState().timeEntries.entries[2].start).toEqual('03:15 PM')
    })
  })

  describe('updateTimeEntry action', () => {
    it('updates the time entry', () => {
      const updates = [
        { property: 'start', newValue: '10:00 AM' },
        { property: 'end', newValue: '10:15 AM' },
        { property: 'ticket', newValue: 'ABC-123' },
        { property: 'details', newValue: 'Ranting about customer' }
      ]

      updates.map(update => {
        //@ts-ignore
        store.dispatch(updateTimeEntry({ id: 0, property: update.property, newValue: update.newValue }))
        expect(store.getState().timeEntries.entries[0][update.property]).toEqual(update.newValue)
      })
    })
  })

  describe('removeTimeEntry action', () => {
    it('removes the time entry', () => {
      store.dispatch(removeTimeEntry(0))

      let entry = records[1]
      let timeEntries: Array<typeof entry> = []
      timeEntries.push(entry)

      expect(store.getState().timeEntries.entries).toEqual(timeEntries)
    })
  })
})