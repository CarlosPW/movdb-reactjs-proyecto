import React, { useRef } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import ScrollIntoView from "react-scroll-into-view";
import { useFetch } from "../../hooks/useFetch/useFetch";

const Navbar = () => {
	const api_key = "daf2ad8be74411b5b58f950d5b007312";

	const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`;

	const { data, loading } = useFetch(url);

	const history = useHistory();
	const inputRef = useRef(null);

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top-md ">
			<div className="container-fluid ">
				<Link to="/" className="navbar-brand" href="#">
					Mov<span className="text-danger">DB</span>.
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<NavLink className="nav-link" aria-current="page" to="/">
								<span> Home</span>
							</NavLink>
						</li>

						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								href="#"
								id="navbarDropdown"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<span> Movie Categories</span>
							</a>
							<ul
								className="dropdown-menu navbar-nav-scroll"
								aria-labelledby="navbarDropdown"
							>
								{loading
									? null
									: data.genres.map((genre) => {
											return (
												<li key={genre.id}>
													<ScrollIntoView selector="#category_title">
														<NavLink
															className="dropdown-item"
															to={`/categories/${genre.id}/${genre.name}`}
														>
															{genre.name}
														</NavLink>
													</ScrollIntoView>
												</li>
											);
									  })}
							</ul>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/login">
								<span> My Account</span>
							</NavLink>
						</li>
					</ul>
					<form
						className="d-flex"
						onSubmit={(e) => {
							e.preventDefault();
							history.push(`/search/${inputRef.current?.value}`);
						}}
					>
						<input
							ref={inputRef}
							className="form-control me-2 bg-transparent text-light"
							type="search"
							placeholder="Search Movie"
							aria-label="Search"
						/>
						<button className="btn btn-danger" type="submit">
							Search
						</button>
					</form>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
