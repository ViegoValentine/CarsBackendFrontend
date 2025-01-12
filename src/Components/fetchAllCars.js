import { useState, useEffect } from 'react';
import axios from 'axios';
import deleteCar from './deleteCar';

const FetchAllCars = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetchAllCars();
    }, []);

    const [editedCar, setEditedCar] = useState(null);

    const startEditingCar = (car) => {
        setEditedCar({ ...car });
    };

    const saveEditedCar = () => {
        const token = localStorage.getItem('token');
        axios.put(`http://localhost:5176/api/Cars/${editedCar.id}`, editedCar, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(() => {
                alert('Samochód zosta³ zaktualizowany!');
                setEditedCar(null);
                fetchAllCars();
            })
            .catch(error => {
                console.error('B³¹d podczas aktualizacji samochodu:', error);
                alert('Nie uda³o siê zaktualizowaæ samochodu.');
            });
    };

    const fetchAllCars = () => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:5176/api/Cars', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                setCars(response.data);
            })
            .catch(error => {
                console.error('Błąd podczas pobierania danych:', error);
            });
    };

    return (
        <div className="allCars">
            <h1>Lista Samochodów</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Marka</th>
                        <th>Model</th>
                        <th>Liczba Drzwi</th>
                        <th>Pojemność Bagażnika</th>
                        <th>Pojemność Silnika</th>
                        <th>Rodzaj Paliwa</th>
                        <th>Data Produkcji</th>
                        <th>Spalanie</th>
                        <th>Typ Nadwozia</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car) => (
                        <>
                            <tr key={car.id}>
                                <td>{car.brand}</td>
                                <td>{car.model}</td>
                                <td>{car.doorsNumber}</td>
                                <td>{car.luggageCapacity} L</td>
                                <td>{car.engineCapacity} L</td>
                                <td>{getFuelType(car.fuelType)}</td>
                                <td>{new Date(car.productionDate).toLocaleDateString()}</td>
                                <td>{car.carFuelConsumption} L/100km</td>
                                <td>{getBodyType(car.bodyType)}</td>
                                <td>
                                    <button onClick={() => startEditingCar(car)}>Edytuj</button>
                                    <button onClick={() => deleteCar(car.id, fetchAllCars)}>Usuń</button>
                                </td>
                            </tr>
                            {editedCar && editedCar.id === car.id && (
                                <tr>
                                    <td>
                                        <input
                                            type="text"
                                            value={editedCar.brand}
                                            onChange={(e) =>
                                                setEditedCar({ ...editedCar, brand: e.target.value })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editedCar.model}
                                            onChange={(e) =>
                                                setEditedCar({ ...editedCar, model: e.target.value })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            min="2"
                                            max="10"
                                            value={editedCar.doorsNumber}
                                            onChange={(e) =>
                                                setEditedCar({
                                                    ...editedCar,
                                                    doorsNumber: parseInt(e.target.value, 10),
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            value={editedCar.luggageCapacity}
                                            onChange={(e) =>
                                                setEditedCar({
                                                    ...editedCar,
                                                    luggageCapacity: parseFloat(e.target.value),
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            value={editedCar.engineCapacity}
                                            onChange={(e) =>
                                                setEditedCar({
                                                    ...editedCar,
                                                    engineCapacity: parseFloat(e.target.value),
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <select
                                            value={editedCar.fuelType}
                                            onChange={(e) =>
                                                setEditedCar({
                                                    ...editedCar,
                                                    fuelType: parseInt(e.target.value, 10),
                                                })
                                            }
                                        >
                                            <option value="1">Petrol</option>
                                            <option value="2">Hybrid</option>
                                            <option value="3">Diesel</option>
                                            <option value="4">LPG</option>
                                            <option value="5">Electric</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            value={editedCar.productionDate}
                                            onChange={(e) =>
                                                setEditedCar({
                                                    ...editedCar,
                                                    productionDate: e.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            value={editedCar.carFuelConsumption}
                                            onChange={(e) =>
                                                setEditedCar({
                                                    ...editedCar,
                                                    carFuelConsumption: parseFloat(e.target.value),
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <select
                                            value={editedCar.bodyType}
                                            onChange={(e) =>
                                                setEditedCar({
                                                    ...editedCar,
                                                    bodyType: parseInt(e.target.value, 10),
                                                })
                                            }
                                        >
                                            <option value="1">Hatchback</option>
                                            <option value="2">Sedan</option>
                                            <option value="3">Combi</option>
                                            <option value="4">SUV</option>
                                            <option value="5">Roadster</option>
                                            <option value="6">Coupe</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={saveEditedCar}>Zapisz</button>
                                        <button onClick={() => setEditedCar(null)}>Anuluj</button>
                                    </td>
                                </tr>
                            )}
                        </>
                    ))}
                </tbody>
            </table>
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

export default FetchAllCars;