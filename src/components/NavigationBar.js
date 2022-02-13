import { Link } from "react-router-dom";

const NavigationBar = () => {
    return (
        <div>
            <h3>NavigationBar</h3>
            <ul>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/login'}>Login</Link></li>
            </ul>
        </div>
  )
}

export default NavigationBar