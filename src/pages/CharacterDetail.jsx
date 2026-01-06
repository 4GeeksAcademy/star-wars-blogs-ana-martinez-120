import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const CharacterDetail = () => {
    const { id } = useParams();
    const { dispatch, store } = useGlobalReducer();
    const character = store.currentCharacter;
    const isFavorite = store.favorites.some(fav => fav.type === 'character' && fav.id === parseInt(id));

    useEffect(() => {
        const fetchCharacter = async () => {
            dispatch({ type: 'SET_LOADING', payload: true });
            try {
                const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
                const data = await response.json();
                dispatch({ type: 'SET_CURRENT_CHARACTER', payload: data.result });
            } catch (error) {
                dispatch({ type: 'SET_ERROR', payload: error.message });
            }
        };
        fetchCharacter();
    }, [id]);

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch({ type: 'REMOVE_FAVORITE', payload: { type: 'character', id: parseInt(id) } });
        } else {
            dispatch({
                type: 'ADD_FAVORITE',
                payload: {
                    type: 'character',
                    id: parseInt(id),
                    name: character?.properties?.name,
                    image: character?.properties?.image || `https://starwars-visualguide.com/assets/img/characters/${id}.jpg` // Fallback
                }
            });
        }
    };
    if (!character) return <div className="container mt-4"><p>Loading...</p></div>;

    const props = character.properties || {};

    return (
        <div className="container mt-4">
            <Link to="/" className="btn btn-secondary mb-3">
                <i className="fas fa-arrow-left"></i> Back
            </Link>

            <div className="row">
                <div className="col-md-4">
                    <img
                        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
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
                            <li className="list-group-item"><strong>Height:</strong> {props.height} cm</li>
                            <li className="list-group-item"><strong>Mass:</strong> {props.mass} kg</li>
                            <li className="list-group-item"><strong>Hair Color:</strong> {props.hair_color}</li>
                            <li className="list-group-item"><strong>Skin Color:</strong> {props.skin_color}</li>
                            <li className="list-group-item"><strong>Eye Color:</strong> {props.eye_color}</li>
                        </ul>
                    </div>

                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">Personal Information</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Birth Year:</strong> {props.birth_year}</li>
                            <li className="list-group-item"><strong>Gender:</strong> {props.gender}</li>
                            <li className="list-group-item"><strong>Home World:</strong> {props.homeworld}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
