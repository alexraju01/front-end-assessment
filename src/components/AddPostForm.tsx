import React, { useState } from "react";
import Button from "./Button";

interface AddPostFormProps {
	onAddPost: any;
}

const AddPostForm: React.FC<AddPostFormProps> = ({ onAddPost }) => {
	const [newPost, setNewPost] = useState({ userId: "", title: "" });

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
	};

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		onAddPost({
			userId: parseInt(newPost.userId, 10),
			title: newPost.title,
		});

		setNewPost({ userId: "", title: "" });
	};

	return (
		<form onSubmit={handleFormSubmit} className='add-post-form'>
			<div>
				<label>User ID:</label>
				<input
					type='number'
					name='userId'
					value={newPost.userId}
					onChange={handleFormChange}
					required
				/>
			</div>
			<div>
				<label>Title:</label>
				<input
					type='text'
					name='title'
					value={newPost.title}
					onChange={handleFormChange}
					required
				/>
			</div>
			<Button type='submit'>Submit</Button>
		</form>
	);
};

export default AddPostForm;
