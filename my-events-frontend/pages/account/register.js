import 'react-toastify/dist/ReactToastify.css'
import { FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import { useState, useEffect, useContext } from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'
import styles from '@/styles/AuthForm.module.css'
import AuthContext from '@/context/AuthContext'

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const { register, error } = useContext(AuthContext)
  const handleSubmit = (e) => {
    e.preventDefault()
    const toastDelay = 2000

    if (password !== passwordConfirm) {
      toast.error('Passwords do not match!', {
        autoClose: toastDelay,
      })
      return
    }

    register({ username, email, password })
  }

  return (
    <Layout title='User Registration'>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username'>User Name</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='passwordConfirm'>ConfirmPassword</label>
            <input
              type='password'
              id='passwordConfirm'
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <input type='submit' value='Register' className='btn' />
        </form>
        <p>
          Already have an account?
          <Link href='/account/login'>
            <a> Log In</a>
          </Link>
        </p>
      </div>
    </Layout>
  )
}
