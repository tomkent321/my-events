import 'react-phone-input-2/lib/style.css'
import 'react-toastify/dist/ReactToastify.css'
import { API_URL } from '@/config/index'
import { FaPhoneAlt } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'
import PhoneInput from 'react-phone-input-2'
import styles from '@/styles/Form.module.css'
import { parseCookies } from '@/helpers/index'

export default function AddEventPage({ token }) {
  // note extra space in optional fields
  // const [values, setValues] = useState({
  //   address: '',
  //   committed: ' ',
  //   cost: ' ',
  //   date: '',
  //   image: ' ',
  //   information: '',
  //   link: ' ',
  //   name: '',
  //   originator: '',
  //   phone: ' ',
  //   rsvp: '',
  //   time: '',
  //   totalTime: '',
  //   travel: ' ',
  //   venue: '',
  // })

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const values = {
      address: e.target.address.value,
      committed: e.target.committed.value,
      cost: e.target.cost.value,
      date: e.target.date.value,
      image: ' ',
      information: e.target.information.value,
      name: e.target.name.value,
      originator: e.target.originator.value,
      phone: e.target.phone.value,
      rsvp: e.target.rsvp.value,
      time: e.target.time.value,
      totalTime: e.target.totalTime.value,
      travel: e.target.travel.value,
      venue: e.target.venue.value,
    }
    const toastDelay = 3000
    const allReq = true

    if (values.name === null || values.name === '') {
      toast.error('Please enter a Name', {
        autoClose: toastDelay,
      })
    } else if (values.date === null || values.date === '') {
      toast.error('Please enter a DATE', {
        autoClose: toastDelay,
      })
    } else if (values.time === null || values.time === '') {
      toast.error('Please enter a TIME', {
        autoClose: toastDelay,
      })
    } else if (values.rsvp === null || values.rsvp === '') {
      toast.error('Please enter an RSVP DATE', {
        autoClose: toastDelay,
      })
    } else if (values.rsvp > values.date) {
      toast.error('RSVP date must not be later than event date', {
        autoClose: toastDelay,
      })
    } else if (values.venue === null || values.venue === '') {
      toast.error('Please enter a VENUE NAME', {
        autoClose: toastDelay,
      })
    } else if (values.address === null || values.address === '') {
      toast.error('Please enter a VENUE ADDRESS', {
        autoClose: toastDelay,
      })
    } else if (values.totalTime === null || values.totalTime === '') {
      toast.error('Please enter a DURATION ESTIMATE', {
        autoClose: toastDelay,
      })
    } else if (values.originator === null || values.originator === '') {
      toast.error('Please enter the INVITER NAME', {
        autoClose: toastDelay,
      })
    } else if (values.information === null || values.information === '') {
      toast.error('Please enter INFORMATION', {
        autoClose: toastDelay,
      })
    } else {
      const res = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          toast.error('No token found')
          return
        }
        toast.error('Something Went Wrong')
      } else {
        const evt = await res.json()
        router.push(`/events/${evt.slug}`)
      }
    }
  }

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target
  //   setValues({ ...values, [name]: value })
  // }

  return (
    <Layout title='Add New Invitation'>
      <Link href='/events'>Go Back</Link>
      <h1>Create an Invitation</h1>
      <h6 style={{ marginBottom: '20px', color: 'rgb(192,0,0)' }}>
        fields with (*) are required
      </h6>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label style={{ color: 'rgb(192,0,0)' }} htmlFor='name'>
              Name of Activity *
            </label>
            <input type='text' id='name' name='name' />
          </div>
          <div>
            <label style={{ color: 'rgb(192,0,0)' }} htmlFor='date'>
              Date *
            </label>
            <input type='date' id='date' name='date' />
          </div>
          <div>
            <label style={{ color: 'rgb(192,0,0)' }} htmlFor='time'>
              Time *
            </label>
            <input type='text' id='time' name='time' />
          </div>
          <div>
            <label style={{ color: 'rgb(192,0,0)' }} htmlFor='rsvp'>
              RSVP Deadline Date *
            </label>
            <input type='date' id='rsvp' name='rsvp' />
          </div>
          <div>
            <label style={{ color: 'rgb(192,0,0)' }} htmlFor='venue'>
              Venue Name *
            </label>
            <input type='text' id='venue' name='venue' />
          </div>
          <div>
            <label style={{ color: 'rgb(192,0,0)' }} htmlFor='venue'>
              Venue Address *
            </label>
            <input type='text' id='address' name='address' />
          </div>
          <div>
            <label style={{ color: 'rgb(192,0,0)' }} htmlFor='totalTime'>
              Duration of the event (hours,days,range, etc.) *
            </label>
            <input type='text' id='totalTime' name='totalTime' />
          </div>
          <div>
            <label htmlFor='phone'>Venue Phone</label>
            <input type='text' id='phone' name='phone' />
          </div>

          <div>
            <label style={{ color: 'rgb(192,0,0)' }} htmlFor='originator'>
              The Inviter (add your phone if you want) *
            </label>
            <input type='text' id='originator' name='originator' />
          </div>
          <div>
            <label htmlFor='link'>Link to Activity Web Site (optional)</label>
            <input type='text' id='link' name='link' />
          </div>
          <div>
            <label htmlFor='cost'>Cost (optional)</label>
            <input type='text' id='cost' name='cost' />
          </div>

          <div>
            <label htmlFor='travel'>Travel Resources</label>
            <input type='text' id='travel' name='travel' />
          </div>
          <div>
            <label htmlFor='committed'>Committed</label>
            <input type='text' id='committed' name='committed' />
          </div>
        </div>

        <div>
          <label style={{ color: 'rgb(192,0,0)' }} htmlFor='information'>
            Information about the Activity *
          </label>
          <textarea type='text' name='information' id='information'></textarea>
        </div>
        <input type='submit' value='Add Invitation' className='btn' />
      </form>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  return {
    props: {
      token,
    },
  }
}
