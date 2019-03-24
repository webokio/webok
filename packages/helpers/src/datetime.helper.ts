import { DateTime } from 'luxon'

export const dateTimeAsString = (datetime: DateTime): string => {
  return datetime.toUTC().toISO()
}

export const nowAsString = (): string => {
  return dateTimeAsString(DateTime.local())
}
