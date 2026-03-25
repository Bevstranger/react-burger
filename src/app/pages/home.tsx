import { HTML5Backend } from 'react-dnd-html5-backend';
import Bur from '../components/burger-ingredients/Burger-Ingredients';
import Constructor from '../components/burger-constructor/Burger-Constructor';
import { DndProvider } from 'react-dnd';
import { useEffect } from 'react';
import { ingredientsRequest } from '../services/ingredientsSlice';
import { useAppDispatch } from '../services/store';

export const Home = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(ingredientsRequest());
	}, [dispatch]);

	return (
		<DndProvider backend={HTML5Backend}>
			<Bur />
			<Constructor />
		</DndProvider>
	);
};
