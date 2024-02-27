import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export function Private() {
	const { store, actions } = useContext(Context);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const data = await actions.accessPrivate();
	// 			console.log("Data from server:", data);
	// 		} catch (error) {
	// 			console.error("Error fetching data:", error.message);
	// 		}
	// 	};

	// 	fetchData();
	// }, [actions]);

	return (
		<div className="mt-5 d-flex justify-content-center flex-column">
			{store.token && (
				<div className="d-flex justify-content-center">
					<h1>Your secret token is</h1>
				</div>
			)}
			{!store.token && (
				<div className="d-flex justify-content-center">
					<h1>401</h1>
				</div>
			)}
			<div className="m-auto">
				<p style={{ fontSize: "8px" }}>
					{store.token ? store.token : "None"}
				</p>
			</div>
		</div>
	);
}
