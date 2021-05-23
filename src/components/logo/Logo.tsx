import React from 'react';
import styles from './logo.module.css';
import { DefaultConfig } from '../../defaultConfig';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { appSelector } from '../../state/app/app.reducers';
import useWindowsWidth from '../../hooks/windowWidth.hook';

const Logo = () => {
  const { isSidebarOpen } = useSelector(appSelector);
  const isScreenSmall = useWindowsWidth();

  return (
    <div
      style={{
        backgroundColor: DefaultConfig.primaryColor,
        width: isSidebarOpen ? '250px' : '',
        display: isScreenSmall ? 'none' : 'block'
      }}
      className={styles.logo}
    >
      <div className={styles.logoWrapper}>
        <Link to="/">
          <img alt="logo" src={logo} width="100" />
        </Link>
      </div>
    </div>
  );
};

export default Logo;
