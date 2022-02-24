// import { FaPray } from 'react-icons/fa'
import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'
import Link from 'next/link'
import LoginPage from '../pages/account/login'
import RegisterPage from '../pages/account/register'
import Search from './Search'
import styles from '@/styles/Header.module.css'

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
          <li>
            <Link href='account/register'>
              <a>Register</a>
            </Link>
          </li>
          <li>
            <Link href='account/login'>
              <a className='btn-secondary btn-icon'><FaSignInAlt />Login</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
