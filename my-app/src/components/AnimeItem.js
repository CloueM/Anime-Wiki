import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

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

    //Initial Render
    useEffect(() =>{
        getAnime(id)
    }, [])

    return (
        <div>
            <h1>{title}</h1>
            <div className="details">
                <div className="image">
                    <img src={images?.jpg.large_image_url} alt="" />
                </div>
                <div className="Anime Details">

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
                <p className="Anime Description">
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
                    </iframe>}
            </div>
        </div>
    )
}

export default AnimeItem
