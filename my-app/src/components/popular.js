import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../context/global';

function Popular(){
    const {popularAnime, isSearch} = useGlobalContext();

const conditionalRender = () => {
    if (!isSearch){
        return popularAnime.map((anime) => {
            return <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                <img src={anime.images.jpg.large_image_url} alt={anime.title}/>
                <h3>{anime.title}</h3>
            </Link>
        })
    }
}

    return(
        <PopularStyle>
            <div>
                <div className='popular-anime'>
                    {conditionalRender()}
                </div>
            </div>
        </PopularStyle>
    )
}

const PopularStyle = styled.div`
    dispaly: flex;
    .popular-anime {
        margin-top: 2rem;
        padding-top: 2rem;
        padding-bottom: 2rem;
        padding-left: 2rem;
        padding-right: 0;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-gap: 4rem;
        background-color: #fff;
        border-top: 5px solid #e5e7eb;
        a{
            height: 500px;
            border-radius: 7px
            border: 5px solid #e5e7eb;

        }
        a img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 7px;
        }
    }
`;

export default Popular;