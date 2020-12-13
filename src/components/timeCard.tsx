import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { updateTimeCardDate, updateTimeCardString } from '../store'
import { TimeCard } from '../types'
import { formatDateTimeAsTimeOnly } from '../utils'

interface TimeCardDisplayProps {
  card: TimeCard
}

const TimeCardDisplay = ({ card }: TimeCardDisplayProps) => {
  const dispatch = useDispatch()

  const { id, start, end, ticket, details } = card
  const textId = `timecard${id}`
  const startName = textId + '_start'
  const endName = textId + '_end'
  const ticketName = textId + '_ticket'
  const detailsName = textId + '_details'

  const updateDate = useCallback((dateType: 'start' | 'end') => (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTimeCardDate({ id, dateType, newValue: event.target.value}))
  }, [id])

  const updateString = useCallback((stringType: 'ticket' | 'details') => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(updateTimeCardString({ id, stringType, newValue: event.target.value}))
  }, [id])

  return (
    <section data-testid={textId}>
      <label htmlFor={startName}>Start</label>
      <input type="time" id={startName} aria-label={`Time Card ${id} Start Time`} value={formatDateTimeAsTimeOnly(start)} onChange={updateDate('start')} />

      <label htmlFor={endName}>End</label>
      <input type="time" id={endName} aria-label={`Time Card ${id} End Time`} value={formatDateTimeAsTimeOnly(end)} onChange={updateDate('end')} />

      <label htmlFor={ticketName}>Ticket</label>
      <input type="text" id={ticketName} aria-label={`Time Card ${id} Ticket`} value={ticket} onChange={updateString('ticket')} />

      <label htmlFor={detailsName}>Details</label>
      <textarea id={detailsName} aria-label={`Time Card ${id} Details`} value={details} onChange={updateString('details')} />
    </section>
  )
}

export default TimeCardDisplay