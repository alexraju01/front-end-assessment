import { useFetch } from "../hooks/useFetch";
import { useGetAllPostQuery } from "../services/posts";

const PostList = () => {
	// const { data, error, loading } = useFetch("posts");
	const { data, error, isLoading } = useGetAllPostQuery("/todos");

	console.log(data);
	if (isLoading) return <p>Loading...</p>;
	// if (error) return <p>Error: {error}</p>;

	return (
		<div>
			<h1 className='title'>List of Tasks</h1>
			{data?.map((post) => (
				<ul key={post.id} className='post-list'>
					<li className='list-item'>
						{/* <p>{post.userId}</p> */}
						<div>
							<p>{post.userId}</p>
							<p>{post.title}</p>
							<p>{post.completed}</p>
						</div>
					</li>
				</ul>
			))}
		</div>
	);
};

export default PostList;
