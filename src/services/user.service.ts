import { User } from '../interfaces/user'
import { List } from '../interfaces/list'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { removeEmpty, to } from '../utils/apiUtils'
import { Pagination } from '../interfaces/pagination'
import { UserFilters } from '../interfaces/userFilters'

export async function userList(
  params: Pagination & UserFilters
): Promise<[AxiosError, List<User>]> {
  const [err, response]: [AxiosError, AxiosResponse<List<User>>] = await to(
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
  )

  if (err) {
    return [err, null]
  }
  return [null, response.data]
}

export async function userGet(id: number): Promise<[AxiosError, User]> {
  const [err, response]: [AxiosError, AxiosResponse<User>] = await to(
    axios.get(`/api/users/${id}`)
  )

  if (err) {
    return [err, null]
  }
  return [null, response.data]
}

export async function userSave(user: User): Promise<AxiosError> {
  const [err]: [AxiosError, AxiosResponse] = await to(
    axios.post(`/api/users/`, user)
  )

  if (err) {
    return err
  }

  return null
}

export async function userUpdate(id: number, user: User): Promise<AxiosError> {
  const [err]: [AxiosError, AxiosResponse] = await to(
    axios.put(`/api/users/${id}`, user)
  )

  if (err) {
    return err
  }
}

export async function userDelete(id: number): Promise<AxiosError> {
  const [err]: [AxiosError, AxiosResponse] = await to(
    axios.delete(`/api/users/${id}`)
  )

  if (err) {
    return err
  }
}
