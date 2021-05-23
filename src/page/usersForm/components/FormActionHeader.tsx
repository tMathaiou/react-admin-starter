import { Link } from 'react-router-dom';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './formActionHeader.module.css';

const FormActionHeader = () => {
  const { t } = useTranslation();

  const save = () => {
    // { cancelable: true } required for Firefox
    // https://github.com/facebook/react/issues/12639#issuecomment-382519193
    document.getElementById('userForm').dispatchEvent(
      new Event('submit', {
        bubbles: true,
        cancelable: true
      })
    );
  };

  return (
    <div className={styles.portletHeader}>
      <div className={styles.portletHeaderTitle}>
        <h3>{t('pages.usersForm.title')}</h3>
      </div>
      <div className={styles.portletActions}>
        <Link to="/users" className="btn btn-sm btn-dark">
          {t('commons.cancel')}
        </Link>
        <button onClick={save} className="btn btn-sm btn-primary">
          {t('commons.save')}
        </button>
      </div>
    </div>
  );
};

export default FormActionHeader;
