
"use client"
import 'flowbite/dist/flowbite.css';
import { TextInput, Button } from 'flowbite-react';
import React from 'react';


function Login(props){
	const [user, setUser] = React.useState({email: "", password: ""});
	const [token, setToken] = React.useState(null);
 
	function set(fieldName){
		return (ev) => {
			let user1 = Object.assign({}, user);
			user1[fieldName] = ev.target.value;
			setUser(user1);
		};
	}
 
	function login(){
		fetch("http://localhost:4000/api/session", {
			method: 'POST',
			headers : {
				"accept": "application/json",
				"content-type": "application/json",
			},
			body: JSON.stringify({user: user}),
		}).then((resp)=> {
			resp.json().then((data) => {
				console.log(data);
				setToken(data.token);
			});
		});
	}
 
	function checkToken(){
		fetch("http://localhost:4000/api/session", {
			method: 'GET',
			headers : {
				"accept": "application/json",
				"content-type": "application/json",
				"x-auth" : token,
			},
 
		}).then((resp)=> {
			resp.json().then((data) => {
				console.log(data);
			});
		});
	}
	return(
		<div>
			<p> Token : {token}</p>
			<TextInput name="email" value={user.email} onChange={set("email")} />
			<TextInput name="password" value={user.password} onChange={set("password")}/>
			<Button onClick={login}>Login</Button>
			<Button onClick={checkToken}>Check Token</Button>
		</div>
	);
}

export default Login;