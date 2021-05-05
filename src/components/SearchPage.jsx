import React, { useState } from "react";
import { useParams } from "react-router";
import { useFetch } from "../hooks/useFetch/useFetch";
import MovieDisplay from "./static/MovieDisplay";

const SearchPage = () => {
	const api_key = "daf2ad8be74411b5b58f950d5b007312";
	const [page, setpage] = useState(1);

	const { MovieQuery } = useParams();

	const { data, loading } = useFetch(
		`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${MovieQuery}&page=${page}`
	);
	// console.log(data);
	return (
		<div>
			{loading ? (
				<div className="spinner-border text-danger" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			) : data.total_results > 0 ? (
				<div className="homePage__popularContainer">
					<h2 id="category_title" className="text-light mt-5 text-center">
						Search Results
					</h2>
					<MovieDisplay data={data} loading={loading} page={page} setpage={setpage} />
				</div>
			) : (
				<div className="homePage__popularContainer">
					<h2 id="category_title">No Results</h2>
				</div>
			)}
		</div>
	);
};

export default SearchPage;
