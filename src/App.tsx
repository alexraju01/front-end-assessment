import useFetch from "./hooks/useFetch";

function App() {
	const { data, loading, error } = useFetch("posts");
	console.log(data);
	return <h1>Hello World</h1>;
}

export default App;
