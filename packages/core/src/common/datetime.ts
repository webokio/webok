import { DateTime } from 'luxon'

export const now = (): string => {
  return DateTime.local().toUTC().toISO()
}
