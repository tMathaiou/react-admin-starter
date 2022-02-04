import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback } from 'react'
import { User } from '../../../interfaces/user'
import { useSelector } from 'react-redux'
import { userSelector } from '../../../state/user/user.reducers'
import { useTranslation } from 'react-i18next'
import { fireSwalModal } from '../../../services/swal.service'
import { deleteUser } from '../../../state/user/user.actions'
import { useAppDispatch } from '../../../state/store'

const TableBody = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { users } = useSelector(userSelector)

  const deleteUserFn = useCallback(
    async (id: number) => {
      const { value } = await fireSwalModal({
        title: t('commons.delete_title'),
        text: t('commons.cant_revert'),
        confirmButtonText: t('commons.accept_delete'),
        cancelButtonText: t('commons.cancel'),
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        reverseButtons: true
      })

      if (value) {
        return dispatch(deleteUser(id))
      }
    },
    [dispatch, t]
  )

  return (
    <>
      {users.map((user: User, index: any) => (
        <tr key={'users_' + index}>
          <td>{user.id}</td>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.email}</td>
          <td className='text-center actions-td'>
            <Link to={'/users/' + user.id} className='btn btn-sm btn-primary'>
              <FontAwesomeIcon icon='edit' />
            </Link>
            <button
              onClick={() => deleteUserFn(user.id)}
              className='btn btn-sm btn-danger'
            >
              <FontAwesomeIcon icon='trash-alt' />
            </button>
          </td>
        </tr>
      ))}
    </>
  )
}

export default TableBody
