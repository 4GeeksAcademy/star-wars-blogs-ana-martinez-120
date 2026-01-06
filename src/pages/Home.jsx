import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { CardCharacter } from "../components/CardCharacter";
import { CardVehicle } from "../components/CardVehicle";
import { CardPlanet } from "../components/CardPlanet";

export const Home = () => {
    const { dispatch, store } = useGlobalReducer();
    const [activeTab, setActiveTab] = useState('characters');

    useEffect(() => {
        fetchCharacters();
    }, []);

    const fetchCharacters = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await fetch('https://www.swapi.tech/api/people');
            const data = await response.json();
            const enrichedCharacters = await Promise.all(
                data.results.map(async (char) => {
                    const detailRes = await fetch(char.url);
                    const detailData = await detailRes.json();
                    return {
                        ...char,
                        ...detailData.result,
                        image: `https://starwars-visualguide.com/assets/img/characters/${char.uid}.jpg`
                    };
                })
            );
            dispatch({ type: 'SET_CHARACTERS', payload: enrichedCharacters });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
        }
    };

    const fetchVehicles = async () => {
        if (store.vehicles.length > 0) return;
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await fetch('https://www.swapi.tech/api/vehicles');
            const data = await response.json();
            const enrichedVehicles = await Promise.all(
                data.results.map(async (vehicle) => {
                    const detailRes = await fetch(vehicle.url);
                    const detailData = await detailRes.json();
                    return {
                        ...vehicle,
                        ...detailData.result,
                        image: `https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`
                    };
                })
            );
            dispatch({ type: 'SET_VEHICLES', payload: enrichedVehicles });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
        }
    };

    const fetchPlanets = async () => {
        if (store.planets.length > 0) return;
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await fetch('https://www.swapi.tech/api/planets');
            const data = await response.json();
            const enrichedPlanets = await Promise.all(
                data.results.map(async (planet) => {
                    const detailRes = await fetch(planet.url);
                    const detailData = await detailRes.json();
                    return {
                        ...planet,
                        ...detailData.result,
                        image: `https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`
                    };
                })
            );
            dispatch({ type: 'SET_PLANETS', payload: enrichedPlanets });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === 'vehicles') fetchVehicles();
        if (tab === 'planets') fetchPlanets();
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">
                <i className="fas fa-star"></i> Star Wars Database
            </h1>

            <ul className="nav nav-tabs mb-4" role="tablist">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'characters' ? 'active' : ''}`}
                        onClick={() => handleTabChange('characters')}
                    >
                        <i className="fas fa-user"></i> Characters
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'vehicles' ? 'active' : ''}`}
                        onClick={() => handleTabChange('vehicles')}
                    >
                        <i className="fas fa-shuttle-space"></i> Vehicles
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'planets' ? 'active' : ''}`}
                        onClick={() => handleTabChange('planets')}
                    >
                        <i className="fas fa-globe"></i> Planets
                    </button>
                </li>
            </ul>

            {store.loading && (
                <div className="alert alert-info">
                    <i className="fas fa-spinner fa-spin"></i> Loading...
                </div>
            )}

            {store.error && (
                <div className="alert alert-danger">{store.error}</div>
            )}

            <div className="row g-4">
                {activeTab === 'characters' &&
                    store.characters.map((char) => (
                        <div key={char.uid} className="col-md-6 col-lg-4">
                            <CardCharacter character={char} />
                        </div>
                    ))}

                {activeTab === 'vehicles' &&
                    store.vehicles.map((vehicle) => (
                        <div key={vehicle.uid} className="col-md-6 col-lg-4">
                            <CardVehicle vehicle={vehicle} />
                        </div>
                    ))}

                {activeTab === 'planets' &&
                    store.planets.map((planet) => (
                        <div key={planet.uid} className="col-md-6 col-lg-4">
                            <CardPlanet planet={planet} />
                        </div>
                    ))}
            </div>
        </div>
    );
};