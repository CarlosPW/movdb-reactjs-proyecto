import { firebase, googleAuthProvider } from "../firebase/firebase-config";

export const login = (uid, displayName, photoURL) => ({
	type: "AUTH_LOGIN",
	payload: {
		uid,
		displayName,
		photoURL,
	},
});

export const startGoogleLogin = () => {
	return (dispatch) => {
		firebase
			.auth()
			.signInWithPopup(googleAuthProvider)
			.then(({ user }) => {
				dispatch(login(user.uid, user.displayName, user.photoURL));
			});
	};
};

export const startLogout = () => {
	return async (dispatch) => {
		await firebase.auth().signOut();
		dispatch(logout());
	};
};

export const logout = () => ({
	type: "AUTH_LOGOUT",
});
