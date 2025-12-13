import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const CardVehicle = ({ vehicle }) => {
    const { store, dispatch } = useGlobalReducer();
    const isFavorite = store.favorites.some(fav => fav.type === 'vehicle' && fav.id === vehicle.uid);

    const toggleFavorite = (e) => {
        e.preventDefault();
        if (isFavorite) {
            dispatch({ type: 'REMOVE_FAVORITE', payload: { type: 'vehicle', id: vehicle.uid } });
        } else {
            dispatch({
                type: 'ADD_FAVORITE',
                payload: {
                    type: 'vehicle',
                    id: vehicle.uid,
                    name: vehicle.properties?.name,
                    image: vehicle.image || vehicle.properties?.image // 👈
                }
            });
        }
    };

    return (
        <div className="card h-100 shadow-sm">
            <img
                src={vehicle.image || vehicle.properties?.image} // 👈
                className="card-img-top"
                alt={vehicle.properties?.name}
                onError={(e) => {
                    e.target.src = 'https://dummyimage.com/400x300/cccccc/000000?text=No+Image';
                }}
            />
            <div className="card-body">
                <h5 className="card-title">{vehicle.properties?.name}</h5>
                <p className="card-text small">
                    <strong>Model:</strong> {vehicle.properties?.model}<br />
                    <strong>Class:</strong> {vehicle.properties?.vehicle_class}<br />
                    <strong>Passengers:</strong> {vehicle.properties?.passengers}
                </p>
            </div>
            <div className="card-footer bg-white">
                <Link to={`/vehicle/${vehicle.uid}`} className="btn btn-sm btn-primary w-100 mb-2">
                    <i className="fas fa-eye"></i> Learn More
                </Link>
                <button onClick={toggleFavorite} className={`btn btn-sm w-100 ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}>
                    <i className={`fas fa-heart${!isFavorite ? '-o' : ''}`}></i> {isFavorite ? 'Remove' : 'Add'}
                </button>
            </div>
        </div>
    );
};
