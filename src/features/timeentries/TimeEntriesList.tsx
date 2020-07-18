import React from 'react'
//import styles from './TimeSheet.module.css'
import { TimeEntry } from './timeEntriesSlice'
import { RootState } from '../../app/store'
import { connect } from 'react-redux'

interface TimeEntriesListProps {
  timeEntries: TimeEntry[]
}

export const TimeEntriesList = ({ timeEntries }: TimeEntriesListProps) => (
  <>
    {timeEntries.map(({ id, start, end, ticket, details }) => (
      <section key={`timeEntry_${id}`} id={`timeEntry_${id}`}>
        <label htmlFor={`start_${id}`}>Start</label>
        <input name={`start_${id}`} type="text" maxLength={8} required value={start} />

        <label htmlFor={`end_${id}`}>End</label>
        <input name={`end_${id}`} type="text" maxLength={8} required value={end} />

        <label htmlFor={`ticket_${id}`}>Ticket</label>
        <input name={`ticket_${id}`} type="text" required value={ticket} />

        <label htmlFor={`details_${id}`}>Details</label>
        <input name={`details_${id}`} type="text" required value={details} />
      </section>
    ))}
  </>
)

const mapState = (state: RootState) => ({
  timeEntries: state.timeEntries.entries
})

export default connect(mapState)(TimeEntriesList)