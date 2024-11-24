import {
  Button,
  PasswordInput,
  Input,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import style from './login.module.css';
import { useRegisterMutation } from '../services/api/auth';
import { useState } from 'react';

export function Register() {
  const [value, setValue] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onFormChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const [register] = useRegisterMutation();

  const onRegister = () => {
    register(value);
  };

  return (
    <section className={`${style.wr} ${style.textCenter}`}>
      <form onSubmit={(e) => e.preventDefault()}>
        <p className="text text_type_main-medium mb-6 mt-20">Регистрация</p>
        <Input
          onChange={onFormChange}
          value={value.name}
          name={'name'}
          placeholder={'Имя'}
          extraClass="mb-6"
        />
        <EmailInput
          onChange={onFormChange}
          value={value.email}
          name={'email'}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={onFormChange}
          value={value.password}
          name={'password'}
          extraClass="mb-6"
        />
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          onClick={onRegister}
        >
          <p className="text text_type_main-default">Зарегистрироваться</p>
        </Button>
      </form>
      <p className={`text text_type_main-default ${style.textCenter} mt-20`}>
        Уже зарегистрированы? <Link to="/login">Войти</Link>
      </p>
    </section>
  );
}
