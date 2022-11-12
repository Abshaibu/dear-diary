import {Link} from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function PageNotFound() {
    return (
        <>
            <Navbar />
            <main className="error--main">
                <h2 className="error--main__title">4<span className="dot">0</span>4</h2>
                <p className="error--main__text">The page you are looking for does not exist.</p>
                <Link to="/" className="error--main__link">Go back to home</Link>
            </main>
        </>
    )
}