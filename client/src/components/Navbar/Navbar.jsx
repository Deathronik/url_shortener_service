import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

const Navbar = () => {
    const {logout} = useContext(AuthContext)

    return (
        <nav className="navbar navbar-expand-lg navbar-dark d-none d-lg-block pt-0">
            <div className="container-fluid bg-primary p-2">
                <div className="d-flex container-fluid">
                    <span className="navbar-brand nav-link">
                        <strong>Link Shortener Service</strong>
                    </span>
                    <div className="collapse navbar-collapse" id="navbarExample01">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item active">
                                <Link to="/profile" className="nav-link" aria-current="page" href="#intro"><b>Profile</b></Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/create-link" className="nav-link"><b>Create Link</b></Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a onClick={logout} className="nav-link" href="#"><b>Logout</b></a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;