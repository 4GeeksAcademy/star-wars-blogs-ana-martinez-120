import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Favorites = () => {
    const { store } = useGlobalReducer();

    return (
        <div className="container mt-4">
            <Link to="/" className="btn btn-secondary mb-3">
                <i className="fas fa-arrow-left"></i> Back
            </Link>

            <h1 className="mb-4">
                <i className="fas fa-heart"></i> My Favorites ({store.favorites.length})
            </h1>

            {store.favorites.length === 0 ? (
                <div className="alert alert-info">
                    <p>No favorites yet. Start adding your favorite characters, vehicles, and planets!</p>
                </div>
            ) : (
                <div className="row g-4">
                    {store.favorites.map((fav) => (
                        <div key={`${fav.type}-${fav.id}`} className="col-md-6 col-lg-4">
                            <Link to={`/${fav.type}/${fav.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src={fav.image}
                                        className="card-img-top"
                                        alt={fav.name}
                                        onError={(e) => {
                                            e.target.src = 'https://dummyimage.com/400x300/cccccc/000000?text=No+Image';
                                        }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{fav.name}</h5>
                                        <span className="badge bg-info">{fav.type}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};