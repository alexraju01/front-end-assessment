// import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { useCreatePostMutation, useFetchPostsQuery, useFetchTodosQuery } from "../services/posts";
import { Post } from "../types/posts";
import AddPostForm from "./AddPostForm";
import Button from "./Button";

interface CombinedData {
	id: number;
	userId: number;
	title: string;
	completed: boolean;
}

const PostList = () => {
	// const { data, error, loading } = useFetch("posts");
	const { data: posts, isLoading: postsLoading, error: postsError } = useFetchPostsQuery();
	const { data: todos, isLoading: todosLoading, error: todosError } = useFetchTodosQuery();

	const [combinedData, setCombinedData] = useState<CombinedData[]>([]);
	const [createPost] = useCreatePostMutation();

	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [isFormVisible, setFormVisible] = useState(false); // Track form visibility

	useEffect(() => {
		if (posts && todos) {
			const data = posts.map((post: { id: number; userId: number; title: string }) => {
				const todo = todos.find((todo: { id: number }) => todo.id === post.id);
				return {
					id: post.id,
					userId: post.userId,
					title: post.title,
					completed: todo?.completed ?? false,
				};
			});
			setCombinedData(data);
		}
	}, [posts, todos]);

	if (postsLoading || todosLoading) return <p>Loading...</p>;
	if (postsError || todosError) return <p>Error fetching data</p>;

	const handleAddPost = async (newPost: { userId: number; title: string }) => {
		try {
			const savedPost = await createPost(newPost).unwrap();
			const newPostData: CombinedData = {
				id: savedPost.id, // Use the ID from the API response
				userId: savedPost.userId,
				title: savedPost.title,
				completed: false,
			};
			setCombinedData((prevData) => [...prevData, newPostData]);
			setSuccessMessage("You have successfully added a new post!");
			setTimeout(() => setSuccessMessage(null), 3000); // Hide message after 3 seconds
			setFormVisible(false); // Hide the form after submission
		} catch (error) {
			console.error("Error occurred while adding a post:", error);
		}
	};

	return (
		<div>
			<h1 className='title '>List of Tasks</h1>

			{successMessage && <div className='success-message'>{successMessage}</div>}
			<Button className='btnAddPost' onClick={() => setFormVisible(true)}>
				+ Add
			</Button>

			{isFormVisible && <AddPostForm onAddPost={handleAddPost} />}
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
