import React, { useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import FormActionHeader from './components/FormActionHeader';
import styles from './usersForm.module.css';
import UserForm from './components/UserForm';
import { User } from '../../interfaces/user';
import { fetchUser, saveUser, updateUser, setUser } from '../../state/user/user.actions';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { userSelector } from '../../state/user/user.reducers';
import useSocketIO from '../../hooks/socketIo.hook';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../state/store';
import { to } from '../../utils/apiUtils';
import { Socket } from 'socket.io-client';

const UsersForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { id }: { id: string } = useParams();
  const socket: Socket = useSocketIO();
  const [isDispatchedUser, setIsDispatchedUser] = useState(false);
  const { user } = useSelector(userSelector);

  useEffect(() => {
    async function getUser() {
      if (id) {
        await to(dispatch(fetchUser(Number(id))));
      }
    }

    getUser();

    return () => {
      dispatch(setUser(null))
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      socket.on(`refresh-users-${id}`, () => {
        if (isDispatchedUser) {
          return;
        }
        dispatch(fetchUser(Number(id)));
        toast.warn(t('messages.already_updated'));
      });

      socket.on(`refresh-users-delete-${id}`, () => {
        toast.error(t('messages.entity_deleted'));
        history.push('/users');
      });
    }

    return () => {
      socket.off(`refresh-users-${id}`);
      socket.off(`refresh-users-delete-${id}`);
    };
  }, [dispatch, history, id, isDispatchedUser, socket, t]);

  const validate = (values: User) => {
    const errors = {} as User;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const requiredTranslation = t('validations.required');
    const emailInvalidTranslation = t('validations.email');
    const minLengthTranslation = t('validations.minLength');
    const confirmPasswordTranslation = t('validations.confirmPassword');

    if (!values.firstName) {
      errors.firstName = requiredTranslation;
    }

    if (!values.lastName) {
      errors.lastName = requiredTranslation;
    }

    if (!values.email) {
      errors.email = requiredTranslation;
    } else if (!values.email.match(emailRegex)) {
      errors.email = emailInvalidTranslation;
    }

    if (!values.password && !id) {
      errors.password = requiredTranslation;
    } else if (values.password?.length < 6) {
      errors.password = minLengthTranslation;
    }

    if (!values.confirmPassword && !id) {
      errors.confirmPassword = requiredTranslation;
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = confirmPasswordTranslation;
    }

    return errors;
  };

  const save = async (values: User) => {
    setIsDispatchedUser(true);
    const [err] = user
      ? await to(dispatch(updateUser(values)))
      : await to(dispatch(saveUser(values)));

    if (!err) {
      history.push('/users');
    }
  };

  return (
    <div className="usersForm">
      <div className="row">
        <div className="col-md-12">
          <div className={styles.portlet}>
            <FormActionHeader />
            <div className={styles.portletBody}>
              <Form
                initialValues={user}
                onSubmit={save}
                validate={validate}
                render={({ handleSubmit }) => (
                  <UserForm onSubmit={handleSubmit} />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersForm;
