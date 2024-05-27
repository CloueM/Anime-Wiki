import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../context/global';
//hello
function Airing({rendered}){
    const {airingAnime, isSearch, searchResults} = useGlobalContext();

    const conditionalRender = () => {
        if (!isSearch && rendered === 'airing'){
            return airingAnime.map((anime) => {
                return (
                    <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                        <img src={anime.images.jpg.large_image_url} alt={anime.title}/>
                        <h3>{anime.title}</h3>
                    </Link>
                );
            });
        } else {
            return searchResults.map((anime) => {
                return (
                    <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                        <img src={anime.images.jpg.large_image_url} alt=''/>
                        <h3>{anime.title}</h3>
                    </Link>
                );
            });
        }
    }
    

    return(
        <AiringStyle>
            <div>
                <div className='airing-anime'>
                    {conditionalRender()}
                </div>
            </div>
        </AiringStyle>
    )
}

const AiringStyle = styled.div`
    .airing-anime {
        margin-top: 2rem;
        padding-top: 2rem;
        padding-bottom: 2rem;
        padding-left: 2rem;
        padding-right: 0;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-gap: 4rem;

        a{
            height: 500px;
            border-radius: 7px

        }
        a img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 7px;
        }
    }
`;

export default Airing;