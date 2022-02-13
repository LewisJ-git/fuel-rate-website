import { Fragment } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <div className="App">
    <header className="App-header">
        <NavigationBar />
        <Routes>
            <Fragment><Route path="/" element={<Home />} /></Fragment>
            <Fragment><Route path="/login" element={<Login />} /></Fragment>
        </Routes>
      </header>
    </div>
  );
}

export default App;
