import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    function handleSubmit(e) {
        e.preventDefault();
        console.log(email);
    }

    function handleChange(e) {
        setEmail(e.target.value);
    }

    return (
        <main className="forgot--main">
                <div className="modal">
                    <h2 className="modal--title">Password reset</h2>
                    <div className="modal--content">
                        <p className="forgot--text">Please enter your registered email to proceed.</p>
                        <form
                            onSubmit={handleSubmit}
                            className="modal--form"
                            autoComplete="off">
                            <div className="form--input">
                                <input
                                    onChange={handleChange}
                                    type="email"
                                    required
                                    name="email"
                                    placeholder="Email address"
                                    className="modal--form__input"
                                    value={email}
                                />
                            </div>
                            <div className="form--input">
                                <button className="modal--form__btn modal--btn">Reset email</button>
                            </div>
                            <Link to="/" className="error--main__link">Go back to home</Link>
                        </form>
                    </div>
                </div>
        </main>
    )
}