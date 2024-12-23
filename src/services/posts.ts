// src/features/posts/postsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
	reducerPath: "postsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
	endpoints: (builder) => ({
		fetchPosts: builder.query({
			query: () => "/posts",
		}),
		fetchTodos: builder.query({
			query: () => "/todos",
		}),
	}),
});

export const { useFetchPostsQuery, useFetchTodosQuery } = postsApi;
