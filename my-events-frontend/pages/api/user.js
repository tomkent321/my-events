//This file is to check for a current user by sending Strapi
// a token and Strapi will send back the user associated with it

import { API_URL } from '@/config/index'
import cookie from 'cookie'

//This is the middle man between the front end and strapi
export default async (req, res) => {
  if (req.method === 'GET') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not Authorized' })
      return
    }
    const { token } = cookie.parse(req.headers.cookie)
    const strapiRes = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const user = await strapiRes.json()

    if (strapiRes.ok) {
      res.status(200).json({ user })
    } else {
      res.status(403).json({ message: 'User not authorized' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
