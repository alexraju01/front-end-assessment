// import PostList from "./components/PostList";

// function App() {
// 	return (
// 		<div>
// 			<PostList />
// 		</div>
// 	);
// }

// export default App;

import * as React from "react";
import { useGetAllPostQuery } from "./services/posts";
import PostList from "./components/PostList";
// import { useGetPokemonByNameQuery } from "./services/pokemon";

export default function App() {
	// Using a query hook automatically fetches data and returns query values
	// const { data, error, isLoading } = useGetAllPostQuery("/posts");
	// Individual hooks are also accessible under the generated endpoints:
	// const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

	// console.log(data);
	return (
		<div className='App'>
			<PostList />
			{/* {error ? (
				<>Oh no, there was an error</>
			) : isLoading ? (
				<>Loading...</>
			) : data ? (
				<>
					<h3>{data.species.name}</h3>
					<img src={data.sprites.front_shiny} alt={data.species.name} />
				</>
			) : null} */}
		</div>
	);
}
