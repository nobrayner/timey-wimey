import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../app/store'
import { addTimeEntry, canAddNewEntry } from './timeEntriesSlice'

type NewTimeEntryButtonProps = ConnectedProps<typeof connector>

export const NewTimeEntryButton = ({ canAddNewEntry, addTimeEntry }: NewTimeEntryButtonProps) =>
  <button disabled={!canAddNewEntry} onClick={() => addTimeEntry()}>+ New Entry</button>

const mapState = (state: RootState) => ({
  canAddNewEntry: canAddNewEntry(state)
})

const mapDispatch = {
  addTimeEntry
}

const connector = connect(mapState, mapDispatch)

export default connector(NewTimeEntryButton)