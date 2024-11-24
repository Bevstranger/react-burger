import styles from '../login.module.css';
import {
  Input,
  PasswordInput,
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { authApi, useUpdateUserMutation } from '../../services/api/auth';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const ProfileFormLoading = () => {
  const { data, isSuccess } = authApi.endpoints.getUser.useQuery();
  return <>{!isSuccess ? <p>Loading...</p> : <ProfileForm data={data} />}</>;
};

export const ProfileForm = ({ data }) => {
  const [updateUser] = useUpdateUserMutation();
  const [name, setName] = useState(data?.user?.name);
  const [email, setEmail] = useState(data?.user?.email);
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ name, email, password });
  };

  const handleCancel = () => {
    setName(data?.user?.name);
    setEmail(data?.user?.email);
    setPassword('');
  };

  return (
    <form
      className={`${styles.profileFormContainer} ml-15`}
      onSubmit={handleSubmit}
    >
      <Input
        type={'text'}
        placeholder={'Имя'}
        icon="EditIcon"
        size={'default'}
        value={name || ''}
        extraClass="mt-6"
        onChange={(e) => setName(e.target.value)}
      />
      <EmailInput
        type={'text'}
        placeholder={'E-mail'}
        icon="EditIcon"
        value={email || ''}
        size={'default'}
        extraClass="mt-6"
        onChange={(e) => setEmail(e.target.value)}
      />
      <PasswordInput
        value={password}
        name={'password'}
        icon="EditIcon"
        extraClass="mt-6"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className={styles.profileFormButtons}>
        <Button
          htmlType="button"
          onClick={handleCancel}
          type="secondary"
          size="medium"
          extraClass="mt-6"
        >
          Отмена
        </Button>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mt-6"
        >
          Сохранить
        </Button>
      </div>
    </form>
  );
};

ProfileForm.propTypes = {
  data: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
    }),
  }),
};
