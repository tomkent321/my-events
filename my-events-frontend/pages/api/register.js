import { API_URL } from '@/config/index'
import cookie from 'cookie'

//This is the middle man between the front end and strapi
export default async (req, res) => {
  if (req.method === 'POST') {
    const { username, email, password } = req.body

    // this is the result of the req:
    const strapiRes = await fetch(`${API_URL}/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })

    const data = await strapiRes.json()

    if (strapiRes.ok) {
      // Set cookie  uses npm "cookie"
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: 'strict',
          path: '/',
        })
      )

      res.status(200).json({ user: data.user })
    } else {
      // error response
      res
        .status(data.statusCode)
        .json({ message: data.message[0].messages[0].message })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
