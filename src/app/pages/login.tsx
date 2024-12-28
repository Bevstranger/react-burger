import {
	Button,
	PasswordInput,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import style from './login.module.css';
import { useLoginMutation } from '../services/api/auth';
import React, { useEffect } from 'react';
import { useForm } from '../components/hooks/useForm';

export function Login() {
	const [login, { isSuccess, isLoading, isError, data }] = useLoginMutation();

	const navigate = useNavigate();

	useEffect(() => {
		if (isError) {
			navigate('/login');
		} else if (isSuccess) {
			navigate('/');
		}
	}, [isError, isSuccess, navigate]);

	const { values, handleChange } = useForm({
		email: '',
		password: '',
	});

	const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await login({
			email: values.email,
			password: values.password,
		});
	};

	return (
		<section className={`${style.wr} `}>
			<p
				className={`text text_type_main-medium mt-20 mb-6 ${style.textCenter}`}>
				Вход
			</p>
			<form onSubmit={onLogin} className={style.wr}>
				<Input
					type={'email'}
					onChange={handleChange}
					value={values.email}
					name={'email'}
					placeholder='Email'
					extraClass='mb-6'
				/>
				<PasswordInput
					onChange={handleChange}
					value={values.password}
					name={'password'}
					extraClass='mb-6'
				/>
				<Button
					htmlType='submit'
					type='primary'
					size='medium'
					extraClass='mb-20 mt-6'>
					Войти
				</Button>
			</form>

			<p
				className={`text text_type_main-default  ${style.textCenter} ${style.textBottom}`}>
				Вы — новый пользователь? <Link to='/register'>Зарегистрироваться</Link>
			</p>
			<p
				className={`text text_type_main-default ${style.textCenter} ${style.textBottom}`}>
				Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link>
			</p>
		</section>
	);
}
