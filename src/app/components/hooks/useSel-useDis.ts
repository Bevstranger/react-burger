import {
	TypedUseSelectorHook,
	useDispatch as originalUseDispatch,
	useSelector as originalUseSelector,
} from 'react-redux';
import { AppDispatch, RootState } from '../../services/store';

export const useSelector: TypedUseSelectorHook<RootState> = originalUseSelector;
export const useDispatch = () => originalUseDispatch<AppDispatch>();
