import { User } from '../../interfaces/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../root.reducer';

export interface AppState {
  isSidebarOpen: boolean;
  langID: number;
  loggedIn: boolean;
  loading: boolean;
  token: string;
  user: User;
}

const lang = localStorage.getItem('i18nextLng');
const initialState: AppState = {
  isSidebarOpen: false,
  langID: lang ? (lang === 'el' ? 1 : 0) : 1,
  loggedIn: !!localStorage.getItem('tokenValidation'),
  loading: false,
  token: '',
  user: null
};

export const appSelector = (state: RootState): AppState => state.app;

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setLangId: (state, action: PayloadAction<number>) => {
      state.langID = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem('tokenValidation');
      localStorage.removeItem('userValidation');
      state.loggedIn = false;
      state.token = null;
      state.user = null;
    }
  }
});

export default appSlice.reducer;
