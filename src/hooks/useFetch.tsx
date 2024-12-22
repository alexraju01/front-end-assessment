import axios from "axios";
import { useEffect, useState } from "react";

const URL = "https://jsonplaceholder.typicode.com";

export const useFetch = (endpoint: string) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${URL}/${endpoint}`);
				setData(response.data);
			} catch (err) {
				setError(err as Error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [endpoint]);
	return { data, loading, error };
};
