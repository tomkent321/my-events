// import { FaPray } from 'react-icons/fa'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { useContext } from 'react'
import Link from 'next/link'
// import LoginPage from '../pages/account/login'
// import RegisterPage from '../pages/account/register'
import Search from './Search'
import styles from '@/styles/Header.module.css'
import AuthContext from '@/context/AuthContext'

export default function Header() {
  const { user, logout } = useContext(AuthContext)
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
          {user ? (
            // if logged in
            <>
              <li>
                <Link href='/events/add'>
                  <a>Add Invitation</a>
                </Link>
              </li>
              <li>
                <Link href='/account/dashboard'>
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => logout()}
                  className='btn-secondary btn-icon'
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            //if logged out
            <>
              <li>
                <Link href='/account/login'>
                  <a className='btn-secondary btn-icon'>
                    <FaSignInAlt /> Login
                  </a>
                </Link>
              </li>
            </>
          )}

          <li>
            <Link href='/account/register'>
              <a>Register</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
