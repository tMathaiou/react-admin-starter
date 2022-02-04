import { User } from '../../interfaces/user'
import { List } from '../../interfaces/list'
import {
  userDelete,
  userGet,
  userList,
  userSave,
  userUpdate
} from '../../services/user.service'
import { userSlice } from './user.reducers'
import { RootState } from '../root.reducer'
import { AxiosError } from 'axios'

export const setPageAndFetch = (page: number) => {
  return async (dispatch) => {
    await dispatch(setPage(page + 1))
    dispatch(fetchUsers())
  }
}

export const fetchUsers = () => {
  return async (dispatch, getState: () => RootState) => {
    const {
      user: { pagination, filters }
    } = getState()
    const [err, users]: [AxiosError, List<User>] = await userList({
      ...pagination,
      ...filters
    })

    if (err) {
      dispatch(setErrState(err.message))
    }

    dispatch(setUsers(users.rows))
    dispatch(setTotalElements(users.count))
  }
}

export const fetchUser = (id: number) => {
  return async (dispatch) => {
    const [err, user]: [AxiosError, User] = await userGet(id)

    if (err) {
      dispatch(setErrState(err.message))
    }

    dispatch(setUser(user))
  }
}

export const saveUser = (user: User) => {
  return async (dispatch) => {
    const err = await userSave(user)

    if (err) {
      dispatch(setErrState(err.message))
    }
  }
}

export const updateUser = (user: User) => {
  return async (dispatch) => {
    const err = await userUpdate(user.id, user)

    if (err) {
      dispatch(setErrState(err.message))
    }
  }
}

export const deleteUser = (id: number) => {
  return async (dispatch) => {
    const err = await userDelete(id)

    if (err) {
      dispatch(setErrState(err.message))
    }

    dispatch(fetchUsers())
  }
}

export const {
  setUser,
  setTotalElements,
  setFilters,
  setPage,
  setErrState,
  setUsers
} = userSlice.actions
