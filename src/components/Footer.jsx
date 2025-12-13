export const Footer = () => {
	return (
		<footer className="bg-dark text-white py-4 mt-5">
			<div className="container text-center">
				<p className="mb-2">
					<strong>Star Wars Database</strong> - Using{' '}
					<a href="https://www.swapi.tech" target="_blank" rel="noopener noreferrer" className="text-warning">
						SWAPI.tech
					</a>
					{' '}& <a href="https://starwars-visualguide.com" target="_blank" rel="noopener noreferrer" className="text-warning">
						Visual Guide
					</a>
				</p>
				<p className="text-muted">
					Made with <i className="fas fa-heart text-danger"></i> by Ana Martinez
				</p>
			</div>
		</footer>
	);
};