import React from 'react'
import { render, screen, timeCardBuilder, newTimeCardDetailsBuilder } from '../test-utils'
import userEvent from '@testing-library/user-event'
import App from '../app'
import { perBuild } from '@jackfranklin/test-data-bot'
import { formatDateTimeAsTimeOnly } from '../utils'

describe('Timey Wimey', () => {
  it('displays the current date as a heading, 0 total hours, help text, and a new button when there are no entries', () => {
    render(<App />)

    expect(screen.getByText(new Date().toLocaleDateString())).toBeInTheDocument()
    expect(screen.getByText(/0h/i)).toBeInTheDocument()
    expect(screen.getByTestId('helptext')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /\+ new card/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /\+ new card/i })).not.toBeDisabled()
  })

  it('adds a new time card with the current rounded time when clicking the \'new\' button', () => {
    //@ts-ignore
    jest.useFakeTimers('modern')
    //@ts-ignore
    jest.setSystemTime(new Date('2020-12-13T10:05:00.000').getTime())

    render(<App />)

    expect(screen.queryAllByTestId(/^timecard/i)).toHaveLength(0)

    userEvent.click(screen.getByRole('button', { name: /\+ new card/i }))
    expect(screen.getAllByTestId(/^timecard/i)).toHaveLength(1)
    expect(screen.getByLabelText(/start/i)).toHaveValue('10:00')

    jest.useRealTimers()
  })

  it('can update the time card fields', () => {
    render(<App />, {
      initialState: {
        roundToMinutes: 15,
        timeCards: [
          timeCardBuilder(),
          timeCardBuilder({ traits: 'noend' }),
        ]
      }
    })

    const newDetails = newTimeCardDetailsBuilder()

    userEvent.clear(screen.getAllByLabelText(/start/i)[0])
    userEvent.type(screen.getAllByLabelText(/start/i)[0], newDetails.start, {})
    expect(screen.getAllByLabelText(/start/i)[0]).toHaveValue(newDetails.start)

    userEvent.clear(screen.getAllByLabelText(/end/i)[0])
    userEvent.type(screen.getAllByLabelText(/end/i)[0], newDetails.end)
    expect(screen.getAllByLabelText(/end/i)[0]).toHaveValue(newDetails.end)

    userEvent.clear(screen.getAllByLabelText(/ticket/i)[0])
    userEvent.type(screen.getAllByLabelText(/ticket/i)[0], newDetails.ticket)
    expect(screen.getAllByLabelText(/ticket/i)[0]).toHaveValue(newDetails.ticket)

    userEvent.clear(screen.getAllByLabelText(/details/i)[0])
    userEvent.type(screen.getAllByLabelText(/details/i)[0], newDetails.details)
    expect(screen.getAllByLabelText(/details/i)[0]).toHaveValue(newDetails.details)
  })

  it('displays the total time spent', () => {
    render(<App />, {
      initialState: {
        roundToMinutes: 15,
        timeCards: [
          timeCardBuilder({
            overrides: {
              start: perBuild(() => new Date('2020-12-13T10:00:00.000')),
              end: perBuild(() => new Date('2020-12-13T11:30:00.000')),
            }
          }),
        ]
      }
    })

    expect(screen.getByLabelText(/time spent/i)).toHaveTextContent('1h 30m')
  })

  it('cannot set an end time less than the start time', () => {
    const card = timeCardBuilder({ overrides: { start: perBuild(() => new Date('2020-12-13T10:30:00.000')), end: perBuild(() => new Date('2020-12-13T11:30:00.000')) } })
    const start: Date = card.start as Date
    render(<App />, {
      initialState: {
        roundToMinutes: 15,
        timeCards: [card]
      }
    })

    userEvent.clear(screen.getByLabelText(/end/i))
    userEvent.type(screen.getByLabelText(/end/i), '09:00')
    expect(screen.getByLabelText(/end/i)).toHaveValue(formatDateTimeAsTimeOnly(start))
  })
})