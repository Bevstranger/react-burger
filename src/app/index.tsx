import AppHeader from './components/app-header/App-Header';
import styles from './app.module.css';
import {
	Home,
	Login,
	NotFound404,
	Register,
	ForgotPassword,
	ResetPassword,
	IngredientPage,
	Orders,
	OrderInfo,
	Profile,
} from './pages/index';

import { ProfileFormLoading } from './pages/profile/profile-form';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Modal } from './components/modal/modal';
import {
	OnlyAuth,
	OnlyUnAuth,
} from './components/protected-route/protected-route';
import { Feed } from './pages/feed';

export const App = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;

	const handleModalClose = () => {
		navigate(-1);
	};

	return (
		<>
			<AppHeader />
			<main className={styles.app_main}>
				<Routes location={background || location}>
					<Route path='/' element={<Home />} />
					<Route
						path='/login'
						element={<OnlyUnAuth element={<Login />} exact />}
					/>
					<Route
						path='/register'
						element={<OnlyUnAuth element={<Register />} exact />}
					/>
					<Route
						path='/forgot-password'
						element={<OnlyUnAuth element={<ForgotPassword />} exact />}
					/>
					<Route
						path='/reset-password'
						element={<OnlyUnAuth element={<ResetPassword />} exact />}
					/>
					<Route path='/feeds' element={<Feed />} />
					<Route
						path='/profile'
						element={<OnlyAuth element={<Profile />} exact />}>
						<Route
							index
							element={<OnlyAuth element={<ProfileFormLoading />} />}
						/>
						<Route
							path='/profile/orders'
							element={<OnlyAuth element={<Orders />} exact />}
						/>
					</Route>
					<Route
						path='/profile/orders/:id'
						element={<OnlyAuth element={<OrderInfo />} exact />}
					/>

					<Route path='/ingredients/:id' element={<IngredientPage />} />
					<Route path='/feeds/:id' element={<OrderInfo />} />
					<Route path='*' element={<NotFound404 />} />
				</Routes>
				{background && (
					<Routes>
						<Route
							path='/ingredients/:id'
							element={
								<Modal
									open
									onClose={handleModalClose}
									// title={'Детали ингредиента'}
								>
									<IngredientPage />
								</Modal>
							}
						/>
						<Route
							path='/profile/orders/:id'
							element={
								<Modal
									open
									onClose={handleModalClose}
									// title={'Детали заказа'}
								>
									<OrderInfo />
								</Modal>
							}
						/>
						<Route
							path='/feeds/:id'
							element={
								<Modal
									open
									onClose={handleModalClose}
									// title={'Детали заказа'}
								>
									<OrderInfo />
								</Modal>
							}
						/>
					</Routes>
				)}
			</main>
		</>
	);
};
