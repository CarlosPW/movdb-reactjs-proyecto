import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useFetch } from "../hooks/useFetch/useFetch";
import DetailPageCast from "./static/DetailPageCast";

import { deleteFavorite, favoriteFirebase, setFavorite } from "../actions/favorites";

import Swal from "sweetalert2";

const DetailPage = () => {
	const { id } = useParams();
	const api_key = "daf2ad8be74411b5b58f950d5b007312";
	const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`;
	const { data, loading } = useFetch(url);
	// console.log(data);

	const [favorite, setfavorite] = useState(false);

	const { uid } = useSelector((state) => state.auth);
	const { favoriteFilms } = useSelector((state) => state.favoritesReducer);

	const dispatch = useDispatch();

	const handleSetFavorite = () => {
		dispatch(setFavorite({ data }));
		dispatch(favoriteFirebase());
		setfavorite(true);
	};

	const handleDeleteFavorite = (itemId) => {
		dispatch(deleteFavorite(itemId));
		dispatch(favoriteFirebase());
		setfavorite(false);
	};

	const isFavorite = () => {
		const result = favoriteFilms.filter(
			(favoriteFilm) => favoriteFilm.data.id === Number(id)
		);
		if (result.length) {
			setfavorite(true);
		}
	};

	useEffect(() => {
		isFavorite();
	});

	return (
		<div className="detailPage_container">
			{loading ? (
				<div className="spinner-border text-danger mt-5" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			) : data.success === false ? (
				<div className="height_view">
					<div className="alert alert-danger w-50 text-center mx-auto mt-5" role="alert">
						{data.status_message}
					</div>
				</div>
			) : (
				<div>
					<div className="detailPage_subcontainer mt-5">
						<div className="left_container">
							<div className="header__coverImage">
								<img
									src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
									alt={data.original_title}
								/>
							</div>
						</div>
						<div className="right_container text-light text-center">
							<h1 className="text-center mt-5 mb-3">{data.title}</h1>
							<h3>
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>

								{data.release_date}
							</h3>
							<p>{data.overview}</p>
							<div className="rating">
								<svg
									className="w-6 h-6 text-dark"
									fill="yellow"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
									/>
								</svg>
								<h4>Rating: {data.vote_average}</h4>
							</div>
							{favorite ? (
								<div
									className="addToFavorites mt-5"
									onClick={() => {
										handleDeleteFavorite(Number(id));
									}}
								>
									<svg
										className="w-6 h-6"
										fill="red"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
										/>
									</svg>
									Add to Favorites
								</div>
							) : (
								<div
									className="addToFavorites mt-5"
									onClick={
										uid !== null
											? handleSetFavorite
											: () => {
													Swal.fire({
														title: "Error!",
														text: "Login to save your Favorites Films!",
														icon: "error",
														confirmButtonText: "Cool",
													});
											  }
									}
								>
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
										/>
									</svg>
									Add to Favorites
								</div>
							)}
						</div>
					</div>
					<DetailPageCast id={id} />
				</div>
			)}
		</div>
	);
};

export default DetailPage;
