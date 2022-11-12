import React from "react";
import { useState } from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { FiEye, FiEyeOff, FiLoader } from "react-icons/fi"
import Avatar1 from "../assets/one.jpg";
import Avatar2 from "../assets/two.jpg";
import Avatar3 from "../assets/three.png";


export default function CreateAccount() {
    const [showPassword, setShowPassword] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const navigate = useNavigate();
    const userAvatar = [Avatar1, Avatar2, Avatar3];

    //Submit form
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
        },

        //Form Validations
        validationSchema: Yup.object({
            username: Yup.string()
                .required("Username is required")
                .min(2, "Username must be at least 2 characters"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .required("Password is required")
                .min(8, "Password must be at least 8 characters")
        }),

        onSubmit: (values) => {
            localStorage.setItem("user", JSON.stringify(values));
            localStorage.setItem("Active", true);
            const defaultAvatar = userAvatar[Math.floor(Math.random() * userAvatar.length)];
            localStorage.setItem("avatar", defaultAvatar);
            setShowLoader(true)
            setTimeout(() => {
                setShowLoader(false)
                navigate("/my-diary")
            },3000)
        }
    })




    return (
            <main className="create--main">
                <div
                    onClick={e => e.stopPropagation()}
                    className="modal create-account">
                    <h2 className="modal--title">Create account</h2>
                    <div className="modal--content">
                        <p className="modal--content__text">sign up with</p>
                        <button className="modal--btn modal--btn__google">
                            <FaGoogle/>
                            <span>sign up with google</span>
                        </button>
                        <button className="modal--btn modal--btn__facebook">
                            <FaFacebook/>
                            <span>sign up with facebook</span>
                        </button>
                        <p className="modal--content__text">or proceed with email</p>
                        <form
                            onSubmit={formik.handleSubmit}
                            className="modal--form"
                            autoComplete="off">
                            <div className="form--input">
                                <input
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    className="modal--form__input"
                                />
                                <span className="form--error">
                                    {formik.touched.username && formik.errors.username ? formik.errors.username : ''}
                                </span>
                            </div>
                            <div className="form--input">
                                <input
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
                                    className="modal--form__input"
                                />
                                <span className="form--error">
                                    {formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                                </span>
                            </div>
                            <div className={`form--input ${formik.touched.password && formik.errors.password ? 'top' : ''}`}>
                                <input
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    className="modal--form__input"
                                />
                                {showPassword ? <FiEyeOff onClick={() => setShowPassword(false)}/> :
                                    <FiEye onClick={() => setShowPassword(true)}/>}
                                <span className="form--error">
                                    {formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                                </span>
                            </div>

                            <div className="form--input">
                                <button
                                    disabled={showLoader}
                                    className="modal--form__btn modal--btn">
                                    {showLoader ? <FiLoader className='spinner'/> : 'Create account'}
                                </button>
                            </div>
                        </form>
                        <div className="flex">
                            <Link
                                className="modal--forgot__password"
                                to="/sign-in">
                                Sign in instead?
                            </Link>
                            <Link
                                className="modal--forgot__password"
                                to="/">
                                Go back home
                            </Link>
                        </div>
                    </div>
                    <Outlet />
                </div>
            </main>
    )
}