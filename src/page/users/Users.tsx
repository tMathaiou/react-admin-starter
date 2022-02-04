import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import ReactPaginate from 'react-paginate'
import styles from './users.module.css'
import TableActionHeader from './components/TableActionHeader'
import TableHeader from './components/TableHeader'
import TableBody from './components/TableBody'
import { fetchUsers, setPageAndFetch } from '../../state/user/user.actions'
import { userSelector } from '../../state/user/user.reducers'
import useSocketIO from '../../hooks/socketIo.hook'
import { useAppDispatch } from '../../state/store'
import { Socket } from 'socket.io-client'
import { toast } from 'react-toastify'

const Users = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const socket: Socket = useSocketIO()
  const {
    pagination: { totalElements, size, page },
    errState
  } = useSelector(userSelector)

  const setPageFn = useCallback(
    (selectedItem: { selected: number }) => {
      dispatch(setPageAndFetch(selectedItem.selected))
    },
    [dispatch]
  )

  useEffect(() => {
    socket.on('refresh-users', () => dispatch(fetchUsers()))

    return () => {
      socket.off('refresh-users')
    }
  }, [dispatch, socket])

  useEffect(() => {
    if (errState) {
      toast.error(errState)
    }
  }, [errState])

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <div className='users'>
      <div className='row'>
        <div className='col-md-12'>
          <div className={styles.portlet}>
            <div className={styles.portletBody}>
              <TableActionHeader />
              <div className='table-responsive'>
                <table className={`${styles.table} table`}>
                  <thead>
                    <TableHeader />
                  </thead>
                  <tbody>
                    <TableBody />
                  </tbody>
                </table>
                <div className='text-right'>
                  <ReactPaginate
                    previousLabel={t('commons.prev')}
                    nextLabel={t('commons.next')}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    forcePage={page - 1}
                    pageCount={Math.ceil(totalElements / size)}
                    containerClassName={'pagination'}
                    onPageChange={setPageFn}
                    activeClassName={'active'}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users
