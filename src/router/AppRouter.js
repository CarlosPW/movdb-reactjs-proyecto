import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DetailPage from "../components/DetailPage";

import { login } from "../actions/auth";
import { getFavoriteFirebase, setFavorite } from "../actions/favorites";

import HomePage from "../components/HomePage";
import LoginPage from "../components/LoginPage";
import NotFoundPage from "../components/NotFoundPage";
import Footer from "../components/static/Footer";
import Navbar from "../components/static/Navbar";

import { firebase } from "../firebase/firebase-config";
import { useDispatch } from "react-redux";
import { useFetch } from "../hooks/useFetch/useFetch";
import SearchPage from "../components/SearchPage";

const AppRouter = () => {
	const api_key = "daf2ad8be74411b5b58f950d5b007312";

	const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`;

	const { data } = useFetch(url);

	let categories;
	if (data !== null) {
		categories = data.genres
			.map((gen) => {
				return gen.name;
			})
			.join("|");
	}

	const dispatch = useDispatch();
	useEffect(() => {
		firebase.auth().onAuthStateChanged(async (user) => {
			if (user?.uid) {
				dispatch(login(user.uid, user.displayName, user.photoURL));
				const fav = await getFavoriteFirebase(user.uid);

				if (fav.length > 0) {
					fav.forEach((item) => {
						item.forEach((subitem) => dispatch(setFavorite(subitem)));
					});
				}
			}
		});
	}, [dispatch]);

	return (
		<Router>
			<Navbar />
			<Switch>
				<Route path="/movie/:id">
					<DetailPage />
				</Route>
				<Route path="/search/:MovieQuery">
					<SearchPage />
				</Route>
				<Route path="/login">
					<LoginPage />
				</Route>
				<Route path={`/categories/:categoryID/:categoryName(${categories})`}>
					<HomePage />
				</Route>
				<Route exact path="/">
					<HomePage />
				</Route>
				<Route>
					<NotFoundPage />
				</Route>
			</Switch>
			<Footer />
		</Router>
	);
};

export default AppRouter;
