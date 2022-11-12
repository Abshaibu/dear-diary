import React, {useRef, useState} from "react";
import { Outlet,Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { CSSTransition } from "react-transition-group";

export default function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const nodeRef = useRef(null)
    const user = JSON.parse(localStorage.getItem("user"))
    const active = localStorage.getItem("Active")
    const userAvatar = localStorage.getItem("avatar")

    return (
        <header>
            <Link to="/" className="logo--link">
                <h3 className="navbar--logo">Y<span className="dot">dd</span></h3>
            </Link>
            <nav className="navbar">
                { !active && <Link to="/create-account" className='home--btn to-dashboard-btn'>
                        sign up
                    </Link>
                }
                {
                    active ? <button
                        onClick={() => {
                            setShowDropdown( prevState => !prevState);
                        }}
                            className='home--btn_user'>
                        <span className="user--img">
                            <img src={userAvatar} alt={"user avatar"}/>
                        </span>
                            {user.username.length > 4 ? user.username.slice(0, 4) : user.username}
                    </button> :
                        <Link
                            to="/sign-in"
                            className='home--btn to-dashboard-btn sign-in-btn'
                        >
                            sign in
                        </Link>
                }
                <CSSTransition
                    in={showDropdown}
                    timeout={250}
                    nodeRef={nodeRef}
                    classNames="dropdown"
                >
                    <Dropdown
                        active={active}
                        dropdown={showDropdown}
                        passref={nodeRef}
                    />
                </CSSTransition>
            </nav>
            <Outlet />
        </header>
    )
}