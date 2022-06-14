import React, {useContext, useState} from 'react';
import toast, {Toaster} from "react-hot-toast";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";

const CreatePage = () => {
    const [link, setLink] = useState("")
    const {jwt} = useContext(AuthContext)

    const onCreateHandler = async () => {
        try {
            const response = await axios.post("https://url-shortener-by-deathronik.herokuapp.com/api/link/create", JSON.stringify({link: link}), {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }
            })

            setLink("")
            toast.success(`${response.data.message}`, {position: "bottom-right"})
        } catch (e) {
            toast.error(`Error code: ${e.response.status}. ${e.response.data.message}`, {position: "bottom-right"})
        }
    }

    return (
        <div className="container">
            <div><Toaster/></div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center text-dark mt-5">Create Short Link Form</h2>
                    <div className="text-center mb-5 text-dark">Link Shortener Service</div>
                    <div className="card">

                        <div className="card-body bg-light p-lg-5">
                            <div className="mb-3">
                                <input value={link} onChange={(event) => setLink(event.target.value)} type="text"
                                       className="form-control" id="link" aria-describedby="linkHelp"
                                       placeholder="Paste your link here"/>
                            </div>
                            <div className="text-center">
                                <button onClick={onCreateHandler} type="submit"
                                        className="btn btn-primary px-5 mb-0 w-100">Create Short Link
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CreatePage;