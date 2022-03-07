import Layout from '@/components/Layout.js'
import EventItem from '@/components/EventItem.js'
import { API_URL, PER_PAGE } from '@/config/index'
import Pagination from '@/components/Pagination'

// the events come from data on the server returned by getServerSideProps
export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>You're Invited!</h1>
      {events.length === 0 && <h3>No Invitations to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  )
}

// render only on the inital open, with 1 sec revalidation

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

  // Fetch total number of pages
  const totalRes = await fetch(`${API_URL}/events/count`)
  const total = await totalRes.json()

  // Fetch the events

  const eventRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  )
  const events = await eventRes.json()

  return {
    props: { events, page: +page, total },
  }
}
