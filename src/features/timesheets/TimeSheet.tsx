import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from './TimeSheet.module.css'
import TimeEntry from './TimeEntry'
import { TimeSheet } from './timesheetsSlice'

const timesheet: TimeSheet = {
  id: 0,
  date: new Date(),
  timeentryIds: []
}

function canAddNewTimeEntry(id: number) {
  return true
}

function addNewTimeEntry() {
  timesheet.timeentryIds.push(timesheet.timeentryIds.length)
}

function TimeSheetDisplay() {
  const history = useHistory()

  function finaliseTimesheet() {
    history.push('/about')
  }

  let section

  if (timesheet.timeentryIds.length >= 1) {
    section = (
      <section className={styles['time-entries']}>
        <TimeEntry />
      </section>
    )
  } else {
    section = (
      <section>
        <p className={styles['no-data']}>Please click the "+ New Entry" button to add a time entry</p>
      </section>
    )
  }

  return (
    <main className={styles.timesheet}>
      <header>
        <h2 className={styles.title}>Start</h2>
        <h2 className={styles.title}>End</h2>
        <h2 className={styles.title}>Ticket</h2>
        <h2 className={styles.title}>Details</h2>
      </header>
      {section}
      <footer>
        <button onClick={addNewTimeEntry} disabled={!canAddNewTimeEntry(timesheet.id)}>+ New Entry</button>
        <button className="update-timelogs" onClick={finaliseTimesheet} disabled={!canAddNewTimeEntry(timesheet.id)}>Finalise Timesheet</button>
      </footer >
    </main >
  )
}

export default TimeSheetDisplay