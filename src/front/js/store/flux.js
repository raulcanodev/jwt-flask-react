const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white",
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white",
				},
			],
		},
		actions: {
			verifyIdentity: () => {
				const store = getStore();
				const token = localStorage.getItem("token");

				fetch("http://127.0.0.1:3001/api/verify_token", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + token, // Se agregó un espacio después de "Bearer"
					},
				})
					.then((resp) => resp.json())
					.then((data) => {
						if (data && data.user) {
							setStore({ user: data.user, token: token });
						}
					})
					.catch((e) => {
						console.error(e);
					});
			},

			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				if (token && token != "" && token != undefined)
					setStore({ token: token });
			},
			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Login out");
				setStore({ token: null });
			},
			signup: async (email, password) => {
				try {
					const opts = {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email: email,
							password: password,
						}),
					};
					const resp = await fetch(
						"http://127.0.0.1:3001/api/signup",
						opts
					);
					if (resp.status === 200) {
						const data = await resp.json();
						console.log("This came from the backend", data);
					}
				} catch (error) {
					console.error("There was an error", error);
				}
			},
			login: async (email, password) => {
				try {
					const opts = {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email: email,
							password: password,
						}),
					};
					const resp = await fetch(
						"http://127.0.0.1:3001/api/token",
						opts
					);
					if (resp.status === 200) {
						const data = await resp.json();
						console.log("This came from the backend", data);

						// Añadimos el token al storage del usuario para poder identificarlo
						sessionStorage.setItem("token", data.access_token);
						setStore({ token: data.access_token });
					} else {
						console.log("Error fetch");
					}
				} catch (error) {
					console.error("There was an error", error);
				}
			},
			accessPrivate: async () => {
				const token = localStorage.getItem("token");

				const resp = await fetch("http://localhost:3001/api/private", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + token,
					},
				});
				if (!resp.ok) {
					throw Error("There was a error woth the login request");
				} else if (resp.status === 403) {
					throw Error("Missing or invalid token");
				} else {
					throw Error("Unknown error");
				}

				const data = await resp.json();
				console.log("This is the data request", data);
				return data;
			},
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				const store = getStore();
				const opts = {
					headers: {
						Authorization: "Bearer" + store.token,
					},
				};
				try {
					// fetching data from the backend
					const resp = await fetch(
						process.env.BACKEND_URL + "/api/hello",
						opts
					);
					const data = await resp.json();
					setStore({ message: data.message });
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
		},
	};
};

export default getState;
