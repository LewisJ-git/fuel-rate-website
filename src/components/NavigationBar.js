import { Link } from "react-router-dom";

const NavigationBar = () => {
    return (
        <div>
            <h3>NavigationBar</h3>
            <ul>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/login'}>Login</Link></li>
                {/* add authorization when implementing backend */}
                                {/* |
                                    |
                                    v */}
                <li><Link to={'/history'}>Quote History</Link></li>
                <li><Link to={'/quote'}>Quote</Link></li>
                <li><Link to={'/profile'}>Profile</Link></li>
            </ul>
        </div>
  )
}

export default NavigationBar