import { Login } from '../interfaces/login'
import { to } from '../utils/apiUtils'
import axios, { AxiosError, AxiosResponse } from 'axios'

export async function submitLogin(
  email: string,
  password: string
): Promise<[AxiosError, Login]> {
  const [err, response]: [AxiosError, AxiosResponse<Login>] = await to(
    axios.post('/api/auth', { email, password })
  )

  if (err) {
    return [err, null]
  }

  return [null, response.data]
}
