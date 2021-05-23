import { User } from '../interfaces/user';
import { List } from '../interfaces/list';
import axios, { AxiosResponse } from 'axios';
import { removeEmpty, to } from '../utils/apiUtils';
import { Pagination } from '../interfaces/pagination';
import { UserFilters } from '../interfaces/userFilters';

export async function userList(
  params: Pagination & UserFilters
): Promise<List<User>> {
  const [err, response]: [string, AxiosResponse<List<User>>] = await to(
    axios.get('/api/users', {
      params: {
        page: params.page,
        limit: params.size,
        ...removeEmpty({
          userId: params.userId,
          userFirstName: params.userFirstName,
          userLastName: params.userLastName,
          userEmail: params.userEmail
        })
      }
    })
  );

  if (err) {
    throw new Error(err);
  }
  return response.data;
}

export async function userGet(id: number): Promise<User> {
  const [err, response]: [string, AxiosResponse<User>] = await to(
    axios.get(`/api/users/${id}`)
  );

  if (err) {
    throw new Error(err);
  }
  return response.data;
}

export async function userSave(user: User): Promise<void> {
  const [err]: [string, AxiosResponse] = await to(
    axios.post(`/api/users/`, user)
  );

  if (err) {
    throw new Error(err);
  }
}

export async function userUpdate(id: number, user: User): Promise<void> {
  const [err]: [string, AxiosResponse] = await to(
    axios.put(`/api/users/${id}`, user)
  );

  if (err) {
    throw new Error(err);
  }
}

export async function userDelete(id: number): Promise<void> {
  const [err]: [string, AxiosResponse] = await to(
    axios.delete(`/api/users/${id}`)
  );

  if (err) {
    throw new Error(err);
  }
}
