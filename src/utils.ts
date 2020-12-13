export function roundTimeToMinutes(datetime: Date, minutesToRoundTo: number): Date {
  const halfMinutesToRoundTo = minutesToRoundTo / 2
  const hoursDivisor = ((((60 / minutesToRoundTo) - 1) * minutesToRoundTo) + halfMinutesToRoundTo) * 2

  const minutes = (((datetime.getMinutes() + halfMinutesToRoundTo) / minutesToRoundTo | 0) * minutesToRoundTo) % 60
  const hours = (((datetime.getMinutes() / hoursDivisor) + 0.5) | 0) + datetime.getHours()

  return new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate(), hours, minutes)
}

export function formatDateTimeAsTimeOnly(datetime: Date | undefined): string {
  if (datetime) {
    return `${datetime.getHours().toString().padStart(2, '0')}:${datetime.getMinutes().toString().padStart(2, '0')}`
  } else {
    return ''
  }
}