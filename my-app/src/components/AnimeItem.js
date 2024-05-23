import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function AnimeItem() {
    const { id } = useParams()
    
    // State
    const [anime, setAnime] = React.useState({})
    const [character, setCharacter] = React.useState([])
    const [showMore, setShowMore] = React.useState(false)

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
}

export default AnimeItem
