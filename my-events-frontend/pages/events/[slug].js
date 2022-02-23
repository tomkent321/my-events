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
import Router from 'next/router'
// import Date from '@/components/Date'

export default function EventPage({ evt }) {
  const router = useRouter()

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

  const names = evt.Going

  const goingNames = () =>
    names.map((n) => (
      <p key={n.Name} style={{ marginLeft: 20 }}>
        {n.Name}
      </p>
    ))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nameToAdd = {
      Name: e.target.name.value,
      event: {
        id: evt.id,
      },
    }
    const toastDelay = 3000
    if (nameToAdd.name === null || nameToAdd.name === '') {
      toast.error('Please enter a Name', {
        autoClose: toastDelay,
      })
    } else {
      const res = await fetch(`${API_URL}/Attendees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nameToAdd),
      })

      if (!res.ok) {
        toast.error('Something Went Wrong')
      } else {
        const evt = await res.json()
        // router.push(`/events/${evt.slug}`)
      }
      Router.reload(window.location.pathname)
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
        <div style={{ marginBottom: 20, marginLeft: 20 }}>
          about {evt.totalTime} total
        </div>
        {evt.image && (
          <div className={styles.image}>
            {(() => {
              switch (true) {
                case evt.image !== null &&
                  evt.image.hasOwnProperty('formats') &&
                  evt.image.formats.hasOwnProperty('medium'):
                  return (
                    <Image
                      src={evt.image.formats.medium.url}
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
                      width={170}
                      height={100}
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
        <div className={styles.boxed}>
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
            {/* <hr></hr> */}
          </div>
        </div>
        <div className={styles.boxed}>
          <div>
            <p>
              <span style={{ fontWeight: 'bold' }}>You're invited by: </span>
              {evt.originator}
            </p>
          </div>
          <div>
            <p>
              <span style={{ fontWeight: 'bold' }}>Travel arraingements: </span>
              {evt.travel}
            </p>
          </div>

          <div>
            <p>
              <span style={{ fontWeight: 'bold' }}>Currently Signed Up:</span>{' '}
              <div style={{ columns: '50px 3' }}>{(() => goingNames())()}</div>
              {/* {(() => goingNames())()} */}
            </p>
          </div>
        </div>
        <div style={{ marginTop: 25 }}></div>
        <form onSubmit={handleSubmit}>
          <div>
            <label className={styles.label} htmlFor='name'>
              Add your name to sign up
            </label>
            <input className={styles.input} type='text' id='name' name='name' />
          </div>
          <div style={{ marginTop: 15, height: 50 }}>
            {' '}
            <input type='submit' value='Sign Up!' className='btn' />
          </div>
        </form>

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
