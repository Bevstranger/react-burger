import {
	Button,
	PasswordInput,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../services/api/auth';
import { useForm } from '../components/hooks/useForm';

export const ResetPassword = () => {
	const navigate = useNavigate();
	const [resetPassword] = useResetPasswordMutation();
	const { values, handleChange } = useForm({ password: '', code: '' });
	const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		resetPassword({ password: values.password, token: values.code });
		navigate('/login');
	};

	return (
		<section className={`${style.wr} ${style.textCenter}`}>
			<form onSubmit={handleReset}>
				<p className='text text_type_main-medium mb-6 mt-20'>
					Восстановление пароля
				</p>
				<PasswordInput
					onChange={handleChange}
					value={values.password}
					name={'password'}
					extraClass='mb-6'
					autoComplete='off'
					label='Пароль'
				/>
				<Input
					onChange={handleChange}
					value={values.code}
					name={'code'}
					extraClass='mb-6'
					autoComplete='off'
					label='Код из письма'
					placeholder='Введите код из письма'
				/>
				<Button type='primary' size='medium' htmlType='submit'>
					<p className='text text_type_main-default'>Сохранить</p>
				</Button>
			</form>
			<p className={`text text_type_main-default ${style.textCenter} mt-20`}>
				Вспомнили пароль? <Link to='/login'>Войти</Link>
			</p>
		</section>
	);
};
