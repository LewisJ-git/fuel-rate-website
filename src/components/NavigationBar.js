import { Link } from "react-router-dom";

const NavigationBar = () => {
    return (
        <div className="NavBar">
            <ul>
                <Link to={'/'}><li>Home</li></Link>
                <Link to={'/login'}><li>Login</li></Link>
                {/* add authorization when implementing backend */}
                                {/* |
                                    |
                                    v */}
                <Link to={'/history'}><li>Quote History</li></Link>
                <Link to={'/quote'}><li>Quote</li></Link>
                <Link to={'/profile'}><li>Profile</li></Link>
            </ul>
        </div>
  )
}

export default NavigationBar