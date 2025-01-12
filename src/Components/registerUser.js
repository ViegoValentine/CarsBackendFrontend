import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
    const [userRegister, setUserRegister] = useState({
        email: "",
        password: "",
        userName: "",
        displayName: "",
    });

    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!userRegister.email || !userRegister.password || !userRegister.userName || !userRegister.displayName) {
            alert("Proszê wype³niæ wszystkie pola.");
            return;
        }

        try {
            const payload = {
                email: userRegister.email,
                password: userRegister.password,
                userName: userRegister.userName,
                displayName: userRegister.displayName,
            };

            const response = await axios.post("http://localhost:5176/api/Account/register", payload, {
                headers: { "Content-Type": "application/json" },
            });

            alert(`Konto zosta³o utworzone! Witaj, ${response.data.displayName}, proszê zaloguj siê.`);
            navigate("/login");

        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage(error.response.data);
            } else {
                setErrorMessage("Wyst¹pi³ b³¹d sieci lub serwera.");
            }
        }
    };

    return (
        <div className="register">
            <h3>Stwórz konto</h3>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <div className="registerInputContainer">
                <input
                    className="registerInput"
                    type="email"
                    placeholder="Podaj e-mail"
                    value={userRegister.email}
                    onChange={(e) => setUserRegister({ ...userRegister, email: e.target.value })}
                />
                <input
                    className="registerInput"
                    type="password"
                    placeholder="Podaj has³o"
                    value={userRegister.password}
                    onChange={(e) => setUserRegister({ ...userRegister, password: e.target.value })}
                />
                <input
                    className="registerInput"
                    type="text"
                    placeholder="Podaj nazwê u¿ytkownika"
                    value={userRegister.userName}
                    onChange={(e) => setUserRegister({ ...userRegister, userName: e.target.value })}
                />
                <input
                    className="registerInput"
                    type="text"
                    placeholder="Podaj nazwê wyœwietlan¹"
                    value={userRegister.displayName}
                    onChange={(e) => setUserRegister({ ...userRegister, displayName: e.target.value })}
                />
                <button className="registerButton" onClick={handleRegister}>
                    Stwórz konto
                </button>
            </div>
        </div>
    );
};

export default RegisterUser;
