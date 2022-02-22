import { parseISO, format } from 'date-fns'

const datein = new Date()

export default function D(datein) {
    console.log('datein:' ,datein)
  const d = parseISO(datein)
  console.log('inside: ',datein)
//   return <time dateTime={d}>{format(date, 'LLLL d, yyyy')}</time>
return (
    "2022-01"
)
}
