import React, { useEffect, useState } from 'react';
import styles from './topBar.module.css';
import { useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../state/app/app.actions';
import { useTranslation } from 'react-i18next';
import { routes } from '../../routes';
import Logo from '../logo/Logo';
import RightActionBar from '../right-actionbar/RightActionBar';
import { useAppDispatch } from '../../state/store';

const TopBar = () => {
  const { t } = useTranslation();
  const [currentPageName, setCurrentPageName] = useState('');
  const dispatch = useAppDispatch();
  const location = useLocation();

  const toggleSidebarFn = () => {
    dispatch(toggleSidebar());
  };

  useEffect(() => {
    const cRoute = routes.find((route) => route.path === location.pathname);
    setCurrentPageName(cRoute ? t(`menu.${cRoute.name}`) : '');
  }, [t, location]);

  return (
    <div className={styles.topBar}>
      <Logo />
      <h3 className={styles.pageTitle}>
        <div className={styles.burger}>
          <button onClick={toggleSidebarFn} className={styles.burgerBtn}>
            <span />
          </button>
        </div>
        {currentPageName}
      </h3>
      <RightActionBar />
    </div>
  );
};

export default TopBar;
