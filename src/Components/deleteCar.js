import axios from 'axios';

const deleteCar = (id, fetchAllCars) => {
    axios.delete(`http://localhost:5176/api/cars/${id}`)
        .then(() => {
            alert(`Samochód o ID ${id} został usunięty.`);
            if (fetchAllCars) {
                fetchAllCars(); // Odśwież listę samochodów po usunięciu.
            }
        })
        .catch(error => {
            console.error('Błąd podczas usuwania samochodu:', error);
            alert('Nie udało się usunąć samochodu.');
        });
};

export default deleteCar;