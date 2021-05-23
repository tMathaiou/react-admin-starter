import { User } from '../../interfaces/user';
import { Dispatch } from 'redux';
import { to } from '../../utils/apiUtils';
import { List } from '../../interfaces/list';
import {
  userDelete,
  userGet,
  userList,
  userSave,
  userUpdate
} from '../../services/user.service';
import { userSlice } from './user.reducers';
import { RootState } from '../root.reducer';

export const setPageAndFetch = (page: number) => {
  return async (dispatch: Dispatch<any>) => {
    await dispatch(setPage(page + 1));
    dispatch(fetchUsers());
  };
};

export const fetchUsers = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const {
      user: { pagination, filters }
    } = getState();
    const [err, users]: [string, List<User>] = await to(
      userList({ ...pagination, ...filters })
    );

    if (err) {
      return console.log(err);
    }

    dispatch(setUsers(users.rows));
    dispatch(setTotalElements(users.count));
  };
};

export const fetchUser = (id: number) => {
  return async (dispatch: Dispatch) => {
    const [err, user]: [string, User] = await to(userGet(id));

    if (err) {
      throw new Error(err);
    }

    dispatch(setUser(user));
  };
};

export const saveUser = (user: User) => {
  return async () => {
    const [err] = await to(userSave(user));

    if (err) {
      throw new Error(err);
    }
  };
};

export const updateUser = (user: User) => {
  return async () => {
    const [err] = await to(userUpdate(user.id, user));

    if (err) {
      throw new Error(err);
    }
  };
};

export const deleteUser = (id: number) => {
  return async (dispatch: Dispatch<any>) => {
    const [err]: [string, void] = await to(userDelete(id));

    if (err) {
      throw new Error(err);
    }

    dispatch(fetchUsers());
  };
};

export const {
  setUser,
  setTotalElements,
  setFilters,
  setPage,
  setSize,
  setUsers
} = userSlice.actions;
