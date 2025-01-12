import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const LoginUser = ({ setDisplayName }) => {

    const [userLogin, setUserLogin] = useState({
        email: '',
        password: ''
    });

    const handleLogin = () => {

        if (!userLogin.email || !userLogin.password) {
            alert('Prosz� wype�ni� oba pola.');
            return;
        }

        const payload = {
            ...userLogin
        };

        axios.post('http://localhost:5176/api/Account/login', payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                const { displayName, token } = response.data;
                console.log("setDisplayName:", typeof setDisplayName);

                localStorage.setItem('token', token);
                localStorage.setItem('displayName', displayName);

                setDisplayName(displayName);

                alert('Zalogowano');
                setUserLogin({
                    email: '',
                    password: ''
                })
            })
            .catch (error => {
                if (error.response) {
                    console.error('B��d odpowiedzi z API:', error.response.data);
                    alert(`Nie uda�o si� zalogowa�: ${error.response.data}`);
                } else {
                    console.error('B��d sieci lub inny problem:', error.message);
                    alert('B��d sieci lub serwera.');
                }
            });
    }

    return (
        <div className="login">
            <h3>Zaloguj si�</h3>
            <div className="loginInputContainer">
                <input
                    className="loginInput"
                    type="text"
                    placeholder="Podaj E-Mail"
                    value={userLogin.email}
                    onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })}
                />
                <input
                    className="loginInput"
                    type="password"
                    placeholder="Podaj Has�o"
                    value={userLogin.password}
                    onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
                />
                <button className="loginButton" onClick={handleLogin}>
                    Zaloguj
                </button>
                <div className="registerLink">
                    <p>Nie masz konta? <Link to="/register">Stw�rz konto</Link></p>
                </div>
            </div>
        </div>
    );
}

export default LoginUser;