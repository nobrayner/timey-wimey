import { configureStore, EnhancedStore } from "@reduxjs/toolkit"
import timeEntriesReducer, { addTimeEntry, updateTimeEntry, removeTimeEntry, canAddNewEntry } from '../features/timeentries/timeEntriesSlice'

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

    store.dispatch(addTimeEntry())
    store.dispatch(addTimeEntry())
  })

  describe('addTimeEntry action', () => {
    it('stores the time entries', () => {
      let entries = store.getState().timeEntries.entries

      expect(entries).toHaveLength(2)
      expect(entries[0].start).toBeTruthy()
      expect(entries[0].end).toBeTruthy()
      expect(entries[0].ticket).toBeFalsy()
      expect(entries[0].details).toBeFalsy()
      expect(entries[1].start).toBeTruthy()
      expect(entries[1].end).toBeFalsy()
      expect(entries[1].ticket).toBeFalsy()
      expect(entries[1].details).toBeFalsy()
    })

    it('sets start time of new entry, and end time of previous entry', () => {
      store.dispatch(addTimeEntry())

      let entries = store.getState().timeEntries.entries

      expect(entries[2].start).toEqual(entries[1].end)
      expect(entries[2]).toBeTruthy()
    })

    it('sets the start time of new entry, but doesn\'t set end time of previous entry', () => {
      store.dispatch(updateTimeEntry({ id: 1, property: 'end', newValue: '05:00 PM' }))
      store.dispatch(addTimeEntry())

      let entries = store.getState().timeEntries.entries

      expect(entries[1].end).toEqual('05:00 PM')
      expect(entries[2].start).toBeTruthy()
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

      let entries = store.getState().timeEntries.entries

      expect(entries).toHaveLength(1)
    })
  })

  describe('canAddNewEntry selector', () => {
    it('returns true once the previous entry has a value for start, ticket, and details', () => {
      expect(canAddNewEntry(store.getState())).toBe(false)

      store.dispatch(updateTimeEntry({ id: 1, property: 'start', newValue: '09:00 AM' }))
      expect(canAddNewEntry(store.getState())).toBe(false)

      store.dispatch(updateTimeEntry({ id: 1, property: 'ticket', newValue: '1234'}))
      expect(canAddNewEntry(store.getState())).toBe(false)

      store.dispatch(updateTimeEntry({ id: 1, property: 'details', newValue: 'Did stuff'}))
      expect(canAddNewEntry(store.getState())).toBe(true)
    })
  })
})