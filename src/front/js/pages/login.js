import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleClick = (event) => {
		event.preventDefault();
		actions.login(email, password).then(() => {
			navigate("/");
		});
		setEmail("");
		setPassword("");
	};

	// sessionStorage.removeItem("token")

	return (
		<div className="w-50 m-auto mt-5">
			<div className="alert alert-info text-center">
				{store.message || "Backend not conected"}
			</div>
			<h1 className="text-center">Login (Flask API & React)</h1>

			<div className="d-flex justify-content-center mb-5 mt-5">
				{store.token && store.token != undefined ? (
					"You are logged in"
				) : (
					<form onSubmit={handleClick}>
						<div className="form-group mb-2">
							<label className="" for="exampleInputEmail1">
								Email address
							</label>
							<input
								type="email"
								className="form-control"
								id="exampleInputEmail1"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="form-group mb-2">
							<label for="exampleInputPassword1">Password</label>
							<input
								type="password"
								className="form-control"
								id="exampleInputPassword1"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<button type="submit" className="btn btn-primary">
							Login
						</button>
					</form>
				)}
			</div>
		</div>
	);
};
