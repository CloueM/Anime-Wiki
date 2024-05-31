import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimeItem from "./components/animeItem";
import Gallery from "./components/gallery";
import Homepage from "./components/homepage";

function App(){

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/anime/:id" element={<AnimeItem />} />
        <Route path="/character/:id" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  )

}
export default App;
