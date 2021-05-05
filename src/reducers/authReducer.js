const initialState = {
	uid: null,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case "AUTH_LOGIN":
			return {
				uid: action.payload.uid,
				displayName: action.payload.displayName,
				photoURL: action.payload.photoURL,
			};

		case "AUTH_LOGOUT":
			return {
				uid: null,
			};
		default:
			return state;
	}
};
