import { Link } from "react-router-dom";

const NavigationBar = (props) => {
    return (
        <div className="NavBar">
            <ul>
                <Link to={'/'}><li>Home</li></Link>
                <Link to={'/login'} ><li>Login</li></Link>
                <Link to={props.isLogedIn ? '/history' : '/login'} ><li>Quote History</li></Link>
                <Link to={props.isLogedIn ? '/quote' : '/login'} ><li>Quote</li></Link>
                <Link to={props.isLogedIn ? '/profile' : '/login'} ><li>Profile</li></Link>
            </ul>
        </div>
    )
}

export default NavigationBar