import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

function AnimeItem() {
    const { id } = useParams()
    
    // State
    const [anime, setAnime] = React.useState({})
    const [character, setCharacter] = React.useState([])
    const [showMore, setShowMore] = React.useState(false)

    //Destructure Specific Anime
    const {
        title,
        images,
        trailer,
        duration,
        synopsis,
        season,
        episodes,
        score,
        scored_by,
        rating,
        type,
        source,
        status,
        aired
    } = anime



    //Get anime based on ID
    const getAnime = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`)
        const data = await response.json()
        setAnime(data.data)
        console.log(data.data)
    }


    //Get Characters
    const getCharacters = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`)
        const data = await response.json()
        setCharacter(data.data.characters)
    }

    //Initial Render
    useEffect(() =>{
        getAnime(id)
        getCharacters(id)
    }, [])

    return (
        <AnimeItemStyled>
            <h1>{title}</h1>
            <div className="details">
                <div className="detail">
                    <div className="image">
                        <img src={images?.jpg.large_image_url} alt="" />
                    </div>
                    <div className="anime_details">
                        <p><span>Aired:</span><span>{aired?.string}</span></p>
                        <p><span>Duration:</span><span>{duration}</span></p>
                        <p><span>Score:</span><span>{score}</span></p>
                        <p><span>Scored By:</span><span>{scored_by}</span></p>
                        <p><span>Rating:</span><span>{rating}</span></p>
                        <p><span>Type:</span><span>{type}</span></p>
                        <p><span>Source:</span><span>{source}</span></p>
                        <p><span>Status:</span><span>{status}</span></p>
                        <p><span>Season:</span><span>{season}</span></p>
                        <p><span>Episodes:</span><span>{episodes}</span></p>
                    </div>
                </div>
                <p className="anime_description">
                    {showMore? synopsis : synopsis?.substring(0,300) + '...'}
                    <button onClick={() => {
                        setShowMore(!showMore)
                    }}>{showMore ? 'Show Less...': 'Read More...'}</button>
                </p>
            </div>
            <h3 className="title">Trailer</h3>
            <div className="trailer">
                {trailer?.embed_url &&
                    <iframe 
                        src={trailer?.embed_url}
                        title={title}
                        width="800"
                        height="450"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe>
                }

            </div>
        </AnimeItemStyled>
    )
}

const AnimeItemStyled = styled.div`
    padding: 3rem 18rem;
    background-color: #EDEDED;

    h1, .title{
        font-size: 3rem;
        font-weight: 600;
        margin-bottom: 2rem;
    }
    
    
    .anime_description{
        margin-top: 2rem;
        color: #6c7983;
        line-height: 1.7rem;
        button{
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            font-size: 1.2rem;
            color: #27AE60;
            font-weight: 600;
        }
    }

    .details{
        background-color: white;
        border-radius: 20px;
        padding: 2rem;
        border: 5px solid #e5e7eb;
        .detail{
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            img{
                border-radius: 7px
            }
        }

        .anime_details{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p{
                display: flex;
                gap: 0.5rem;
            }

            p span:first-child{
                font-weight: bold;
                color: #6c7983;
            }
        }
    }
`;

export default AnimeItem
