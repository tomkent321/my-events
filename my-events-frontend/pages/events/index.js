import Layout from '@/components/Layout.js'
import EventItem from '@/components/EventItem.js'
import { API_URL } from '@/config/index'
import Link from 'next/link'

// the events come from data on the server returned by getServerSideProps
export default function EventsPage({ events }) {
  return (
    <Layout>
      <h1>You're Invited!</h1>
      {events.length === 0 && <h3>No Invitations to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  )
}

// render only on the inital open, with 1 sec revalidation

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events`)
  const events = await res.json()

//the date sort on the strapi api never worked!
events.sort(({ date: a }, { date: b }) => {
  if (a > b) {
    return 1
  } else if (a < b) {
    return -1
  } else {
    return 0
  }
})
  return {
    props: { events },
    revalidate: 1,
  }
}

// this gets the events data from the server, returns props to client

// export async function getServerSideProps() {
//   const res = await fetch(`${API_URL}/api/events`)
//   const events = await res.json()
//   console.log(events)

//   // make it accessible to the client
//   return {
//     props: { events:events },
//   }
// }
