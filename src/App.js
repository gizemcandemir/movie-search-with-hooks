import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Movie from "./components/Movie";
import Search from "./components/Search";

const MOVIE_API_URL =
	"http://www.omdbapi.com/?s=man&i=tt3896198&apikey=957687c4";

const App = () => {
	const [loading, setLoading] = useState(true);
	const [movies, setMovies] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		fetch(MOVIE_API_URL)
			.then(response => response.json())
			.then(jsonResponse => {
				setMovies(jsonResponse.Search);
				console.log(jsonResponse);
				setLoading(false);
			})
      .catch(error => {
        console.error("Error", error);
      });
	}, []);

	const search = searchValue => {
		setLoading(true);
		setErrorMessage(null);

		fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=957687c4`)
			.then(response => response.json())
			.then(jsonResponse => {
				if (jsonResponse.Response === "True") {
					setMovies(jsonResponse.Search);
					setLoading(false);
				} else {
					setErrorMessage(jsonResponse.Error);
					setLoading(false);
				}
			});
	};

	return (
		<div className="App">
			<Header text="HOOKED" />
			<Search search={search} />
			<p className="App-intro">Sharing a few of our favorite movies</p>
			<div className="movies">
				{loading && !errorMessage ? (
					<span>loading...</span>
				) : errorMessage ? (
					<div className="errorMessage">{errorMessage}</div>
				) : (
					movies.map((movie, index) => (
						<Movie key={`${index}-${movie.Title}`} movie={movie} />
					))
				)}
			</div>
		</div>
	);
};

export default App;
