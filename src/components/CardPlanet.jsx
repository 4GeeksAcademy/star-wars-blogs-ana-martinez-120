export const CardPlanet = ({ planet }) => {
    const { store, dispatch } = useGlobalReducer();
    const isFavorite = store.favorites.some(fav => fav.type === 'planet' && fav.id === planet.uid);

    const toggleFavorite = (e) => {
        e.preventDefault();
        if (isFavorite) {
            dispatch({ type: 'REMOVE_FAVORITE', payload: { type: 'planet', id: planet.uid } });
        } else {
            dispatch({
                type: 'ADD_FAVORITE',
                payload: {
                    type: 'planet',
                    id: planet.uid,
                    name: planet.properties?.name,
                    image: planet.image || planet.properties?.image // 👈
                }
            });
        }
    };

    return (
        <div className="card h-100 shadow-sm">
            <img
                src={planet.image || planet.properties?.image} // 👈
                className="card-img-top"
                alt={planet.properties?.name}
                onError={(e) => {
                    e.target.src = 'https://dummyimage.com/400x300/cccccc/000000?text=No+Image';
                }}
            />
            <div className="card-body">
                <h5 className="card-title">{planet.properties?.name}</h5>
                <p className="card-text small">
                    <strong>Climate:</strong> {planet.properties?.climate}<br />
                    <strong>Gravity:</strong> {planet.properties?.gravity}<br />
                    <strong>Population:</strong> {planet.properties?.population}
                </p>
            </div>
            <div className="card-footer bg-white">
                <Link to={`/planet/${planet.uid}`} className="btn btn-sm btn-primary w-100 mb-2">
                    <i className="fas fa-eye"></i> Learn More
                </Link>
                <button onClick={toggleFavorite} className={`btn btn-sm w-100 ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}>
                    <i className={`fas fa-heart${!isFavorite ? '-o' : ''}`}></i> {isFavorite ? 'Remove' : 'Add'}
                </button>
            </div>
        </div>
    );
};
