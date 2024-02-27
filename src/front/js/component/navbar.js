import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const location = useLocation();

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React & Flask</span>
				</Link>
				<div className="ml-auto">
					<Link to="/private">
						<button className="btn btn-secondary me-4">
							View private messages
						</button>
					</Link>
					{!store.token ? (
						location.pathname === "/signup" ? (
							<Link to="/">
								<button className="btn btn-primary">
									Login
								</button>
							</Link>
						) : (
							<Link to="/signup">
								<button className="btn btn-primary">
									Sign Up
								</button>
							</Link>
						)
					) : (
						<Link to="/">
							<button
								onClick={() => actions.logout()}
								className="btn btn-primary">
								Logout
							</button>
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};
