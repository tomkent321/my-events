import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import Search from './Search'
import { FaPray } from 'react-icons/fa'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>Our Places</a>
        </Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href='/events'>
              <a>Invitations</a>
            </Link>
          </li>
          <li>
            <Link href='events/add'>
              <a>Add Invitation</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
