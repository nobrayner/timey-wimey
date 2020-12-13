import React from 'react'
import { TimeCard } from '../types'
import { formatDateTimeAsTimeOnly } from '../utils'

interface TimeCardDisplayProps {
  card: TimeCard
}

const TimeCardDisplay = ({ card }: TimeCardDisplayProps) => {
  const { id, start, end, ticket, details } = card
  const textId = `timecard${id}`
  const startName = textId + '_start'
  const endName = textId + '_end'
  const ticketName = textId + '_ticket'
  const detailsName = textId + '_details'

  return (
    <section data-testid={textId}>
      <label htmlFor={startName}>Start</label>
      <input type="time" id={startName} aria-label={`Time Card ${id} Start Time`} defaultValue={formatDateTimeAsTimeOnly(start)} />

      <label htmlFor={endName}>End</label>
      <input type="time" id={endName} aria-label={`Time Card ${id} End Time`} defaultValue={formatDateTimeAsTimeOnly(end)} />

      <label htmlFor={ticketName}>Ticket</label>
      <input type="text" id={ticketName} aria-label={`Time Card ${id} Ticket`} defaultValue={ticket} />

      <label htmlFor={detailsName}>Details</label>
      <textarea id={detailsName} aria-label={`Time Card ${id} Details`} defaultValue={details} />
    </section>
  )
}

export default TimeCardDisplay