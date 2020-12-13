import { formatDateTimeAsTimeOnly, roundTimeToMinutes } from '../utils'

test.each([
  [new Date('2020-12-09T10:01:00.000'), 15, new Date('2020-12-09T10:00:00.000')],
  [new Date('2020-12-09T09:59:00.000'), 15, new Date('2020-12-09T10:00:00.000')],
  [new Date('2020-12-09T10:01:00.000'), 5, new Date('2020-12-09T10:00:00.000')],
  [new Date('2020-12-09T10:03:00.000'), 5, new Date('2020-12-09T10:05:00.000')],
  [new Date('2020-12-09T10:01:00.000'), 10, new Date('2020-12-09T10:00:00.000')],
  [new Date('2020-12-09T10:05:00.000'), 10, new Date('2020-12-09T10:10:00.000')],
  [new Date('2020-12-09T23:59:00.000'), 15, new Date('2020-12-10T00:00:00.000')],
  [new Date('2020-12-09T10:01:23.456'), 15, new Date('2020-12-09T10:00:00.000')],
])(`roundTimeToMinutes gives the correct output: (%s, %i) => %s`, (inDate, inRoundingMinutes, expectedDate) => {
  expect(roundTimeToMinutes(inDate, inRoundingMinutes)).toStrictEqual(expectedDate)
})


test('formatDateTimeAsTimeOnly returns the hours and minutes when given a date', () => {
  const formattedTimeOnly = formatDateTimeAsTimeOnly(new Date('2020-12-09T10:30:00.000'))

  expect(formattedTimeOnly).toBe('10:30')
})

test('formatDateTimeAsTimeOnly return empty string if no date is passed', () => {
  const formattedTimeOnly = formatDateTimeAsTimeOnly(undefined)

  expect(formattedTimeOnly).toBe('')
})