import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../app/store'

export type TimeEntry = {
  id: number
  timesheetId: number
  start: string // Time
  end: string // Time
  ticket: string
  details: string
}

const initialState: TimeEntry[] = []

export const timeEntriesSlice = createSlice({
  name: 'timesheets',
  initialState,
  reducers: {
    
  }
})

//export const { addTimeSheet } = timesheetsSlice.actions

//export const selectTimesheets = (state: RootState) => state.timesheets.sheets

export default timeEntriesSlice.reducer