import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import { getDisplayName } from 'next/dist/shared/lib/utils'

export default function EventPage({ evt }) {
  const deleteEvent = (e) => {
    console.log('delete')

    const dow = 'monday'
    dow = 'Monday'
    console.log(new Date(evt.date).getDay())
    // const dayofWeek = ''
    // switch (dow) {
    //   case 0:
    //     day = 'Sunday'
    //     break
    //   case 1:
    //     day = 'Monday'
    //     break
    //   case 2:
    //     day = 'Tuesday'
    //     break
    //   case 3:
    //     day = 'Wednesday'
    //     break
    //   case 4:
    //     day = 'Thursday'
    //     break
    //   case 5:
    //     day = 'Friday'
    //     break
    //   case 6:
    //     day = 'Saturday'
    //     break
    // }
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

        <h1>{evt.name}</h1>
        <div>
          <span style={{ fontWeight: 'bold' }}>
            {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}{' '}
            {<span>&nbsp;&nbsp;</span>}
            {(() => {
              switch (new Date(evt.date).getDay()) {
                case 0:
                  return '(Sunday)'
                case 1:
                  return '(Monday)'
                case 2:
                  return '(Tuesday)'
                case 3:
                  return '(Wednesday)'
                case 4:
                  return '(Thursday)'
                case 5:
                  return '(Friday)'
                case 6:
                  return '(Saturday)'
              }
            })()}
          </span>
        </div>
        <div>about {evt.totalTime} total</div>
        {evt.image && (
          <div className={styles.image}>
            <Image
              src={evt.image.formats.medium.url}
              width={700}
              height={438}
            />
          </div>
        )}

        <h3>Info</h3>
        <p style={{ marginLeft: 20 }}>{evt.information}</p>

        {evt.link && (
          <a
            style={{ marginLeft: 20 }}
            href={evt.link}
            target={'_blank'}
            rel={'noreferrer'}
          >
            <span style={{ textDecoration: 'underline' }}>
              Link to {evt.name}
            </span>
          </a>
        )}

        {evt.cost && (
          <p style={{ marginLeft: 20 }}>
            <span style={{ fontWeight: 'bold' }}>cost: </span>
            {evt.cost}
          </p>
        )}

        <h3>{evt.venue}</h3>
        <div style={{ marginLeft: 20 }}>
          <p>{evt.address}</p>
          <p>{evt.phone}</p>
        </div>

        <div
          style={{
            marginTop: 70,
            width: '75%',
            // marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <hr></hr>
        </div>
        <p>
          <span style={{ fontWeight: 'bold' }}>You're invited by: </span>
          {evt.originator}
        </p>
        <p>
          <span style={{ fontWeight: 'bold' }}>Travel arraingements: </span>
          {evt.travel}
        </p>

        <p>
          <span style={{ fontWeight: 'bold' }}>Currently Signed Up:</span>{' '}
          {evt.committed}
        </p>

        <div style={{ marginTop: 25 }}>
          <p>
            <Link href='#'>
              <a className='btn-secondary'>Add your name</a>
            </Link>
            RSVP by: {new Date(evt.rsvp).toLocaleDateString('en-US')}
          </p>
        </div>

        <Link href='/events'>
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  )
}

//This is to get the paths to be accessible to the getStaticProps
// below  the map maps the params and puts them in an array

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`)
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
  const res = await fetch(`${API_URL}/events?slug=${slug}`)
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
