import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import { getDisplayName } from 'next/dist/shared/lib/utils'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'

export default function EventPage({ evt }) {
  const router = useRouter()

  const [values, setValues] = useState({
    committed: ' ',
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }
  const deleteEvent = async (e) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${evt.id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.message)
      } else {
        router.push('/events')
      }
    }
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
        <ToastContainer />
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
            {(() => {
              switch (true) {
                case evt.image !== null &&
                  evt.image.hasOwnProperty('formats') &&
                  evt.image.formats.hasOwnProperty('medium'):
                  return (
                    <Image
                      src={evt.image.formats.small.url}
                      width={700}
                      height={438}
                    />
                  )
                  break
                case evt.image !== null &&
                  evt.image.hasOwnProperty('formats') &&
                  evt.image.formats.hasOwnProperty('small'):
                  return (
                    <Image
                      src={evt.image.formats.small.url}
                      width={300}
                      height={188}
                    />
                  )
                  break
                case evt.image !== null &&
                  evt.image.hasOwnProperty('formats') &&
                  evt.image.formats.hasOwnProperty('thumbnail'):
                  return (
                    <Image
                      src={evt.image.formats.thumbnail.url}
                      width={300}
                      height={188}
                    />
                  )
                  break
                default:
                  return (
                    <Image
                      src={'/images/event-default-2.png'}
                      width={500}
                      height={312}
                    />
                  )
              }
            })()}
          </div>
        )}

        <h3>Info</h3>
        <p style={{ marginLeft: 20 }}>{evt.information}</p>

        {evt.link !== ' ' && (
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

        {evt.cost !== ' ' && (
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
          <label
            className={styles.label}
            style={{ color: 'rgb(192,0,0)' }}
            htmlFor='name'
          >
            To Sign Up: Add Name(s) separated with a comma
          </label>
          <input
            className={styles.input}
            type='text'
            id='committed'
            name='committed'
            value={values.committed}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginTop: 25 }}>
          <p>
            <Link href='#'>
              <a className='btn'>Add your name</a>
            </Link>
            <span style={{ marginLeft: 20 }}>
              RSVP by: {new Date(evt.rsvp).toLocaleDateString('en-US')}
            </span>
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
