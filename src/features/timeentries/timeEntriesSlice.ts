import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//import { AppThunk, RootState } from '../../app/store'

export interface TimeEntry {
  id: number
  start: string // Time
  end: string // Time
  ticket: string
  details: string
}
type TimeEntryUpdateableProperties = 'start' | 'end' | 'ticket' | 'details'

interface AddTimeEntryPayload {
  start?: string
  end?: string
  ticket?: string
  details?: string
}

export interface UpdateTimeEntryPayload {
  id: number
  property: TimeEntryUpdateableProperties
  newValue: string
}

type TimeEntriesSliceState = {
  nextId: number
  entries: TimeEntry[]
}
const initialState: TimeEntriesSliceState = {
  nextId: 0,
  entries: []
}

// Hacky work-around to make sure there is test data for Cypress in the store
//@ts-ignore
if (process.env.NODE_ENV !== 'production' && window.Cypress) {
  initialState.entries = [
    { id: 0, start: '09:00 AM', end: '10:00 AM', ticket: '1234', details: 'Did stuff' },
    { id: 1, start: '10:00 AM', end: '03:15 PM', ticket: '4321', details: 'More stuff' },
  ]
}

export const timeEntriesSlice = createSlice({
  name: 'timeEntries',
  initialState,
  reducers: {
    addTimeEntry: {
      reducer(state, action: PayloadAction<TimeEntry>) {
        let newEntry = action.payload
        newEntry.id = state.nextId++
        state.entries.push(newEntry)
      },
      prepare(payload: AddTimeEntryPayload) {
        let timeEntry: TimeEntry = {
          id: -1,
          start: payload.start ?? '',
          end: payload.end ?? '',
          ticket: payload.ticket ?? '',
          details: payload.details ?? '',
        }
        return {
          payload: timeEntry
        }
      }
    },
    updateTimeEntry(state, action: PayloadAction<UpdateTimeEntryPayload>) {
      const { id, property, newValue } = action.payload

      const timeEntry = state.entries.find(timeEntry => timeEntry.id === id)

      if (timeEntry) {
        timeEntry[property] = newValue
      }
    }
  }
})

export const { addTimeEntry, updateTimeEntry } = timeEntriesSlice.actions

export default timeEntriesSlice.reducer