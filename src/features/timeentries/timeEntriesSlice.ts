import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface TimeEntry {
  id: number
  start: string // Time
  end: string // Time
  ticket: string
  details: string
}
type TimeEntryUpdateableProperties = 'start' | 'end' | 'ticket' | 'details'

function currentRoundedTime(now: Date, roundMinutesBy: number): string {
  let halfRound = roundMinutesBy / 2
  let hoursDivisor = ((((60 / roundMinutesBy) - 1) * roundMinutesBy) + halfRound) * 2

  let minutes = (((now.getMinutes() + halfRound) / roundMinutesBy | 0) * roundMinutesBy) % 60
  let hours = (((((now.getMinutes() / hoursDivisor) + 0.5) | 0) + now.getHours()) % 24)
  let amPm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours !== 0 ? hours : 12

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${amPm}`
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
  initialState.nextId = 2
  initialState.entries = [
    { id: 0, start: '09:00 AM', end: '10:00 AM', ticket: '1234', details: 'Did stuff' },
    { id: 1, start: '10:00 AM', end: '03:15 PM', ticket: '4321', details: 'More stuff' },
  ]
}

export const timeEntriesSlice = createSlice({
  name: 'timeEntries',
  initialState,
  reducers: {
    addTimeEntry(state) {
      let nowRounded = currentRoundedTime(new Date(), 15) // Round to nearest 15 minutes increment
      
      let previousEntry = state.entries[state.entries.length - 1]
      
      if (previousEntry && !previousEntry.end) {
        previousEntry.end = nowRounded
      }

      let newEntry: TimeEntry = {
        id: state.nextId++,
        start: nowRounded,
        end: '',
        ticket: '',
        details: ''
      }

      state.entries.push(newEntry)
    },
    updateTimeEntry(state, action: PayloadAction<UpdateTimeEntryPayload>) {
      const { id, property, newValue } = action.payload

      const timeEntry = state.entries.find(timeEntry => timeEntry.id === id)

      if (timeEntry) {
        timeEntry[property] = newValue
      }
    },
    removeTimeEntry(state, action: PayloadAction<number>) {
      let id = action.payload
      let timeEntryIndex = state.entries.findIndex(te => te.id === id)

      if (timeEntryIndex > -1) {
        state.entries.splice(timeEntryIndex, 1)
      }
    }
  }
})

export const { addTimeEntry, updateTimeEntry, removeTimeEntry } = timeEntriesSlice.actions

const lastEntrySelector = (state: RootState) => state.timeEntries.entries[state.timeEntries.entries.length - 1]
export const canAddNewEntry = createSelector(
  lastEntrySelector,
  lastEntry => {
    if (lastEntry !== undefined) {
      return !!lastEntry.start && !!lastEntry.ticket && !!lastEntry.details
    }

    return true
  }
)

export default timeEntriesSlice.reducer