import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'

export default function EventPage({ evt }) {
  const deleteEvent = (e) => {
    console.log('delete')
  }
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href='#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <div>
          {evt.day} {evt.date} at {evt.time}
        </div>
        <div>about {evt.totalTime} total</div>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image} width={960} height={600} />
          </div>
        )}
        <h3>You're invited by:</h3>
        <p>{evt.originator}</p>
        <h3>Info</h3>
        <p>{evt.information}</p>
      </div>
    </Layout>
  )
}

//This is to get the paths to be accessible to the getStaticProps
// below  the map maps the params and puts them in an array

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  const paths = events.map((evt) => ({
    params: { slug: evt.slug },
  }))
  return {
    paths,
    fallback: true,
  }
}

//This accesses the params array generated above

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events/${slug}`)
  const events = await res.json()

  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  }
}

// This is the other alternative to the two above..This updates everytime the page
// is called. Not needed for a static site, but maybe needed for a //dynamic site

// export async function getServerSideProps({query:{slug}}) {
// const res = await fetch(`${API_URL}/api/events/${slug}`)
// const events = await res.json()

//   return {
//     props: {
//         evt: events[0]
//     }
//   }
// }
