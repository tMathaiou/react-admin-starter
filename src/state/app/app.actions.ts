import { toast } from 'react-toastify'
import { submitLogin } from '../../services/login.service'
import { Login } from '../../interfaces/login'
import i18n from '../../i18n'
import { appSlice } from './app.reducers'
import { AppDispatch } from '../store'
import { AxiosError } from 'axios'

export const login =
  ({ email, password }: { email: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    const [err, login]: [AxiosError, Login] = await submitLogin(email, password)

    if (err) {
      return toast.error(i18n.t('commons.wrong_credentials'))
    }

    localStorage.setItem('tokenValidation', login.token)
    localStorage.setItem('userValidation', JSON.stringify(login.user))

    dispatch(setToken(login.token))
    dispatch(setUser(login.user))
    dispatch(setLoggedIn(true))
  }

export const {
  setUser,
  toggleSidebar,
  setLoading,
  logout,
  setLangId,
  setLoggedIn,
  setToken
} = appSlice.actions
