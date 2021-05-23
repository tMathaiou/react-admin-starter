import React from 'react';
import styles from './rightActionBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import CustomSingleValue from './CustomSingleValue';
import LanguageOptions from './LanguageOptions';
import { languages } from '../../constants/languages';
import { useSelector } from 'react-redux';
import { AppState } from '../../state/app/app.reducers';
import { Language } from '../../interfaces/language';
import { logout } from '../../state/app/app.actions';
import { useAppDispatch } from '../../state/store';

const RightActionBar = () => {
  const dispatch = useAppDispatch();
  const selectedLanguage: Language = useSelector((state: { app: AppState }) =>
    languages.find((lang: Language) => lang.id === state.app.langID)
  );

  const logoutFn = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.rightSidebar}>
      <div className={styles.languageSelector}>
        <Select
          isSearchable={false}
          value={selectedLanguage}
          options={languages}
          components={{
            SingleValue: CustomSingleValue,
            Option: LanguageOptions
          }}
        />
      </div>
      <div className={styles.logoutWrapper}>
        <button onClick={logoutFn} className={styles.btnLogout}>
          <FontAwesomeIcon icon="sign-out-alt" />
        </button>
      </div>
    </div>
  );
};

export default RightActionBar;
