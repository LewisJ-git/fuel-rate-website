import { Fragment } from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import NavigationBar from "./components/NavigationBar";
import QuoteHistory from "./components/QuoteHistory";

function App() {
  return (
    <div className="App">
    <header className="App-header">
        <NavigationBar />
        <Routes>
            <Fragment><Route path="/" element={<Home />} /></Fragment>
            <Fragment><Route path="/login" element={<Login />} /></Fragment>
            <Fragment><Route path="/history" element={<QuoteHistory />} /></Fragment>
        </Routes>
      </header>
    </div>
  );
}

export default App;
