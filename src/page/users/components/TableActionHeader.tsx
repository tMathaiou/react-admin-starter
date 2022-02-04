import { Link } from 'react-router-dom'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './tableActionHeader.module.css'

const TableActionHeader = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.portletHeader}>
      <div className={styles.portletHeaderTitle}>
        <h3>{t('pages.users.title')}</h3>
      </div>
      <div className={styles.portletActions}>
        <Link to='/users/new' className='btn btn-sm btn-primary'>
          {t('commons.add_new')}
        </Link>
      </div>
    </div>
  )
}

export default TableActionHeader
