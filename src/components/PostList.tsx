// import { useFetch } from "../hooks/useFetch";
import { useFetchPostsQuery, useFetchTodosQuery } from "../services/posts";
import { Post } from "../types/posts";

const PostList = () => {
	// const { data, error, loading } = useFetch("posts");
	const { data: posts, isLoading: postsLoading, error: postsError } = useFetchPostsQuery();
	const { data: todos, isLoading: todosLoading, error: todosError } = useFetchTodosQuery();

	if (postsLoading || todosLoading) return <p>Loading...</p>;
	if (postsError || todosError) return <p>Error fetching data</p>;

	const combinedData = posts?.map((post: { id: number; userId: number; title: string }) => {
		const todo = todos?.find((todo: { id: number }) => todo.id === post.id);
		return {
			id: post.id,
			userId: post.userId,
			title: post.title,
			completed: todo?.completed ?? false, // Default to false if no matching todo
		};
	});

	return (
		<div>
			<h1 className='title'>List of Tasks</h1>

			<section>
				<div className='list-heading'>
					<p>User ID</p>
					<p>Title</p>
					<p>Completed</p>
				</div>
				{combinedData?.map((post) => (
					<ul key={post.id} className='post-list'>
						<li className='list-item'>
							<div>
								<p>{post.userId}</p>
								<p>{post.title}</p>
								<p>{post.completed ? "Yes" : "No"}</p>
							</div>
						</li>
					</ul>
				))}
			</section>
		</div>
	);
};

export default PostList;
