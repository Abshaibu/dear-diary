import React from "react";
import { useState } from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Link, Outlet, useNavigate} from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import {FiEye, FiEyeOff, FiLoader} from "react-icons/fi";


export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    //Submit form
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        //Form Validations
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .required("Password is required")
                .min(8, "Password must be at least 8 characters")
        }),

        onSubmit: (values) => {
            const user = localStorage.getItem('user')
            if(user.email === values.email && user.password === values.password) {
                localStorage.setItem("Active", true);
                setShowLoader(true)
                setTimeout(() => {
                    setShowLoader(false)
                    navigate("/my-diary")
                }, 3000)
            } else {
                setShowLoader(true)
                setTimeout(() => {
                    setShowLoader(false)
                    setError(true)
                }, 3000)
            }
        }
    })

    function handleFocus () {
        setError(false)
    }


    return (
        <main className="create--main">
            <div
                onClick={e => e.stopPropagation()}
                className="modal create-account">
                <h2 className="modal--title">Sign in to Y<span className="dot">DD</span></h2>
                <div className="modal--content">
                    <p className="modal--content__text">sign in with</p>
                    <button className="modal--btn modal--btn__google">
                        <FaGoogle/>
                        <span>sign in with google</span>
                    </button>
                    <button className="modal--btn modal--btn__facebook">
                        <FaFacebook/>
                        <span>sign in with facebook</span>
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
                                onFocus={handleFocus}
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
                        <div className={`form--input ${formik.touched.password && formik.errors.password ? 'top' : ''}
                        ${error ? 'error-top' : ''}`}>
                            <input
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                onFocus={handleFocus}
                                value={formik.values.password}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                className="modal--form__input"
                            />
                            {showPassword ? <FiEyeOff onClick={() => setShowPassword(false)}/> :
                                <FiEye onClick={() => setShowPassword(true)}/>}
                            <span className="form--error">
                                 {error ? 'Incorrect email or password' : ''}
                                {formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                                </span>
                        </div>
                        <Link
                            className="modal--forgot__password"
                            to="/create-account">
                            Create an account instead?
                        </Link>
                        <Link
                            className="modal--forgot__password"
                            to="/forgot-password">
                            forgot password?
                        </Link>
                        <div className="form--input">
                            <button
                                className="modal--form__btn modal--btn">
                                {showLoader ? <FiLoader className='spinner'/> : 'Sign in'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Outlet />
        </main>
    )
}