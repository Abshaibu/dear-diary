import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

export default function Home() {
    const active = JSON.parse(localStorage.getItem("Active"));

    return (
        <>
            <Navbar />
            <main>
                <h1>
                    your digital diary<span className="dot">.</span> <br/>
                    anywhere, anytime<span className="dot">.</span>
                </h1>
                <p className="home--texts">
                    Bring your thoughts, memory, and experiences, anywhere and everywhere you go
                    and access them on any device. Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit. Ipsam laboriosam magni nulla omnis possimus quod ullam! Autem, cupiditate dolorem
                    dolores earum enim facilis fugiat, id in nemo odit possimus quos recusandae repellat,
                    soluta tenetur? Aliquid consequatur cumque doloremque, dolores exercitationem facilis
                    impedit in, iusto natus quisquam reiciendis ullam velit, vero!
                </p>
                { active ? <Link
                        to="/my-diary"
                        className='home--btn to-dashboard-btn'
                    >
                        get started
                    </Link> :
                    <Link
                        to="/sign-in"
                        className='home--btn to-dashboard-btn'
                    >
                        get started
                    </Link>
                }
            </main>
        </>
    )
}