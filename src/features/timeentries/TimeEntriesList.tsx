import React from 'react'
import { RootState } from '../../app/store'
import { connect, ConnectedProps } from 'react-redux'
import { updateTimeEntry, removeTimeEntry } from './timeEntriesSlice'

type TimeEntriesListProps = ConnectedProps<typeof connector>

export const TimeEntriesList = ({ isLoading, timeEntries, updateTimeEntry, removeTimeEntry }: TimeEntriesListProps) => {
  let entries
  if (!isLoading) {
    entries = timeEntries.map(({ id, start, end, ticket, details }) => (
      <section key={`timeEntry_${id}`} id={`timeEntry_${id}`}>
        <button id={`remove_${id}`} aria-label={`Remove time entry: '${details}'`} onClick={e => removeTimeEntry(id)}>X</button>

        <label htmlFor={`start_${id}`}>Start</label>
        <input id={`start_${id}`} type="text" maxLength={8} required value={start}
          onChange={e => updateTimeEntry({ id, property: 'start', newValue: e.currentTarget.value })} />

        <label htmlFor={`end_${id}`}>End</label>
        <input id={`end_${id}`} type="text" maxLength={8} required value={end}
          onChange={e => updateTimeEntry({ id, property: 'end', newValue: e.currentTarget.value })} />

        <label htmlFor={`ticket_${id}`}>Ticket</label>
        <input id={`ticket_${id}`} type="text" required value={ticket}
          onChange={e => updateTimeEntry({ id, property: 'ticket', newValue: e.currentTarget.value })} />

        <label htmlFor={`details_${id}`}>Details</label>
        <input id={`details_${id}`} type="text" required value={details}
          onChange={e => updateTimeEntry({ id, property: 'details', newValue: e.currentTarget.value })} />
      </section>
    ))
  } else {
    entries = <p>Loading...</p>
  }

  return (
    <>
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