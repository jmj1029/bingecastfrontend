"use client";
import 'flowbite/dist/flowbite.css';
import { TextInput, Button } from 'flowbite-react';
import React from 'react';

function Login(props) {
    const [user, setUser] = React.useState({ email: "", password: "" });
    const [token, setToken] = React.useState(null);

    function set(fieldName) {
        return (ev) => {
            let user1 = Object.assign({}, user);
            user1[fieldName] = ev.target.value;
            setUser(user1);
        };
    }

    function login() {
        fetch("http://localhost:4000/api/session", {
            method: 'POST',
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify({ user: user }),
        }).then((resp) => {
            resp.json().then((data) => {
                console.log(data);
                setToken(data.token);
            });
        });
    }

    function checkToken() {
        fetch("http://localhost:4000/api/session", {
            method: 'GET',
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "x-auth": token,
            },
        }).then((resp) => {
            resp.json().then((data) => {
                console.log(data);
            });
        });
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <section className="bg-blue-600 text-white text-center py-20">
                <h1 className="text-5xl font-bold mb-4">Welcome to BingeCast</h1>
                <p className="text-2xl">Your favorite podcasts, all in one place.</p>
            </section>

            {/* Login Section */}
            <section className="flex flex-col items-center justify-center py-10 px-4">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full sm:w-96">
                    <p className="mb-4 text-gray-700">Token: {token}</p>
                    <TextInput
                        className="mb-4"
                        name="email"
                        value={user.email}
                        placeholder="Enter your email"
                        onChange={set("email")}
                    />
                    <TextInput
                        className="mb-4"
                        name="password"
                        value={user.password}
                        placeholder="Enter your password"
                        type="password"
                        onChange={set("password")}
                    />
                    <Button className="mb-2 w-full bg-blue-600 hover:bg-blue-700 transition-all" onClick={login}>
                        Login
                    </Button>
                    <Button className="w-full bg-gray-600 hover:bg-gray-700 transition-all" onClick={checkToken}>
                        Check Token
                    </Button>
                </div>
            </section>

            {/* Featured Episodes Section */}
            <section className="py-16 bg-gray-200">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-10">Featured Episodes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
                        {/* Episode 1 */}
                        <div className="bg-white rounded-lg shadow-lg p-6 transition-all hover:shadow-xl hover:scale-105">
                            <img src="/public/file.svg" alt="Podcast 1" className="mb-4 w-full h-48 object-cover rounded" />
                            <h3 className="text-2xl font-bold mb-2">Podcast Episode 1</h3>
                            <p className="text-gray-600">A short description of the first podcast episode.</p>
                        </div>
                        {/* Episode 2 */}
                        <div className="bg-white rounded-lg shadow-lg p-6 transition-all hover:shadow-xl hover:scale-105">
                            <img src="/public/file.svg" alt="Podcast 2" className="mb-4 w-full h-48 object-cover rounded" />
                            <h3 className="text-2xl font-bold mb-2">Podcast Episode 2</h3>
                            <p className="text-gray-600">A short description of the second podcast episode.</p>
                        </div>
                        {/* Episode 3 */}
                        <div className="bg-white rounded-lg shadow-lg p-6 transition-all hover:shadow-xl hover:scale-105">
                            <img src="/public/file.svg" alt="Podcast 3" className="mb-4 w-full h-48 object-cover rounded" />
                            <h3 className="text-2xl font-bold mb-2">Podcast Episode 3</h3>
                            <p className="text-gray-600">A short description of the third podcast episode.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto text-center">
                    <p className="text-xl mb-4">Follow us on social media</p>
                    <div className="flex justify-center space-x-4 mb-6">
                        <a href="#" className="hover:text-blue-400 transition-all">Twitter</a>
                        <a href="#" className="hover:text-blue-400 transition-all">Instagram</a>
                        <a href="#" className="hover:text-blue-400 transition-all">Facebook</a>
                    </div>
                    <p>&copy; 2024 BingeCast. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Login;

