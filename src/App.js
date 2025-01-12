import { React, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddCar from './Components/addNewCar';
import FetchByID from './Components/fetchByID';
import FetchAllCars from './Components/fetchAllCars';
import Login from './Components/loginUser';
import Register from './Components/registerUser';
import './App.css';

const App = () => {

    const [displayName, setDisplayName] = useState(localStorage.getItem('displayName') || '');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('displayName');
        setDisplayName('');
        alert('Wylogowano');
    };

    return (
        <Router>
            <nav className="navbar">
                <ul>
                    <li>
                        <Link to="/">Strona Główna</Link>
                    </li>
                    <li>
                        <Link to="/search">Wyszukaj</Link>
                    </li>
                    <li>
                        <Link to="/add">Dodaj</Link>
                    </li>
                    {displayName ? (
                        <>
                            <li>
                                <span>Witaj, {displayName}</span>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="logoutButton">
                                    Wyloguj
                                </button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/login">Logowanie</Link>
                        </li>
                    )}
                </ul>
            </nav>

            <div className="content">
                <Routes>
                    <Route path="/" element={<FetchAllCars />} />
                    <Route path="/search" element={<FetchByID />} />
                    <Route path="/add" element={<AddCar />} />
                    <Route path="/login" element={<Login setDisplayName={setDisplayName} />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;