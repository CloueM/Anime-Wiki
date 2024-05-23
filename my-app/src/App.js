import { BrowserRouter } from "react-router-dom";
import Popular from "./components/popular";
function App(){

  return(
    <BrowserRouter>
        <div className="App">
        <Popular/>
      </div>
    </BrowserRouter>
  )

}
export default App;
