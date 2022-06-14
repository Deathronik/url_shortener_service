import React, {useCallback, useContext, useEffect, useState} from 'react';
import toast, {Toaster} from "react-hot-toast";
import Link from '../components/Link/Link'
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import {Spinner} from "react-bootstrap";

const ProfilePage = () => {
    const [links, setLinks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {jwt} = useContext(AuthContext)

    const getLinks = useCallback(async () => {
        try {
            setIsLoading(true)
            const response = await axios.get("https://url-shortener-by-deathronik.herokuapp.com/api/link", {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }
            })

            setLinks(response.data.links)
            setIsLoading(false)
        } catch (e) {
            toast.error(`Error code: ${e.response.status}. ${e.response.data.message}`, {position: "bottom-right"})
            setIsLoading(false)
        }
    }, [])


    useEffect(() => {
        getLinks()
    }, [])


    return (
        <div>
            <div><Toaster/></div>
            {isLoading && <Spinner animation="border" variant="primary"/>}
            {links.length === 0 && !isLoading &&
                <b className="justify-content-center align-content-center pt-lg-5">NO LINKS YET</b>}
            {links.length > 0 && !isLoading &&
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Short Link</th>
                        <th scope="col">Origin Link</th>
                        <th scope="col">Create Date</th>
                        <th scope="col">Clicks</th>
                    </tr>
                    </thead>
                    <tbody>
                    {links.map((link, index) => <Link key={link._id} from={link.from} to={link.to} clicks={link.clicks}
                                                      date={link.date} index={index + 1} toast={toast} id={link.code} getLinks={getLinks}/>)}
                    </tbody>
                </table>}
        </div>
    );
};

export default ProfilePage;