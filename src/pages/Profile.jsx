import React from 'react'
import Navbar  from "../components/Navbar.jsx"
import SettingsModal from "../components/SettingsModal.jsx"


export default  function Profile() {
    const user = JSON.parse(localStorage.getItem("user"))
    const notes = JSON.parse(localStorage.getItem("notes"))
    const userAvatar = localStorage.getItem("avatar")
    let lastEdit = new Date().toLocaleString()
    const [isOpen, setIsOpen] = React.useState(false)
    function toggleModal() {
        setIsOpen(prevState => {
            document.querySelector('body').style.overflow = prevState ?
                'auto' : 'hidden';
            return !prevState
        })
    }



    return (
        <>
            <Navbar />
            {isOpen && <SettingsModal avatar={userAvatar} user={user} setIsOpen={toggleModal}/>}
            <main className="profile">
                <h2 className="profile--title">Profile</h2>
                <section className="profile--content">
<div className="profile--img__wrapper">
    <img
        src={userAvatar}
        alt="placeholder image for user image"
        className="profile--img"
    />
</div>
                    <div className="profile--info">
                        <div className="profile--input">
                            <input
                                disabled
                                className="profile-username"
                                type="text"
                                value={user.username}
                            />
                        </div>
                        <div className="profile--input">
                            <input
                                disabled
                                className="profile-username"
                                type="email"
                                value={user.email}
                            />
                        </div>
                        <div className="profile--input">
                            <input
                                disabled
                                className="profile-username"
                                type="password"
                                value={user.password}
                            />
                        </div>
                        <div className="profile--input">
                            <button
                                onClick={toggleModal}
                                className="profile--btn">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                    <div className="profile--stats">
                        <h3 className="profile--stat__header">Items in Diary</h3>
                        <p className="stat">{notes && notes.length > 0 ? notes.length : 'You' +
                            ' have not talked to your diary yet'}</p>
                        <h3 className="profile--stat__header">Last Changes</h3>
                        <p className="stat">{ lastEdit ? lastEdit : 'No' +
                            ' Changes Yet'}</p>
                    </div>
                </section>
            </main>
        </>
    )
}
