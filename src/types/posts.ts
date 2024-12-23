export interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
}

// src/types/todos.ts
export interface Todos {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}
