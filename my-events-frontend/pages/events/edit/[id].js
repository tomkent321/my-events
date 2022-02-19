import Layout from '@/components/Layout'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { FaPhoneAlt } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaImage } from 'react-icons/fa'
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'

export default function EditEventPage({ evt }) {
  const [values, setValues] = useState({
    address: evt.address,
    committed: evt.committed,
    cost: evt.cost,
    date: evt.date,
    image: evt.image,
    information: evt.information,
    link: evt.link,
    name: evt.name,
    originator: evt.originator,
    phone: evt.phone,
    rsvp: evt.rsvp,
    time: evt.time,
    totalTime: evt.totalTime,
    travel: evt.travel,
    venue: evt.venue,
  })

  const [imagePreview, setImagePreview] = useState(
    Object.entries(evt.image).length === 0
      ? null
      : evt.image.formats.thumbnail.url
  )

  const [showModal, setShowModal] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    )

    if (hasEmptyFields) {
      toast.error('Please be sure all required (*) fields are filled in', {
        autoClose: 4000,
      })
    } else {
      const res = await fetch(`${API_URL}/events/${evt.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        toast.error('Something Went Wrong')
      } else {
        const evt = await res.json()
        router.push(`/events/${evt.slug}`)
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/events/${evt.id}`)
    const data = await res.json()

    setImagePreview(data.image.formats.thumbnail.url)
    setShowModal(false)
  }

  const callModal = () => {
    // scrollTop()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setShowModal(true)
  }

  return (
    <Layout title='Edit Invitation'>
      <Link href='/events'>Go Back</Link>
      <h1>Edit an Invitation</h1>
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
            <label style={{ color: 'rgb(192,0,0)' }} htmlFor='totalTime'>
              Duration of the event (hours,days,range, etc.) *
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
            <label htmlFor='committed'>Committed to Go</label>
            <input
              type='text'
              id='committed'
              name='committed'
              value={values.committed}
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
        <input type='submit' value='Update Invitation' className='btn' />
      </form>

      <h2>Invitation Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}

      <div>
        <button onClick={callModal} className='btn-secondary btn-icon'>
          <FaImage /> Set Image
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  )
}
//

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/events/${id}`)
  const evt = await res.json()

  return {
    props: {
      evt,
    },
  }
}