import React, {useEffect} from 'react'
import {FiEye, FiEyeOff, FiLoader} from 'react-icons/fi'
import {FaRegWindowClose} from 'react-icons/fa'
import {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";

export default function SettingsModal(props) {
    const userDetails = props.user
    const [showPassword, setShowPassword] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Escape') {
                event.preventDefault();
                props.setIsOpen();
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        // 👇️ clean up event listener
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    //Submit form
    const formik = useFormik({
        initialValues: {
            username: userDetails.username,
            email: userDetails.email,
            password: userDetails.password,
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
            setShowLoader(true)
            setTimeout(() => {
                props.setIsOpen(prevState => {
                    document.querySelector('body').style.overflow = prevState ?
                        'auto' : 'hidden';
                    return !prevState
                })
                setShowLoader(false)
            },3000)
        }
    })

    return (
        <section
            onClick={props.setIsOpen}
            className="settings--modal">
<div
    onClick={e => e.stopPropagation()}
    className="modal-wrapper">
    <FaRegWindowClose
        onClick={props.setIsOpen}
        className="close" />
    <form
        autoComplete={"off"}
        onSubmit={formik.handleSubmit}
        action="">
        <div className="profile--info">
            <div className="profile-input img-preview">
                <img
                    className="avatar-img"
                    src={props.avatar}
                    alt="picture of what you upload"
                />
            </div>
            <div>
                <input
                    name="image"
                    className="profile-file"
                    accept="image/*"
                    type="file"/>
            </div>
            <div className="profile--input">
                <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="username"
                    placeholder={'Username'}
                    className="profile-username"
                    type="text"
                    value={formik.values.username}
                />
                <span className="form--error">
                    {formik.touched.username && formik.errors.username ? formik.errors.username : ''}
                </span>
            </div>
            <div className="profile--input">
                <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="email"
                    placeholder={'Email'}
                    className="profile-username"
                    type="email"
                    value={formik.values.email}
                />
                <span className="form--error">
                    {formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                </span>
            </div>
            <div className={`profile--input ${formik.touched.password && formik.errors.password ? 'top' : ''}`}>
                <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="password"
                    placeholder={'Password'}
                    className="profile-username"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                />
                {showPassword ? <FiEyeOff onClick={() => setShowPassword(false)}/> :
                    <FiEye onClick={() => setShowPassword(true)}/>}
                <span className="form--error">
                    {formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                </span>
            </div>
            <div className="profile--input">
                <button
                    className="profile--btn">
                    {showLoader ? <FiLoader className='spinner--two'/> : 'Save' +
                        ' changes'}
                </button>
            </div>
        </div>
    </form>
</div>
        </section>
    )
}