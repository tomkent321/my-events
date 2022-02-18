import Layout from '@/components/Layout.js'
import EventItem from '@/components/EventItem.js'
import { API_URL } from '@/config/index'
import Link from 'next/link'

// the events come from data on the server returned by getServerSideProps
export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Latest Invites</h1>
      {events.length === 0 && <h3>No Invitations to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      {events.length > 0 && (
        <Link href='/events'>
          <a className='btn-secondary'>See All Invitations</a>
        </Link>
      )}
    </Layout>
  )
}

// render only on the inital open, with 1 sec revalidation
// The parameters in the API are from strapi
export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`)
  const events = await res.json()
  return {
    props: { events },
    revalidate: 1,
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
