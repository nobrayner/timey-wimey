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

export type TimeSheet = {
  id: number
  date: Date
  timeentryIds: number[]
}

interface TimeSheetState {
  timesheets: TimeSheet[]
  timeentries: TimeEntry[]
}

const initialState: TimeSheetState = {
  timesheets: [],
  timeentries: []
}

export const timesheetsSlice = createSlice({
  name: 'timesheets',
  initialState,
  reducers: {
    addTimeSheet: state => {
      state.timesheets.push({
        id: 0,
        date: new Date(),
        timeentryIds: []
      })
    }
  }
})

export const { addTimeSheet } = timesheetsSlice.actions

export default timesheetsSlice.reducer