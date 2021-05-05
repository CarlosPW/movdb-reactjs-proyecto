import React from "react";
import { useHistory } from "react-router";

const MovieDisplay = ({ data, loading, error, page, setpage }) => {
	const history = useHistory();

	function handleClick(path) {
		history.push(path);
	}

	return (
		<div>
			<br />
			<div className="moviedisplay_container d-flex justify-content-center">
				{loading ? (
					<h3 className="text-light">Loading...</h3>
				) : (
					<div
						className="btn-group "
						role="group"
						aria-label="Basic mixed styles example"
					>
						<button
							type="button"
							className={page <= 1 ? "btn btn-danger disabled" : "btn btn-danger"}
							onClick={(e) => {
								e.preventDefault();

								page <= 1 ? setpage(1) : setpage(page - 1);
							}}
						>
							Previous
						</button>

						<button
							type="button"
							className={
								page >= data.total_pages ? "btn btn-danger disabled" : "btn btn-danger"
							}
							onClick={(e) => {
								e.preventDefault();

								page >= data.total_pages ? setpage(500) : setpage(page + 1);
							}}
						>
							Next
						</button>
					</div>
				)}
			</div>
			<div className="moviedisplay_container">
				{loading ? (
					<div className="spinner-border text-danger" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				) : (
					data.results
						.filter((img) => {
							return img.poster_path !== null;
						})
						.map((img) => {
							return (
								<div
									className="film_item "
									key={img.id}
									onClick={() => {
										handleClick(`/movie/${img.id}`);
									}}
								>
									<div className="film_item_overlay">
										<div>
											<h3 className="film_item_description text-light">{img.title}</h3>
											<p className="film_item_description text-light">{img.overview}</p>
											<span className="film_item_description badge rounded-pill bg-danger">
												{img.release_date}
											</span>
										</div>
									</div>
									<img
										src={`https://image.tmdb.org/t/p/w300/${img.poster_path}`}
										className="film_item_image"
										alt={img.title}
									/>
								</div>
							);
						})
				)}
			</div>
		</div>
	);
};

export default MovieDisplay;
