export const initialStore = () => {
  return {
    characters: [],
    vehicles: [],
    planets: [],
    favorites: JSON.parse(localStorage.getItem('swFavorites')) || [],
    currentCharacter: null,
    currentVehicle: null,
    currentPlanet: null,
    loading: false,
    error: null,
    searchResults: [],
  };
};

// Store reducer - handles all state changes
const storeReducer = (store, action = {}) => {
  switch (action.type) {
    case 'SET_CHARACTERS':
      return { ...store, characters: action.payload, loading: false };

    case 'SET_VEHICLES':
      return { ...store, vehicles: action.payload, loading: false };

    case 'SET_PLANETS':
      return { ...store, planets: action.payload, loading: false };

    case 'SET_CURRENT_CHARACTER':
      return { ...store, currentCharacter: action.payload };

    case 'SET_CURRENT_VEHICLE':
      return { ...store, currentVehicle: action.payload };

    case 'SET_CURRENT_PLANET':
      return { ...store, currentPlanet: action.payload };

    case 'ADD_FAVORITE': {
      const newFavorites = [...store.favorites, action.payload];
      localStorage.setItem('swFavorites', JSON.stringify(newFavorites));
      return { ...store, favorites: newFavorites };
    }

    case 'REMOVE_FAVORITE': {
      const newFavorites = store.favorites.filter(fav => !(fav.type === action.payload.type && fav.id === action.payload.id));
      localStorage.setItem('swFavorites', JSON.stringify(newFavorites));
      return { ...store, favorites: newFavorites };
    }

    case 'SET_LOADING':
      return { ...store, loading: action.payload };

    case 'SET_ERROR':
      return { ...store, error: action.payload, loading: false };

    case 'SET_SEARCH_RESULTS':
      return { ...store, searchResults: action.payload };

    default:
      throw Error('Unknown action: ' + action.type);
  }
};

export default storeReducer;