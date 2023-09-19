/*
Efi Tzaig, 315852160
Yael Levi, 207196205
*/

import React from 'react';
import './App.css';
import Table from "./components/Table/Table";
import logo from './assets/title_logo.png';

function App() {
    return (
        <div className="app-container">
            <div className="app-header">
                <img src={logo} className="app-logo" />
                <h1 className="app-title">Costs Manager App</h1>
            </div>
            <div>
                <Table />
            </div>
        </div>
    );
}

export default App;