import React, { useCallback, useState } from 'react'
import styles from './menuSidebar.module.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { routes } from '../../routes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DefaultConfig } from '../../defaultConfig'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { appSelector } from '../../state/app/app.reducers'
import useWindowsWidth from '../../hooks/windowWidth.hook'

const MenuSidebar = () => {
  const { t } = useTranslation()
  const [isHovering, setHovering] = useState(false)
  const { isSidebarOpen } = useSelector(appSelector)
  const location = useLocation()
  const isScreenSmall = useWindowsWidth()

  const onMouseOut = useCallback(() => {
    setHovering(false)
  }, [])

  const onMouseOver = useCallback(() => {
    setHovering(true)
  }, [])

  const getHoverClasses = useCallback((): string => {
    let output = `${styles.menuSidebar} slide`
    if (isHovering || isSidebarOpen) {
      output += ` ${styles.hover}`
    }
    return output
  }, [isHovering, isSidebarOpen])

  return (
    <div
      style={{
        left: isScreenSmall && !isSidebarOpen ? '-1000px' : '0px',
        position: isScreenSmall && isSidebarOpen ? 'absolute' : 'fixed'
      }}
      className={getHoverClasses()}
      onMouseLeave={onMouseOut}
      onMouseEnter={onMouseOver}
    >
      <div className='menu-sidebar-wrapper'>
        <PerfectScrollbar className={styles.menuSidebarScroller}>
          <ul className={styles.menuNav}>
            {routes.map((item, index) =>
              item.menu ? (
                <li
                  className={
                    location.pathname === item.path
                      ? `${styles.menuNavItem} ${styles.active}`
                      : styles.menuNavItem
                  }
                  key={index}
                >
                  <Link to={item.path} className={styles.menuNavLink}>
                    <FontAwesomeIcon
                      className={styles.menuNavIcon}
                      icon={item.icon}
                      style={{
                        color:
                          location.pathname === item.path
                            ? DefaultConfig.primaryColor
                            : ''
                      }}
                    />
                    <span
                      className={
                        !isHovering && !isSidebarOpen
                          ? `${styles.menuNavText} ${styles.hidden}`
                          : styles.menuNavText
                      }
                      style={{ color: DefaultConfig.primaryColor }}
                    >
                      {t('menu.' + item.name)}
                    </span>
                  </Link>
                </li>
              ) : null
            )}
          </ul>
        </PerfectScrollbar>
      </div>
    </div>
  )
}

export default MenuSidebar
