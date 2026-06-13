import { formatDistanceToNow, format } from 'date-fns'
import { nb } from 'date-fns/locale'

export const formatTimeAgo = (date) => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: nb,
  })
}

export const formatDate = (date) => {
  return format(new Date(date), 'd. MMMM yyyy', { locale: nb })
}

export const formatDateTime = (date) => {
  return format(new Date(date), 'd. MMMM yyyy HH:mm', { locale: nb })
}

export const getInitials = (name) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

export const truncateText = (text, length = 100) => {
  return text.length > length ? `${text.substring(0, length)}...` : text
}
