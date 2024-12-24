// Import necessary libraries and types
import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // RTK Query for API creation and management
import axios, { AxiosError } from "axios"; // Axios for flexible HTTP request handling
import { Post, Todos } from "../types/posts"; // TypeScript interfaces for strong typing

// Custom Base Query Function for RTK Query
const axiosBaseQuery =
	({ baseUrl }: { baseUrl: string }): BaseQueryFn<any, unknown, unknown> =>
	async ({ url, method, data, params }) => {
		try {
			// Use Axios to make HTTP requests with custom options
			const response = await axios({ url: `${baseUrl}${url}`, method, data, params });
			return { data: response.data }; // Return response data for RTK Query to manage
		} catch (error) {
			// Handle errors with Axios's robust error object
			const err = error as AxiosError;
			return {
				error: {
					status: err.response?.status, // HTTP status code
					data: err.response?.data || err.message, // Error data or fallback message
				},
			};
		}
	};

export const postsApi = createApi({
	reducerPath: "postsApi", // Unique slice name for this API in Redux
	baseQuery: axiosBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }), // Custom base query using Axios
	endpoints: (builder) => ({
		// Fetch posts endpoint
		fetchPosts: builder.query<Post[], void>({
			query: () => ({ url: "/posts", method: "GET" }), // Axios request configuration
		}),
		// Fetch todos endpoint
		fetchTodos: builder.query<Todos[], void>({
			query: () => ({ url: "/todos", method: "GET" }), // Axios request configuration
		}),
		// Create a new post endpoint
		createPost: builder.mutation<Post, Partial<Post>>({
			query: (newPost) => ({
				url: "/posts",
				method: "POST",
				data: newPost, // Send data for new post
			}),
		}),
	}),
});

// Export auto-generated hooks for components to use in React
export const { useFetchPostsQuery, useFetchTodosQuery, useCreatePostMutation } = postsApi;
