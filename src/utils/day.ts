import dayjs from 'dayjs'
export const formatTime = (value: number | string | Date) => {
  return dayjs(value).format('YYYY-MM-DD')
}
