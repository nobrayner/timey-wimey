import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../app/store'
import { addTimeEntry, canAddNewEntry } from './timeEntriesSlice'

type NewTimeEntryButtonProps = ConnectedProps<typeof connector>

export const NewTimeEntryButton = ({ canAddNewEntry, lastEntryID, addTimeEntry }: NewTimeEntryButtonProps) => {
  function newEntry() {
    addTimeEntry()

    setTimeout(() => document.getElementById(`ticket_${lastEntryID}`)?.focus(), 1)
  }

  return (
    <button className="new-entry-button" disabled={!canAddNewEntry} onClick={() => newEntry()}>+ New Entry</button>
  )
}

const mapState = (state: RootState) => ({
  canAddNewEntry: canAddNewEntry(state),
  lastEntryID: state.timeEntries.entries.length
})

const mapDispatch = {
  addTimeEntry
}

const connector = connect(mapState, mapDispatch)

export default connector(NewTimeEntryButton)