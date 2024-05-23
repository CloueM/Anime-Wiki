import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimeItem from "./components/AnimeItem";
import Popular from "./components/popular";
function App(){

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Popular />} />
        <Route path="/anime/:id" element={<AnimeItem />} />
      </Routes>
    </BrowserRouter>
  )

}
export default App;
