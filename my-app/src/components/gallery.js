import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../context/global';

function Gallery() {
    const { getAnimePictures, pictures } = useGlobalContext();
    const { id } = useParams();
    const [index, setIndex] = useState(0);

    const handleImageClick = (i) => {
        setIndex(i);
    }

    useEffect(() => {
        getAnimePictures(id);
    }, [getAnimePictures, id]);

    return (
        <GalleryStyled>
            <div className='back'>
                <Link to='/'>Back</Link>
            </div>
            <div className='big-image'>
                {pictures && pictures.length > 0 && (
                    <img src={pictures[index]?.jpg.image_url} alt='' />
                )}
            </div>
            <div className='small-images'>
                {pictures?.map((picture, i) => (
                    <div className='image-container' onClick={() => handleImageClick(i)} key={i}>
                        <img src={picture.jpg.image_url}
                        style={{
                            border: i === index ? "3px solid #9bf4d5" : "3px solid #d9dad7",
                            filter: i === index ? "grayscale(0)" : "grayscale(60%)",
                            transform: i === index ? "scale(1.1)" : "scale(1)",
                            transition: "all 0.3s ease-in-out",
                            cursor: "pointer"
                        }}
                        alt='' />
                    </div>
                ))}
            </div>
        </GalleryStyled>
    )
}

const GalleryStyled = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    .back{
        position: absolute;
        top: 2rem;
        left: 2rem;
        a{
            font-weight: 600;
            text-decoration: none;
            color: #9bf4d5;
        }
    }

    .big-image{
        display: inline-block;
        padding: 2rem;
        margin: 2rem 0;
        background-color: #fff;
        border-radius: 7px;
        border: 5px solid #e5e7eb;
        position: relative;
        img{
            width: 350px;
        }
    }

    .small-images{
        display: flex;
        flex-wrap: wrap;
        gap: .5rem;
        width: 80%;
        border-radius: 7px;
        background-color: #fff;
        border: 5px solid #e5e7eb;
        img{
            width: 6rem;
            height: 6rem;
            object-fit: cover;
            cursor: pointer;
            border-radius: 5px;
            border: 3px solid #e5e7eb;
        }
    }
`;

export default Gallery;
