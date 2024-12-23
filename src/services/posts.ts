// src/features/posts/postsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post, Todos } from "../types/posts";

export const postsApi = createApi({
	reducerPath: "postsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
	endpoints: (builder) => ({
		fetchPosts: builder.query<Post[], void>({
			query: () => "/posts",
		}),
		fetchTodos: builder.query<Todos[], void>({
			query: () => "/todos",
		}),
	}),
});

export const { useFetchPostsQuery, useFetchTodosQuery } = postsApi;
