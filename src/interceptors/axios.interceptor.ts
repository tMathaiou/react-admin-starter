import axios, { AxiosError } from 'axios'
import { logout, setLoading } from '../state/app/app.actions'
import { toast } from 'react-toastify'
import { Language } from '../interfaces/language'
import { languages } from '../constants/languages'
import { Store } from 'redux'
import i18n from '../i18n'
import { RootState } from '../state/root.reducer'

const setAxiosInterceptor = (store: Store<RootState>) => {
  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = localStorage.getItem('tokenValidation')
      store.dispatch(setLoading(true))
      return config
    },
    (error: AxiosError) => {
      store.dispatch(setLoading(false))
      return Promise.reject(error)
    }
  )

  axios.interceptors.response.use(
    (response) => {
      setTimeout(() => store.dispatch(setLoading(false)), 500)
      return response
    },
    (error: AxiosError) => {
      if (
        error.response.status === 401 &&
        error.response.config.url !== '/api/auth'
      ) {
        toast.error(i18n.t('messages.access_denied'))
        store.dispatch(logout())
      }

      if (error.response.data && error.response.data.err) {
        const {
          app: { langID }
        } = store.getState()
        const selectedLanguage: any = languages?.find(
          (lang: Language) => lang.id === langID
        )
        toast.error(error.response.data.err[selectedLanguage.path])
      }
      store.dispatch(setLoading(false))
      return Promise.reject(error)
    }
  )
}

export default setAxiosInterceptor
