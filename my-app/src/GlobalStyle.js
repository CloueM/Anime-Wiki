import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');

    *{
        margin: 0;
        padding-bottom: 0px;
        box-sizing: border-box;
        list-style: none;
        text-decoration: none;
        font-family: 'Ubuntu', sans-serif;
    }
    .ubuntu-regular {
            font-family: "Ubuntu", sans-serif;
            font-weight: 400;
            font-style: normal;
        }
    body {
        background-color: White;
    }
`;


export default GlobalStyle;