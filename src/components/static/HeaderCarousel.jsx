import React from "react";
import { useHistory } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch/useFetch";

const HeaderCarousel = () => {
	const api_key = "daf2ad8be74411b5b58f950d5b007312";
	const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&page=1`;

	const { data, loading } = useFetch(url);

	const history = useHistory();

	function handleClick(path) {
		history.push(path);
	}

	return (
		<div
			id="carouselExampleDark"
			className="carousel carousel-light slide"
			data-bs-ride="carousel"
		>
			<div className="carousel-inner">
				{loading ? (
					<div className="spinner-border text-danger" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				) : (
					data.results
						.filter((img) => {
							return img.backdrop_path !== null;
						})
						.map((img) => {
							return (
								<div
									className={
										data.results[0].id === img.id
											? "carousel-item active"
											: "carousel-item"
									}
									data-bs-interval="3000"
									data-bs-touch={true}
									key={img.id}
								>
									<div className="carousel_overlay"></div>
									<img
										src={`https://image.tmdb.org/t/p/original/${img.backdrop_path}`}
										className=" d-block w-100"
										alt={img.title}
									/>
									<div className="carousel_textOverlay">
										<h2 className="text-light">{img.title}</h2>
										<h4 className="text-light">{img.release_date}</h4>
										<span className="badge rounded-pill bg-danger text-light">
											Rating: {img.vote_average}
										</span>
										<br />
										<br />
										<button
											onClick={() => handleClick(`/movie/${img.id}`)}
											type="button"
											className="btn btn-warning"
										>
											See Details
										</button>
									</div>
								</div>
							);
						})
				)}
			</div>
			<button
				className="carousel-control-prev"
				type="button"
				data-bs-target="#carouselExampleDark"
				data-bs-slide="prev"
			>
				<span className="carousel-control-prev-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Previous</span>
			</button>
			<button
				className="carousel-control-next"
				type="button"
				data-bs-target="#carouselExampleDark"
				data-bs-slide="next"
			>
				<span className="carousel-control-next-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Next</span>
			</button>
		</div>
	);
};

export default HeaderCarousel;
