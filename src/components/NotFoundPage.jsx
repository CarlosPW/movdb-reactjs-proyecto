import React from "react";
import { useHistory } from "react-router";

const NotFoundPage = () => {
	const history = useHistory();

	return (
		<div className="notfoundcontainer container text-light  d-flex flex-column align-items-center">
			<h1 className="text-center mt-5 mb-4 ">404 Page Not Found</h1>
			<br />
			<button
				className="btn btn-danger w-25"
				onClick={() => {
					history.push("/");
				}}
			>
				Go to Homepage
			</button>
		</div>
	);
};

export default NotFoundPage;
