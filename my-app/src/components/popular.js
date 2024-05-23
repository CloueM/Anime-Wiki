import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/global';

function Popular(){
    const {popularAnime, isSearch} = useGlobalContext();

const conditionalRender = () => {
    if (!isSearch){
        return popularAnime.map((anime) => {
            return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                <img src={anime.images.jpg.large_image_url} alt={anime.title}/>
                <h3>{anime.title}</h3>
                <p>{anime.synopsis}</p>
            </Link>
        })
    }
}

    return(
        <div>
            <div className='popular-anime'>
                {conditionalRender()}
            </div>
        </div>
    )
}

export default Popular;