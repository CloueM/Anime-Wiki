import React from 'react'
import { useParams } from 'react-router-dom'

function AnimeItem() {
    const { id } = useParams()
    console.log(id)
    return (
        <div>AnimeItem</div>
    )
}

export default AnimeItem
