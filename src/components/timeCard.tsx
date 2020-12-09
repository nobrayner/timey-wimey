import React from 'react'
import { TimeCard } from '../types'

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
      <input type="time" id={startName} defaultValue={start?.toString()} />

      <label htmlFor={endName}>End</label>
      <input type="time" id={endName} defaultValue={end?.toString()} />

      <label htmlFor={ticketName}>Ticket</label>
      <input type="text" id={ticketName} defaultValue={ticket} />

      <label htmlFor={detailsName}>Details</label>
      <textarea id={detailsName} defaultValue={details} />
    </section>
  )
}

export default TimeCardDisplay