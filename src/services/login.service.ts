import { Login } from '../interfaces/login';
import { to } from '../utils/apiUtils';
import axios, { AxiosResponse } from 'axios';

export async function submitLogin(
  email: string,
  password: string
): Promise<Login> {
  const [err, response]: [string, AxiosResponse<Login>] = await to(
    axios.post('/api/auth', { email, password })
  );

  if (err) {
    throw new Error(err);
  }

  return response.data;
}
