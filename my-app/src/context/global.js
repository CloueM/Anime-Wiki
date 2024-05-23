import { createContext, useContext, useEffect, useReducer } from "react";

const GlobalContext = createContext();
const base_url = "https://api.jikan.moe/v4";

//Actions
const LOADING = "LOADING...";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";

//Reducer
const reducer = (state, action) => {
    switch(action.type) {
        case LOADING:
            return {
               ...state,
                loading: true,
            };
        case SEARCH:
            return {
               ...state,
                isSearch: true,
                searcResults: action.payload,
            };
        case GET_POPULAR_ANIME:
            return {
               ...state,
                popularAnime: action.payload,
                loading: false,
            };
        case GET_UPCOMING_ANIME:
            return {
               ...state,
                upcomingAnime: action.payload,
                loading: false,
            };
        case GET_AIRING_ANIME:
            return {
               ...state,
                airingAnime: action.payload,
                loading: false,
            };
        default:
            return state;
    }
    return state;

};

export const GlobalContextProvider = ({children}) => {
    
    // Initial State
    const initialState = {
        popularAnime: [],
        upcomingAnime: [],
        airingAnime: [],
        isSearch: false,
        searcResults: [],
        loading: false,
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    

    // Fetch popular Anime
    const getPopularAnime = async () => {
        dispatch({type: LOADING}) // No Data --> LOADING
        const response = await fetch(`${base_url}/top/anime?filter=bypopularity`)
        const data = await response.json();
        dispatch({type: GET_POPULAR_ANIME, payload:data.data})
    };

    //initial render
    useEffect(() => {
        getPopularAnime();
    }, [])

    return(
        <GlobalContext.Provider value={{
            ...state,
        }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};