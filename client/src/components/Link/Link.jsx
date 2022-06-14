import React, {useContext} from 'react';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

const Link = ({index, from, to, date, clicks, toast, id, getLinks}) => {
    const {jwt} = useContext(AuthContext)

    const onShortClickHandler = () => {
        navigator.clipboard.writeText(from)
        toast.success("Short link copied to clipboard", {position: "bottom-right"})
    }

    const onDeleteClickHandler = async () => {
        try {
            const response = await axios.delete(`https://url-shortener-by-deathronik.herokuapp.com/api/link/${id}`, {headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
                    'Authorization': `Bearer ${jwt}`
                }})

            getLinks()
            toast.success(`${response.data.message}`, {position: "bottom-right"})
        } catch (e) {
            toast.error(`Error code: ${e.response.status}. ${e.response.data.message}`, {position: "bottom-right"})
        }
    }

    return (
        <tr>
            <th scope="row" className="pt-3">{index}</th>
            <td><a onClick={onShortClickHandler} href="#" className="nav-link">{from}</a></td>
            <td><a className="nav-link" target="_blank" href={to}>{to}</a></td>
            <td className="text-center pt-3">{new Date(date).toLocaleString()}</td>
            <td className="pt-3">{clicks}</td>
            <td>
                <button onClick={onShortClickHandler} className="btn btn-primary">Copy</button>
                <button onClick={onDeleteClickHandler} className="ms-3 btn btn-danger">Delete</button>
            </td>
        </tr>
    );
};

export default Link;