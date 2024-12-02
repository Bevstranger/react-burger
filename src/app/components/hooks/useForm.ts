import React, { useState } from 'react';

export function useForm<T extends Record<string, string>>(inputValues: T) {
	const [values, setValues] = useState<T>(inputValues);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;
		setValues((prevValues) => ({ ...prevValues, [name]: value }));
	};

	return { values, handleChange, setValues };
}
