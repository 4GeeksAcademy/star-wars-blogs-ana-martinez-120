import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const PlanetDetail = () => {
    const { id } = useParams();
    const { dispatch, store } = useGlobalReducer();
    const planet = store.currentPlanet;
    const isFavorite = store.favorites.some(fav => fav.type === 'planet' && fav.id === parseInt(id));

    useEffect(() => {
        const fetchPlanet = async () => {
            dispatch({ type: 'SET_LOADING', payload: true });
            try {
                const response = await fetch(`https://www.swapi.tech/api/planets/${id}`);
                const data = await response.json();
                dispatch({ type: 'SET_CURRENT_PLANET', payload: data.result });
            } catch (error) {
                dispatch({ type: 'SET_ERROR', payload: error.message });
            }
        };
        fetchPlanet();
    }, [id]);

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch({ type: 'REMOVE_FAVORITE', payload: { type: 'planet', id: parseInt(id) } });
        } else {
            dispatch({
                type: 'ADD_FAVORITE',
                payload: {
                    type: 'planet',
                    id: parseInt(id),
                    name: planet?.properties?.name,
                    image: `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`
                }
            });
        }
    };

    if (!planet) return <div className="container mt-4"><p>Loading...</p></div>;

    const props = planet.properties || {};

    return (
        <div className="container mt-4">
            <Link to="/" className="btn btn-secondary mb-3">
                <i className="fas fa-arrow-left"></i> Back
            </Link>

            <div className="row">
                <div className="col-md-4">
                    <img
                        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
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
                            <h5 className="mb-0">Physical Characteristics</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Rotation Period:</strong> {props.rotation_period} hours</li>
                            <li className="list-group-item"><strong>Orbital Period:</strong> {props.orbital_period} days</li>
                            <li className="list-group-item"><strong>Diameter:</strong> {props.diameter} km</li>
                            <li className="list-group-item"><strong>Gravity:</strong> {props.gravity}</li>
                            <li className="list-group-item"><strong>Climate:</strong> {props.climate}</li>
                        </ul>
                    </div>

                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">Population Information</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Terrain:</strong> {props.terrain}</li>
                            <li className="list-group-item"><strong>Surface Water:</strong> {props.surface_water}%</li>
                            <li className="list-group-item"><strong>Population:</strong> {props.population}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};