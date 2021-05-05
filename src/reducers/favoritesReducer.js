const initialState = {
	favoriteFilms: [],
};

export const favoritesReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_FAVORITE":
			return {
				...state,
				favoriteFilms: [...state.favoriteFilms, action.payload],
			};

		case "DELETE_FAVORITE":
			return {
				...state,
				favoriteFilms: state.favoriteFilms.filter((item) => {
					return item.data.id !== action.payload;
				}),
			};

		case "CLEAR_FILMS":
			return {
				...state,
				favoriteFilms: [],
			};
		default:
			return state;
	}
};
