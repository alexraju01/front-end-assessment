// src/features/posts/postsApi.ts
import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios, { AxiosError } from "axios";
import { Post, Todos } from "../types/posts";

// interface AxiosBaseQueryArgs {
// 	url: string;
// 	method: AxiosRequestConfig["method"];
// 	data?: unknown;
// 	params?: Record<string, any>;
// }

const axiosBaseQuery =
	({ baseUrl }: { baseUrl: string }): BaseQueryFn<any, unknown, unknown> =>
	async ({ url, method, data, params }) => {
		try {
			const response = await axios({ url: `${baseUrl}${url}`, method, data, params });
			return { data: response.data };
		} catch (error) {
			const err = error as AxiosError;
			return {
				error: {
					status: err.response?.status,
					data: err.response?.data || err.message,
				},
			};
		}
	};

export const postsApi = createApi({
	reducerPath: "postsApi",
	baseQuery: axiosBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
	endpoints: (builder) => ({
		fetchPosts: builder.query<Post[], void>({
			query: () => ({ url: "/posts", method: "GET" }),
		}),
		fetchTodos: builder.query<Todos[], void>({
			query: () => ({ url: "/todos", method: "GET" }),
		}),
		createPost: builder.mutation<Post, Partial<Post>>({
			query: (newPost) => ({
				url: "/posts",
				method: "POST",
				data: newPost,
			}),
		}),
	}),
});

export const { useFetchPostsQuery, useFetchTodosQuery, useCreatePostMutation } = postsApi;
