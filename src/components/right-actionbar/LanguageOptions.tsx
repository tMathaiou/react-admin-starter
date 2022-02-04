import { useTranslation } from 'react-i18next'
import React, { FC } from 'react'
import { Language } from '../../interfaces/language'
import { setLangId } from '../../state/app/app.actions'
import styles from './rightActionBar.module.css'
import { useAppDispatch } from '../../state/store'

type Props = {
  data: Language
}

const LanguageOptions: FC<Props> = ({ data }) => {
  const { t, i18n } = useTranslation()
  const dispatch = useAppDispatch()

  const changeLanguage = (selectedOption: Language) => {
    dispatch(setLangId(selectedOption.id))
    return i18n.changeLanguage(selectedOption.path)
  }

  return (
    <div>
      <span className={styles.optionList} onClick={() => changeLanguage(data)}>
        <img src={data.imageSrc} alt='img' className={styles.optionImage} />
        <span className={styles.optionDesc}>
          <span>{t(data.text)}</span>
        </span>
      </span>
    </div>
  )
}

export default LanguageOptions
