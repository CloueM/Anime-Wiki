import React from 'react';
import { useGlobalContext } from '../context/global';
import Popular from './popular';
import styled from 'styled-components';
import Airing from './airing';
import Upcoming from './upComing';

function Homepage() {

    const {handleSubmit,
        search,
        searchAnime,
        handleChange,
        getPopularAnime,
        getUpcomingAnime,
        getAiringAnime,
    } = useGlobalContext()

    const [rendered, setRendered] = React.useState("popular");

    const switchComponent = () => {
        switch(rendered) {
            case 'popular':
                return <Popular rendered={rendered}/>;
            case 'airing':
                return <Airing rendered={rendered}/>;
            case 'upcoming':
                return <Upcoming rendered={rendered}/>;
            default: 
                return <Popular rendered={rendered}/>;
            
        }
    };

  return (
    <HomepageStyled>
        <header>
            <div className="logo">
                <h1>
                    {rendered === 'popular'? 'Popular Anime' : 
                    rendered === 'airing' ? 'Airing Anime' : 'Upcoming Anime'}
                </h1>
            </div>
            <div className="search-container">
                <div className='filter-btn popular-filter'>
                    <button onClick={() => {
                        setRendered('popular')
                        getPopularAnime();
                        }}>Popular</button>
                </div>
                <form action='' className='search-form' onSubmit={handleSubmit}>
                    <div className='input-control'>
                        <input type='text' placeholder='Search Anime' value={search} onChange={handleChange} />
                        <button type='submit'>Search</button>
                    </div>
                </form>
                <div className='filter-btn airing-filter'>
                    <button onClick={() => {
                        setRendered('airing')
                        getAiringAnime();
                        }}>Airing</button>
                </div>
                <div className='filter-btn upcoming-filter'>
                    <button onClick={() => {
                        setRendered('upcoming')
                        getUpcomingAnime();
                        }}>Upcoming</button>
                </div>
            </div>
        </header>
        {switchComponent()}
    </HomepageStyled>
  );
}


const HomepageStyled = styled.div`
    header {
        background-color: #3a4750;
        padding: 2rem 5rem;
        width: 100%;
        margin: 0 auto;
        transition: all 0.5s ease-in-out;
        .logo{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 2rem;
        }
        .search-container{
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            button{
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                outline: none;
                border-radius: 30px;
                font-size: 1.2rem;
                background-color: #303841;
                cursor: pointer;
                transition: all 0.5s ease-in-out;
                font-family: inherit;
                border: 5px solid #3a4750;
            }
            form{
                position: relative;
                width: 100%;
                .input-control{
                    position relative;
                    transition: all 0.5s ease-in-out;
                }
                .input-control input{
                    width: 100%;
                    padding: .7rem 1rem;
                    border: none;
                    outline: none;
                    border-radius: 30px;
                    font-size: 1.2rem;
                    background-color: #303841;
                    border: 5px solid #3a4750;
                    transition: all 0.5s ease-in-out;
                }
                .input-control button{
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
    }
`;
export default Homepage;