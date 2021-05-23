import { User } from '../../interfaces/user';
import { Pagination } from '../../interfaces/pagination';
import { UserFilters } from '../../interfaces/userFilters';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../root.reducer';

export interface UserState {
  user: User;
  users: User[];
  filters: UserFilters;
  pagination: Pagination;
}

const initialState: UserState = {
  user: null,
  users: [],
  filters: {
    userId: '',
    userFirstName: '',
    userLastName: '',
    userEmail: ''
  },
  pagination: {
    page: 1,
    size: 20,
    totalElements: 0
  }
};

export const userSelector = (state: RootState): UserState => state.user;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setFilters: (state, action: PayloadAction<UserFilters>) => {
      state.filters = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    setTotalElements: (state, action: PayloadAction<number>) => {
      state.pagination.totalElements = action.payload;
    },
    setSize: (state, action: PayloadAction<number>) => {
      state.pagination.size = action.payload;
    }
  }
});

export default userSlice.reducer;
