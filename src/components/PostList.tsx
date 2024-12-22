import { useFetch } from "../hooks/useFetch";

const PostList = () => {
	const { data, error, loading } = useFetch("posts");

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div>
			<h1 className='title'>List of Tasks</h1>
			{data?.map((post) => (
				<ul key={post.id} className='post-list'>
					<li>{post.title}</li>
				</ul>
			))}
		</div>
	);
};

export default PostList;
