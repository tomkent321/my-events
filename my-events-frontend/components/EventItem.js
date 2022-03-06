import Link from 'next/link'
import Image from 'next/image' // a customer image tag
import styles from '@/styles/EventItem.module.css'
// import Date from './date'
// note to add pictures coming from cloudinary, you must update
// the next.config.js file to include the cloudinary image call
// see the file to see the required addition

export default function EventItem({ evt }) {
  console.log(evt)
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <a href={`/events/${evt.slug}`}>
          {(() => {
            switch (true) {
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
                    width={170}
                    height={100}
                  />
                )
            }
          })()}
        </a>
      </div>

      <div className={styles.info}>
        <h3>{evt.name}</h3>

        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
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
        <h5>originator: {evt.originator}</h5>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${evt.slug}`}>
          <a className='btn'>Details</a>
        </Link>
      </div>
    </div>
  )
}
