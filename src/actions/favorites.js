import { db } from "../firebase/firebase-config";

export const setFavorite = (payload) => ({
	type: "SET_FAVORITE",
	payload,
});

export const deleteFavorite = (payload) => ({
	type: "DELETE_FAVORITE",
	payload,
});

export const favoriteFirebase = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;

		let favoriteFilms = { ...getState().favoritesReducer };

		let docRef = await db.collection(`${uid}`).doc("favorites").set(favoriteFilms);
		return docRef;
	};
};

export const getFavoriteFirebase = async (uid, dispatch) => {
	const snapRef = await db.collection(`${uid}`).doc("favorites").get();

	const array = Object.values(snapRef.data());
	// console.log(array);
	return array;
};

export const clearFavorites = (payload) => ({
	type: "CLEAR_FILMS",
	payload,
});
