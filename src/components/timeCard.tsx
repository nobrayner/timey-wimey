import React from 'react'
import { TimeCard } from '../types'

interface TimeCardDisplayProps {
  card: TimeCard
}

const TimeCardDisplay = ({ card }: TimeCardDisplayProps) => {
  const { id, } = card
  return (
    <section data-testid={`timecard${id}`}>{id}</section>
  )
}

export default TimeCardDisplay