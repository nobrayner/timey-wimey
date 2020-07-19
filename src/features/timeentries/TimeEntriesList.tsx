import React from 'react'
//import styles from './TimeSheet.module.css'
import { updateTimeEntry } from './timeEntriesSlice'
import { RootState } from '../../app/store'
import { connect, ConnectedProps } from 'react-redux'

type TimeEntriesListProps = ConnectedProps<typeof connector>

export const TimeEntriesList = ({ timeEntries, updateTimeEntry }: TimeEntriesListProps) => (
  <>
    {timeEntries.map(({ id, start, end, ticket, details }) => (
      <section key={`timeEntry_${id}`} id={`timeEntry_${id}`}>
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
    ))}
  </>
)

const mapState = (state: RootState) => ({
  timeEntries: state.timeEntries.entries
})

const mapDispatch = {
  updateTimeEntry
}

const connector = connect(mapState, mapDispatch)

export default connector(TimeEntriesList)