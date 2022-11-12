import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { FiLogOut, FiUser, FiBook } from 'react-icons/fi';
import {useState} from "react";

export default function Dropdown(props) {
    const navigate = useNavigate();
    const [active, setActive] = useState(props.active);

    return (
        <div ref={props.passref}
            className="dropdown">
                <Link to="/my-diary" className="dropdown--link">
                    <FiBook/> My Diary
                </Link>
                <Link to="/profile" className="dropdown--link">
                    <FiUser/> Profile
                </Link>
                <Link
                    to="/sign-in"
                    onClick={() => {
                        setActive(false);
                        localStorage.removeItem("Active")
                        navigate("/sign-in")
                    }}
                    className="dropdown--link">
                    <FiLogOut/> Logout
                </Link>
        </div>
    )
}