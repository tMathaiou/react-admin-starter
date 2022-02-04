import React, { useEffect } from 'react'
import styles from './App.module.css'
import { Route, Routes, useLocation, useNavigate } from 'react-router'
import { routes } from './routes'
import { useSelector } from 'react-redux'
import { appSelector } from './state/app/app.reducers'
import Loader from './components/loader/Loader'
import MenuSidebar from './components/menu-sidebar/MenuSidebar'
import TopBar from './components/top-bar/TopBar'
import useWindowsWidth from './hooks/windowWidth.hook'
import Login from './page/login/Login'

function App(): JSX.Element {
  const { isSidebarOpen, loggedIn } = useSelector(appSelector)
  const isScreenSmall = useWindowsWidth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (!loggedIn) {
      navigate('/login')
    } else if (pathname === '/login') {
      navigate('/')
    }
  }, [loggedIn, navigate, pathname])

  if (!loggedIn) {
    return (
      <Routes>
        <Route path={'/login'} element={<Login />} />
      </Routes>
    )
  }

  return (
    <div id='app'>
      <Loader />
      <div id={styles.appWrapper}>
        <MenuSidebar />
        <div
          style={{
            paddingLeft: isSidebarOpen || isScreenSmall ? '0px' : '100px'
          }}
          className={styles.appView}
        >
          <TopBar />
          <div
            style={{
              paddingLeft: isSidebarOpen && !isScreenSmall ? '250px' : ''
            }}
            className={styles.viewWrapper}
          >
            <div className={styles.viewContainer}>
              <Routes>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={<route.element />}
                  />
                ))}
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
