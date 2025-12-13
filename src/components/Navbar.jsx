import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store } = useGlobalReducer();
	const favoritesCount = store.favorites.length;

	return (
		<nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#000' }}>
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					<i className="fas fa-star"></i> Star Wars DB
				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							<Link className="nav-link" to="/">
								<i className="fas fa-home"></i> Home
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/favorites">
								<i className="fas fa-heart"></i> Favorites
								{favoritesCount > 0 && (
									<span className="badge bg-danger ms-2">{favoritesCount}</span>
								)}
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};