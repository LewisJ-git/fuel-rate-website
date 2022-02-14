import { Link } from "react-router-dom";
import React from 'react';
import fuel from "../images/fuel.jpg";
import background from "../images/background.jpg"

const Home = () => {
    return (
        <div>
            <h3 style={{ color: 'red'}}>Welcome to Coogs Fuel</h3>
            <h4>Please login to get your competitive fuel quote!</h4>
            <img src={fuel}
            style = {{
                width: '400px',
                height: '400px',
                objectFit:  'cover'
            }} />
        </div>

    )
}

export default Home