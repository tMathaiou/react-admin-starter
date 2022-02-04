import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import setAxiosInterceptor from './interceptors/axios.interceptor'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faEdit,
  faHome,
  faSignOutAlt,
  faTrashAlt,
  faUsers
} from '@fortawesome/free-solid-svg-icons'
import store from './state/store'
import { BrowserRouter } from 'react-router-dom'

library.add(faHome, faUsers, faSignOutAlt, faEdit, faTrashAlt)

setAxiosInterceptor(store)

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading... </div>}>
      <Provider store={store}>
        <BrowserRouter>
          <ToastContainer />
          <App />
        </BrowserRouter>
      </Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
