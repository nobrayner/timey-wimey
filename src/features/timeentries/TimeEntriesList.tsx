import React from 'react'
import { RootState } from '../../app/store'
import { connect, ConnectedProps } from 'react-redux'
import { updateTimeEntry, removeTimeEntry } from './timeEntriesSlice'
import './TimeEntriesList.css'

type TimeEntriesListProps = ConnectedProps<typeof connector>

export const TimeEntriesList = ({ isLoading, timeEntries, updateTimeEntry, removeTimeEntry }: TimeEntriesListProps) => {
  let entries
  if (!isLoading) {
    if (timeEntries.length > 0) {
      entries = timeEntries.map(({ id, start, end, ticket, details }) => (
        <section key={`timeEntry_${id}`} id={`timeEntry_${id}`} className="time-entry">
          <button id={`remove_${id}`} aria-label={`Remove time entry: '${details}'`} className="remove-button"
            onClick={e => removeTimeEntry(id)}>X</button>

          <label htmlFor={`start_${id}`} className="start-label">Start</label>
          <input id={`start_${id}`} type="text" maxLength={8} required value={start} className="start"
            onChange={e => updateTimeEntry({ id, property: 'start', newValue: e.currentTarget.value })} />

          <label htmlFor={`end_${id}`} className="end-label">End</label>
          <input id={`end_${id}`} type="text" maxLength={8} required value={end} className="end"
            onChange={e => updateTimeEntry({ id, property: 'end', newValue: e.currentTarget.value })} />

          <label htmlFor={`ticket_${id}`} className="ticket-label">Ticket</label>
          <input id={`ticket_${id}`} type="text" required value={ticket} className="ticket"
            onChange={e => updateTimeEntry({ id, property: 'ticket', newValue: e.currentTarget.value })} />

          <label htmlFor={`details_${id}`} className="details-label">Details</label>
          <input id={`details_${id}`} type="text" required value={details} className="details"
            onChange={e => updateTimeEntry({ id, property: 'details', newValue: e.currentTarget.value })} />
        </section>
      ))
    } else {
      entries = <p className="no-data">Please click the "+ New Entry" button to add a time entry</p>
    }
  } else {
    entries = <p>Loading...</p>
  }

  return (
    <>
      <header>
        <h2 className="title">Start</h2>
        <h2 className="title">End</h2>
        <h2 className="title">Ticket</h2>
        <h2 className="title">Details</h2>
      </header>
      {entries}
    </>
  )
}

const mapState = (state: RootState) => ({
  isLoading: state.timeEntries.loading,
  timeEntries: state.timeEntries.entries
})

const mapDispatch = {
  updateTimeEntry,
  removeTimeEntry
}

const connector = connect(mapState, mapDispatch)

export default connector(TimeEntriesList)