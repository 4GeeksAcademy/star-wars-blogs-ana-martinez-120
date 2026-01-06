import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const VehicleDetail = () => {
    const { id } = useParams();
    const { dispatch, store } = useGlobalReducer();
    const vehicle = store.currentVehicle;
    const isFavorite = store.favorites.some(fav => fav.type === 'vehicle' && fav.id === parseInt(id));

    useEffect(() => {
        const fetchVehicle = async () => {
            dispatch({ type: 'SET_LOADING', payload: true });
            try {
                const response = await fetch(`https://www.swapi.tech/api/vehicles/${id}`);
                const data = await response.json();
                dispatch({ type: 'SET_CURRENT_VEHICLE', payload: data.result });
            } catch (error) {
                dispatch({ type: 'SET_ERROR', payload: error.message });
            }
        };
        fetchVehicle();
    }, [id]);

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch({ type: 'REMOVE_FAVORITE', payload: { type: 'vehicle', id: parseInt(id) } });
        } else {
            dispatch({
                type: 'ADD_FAVORITE',
                payload: {
                    type: 'vehicle',
                    id: parseInt(id),
                    name: vehicle?.properties?.name,
                    image: `https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`
                }
            });
        }
    };

    if (!vehicle) return <div className="container mt-4"><p>Loading...</p></div>;

    const props = vehicle.properties || {};

    return (
        <div className="container mt-4">
            <Link to="/" className="btn btn-secondary mb-3">
                <i className="fas fa-arrow-left"></i> Back
            </Link>

            <div className="row">
                <div className="col-md-4">
                    <img
                        src={`https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`}
                        className="img-fluid rounded"
                        alt={props.name}
                        onError={(e) => {
                            e.target.src = 'https://dummyimage.com/400x600/cccccc/000000?text=No+Image';
                        }}
                    />
                    <button onClick={toggleFavorite} className={`btn btn-lg w-100 mt-3 ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}>
                        <i className={`fas fa-heart${!isFavorite ? '-o' : ''}`}></i> {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                </div>

                <div className="col-md-8">
                    <h1>{props.name}</h1>

                    <div className="card mb-3">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">Vehicle Specifications</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Model:</strong> {props.model}</li>
                            <li className="list-group-item"><strong>Class:</strong> {props.vehicle_class}</li>
                            <li className="list-group-item"><strong>Manufacturer:</strong> {props.manufacturer}</li>
                            <li className="list-group-item"><strong>Cost in Credits:</strong> {props.cost_in_credits}</li>
                            <li className="list-group-item"><strong>Length:</strong> {props.length} m</li>
                        </ul>
                    </div>

                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">Capacity Information</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Crew:</strong> {props.crew}</li>
                            <li className="list-group-item"><strong>Passengers:</strong> {props.passengers}</li>
                            <li className="list-group-item"><strong>Cargo Capacity:</strong> {props.cargo_capacity} kg</li>
                            <li className="list-group-item"><strong>Max Atmosphering Speed:</strong> {props.max_atmosphering_speed} km/h</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};