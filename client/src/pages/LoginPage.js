import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import logo from "../img/url-shortener.png"
import toast, {Toaster} from "react-hot-toast";
import {AuthContext} from "../context/AuthContext";

const LoginPage = () => {
    const {login} = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onLoginHandler = async () => {
        try {
            const newObj = {email: email, password: password}
            const response = await axios.post('https://url-shortener-by-deathronik.herokuapp.com/api/auth/login', JSON.stringify(newObj), {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
                    'Content-Type': 'application/json'
                }
            })

            toast.success(`The user was successfully login`, {position: "bottom-right"})
            login(response.data.token, response.data.userId)
        } catch (e) {
            toast.error(`Error code: ${e.response.status}. ${e.response.data.message}`, {position: "bottom-right"})
        }
    }

    return (
        <div className="container">
            <div><Toaster/></div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center text-dark mt-5">Login Form</h2>
                    <div className="text-center mb-5 text-dark">Link Shortener Service</div>
                    <div className="card">

                        <div className="card-body bg-light p-lg-5">

                            <div className="text-center">
                                <img src={logo}
                                     className="img-fluid w-75 mb-5 profile-image-pic  rounded-circle my-3"
                                     width="200px" alt="profile"/>
                            </div>

                            <div className="mb-3">
                                <input value={email} onChange={(event) => setEmail(event.target.value)} type="text" className="form-control" id="email" aria-describedby="emailHelp"
                                       placeholder="Email"/>
                            </div>
                            <div className="mb-3">
                                <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="form-control" id="password" placeholder="Password"/>
                            </div>
                            <div onClick={onLoginHandler} className="text-center">
                                <button type="submit" className="btn btn-primary px-5 mb-5 w-100">Login</button>
                            </div>
                            <div id="emailHelp" className="form-text text-center mb-5 text-dark">Not
                                Registered? <Link to="/register" className="text-dark fw-bold"> Create an
                                    Account</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
);
};

export default LoginPage;