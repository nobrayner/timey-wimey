import { roundTimeToMinutes } from '../utils'

test.each([
  [new Date('2020-12-09T10:01:00.000Z'), 15, new Date('2020-12-09T10:00:00.000Z')],
  [new Date('2020-12-09T09:59:00.000Z'), 15, new Date('2020-12-09T10:00:00.000Z')],
  [new Date('2020-12-09T10:01:00.000Z'), 5, new Date('2020-12-09T10:00:00.000Z')],
  [new Date('2020-12-09T10:03:00.000Z'), 5, new Date('2020-12-09T10:05:00.000Z')],
  [new Date('2020-12-09T10:01:00.000Z'), 10, new Date('2020-12-09T10:00:00.000Z')],
  [new Date('2020-12-09T10:05:00.000Z'), 10, new Date('2020-12-09T10:10:00.000Z')],
  [new Date('2020-12-09T23:59:00.000Z'), 15, new Date('2020-12-10T00:00:00.000Z')],
  [new Date('2020-12-09T10:01:23.456Z'), 15, new Date('2020-12-09T10:00:00.000Z')],
])(`roundTimeToMinutes gives the correct output: (%s, %i) => %s`, (inDate, inRoundingMinutes, expectedDate) => {
  expect(roundTimeToMinutes(inDate, inRoundingMinutes)).toStrictEqual(expectedDate)
})