import { supabase, IIngredient, IOrder } from './supabase';

export const getIngredients = async (): Promise<IIngredient[]> => {
	const { data, error } = await supabase.from('ingredients').select('*');
	if (error) throw new Error(error.message);
	return data || [];
};

export const createOrder = async (
	ingredients: string[],
	userId?: string
): Promise<IOrder> => {
	const total = 0;

	const { data, error } = await supabase
		.from('orders')
		.insert([
			{
				ingredients,
				user_id: userId,
				status: 'created',
				total,
			},
		])
		.select()
		.single();

	if (error) throw new Error(error.message);
	return data;
};

export const getOrders = async (): Promise<IOrder[]> => {
	const { data, error } = await supabase
		.from('orders')
		.select('*')
		.order('created_at', { ascending: false });
	if (error) throw new Error(error.message);
	return data || [];
};

export const getOrderById = async (id: number): Promise<IOrder> => {
	const { data, error } = await supabase
		.from('orders')
		.select('*')
		.eq('id', id)
		.single();
	if (error) throw new Error(error.message);
	return data;
};

export const registerUser = async (
	email: string,
	password: string,
	name: string
) => {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				name,
			},
		},
	});

	if (error) throw new Error(error.message);
	return data;
};

export const loginUser = async (email: string, password: string) => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) throw new Error(error.message);
	return data;
};

export const logoutUser = async () => {
	const { error } = await supabase.auth.signOut();
	if (error) throw new Error(error.message);
};

export const getCurrentUser = async () => {
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error) return null;
	return user;
};
