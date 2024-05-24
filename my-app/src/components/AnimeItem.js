import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'

function AnimeItem() {
    const { id } = useParams()
    
    // State
    const [anime, setAnime] = React.useState({})
    const [characters, setCharacter] = React.useState([])
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
    }


    //Get Characters
    const getCharacters = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`)
        const data = await response.json()
        setCharacter(data.data)
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
            <h3 className="title">Characters</h3>
            <div className="characters">
                {characters?.map((character, index) => {
                    const {role} = character;
                    const {images, name, mal_id} = character.character
                    return <Link to={`/character/${mal_id}`} key={index}>
                        <div className='character'>
                            <img src={images?.jpg.image_url} alt='' />
                            <h4>{name}</h4>
                            <p>{role}</p>
                        </div>
                    </Link>
                })}
            </div>
        </AnimeItemStyled>
    )
}

const AnimeItemStyled = styled.div`
    padding: 3rem 18rem;
    background-color: #303841;

    h1, .title{
        font-size: 3rem;
        font-weight: 600;
        margin-bottom: 2rem;
        background: linear-gradient(109.6deg, rgb(83, 231, 173) 11.2%, rgb(67, 209, 222) 100.2%);;
        cursor: pointer;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    
    
    .anime_description{
        margin-top: 2rem;
        color: #eeeeee;
        line-height: 1.7rem;
        button{
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            font-size: 1.2rem;
            color: rgb(83, 231, 173);
            font-weight: 600;
        }
    }

    .details{
        background-color: #3a4750;
        border-radius: 20px;
        padding: 2rem;
        border: 5px solid #3a4750;
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
                color: #9bf4d5;
            }
        }
    }

    .characters{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        grid-gap: 2rem;
        background-color: #3a4750;
        border-radius: 20px;
        padding: 2rem;
        border: 5px solid #3a4750;
        .character{
            padding: .4rem .6rem;
            border-radius: 10px;
            background-color: #303841;
            transition: all 0.5s ease-in-out;
            img{
                width: 100%;
                border-radius: 7px
            }
            
            h4{
                padding:.5rem 0;
                color: #9bf4d5;
            }
            p{
                padding:.3rem 0;
                color: #d9dad7;
            }
    
            &:hover{
                transform: translateY(-5px);
            }
        }
    }
`;

export default AnimeItem
