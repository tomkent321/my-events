import Layout from '@/components/Layout.js'
import EventItem from '@/components/EventItem.js'
import { API_URL } from '@/config/index'
import Link from 'next/link'
import qs from 'qs'
import { useRouter } from 'next/router'

// the events come from data on the server returned by getServerSideProps
export default function SearchPage({ events }) {
  const router = useRouter()

  return (
    <Layout title='Search Results'>
      <Link href='/events'>Go Back</Link>
      <h1>Search Results for "{router.query.term}"</h1>
      {events.length === 0 && <h3>No Invitations to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  )
}

// render only on the inital open, with 1 sec revalidation

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { venue_contains: term },
        { information_contains: term },
        { originator_contains: term },
      ],
    },
  })

  const res = await fetch(`${API_URL}/events?${query}`)
  const events = await res.json({})

  return {
    props: { events },
  }
}

// this gets the events data from the server, returns props to client

// export async function getServerSideProps() {
//   const res = await fetch(`${API_URL}/api/events`)
//   const events = await res.json()

//   // make it accessible to the client
//   return {
//     props: { events:events.slice(0,3) },
//   }
// }
