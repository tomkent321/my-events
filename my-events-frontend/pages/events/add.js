import Layout from '@/components/Layout'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { FaPhoneAlt } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AddPage() {
  // note extra space in optional fields
  const [values, setValues] = useState({
    address: '',
    // committed: '',
    cost: ' ',
    date: '',
    image: ' ',
    information: '',
    link: ' ',
    name: '',
    originator: '',
    phone: ' ',
    rsvp: '',
    time: '',
    totalTime: '',
    travel: ' ',
    venue: '',
  })

  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()

    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    )

    if (hasEmptyFields) {
      toast.error('Please be sure all required (*) fields are filled in', {
        autoClose: 2500,
      })
    }
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  return (
    <Layout title='Add New Place'>
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
            <input
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label style={{ color: 'rgb(192,0,0)' }} htmlFor='date'>
              Date *
            </label>
            <input
              type='date'
              id='date'
              name='date'
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label style={{ color: 'rgb(192,0,0)' }} htmlFor='time'>
              Time *
            </label>
            <input
              type='text'
              id='time'
              name='time'
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label style={{ color: 'rgb(192,0,0)' }} htmlFor='totalTime'>
              Duration in hours of the event *
            </label>
            <input
              type='text'
              id='totalTime'
              name='totalTime'
              value={values.totalTime}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='image'>Image</label>
            <input
              type='text'
              id='image'
              name='image'
              value={values.image}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='link'>Link to Activity Web Site (optional)</label>
            <input
              type='text'
              id='link'
              name='link'
              value={values.link}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='cost'>Cost (optional)</label>
            <input
              type='text'
              id='cost'
              name='cost'
              value={values.cost}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label style={{ color: 'rgb(192,0,0)' }} htmlFor='venue'>
              Venue Name *
            </label>
            <input
              type='text'
              id='venue'
              name='venue'
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label style={{ color: 'rgb(192,0,0)' }} htmlFor='venue'>
              Venue Address *
            </label>
            <input
              type='text'
              id='address'
              name='address'
              value={values.address}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor='phone'>Venue Phone</label>
            <input
              type='text'
              id='phone'
              name='phone'
              value={values.phone}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label style={{ color: 'rgb(192,0,0)' }} htmlFor='originator'>
              The Inviter (add your phone if you want) *
            </label>
            <input
              type='text'
              id='originator'
              name='originator'
              value={values.originator}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='travel'>Travel Resources</label>
            <input
              type='text'
              id='travel'
              name='travel'
              value={values.travel}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label style={{ color: 'rgb(192,0,0)' }} htmlFor='rsvp'>
              RSVP Deadline Date *
            </label>
            <input
              type='date'
              id='rsvp'
              name='rsvp'
              value={values.rsvp}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label style={{ color: 'rgb(192,0,0)' }} htmlFor='information'>
            Information about the Activity *
          </label>
          <textarea
            type='text'
            name='information'
            id='information'
            value={values.information}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <input type='submit' value='Add Invitation' className='btn' />
      </form>
    </Layout>
  )
}
