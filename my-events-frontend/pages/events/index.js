import Layout from '@/components/Layout.js'
import EventItem from '@/components/EventItem.js'
import { API_URL } from '@/config/index'
import Link from 'next/link'

// the events come from data on the server returned by getServerSideProps
export default function EventsPage({ events }) {
  return (
    <Layout>
      <h1>Invitations</h1>
      {events.length === 0 && <h3>No Invitations to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
     
    </Layout>
  )
}


// render only on the inital open, with 1 sec revalidation

export async function getStaticProps() {
  const res= await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  return {
    props: {events},
    revalidate: 1
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