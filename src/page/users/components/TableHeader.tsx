import React, { ChangeEvent, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { DefaultConfig } from '../../../defaultConfig'
import { debounce } from 'lodash'
import { useSelector } from 'react-redux'
import {
  fetchUsers,
  setFilters,
  setPage
} from '../../../state/user/user.actions'
import { userSelector } from '../../../state/user/user.reducers'
import { useAppDispatch } from '../../../state/store'

const TableHeader = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { filters } = useSelector(userSelector)

  const handler = debounce(async () => {
    await dispatch(setPage(1))
    dispatch(fetchUsers())
  }, DefaultConfig.debounceTime)

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, key: string) => {
      dispatch(
        setFilters({
          ...filters,
          [key]: e.target.value
        })
      )
      handler()
    },
    [dispatch, filters, handler]
  )

  const clearFilters = useCallback(() => {
    if (
      !filters.userId &&
      !filters.userEmail &&
      !filters.userFirstName &&
      !filters.userLastName
    ) {
      return
    }
    dispatch(
      setFilters({
        userId: '',
        userFirstName: '',
        userLastName: '',
        userEmail: ''
      })
    )
    dispatch(fetchUsers())
  }, [
    dispatch,
    filters.userEmail,
    filters.userFirstName,
    filters.userId,
    filters.userLastName
  ])

  return (
    <>
      <tr>
        <th>{t('commons.id')}</th>
        <th>{t('commons.firstName')}</th>
        <th>{t('commons.lastName')}</th>
        <th>{t('commons.email')}</th>
        <th className='text-center'>{t('commons.actions')}</th>
      </tr>
      <tr>
        {Object.keys(filters).map((key, index) => (
          <td key={'key_' + index}>
            <input
              className='form-control'
              type='text'
              onChange={(e) => onChange(e, key)}
              value={filters[key]}
            />
          </td>
        ))}
        <td className='text-center'>
          <button onClick={clearFilters} className='btn btn-sm btn-primary'>
            {t('commons.clear_filters')}
          </button>
        </td>
      </tr>
    </>
  )
}

export default TableHeader
