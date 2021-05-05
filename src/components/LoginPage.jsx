import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { startGoogleLogin } from "../actions/auth";
import { clearFavorites } from "../actions/favorites.js";
import { startLogout } from "../actions/auth.js";
import { Link, useHistory } from "react-router-dom";

const LoginPage = () => {
	const { uid, displayName, photoURL } = useSelector((state) => state.auth);
	const { favoriteFilms } = useSelector((state) => state.favoritesReducer);
	console.log(favoriteFilms);

	const history = useHistory();

	const dispatch = useDispatch();

	function googleLogin() {
		dispatch(startGoogleLogin());
	}

	function Logout() {
		dispatch(startLogout());
		dispatch(clearFavorites());
	}

	function handleClick(path) {
		history.push(path);
	}

	return (
		<div className="loginpage_container text-light text-center">
			{uid === null ? (
				<div>
					<h1 className="mt-5">My Account</h1>
					<br />
					<button className="btn btn-primary" onClick={googleLogin}>
						<i className="fab fa-google"></i> <br />
						Log in with Google
					</button>
				</div>
			) : (
				<div>
					<h1 className="mt-5">Welcome {displayName}!</h1>

					<div>
						<img className="m-4" src={photoURL} alt={displayName} />
					</div>

					<button
						className="btn btn-danger"
						onClick={() => {
							Logout();
						}}
					>
						<i className="fab fa-google"></i> <br />
						Log out
					</button>

					<br />
					<h2 className="mt-5">My Favorite Movies</h2>
					<br />
					{uid === null ? (
						<h4>Login first to save your favorites movies.</h4>
					) : (
						<div className="moviedisplay_container">
							<div className="homePage__popularMovieContainer">
								<div>
									{favoriteFilms === null ? (
										<div className="loading"></div>
									) : (
										favoriteFilms
											.filter((mov) => {
												return mov.data.poster_path !== null;
											})
											.map((movie) => {
												return (
													<Link to={`/movie/${movie.data.id}`} key={movie.data.id + 123}>
														<div
															className="film_item "
															key={movie.data.id}
															onClick={() => {
																handleClick(`/movie/${movie.data.id}`);
															}}
														>
															<div className="film_item_overlay">
																<div>
																	<h3 className="film_item_description text-light">
																		{movie.data.title}
																	</h3>
																	<p className="film_item_description text-light">
																		{movie.data.overview}
																	</p>
																	<span className="film_item_description badge rounded-pill bg-danger">
																		{movie.data.release_date}
																	</span>
																</div>
															</div>
															<img
																src={`https://image.tmdb.org/t/p/w300/${movie.data.poster_path}`}
																className="film_item_image"
																alt={movie.data.title}
															/>
														</div>
													</Link>
												);
											})
									)}
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default LoginPage;
