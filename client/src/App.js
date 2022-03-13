import { Fragment, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import NavigationBar from "./components/NavigationBar";
import QuoteHistory from "./components/QuoteHistory";
import Quote from "./components/Quote";
import Client from "./components/Client";
import useToken from "./components/useToken";

function App() {
    const { token, setToken } = useToken();
    return (
        <div className="App">
        <header className="App-header">
            <NavigationBar isLogedIn={token}/>
            <Routes>
                <Fragment><Route path="/" element={<Home />} /></Fragment>
                <Fragment><Route path="/login" element={<Login setToken={setToken}/>} /></Fragment>
                {token &&
                    <Fragment><Route path="/history" element={<QuoteHistory />} /></Fragment>
                }
                {token &&
                    <Fragment><Route path="/quote" element={<Quote />} /></Fragment>
                }
                {token &&
                    <Fragment><Route path="/profile" element={<Client />} /></Fragment>
                }
            </Routes>
        </header>
        </div>
    );
}

export default App;
