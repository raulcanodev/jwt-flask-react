import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Verificar que las contraseñas coincidan
		if (formData.email === "") {
			alert("Establece tu email");
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			alert("Las contraseñas no coinciden");
			return;
		}

		actions.signup(formData.email, formData.password, navigate);

		// Aquí puedes enviar los datos del formulario al servidor
		console.log("Datos del formulario:", formData);
	};

	return (
		<div className="w-25 m-auto mt-5 mb-5">
			<form className="form-group" onSubmit={handleSubmit}>
				<div className="form-group mb-3">
					<label htmlFor="exampleInputEmail1">Email address</label>
					<input
						type="email"
						className="form-control"
						id="exampleInputEmail1"
						name="email"
						placeholder="Email"
						value={formData.email}
						onChange={handleChange}
					/>
				</div>
				<div className="form-group mb-3">
					<label htmlFor="exampleInputPassword1">Password</label>
					<input
						type="password"
						className="form-control"
						id="exampleInputPassword1"
						name="password"
						placeholder="Password"
						value={formData.password}
						onChange={handleChange}
					/>
				</div>
				<div className="form-group mb-3">
					<label htmlFor="exampleInputConfirmPassword1">
						Confirm Password
					</label>
					<input
						type="password"
						className="form-control"
						id="exampleInputConfirmPassword1"
						name="confirmPassword"
						placeholder="Confirm Password"
						value={formData.confirmPassword}
						onChange={handleChange}
					/>
				</div>
				<button type="submit" className="btn btn-primary mt-2">
					Register
				</button>
			</form>
		</div>
	);
};
