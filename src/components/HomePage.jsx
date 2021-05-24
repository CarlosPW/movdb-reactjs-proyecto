import React, { useEffect, useState } from "react";
import HeaderCarousel from "./static/HeaderCarousel";
import MovieDisplay from "./static/MovieDisplay";
import { useLocation, useParams } from "react-router";

import { useFetch } from "../hooks/useFetch/useFetch";

const HomePage = () => {
	const location = useLocation();
	const { categoryID, categoryName } = useParams();

	const api_key = "daf2ad8be74411b5b58f950d5b007312";

	const [page, setpage] = useState(1);
	const urlDefault = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&page=${page}`;
	const urlCategory = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${categoryID}&page=${page}`;

	const { data, loading, error } = useFetch(
		location.pathname.split("/").includes("categories") ? urlCategory : urlDefault
	);

	useEffect(() => {
		setpage(1);
	}, [categoryName]);
	// console.log(data);
	return (
		<>
			<HeaderCarousel />

			<div className="homepage_moviedisplay_container">
				<h2 id="title" className="text-light text-center">
					{location.pathname.split("/").includes("categories") ? categoryName : "Popular"}
					<span className="text-danger">.</span>
				</h2>
				<h6 className="text-light text-center">Page number: {page}</h6>
				<MovieDisplay
					data={data}
					loading={loading}
					error={error}
					page={page}
					setpage={setpage}
				/>
			</div>
		</>
	);
};

export default HomePage;
