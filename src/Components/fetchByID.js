import { useState } from 'react';
import axios from 'axios';

const FetchByID = () => {
    const [car, setCar] = useState(null);
    const [carId, setCarId] = useState('');

    const [errorMessage, setErrorMessage] = useState("");

    const handleSearch = () => {
        if (!carId.trim()) {
            setErrorMessage("Pole wyszukiwania jest puste.");
            return;
        }

        setErrorMessage("");
        fetchCarById();
    };

    const fetchCarById = () => {
        setCar(null);
        axios.get(`http://localhost:5176/api/cars/${carId}`)
            .then(response => {
                setCar(response.data);
            })
            .catch(() => {
                console.error('Nie znaleziono samochodu o podanym ID.');
            });
    };

    return (
        <div className="searchCar">
            <h2>Wyszukaj samochód po ID</h2>
            <div className="searchInputContainer">
                <input
                    className="searchInput"
                    type="text"
                    placeholder="Wprowadź ID samochodu"
                    value={carId}
                    onChange={(e) => setCarId(e.target.value)}
                />
                <button className="searchButton" onClick={handleSearch}>
                    Szukaj
                </button>
            </div>

            <div className="carDetails">
                {errorMessage ? (
                    <p className="error">{errorMessage}</p>
                ) : car ? (
                    <div className="oneCar">
                        <h3>Dane Samochodu</h3>
                        <table className="carDetailsTable">
                            <tbody>
                                <tr>
                                    <td><strong>Marka:</strong></td>
                                    <td>{car.brand}</td>
                                </tr>
                                <tr>
                                    <td><strong>Model:</strong></td>
                                    <td>{car.model}</td>
                                </tr>
                                <tr>
                                    <td><strong>Liczba Drzwi:</strong></td>
                                    <td>{car.doorsNumber}</td>
                                </tr>
                                <tr>
                                    <td><strong>Pojemność Bagażnika:</strong></td>
                                    <td>{car.luggageCapacity} L</td>
                                </tr>
                                <tr>
                                    <td><strong>Pojemność Silnika:</strong></td>
                                    <td>{car.engineCapacity} L</td>
                                </tr>
                                <tr>
                                    <td><strong>Rodzaj Paliwa:</strong></td>
                                    <td>{getFuelType(car.fuelType)}</td>
                                </tr>
                                <tr>
                                    <td><strong>Data Produkcji:</strong></td>
                                    <td>{new Date(car.productionDate).toLocaleDateString()}</td>
                                </tr>
                                <tr>
                                    <td><strong>Spalanie:</strong></td>
                                    <td>{car.carFuelConsumption} L/100km</td>
                                </tr>
                                <tr>
                                    <td><strong>Typ Nadwozia:</strong></td>
                                    <td>{getBodyType(car.bodyType)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>Brak wyników do wyświetlenia.</p>
                )}
            </div>
        </div>
    );
};

const getFuelType = (fuelType) => {
    switch (fuelType) {
        case 1: return 'Petrol';
        case 2: return 'Hybrid';
        case 3: return 'Diesel';
        case 4: return "LPG";
        case 5: return 'Electric';
        default: return 'Inny';
    }
};

const getBodyType = (bodyType) => {
    switch (bodyType) {
        case 1: return 'Hatchback';
        case 2: return 'Sedan';
        case 3: return 'Combi';
        case 4: return 'SUV';
        case 5: return 'Roadster';
        case 6: return 'Coupe';
        default: return 'Inny';
    }
};

export default FetchByID;