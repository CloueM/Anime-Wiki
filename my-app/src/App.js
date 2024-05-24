import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimeItem from "./components/animeItem";
import Homepage from "./components/homepage";
function App(){

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/anime/:id" element={<AnimeItem />} />
      </Routes>
    </BrowserRouter>
  )

}
export default App;
