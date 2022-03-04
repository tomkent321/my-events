import { parseCookies } from '@/helpers/index'
import Layout from '@/components/Layout'
import DashboardEvent from '@/components/DashboardEvent'
import { API_URL } from '@/config/index'
import EventItem from '@/components/EventItem.js'
import styles from '@/styles/Dashboard.module.css'

export default function DashboardPage({ events }) {
  const deleteEvent = (id) => {
    console.log(id)
  }

  return (
    <Layout title='User Dashboard'>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Invitations</h3>

        {/* {events.length === 0 && <h3>No Invitations to show</h3>} */}
        {events.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const events = await res.json()
  console.log(events)
  return {
    props: {
      events,
    },
  }
}
