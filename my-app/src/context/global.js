import { createContext, useContext, useEffect, useReducer, useState } from "react";

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
                searchResults: action.payload,
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
    const [search, setSearch] = useState("");

    //Handle Change
    const handleChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value === "") {
            state.isSearch = false;
        }
    };

    //Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (search) {
            searchAnime(search);
        }else{
            alert("Please enter an anime to search");
        }
    };

    //Search Anime
    const searchAnime = async (anime) => {
        dispatch({type: LOADING})
        const response = await fetch(`${base_url}/anime?q=${anime}&order_by=popularity&sort=asc&sfw`);
        const data = await response.json();
        dispatch({type: SEARCH, payload: data.data})
    }

    // Fetch popular Anime
    const getPopularAnime = async () => {
        dispatch({type: LOADING}) // No Data --> LOADING
        const response = await fetch(`${base_url}/top/anime?filter=bypopularity`)
        const data = await response.json();
        dispatch({type: GET_POPULAR_ANIME, payload:data.data})
    };

    //Fetch Upcoming Anime
    const getUpcomingAnime = async () => {
        dispatch({type: LOADING})
        const response = await fetch(`${base_url}/top/anime?filter=upcoming`)
        const data = await response.json();
        dispatch({type: GET_UPCOMING_ANIME, payload:data.data})
    };

    //Fetch Airing Anime
    const getAiringAnime = async () => {
        dispatch({type: LOADING})
        const response = await fetch(`${base_url}/top/anime?filter=airing`)
        const data = await response.json();
        dispatch({type: GET_AIRING_ANIME, payload:data.data})
    };

    //initial render
    useEffect(() => {
        getPopularAnime();
    }, [])

    return(
        <GlobalContext.Provider value={{
            ...state,
            handleChange,
            handleSubmit,
            searchAnime,
            getPopularAnime,
            getUpcomingAnime,
            getAiringAnime,
            search,
        }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};