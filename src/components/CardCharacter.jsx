import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const CardCharacter = ({ character }) => {
  const { store, dispatch } = useGlobalReducer();
  const isFavorite = store.favorites.some(fav => fav.type === 'character' && fav.id === character.uid);

  const toggleFavorite = (e) => {
    e.preventDefault();
    if (isFavorite) {
      dispatch({ type: 'REMOVE_FAVORITE', payload: { type: 'character', id: character.uid } });
    } else {
      dispatch({
        type: 'ADD_FAVORITE',
        payload: {
          type: 'character',
          id: character.uid,
          name: character.properties?.name,
          image: character.image || character.properties?.image // 👈 USA character.image
        }
      });
    }
  };

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={character.image || character.properties?.image} // 👈 USA LA IMAGEN DEL OBJETO
        className="card-img-top"
        alt={character.properties?.name}
        onError={(e) => {
          e.target.src = 'https://dummyimage.com/400x300/cccccc/000000?text=No+Image';
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{character.properties?.name}</h5>
        <p className="card-text small">
          <strong>Height:</strong> {character.properties?.height} cm<br />
          <strong>Mass:</strong> {character.properties?.mass} kg<br />
          <strong>Birth Year:</strong> {character.properties?.birth_year}
        </p>
      </div>
      <div className="card-footer bg-white">
        <Link to={`/character/${character.uid}`} className="btn btn-sm btn-primary w-100 mb-2">
          <i className="fas fa-eye"></i> Learn More
        </Link>
        <button onClick={toggleFavorite} className={`btn btn-sm w-100 ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}>
          <i className={`fas fa-heart${!isFavorite ? '-o' : ''}`}></i> {isFavorite ? 'Remove' : 'Add'}
        </button>
      </div>
    </div>
  );
};
