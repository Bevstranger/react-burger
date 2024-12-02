import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useForgotPasswordMutation } from '../services/api/auth';
import { useForm } from '../components/hooks/useForm';
import style from './login.module.css';

export const ForgotPassword = () => {
	const navigate = useNavigate();
	const [forgotPassword] = useForgotPasswordMutation();
	const { values, handleChange } = useForm({ email: '' });

	const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await forgotPassword({ email: values.email });
		navigate('/reset-password');
	};

	return (
		<section className={`${style.wr} ${style.textCenter}`}>
			<form onSubmit={handleReset}>
				<p className='text text_type_main-medium mb-6 mt-20'>
					Восстановление пароля
				</p>
				<EmailInput
					onChange={handleChange}
					value={values.email}
					name={'email'}
					extraClass='mb-6'
				/>
				<Button type='primary' size='large' htmlType='submit'>
					<p className='text text_type_main-default'>Восстановить</p>
				</Button>
			</form>
			<p className={`text text_type_main-default ${style.textCenter} mt-20`}>
				Вспомнили пароль? <Link to='/login'>Войти</Link>
			</p>
		</section>
	);
};
