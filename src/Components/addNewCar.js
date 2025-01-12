import { useState } from 'react';
import axios from 'axios';

const AddCar = () => {

    const [newCar, setNewCar] = useState({
        brand: 'Marka',
        model: 'Model',
        doorsNumber: 5,
        luggageCapacity: 4000,
        engineCapacity: 1400,
        fuelType: 1,
        productionDate: '01-01-2024',
        carFuelConsumption: 7,
        bodyType: 1,
    });

    const addNewCar = () => {
        if (newCar.doorsNumber < 2 || newCar.doorsNumber > 10) {
            alert('Liczba drzwi musi być między 2 a 10.');
            return;
        }
        if (
            newCar.luggageCapacity < 1 ||
            newCar.engineCapacity < 1 ||
            newCar.carFuelConsumption < 1
        ) {
            alert('Wartoœci liczbowe muszą być większe lub równe 1.');
            return;
        }

        const payload = {
            ...newCar,
            fuelType: newCar.fuelType,
            bodyType: newCar.bodyType,
        };

        axios.post('http://localhost:5176/api/Cars', payload)
            .then(() => {
                alert('Nowy samochód został dodany!');
                setNewCar({
                    brand: 'Marka',
                    model: 'Model',
                    doorsNumber: 2,
                    luggageCapacity: 1,
                    engineCapacity: 1,
                    fuelType: 1,
                    productionDate: '',
                    carFuelConsumption: 1,
                    bodyType: 1,
                });
            })
            .catch(error => {
                console.error('Błąd podczas dodawania samochodu:', error);
                alert('Nie udało się dodać nowego samochodu.');
            });
    };


    return (
        <div className="addCarForm">
            <h2>Dodaj nowy samochód</h2>
            <table className="addCarTable">
                <tbody>
                    <tr>
                        <td><label>Marka samochodu (np. Toyota, Ford):</label></td>
                        <td>
                            <input
                                type="text"
                                value={newCar.brand}
                                onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label>Model samochodu (np. Corolla, Focus):</label></td>
                        <td>
                            <input
                                type="text"
                                value={newCar.model}
                                onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label>Liczba drzwi (liczba całkowita):</label></td>
                        <td>
                            <input
                                type="number"
                                min="2"
                                max="10"
                                value={newCar.doorsNumber}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (value >= 2 && value <= 10) {
                                        setNewCar({ ...newCar, doorsNumber: value });
                                    } else {
                                        alert('Liczba drzwi musi byæ miêdzy 2 a 10.');
                                    }
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label>Pojemność bagażnika (w litrach):</label></td>
                        <td>
                            <input
                                type="number"
                                min="1"
                                value={newCar.luggageCapacity}
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    if (value >= 1) {
                                        setNewCar({ ...newCar, luggageCapacity: value });
                                    } else {
                                        alert('Wartość pojemności bagażnika musi być większa lub równa 1.');
                                    }
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label>Pojemność silnika (w litrach, np. 1.6, 2.0):</label></td>
                        <td>
                            <input
                                type="number"
                                min="1"
                                value={newCar.engineCapacity}
                                onChange={(e) => setNewCar({ ...newCar, engineCapacity: parseFloat(e.target.value) })}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label>Rodzaj paliwa (wybierz z listy):</label></td>
                        <td>
                            <select
                                value={newCar.fuelType}
                                onChange={(e) => setNewCar({ ...newCar, fuelType: parseInt(e.target.value) })}
                            >
                                <option value="1">Petrol</option>
                                <option value="2">Hybrid</option>
                                <option value="3">Diesel</option>
                                <option value="4">LPG</option>
                                <option value="5">Electric</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><label>Data produkcji:</label></td>
                        <td>
                            <input
                                type="date"
                                value={newCar.productionDate}
                                onChange={(e) => setNewCar({ ...newCar, productionDate: e.target.value })}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label>Spalanie (l/100km):</label></td>
                        <td>
                            <input
                                type="number"
                                defaultValue="1"
                                value={newCar.carFuelConsumption}
                                onChange={(e) => setNewCar({ ...newCar, carFuelConsumption: parseFloat(e.target.value) })}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label>Typ nadwozia (wybierz z listy):</label></td>
                        <td>
                            <select
                                value={newCar.bodyType}
                                onChange={(e) => setNewCar({ ...newCar, bodyType: parseInt(e.target.value) })}
                            >
                                <option value="1">Hatchback</option>
                                <option value="2">Sedan</option>
                                <option value="3">Combi</option>
                                <option value="4">SUV</option>
                                <option value="5">Roadster</option>
                                <option value="6">Coupe</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button className="addCarButton buttonsCss" onClick={addNewCar}>Dodaj samochód</button>
        </div>
    );
};

export default AddCar;