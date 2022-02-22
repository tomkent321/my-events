import Layout from '@/components/Layout.js'
import EventItem from '@/components/EventItem.js'
import { API_URL } from '@/config/index'
import Link from 'next/link'

// the events come from data on the server returned by getServerSideProps
export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Coming Up Soon Invitations</h1>
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
  // const res = await fetch(`${API_URL}/events?_limit=3`)
  const res = await fetch(`${API_URL}/events`)
  const events = await res.json()

  //the date sort on the strapi api never worked!
  //and if you use the limit filter on the strapi api here
  //it pulls 3 events out of the middle of the sorted array
  //so at least for dates, manually sort them and then slice
  //out the first 3 in the return
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
    props: { events: events.slice(0, 3) },
    revalidate: 1,
  }
}
