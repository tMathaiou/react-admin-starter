import React, { ChangeEvent, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { login } from '../../state/app/app.actions'
import LogoLogin from './logoLogin.svg'
import styles from './login.module.css'
import { useAppDispatch } from '../../state/store'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const onEmailChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    []
  )

  const onPasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
    []
  )

  const submit = useCallback(
    (e) => {
      e.preventDefault()
      dispatch(login({ email, password }))
    },
    [dispatch, email, password]
  )

  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.loginBg}>
          <div className={styles.box}>
            <div className={`${styles.loginContainer} container`}>
              <div className={`${styles.loginLogo}`}>
                <img alt='logo' src={LogoLogin} width='150px' />
              </div>
              <div className={styles.signIn}>
                <form onSubmit={submit}>
                  <div className={`${styles.loginInputGroup} input-group`}>
                    <input
                      placeholder={t('commons.email')}
                      autoComplete='off'
                      className={`${styles.loginFormControl} form-control`}
                      name='email'
                      onChange={onEmailChange}
                      type='text'
                      value={email}
                    />
                  </div>
                  <div className={`${styles.loginInputGroup} input-group`}>
                    <input
                      placeholder={t('commons.password')}
                      className={`${styles.loginFormControl} form-control`}
                      name='password'
                      onChange={onPasswordChange}
                      type='password'
                      value={password}
                    />
                  </div>
                  <div className={styles.loginActions}>
                    <button
                      disabled={!email || !password}
                      onClick={submit}
                      className={`btn btn-pill ${styles.loginBtn}`}
                    >
                      {t('commons.sign_in')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
