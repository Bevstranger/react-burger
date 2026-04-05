import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pmsivaolfvgeenxkehrv.supabase.co';
const supabaseAnonKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtc2l2YW9sZnZnZWVueGtlaHJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyODcwOTQsImV4cCI6MjA5MDg2MzA5NH0.dos0FqrF-sl7Qhy4xEGnDMXq2STilEx3_RrAhYxwn_A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface IIngredient {
	id: number;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
}

export interface IOrder {
	id: number;
	user_id: string;
	ingredients: string[];
	name: string;
	status: string;
	total: number;
	created_at: string;
	updated_at: string;
}
