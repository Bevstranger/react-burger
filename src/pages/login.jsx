import {
  Button,
  PasswordInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import style from './login.module.css';
import { useLoginMutation } from '../services/api/auth';
import React, { useState } from 'react';

export function Login() {
  const [login] = useLoginMutation({
    fixedCacheKey: 'login',
  });

  const navigate = useNavigate();

  const [emailValue, setEmailValue] = useState('');
  const onChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };
  const [passValue, setPassValue] = useState('');
  const onChangePass = (e) => {
    setPassValue(e.target.value);
  };

  const onLogin = async () => {
    const res = await login({
      email: emailValue,
      password: passValue,
    }).unwrap();

    if (res.success) {
      navigate('/');
    }
  };

  return (
    <section className={`${style.wr} `}>
      <p
        className={`text text_type_main-medium mt-20 mb-6 ${style.textCenter}`}
      >
        Вход
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className={style.wr}
      >
        <Input
          onChange={onChangeEmail}
          value={emailValue}
          name={'email'}
          placeholder="Email"
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={onChangePass}
          value={passValue}
          name={'password'}
          extraClass="mb-6"
        />
        <Button
          onClick={onLogin}
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20 mt-6"
        >
          Войти
        </Button>
      </form>

      <p
        className={`text text_type_main-default  ${style.textCenter} ${style.textBottom}`}
      >
        Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link>
      </p>
      <p
        className={`text text_type_main-default ${style.textCenter} ${style.textBottom}`}
      >
        Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
      </p>
    </section>
  );
}
