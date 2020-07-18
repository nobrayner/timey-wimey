import { createSlice, PayloadAction, Update } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../app/store'

export interface TimeEntry {
  id: number
  start: string // Time
  end: string // Time
  ticket: string
  details: string
}

export type TimeEntryUpdateableProperties = 'start' | 'end' | 'ticket' | 'details'

interface AddTimeEntryPayload {
  start?: string
  end?: string
  ticket?: string
  details?: string
}

interface UpdateTimeEntryPayload {
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

export const timeEntriesSlice = createSlice({
  name: 'timesheets',
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
      let { id, property, newValue } = action.payload

      let timeEntry = state.entries.find(te => te.id === id)

      if (timeEntry) {
        timeEntry[property] = newValue
      }
    }
  }
})

export const { addTimeEntry, updateTimeEntry } = timeEntriesSlice.actions

export default timeEntriesSlice.reducer