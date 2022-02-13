import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <Link to={'/'}><h1>Home</h1></Link>
            <Link to={'/login'}>Login</Link>
        </div>
    )
}

export default Home