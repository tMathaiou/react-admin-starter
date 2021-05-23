import React from 'react';
import styles from './home.module.css';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="home">
      <div className="row">
        <div className="col-md-12">
          <div className={styles.portlet}>
            <div className={styles.portletHeader}>
              <div className={styles.portletHeaderTitle}>
                <h3>{t('pages.home.title')}</h3>
              </div>
            </div>
            <div className={styles.portletBody}>{t('pages.home.desc')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
