// Import necessary dependencies
import { useState } from "react"; // State management for controlled inputs
import Button from "./Button"; // Reusable button component

// Props Interface: Ensures the parent passes a callback function for adding posts
interface AddPostFormProps {
	onAddPost: (post: { userId: number; title: string }) => void; // Callback for submitting new posts
}

// Functional Component Definition
const AddPostForm = ({ onAddPost }: AddPostFormProps) => {
	// State for managing form data with default empty values
	const [newPost, setNewPost] = useState({ userId: "", title: "" });

	// Handler for form input changes
	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target; // Destructure name and value from the input
		setNewPost((prevPost) => ({ ...prevPost, [name]: value })); // Update the specific field
	};

	// Handler for form submission
	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault(); // Prevent default form submission behavior
		// Validate that all fields are filled
		if (newPost.userId && newPost.title) {
			// Pass the new post data to the parent callback
			onAddPost({ userId: parseInt(newPost.userId, 10), title: newPost.title });
			// Reset the form inputs after successful submission
			setNewPost({ userId: "", title: "" });
		}
	};

	// JSX for rendering the form
	return (
		<form onSubmit={handleFormSubmit} className='add-post-form'>
			<div>
				{/* User ID input field */}
				<label>User ID:</label>
				<input
					type='number' // Ensures numerical input
					name='userId' // Name matches the state key for controlled inputs
					value={newPost.userId} // Bound to state
					onChange={handleFormChange} // Updates state on change
					required // Ensures the field is not left empty
				/>
			</div>
			<div>
				{/* Title input field */}
				<label>Title:</label>
				<input
					type='text' // Ensures text input
					name='title' // Name matches the state key for controlled inputs
					value={newPost.title} // Bound to state
					onChange={handleFormChange} // Updates state on change
					required // Ensures the field is not left empty
				/>
			</div>
			{/* Submit button using the reusable Button component */}
			<Button type='submit'>Submit</Button>
		</form>
	);
};

export default AddPostForm; // Export for use in other parts of the application
