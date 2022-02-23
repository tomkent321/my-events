import { parseISO, format } from 'date-fns'

const datein = new Date()

export default function D(datein) {
  const d = parseISO(datein)
//   return <time dateTime={d}>{format(date, 'LLLL d, yyyy')}</time>
return (
    "2022-01"
)
}
