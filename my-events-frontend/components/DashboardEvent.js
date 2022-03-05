import Link from 'next/link'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import styles from '@/styles/DashboardEvent.module.css'
import Image from 'next/image'


export default function DashboardEvent({ evt, handleDelete }) {
  return (

    

    <Link href={`/event/${evt.slug}`}>
      <div className={styles.event}>
        <div className={styles.img}>
          <a>
            {(() => {
              switch (true) {
                case evt.image !== null &&
                  evt.image.hasOwnProperty('formats') &&
                  evt.image.formats.hasOwnProperty('thumbnail'):
                  return (
                    <Image
                      src={evt.image.formats.thumbnail.url}
                      width={125}
                      height={75}
                    />
                  )
                  break
                default:
                  return (
                    <Image
                      src={'/images/event-default-2.png'}
                      width={125}
                      height={75}
                    />
                  )
              }
            })()}
          </a>
        </div>
        {/* <div style={{marginRight: 100}}> */}
          <h4>
          {evt.name}&nbsp;&nbsp;&nbsp;
          {new Date(evt.date).toLocaleDateString('en-US')}</h4>
        {/* </div> */}

        <Link href={`/events/edit/${evt.id}`}>
          <a className={styles.edit}>
            <FaPencilAlt /> <span>Edit</span>
          </a>
        </Link>
        <a
          href='#'
          className={styles.delete}
          onClick={() => handleDelete(evt.id)}
        >
          <FaTimes /> <span>Delete</span>
        </a>
      </div>
    </Link>
  )
}
