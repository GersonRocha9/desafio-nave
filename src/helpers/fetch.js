import axios from 'axios'

import { getToken } from './auth'

const token = getToken()

export const fetchNavers = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}v1/navers`, {
    headers: { Authorization: `Bearer ${token}` }
  })

  return response.data
}
