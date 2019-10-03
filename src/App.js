import './App.css';
import React from 'react';
import Routes from "./routes";

import logo from "./assets/logo.svg";

export default function App()
{
    return (
        <div className="container">
            <img src={logo} alt="AirCnC"/>

            <div className="content">
                <Routes />
            </div>
        </div>
    );
}
