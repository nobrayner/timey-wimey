import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../app/store'
import { addTimeEntry } from './timeEntriesSlice'

type NewTimeEntryButtonProps = ConnectedProps<typeof connector>

export const NewTimeEntryButton = ({ lastEntry, addTimeEntry }: NewTimeEntryButtonProps) => {
  let isDisabled = lastEntry !== undefined && (!lastEntry.start || !lastEntry.end || !lastEntry.ticket || !lastEntry.details)

  return (
    <button disabled={isDisabled} onClick={() => addTimeEntry({})}>+ New Entry</button>
  )
}

const mapState = (state: RootState) => ({
  lastEntry: state.timeEntries.entries[state.timeEntries.entries.length - 1]
})

const mapDispatch = {
  addTimeEntry
}

const connector = connect(mapState, mapDispatch)

export default connector(NewTimeEntryButton)