import React from "react";
import { useFetch } from "../../hooks/useFetch/useFetch";

const DetailPageCast = ({ id }) => {
	const api_key = "daf2ad8be74411b5b58f950d5b007312";
	const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}`;
	const { data, loading } = useFetch(url);

	let rows;

	let rows2;

	if (data !== null) {
		rows = data.cast.reduce(function (rows, key, index) {
			return (
				(index % 4 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows
			);
		}, []);
		rows2 = data.crew.reduce(function (rows, key, index) {
			return (
				(index % 4 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows
			);
		}, []);

		// console.log(rows);
	}

	return (
		<div className="detailpagecast_container text-light text-center">
			{/* Cast */}
			<div className="cast  mt-5">
				<h2>
					Cast<span className="text-danger">.</span>
				</h2>
			</div>
			<div
				id="carouselExampleControls"
				className="carousel slide w-75 mx-auto mt-3"
				data-bs-ride="carousel"
			>
				<div className="carousel-inner">
					{loading
						? null
						: rows.map((arr, i) => {
								return (
									<div
										key={i + 100}
										className={i === 0 ? "carousel-item active" : "carousel-item"}
									>
										<div className="row">
											{arr.map((film, j) => {
												return (
													<div className="col-3" key={j}>
														<img
															className="d-block w-100"
															src={
																film.profile_path === null
																	? "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
																	: `https://image.tmdb.org/t/p/w300/${film.profile_path}`
															}
															alt={film.name}
														/>
														<h5>"{film.character}"</h5>
														<h6>{film.name}</h6>
													</div>
												);
											})}
										</div>
									</div>
								);
						  })}
				</div>
				<button
					className="carousel-control-prev"
					type="button"
					data-bs-target="#carouselExampleControls"
					data-bs-slide="prev"
				>
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button
					className="carousel-control-next"
					type="button"
					data-bs-target="#carouselExampleControls"
					data-bs-slide="next"
				>
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Next</span>
				</button>
			</div>

			{/* Crew */}
			<div className="cast  mt-5">
				<h2>
					Crew<span className="text-danger">.</span>
				</h2>
			</div>
			<div
				id="carouselExampleControls2"
				className="carousel slide w-75 mx-auto mt-3"
				data-bs-ride="carousel"
			>
				<div className="carousel-inner">
					{loading
						? null
						: rows2.map((arr, i) => {
								return (
									<div
										key={i + 100}
										className={i === 0 ? "carousel-item active" : "carousel-item"}
									>
										<div className="row">
											{arr.map((film, j) => {
												return (
													<div className="col-3" key={j}>
														<img
															className="d-block w-100"
															src={
																film.profile_path === null
																	? "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
																	: `https://image.tmdb.org/t/p/w300/${film.profile_path}`
															}
															alt={film.name}
														/>
														<h6>{film.name}</h6>
														<h5>{film.known_for_department}</h5>
													</div>
												);
											})}
										</div>
									</div>
								);
						  })}
				</div>
				<button
					className="carousel-control-prev"
					type="button"
					data-bs-target="#carouselExampleControls2"
					data-bs-slide="prev"
				>
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button
					className="carousel-control-next"
					type="button"
					data-bs-target="#carouselExampleControls2"
					data-bs-slide="next"
				>
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Next</span>
				</button>
			</div>
		</div>
	);
};

export default DetailPageCast;
