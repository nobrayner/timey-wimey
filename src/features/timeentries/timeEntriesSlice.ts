import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../app/store'

export interface TimeEntry {
  id: number
  start: string // Time
  end: string // Time
  ticket: string
  details: string
}

interface AddTimeEntryPayload {
  start?: string
  end?: string
  ticket?: string
  details?: string
}

const initialState: TimeEntry[] = []

export const timeEntriesSlice = createSlice({
  name: 'timesheets',
  initialState,
  reducers: {
    addTimeEntry: {
      reducer(state, action: PayloadAction<TimeEntry>) {
        state.push(action.payload)
      },
      prepare(payload: AddTimeEntryPayload) {
        let timeEntry: TimeEntry = {
          id: 0,
          start: payload.start ?? '',
          end: payload.end ?? '',
          ticket: payload.ticket ?? '',
          details: payload.details ?? '',
        }
        return {
          payload: timeEntry
        }
      }
    }
  }
})

export const { addTimeEntry } = timeEntriesSlice.actions

//export const selectTimesheets = (state: RootState) => state.timesheets.sheets

export default timeEntriesSlice.reducer