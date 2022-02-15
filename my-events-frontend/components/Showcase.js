import styles from '@/styles/Showcase.module.css'

export default function Showcase() {
  return (
    <div className={styles.showcase}>
      <h1>
        You're Invited to{' '}
        <span style={{ textDecoration: 'underline' }}>Our Places</span>!
      </h1>
      <h3>Invitations to where we're going and Reviews to where we've been!</h3>
      <h5>
        events, movies, eating out, programs, trips, excursions and more...
      </h5>
    </div>
  )
}
