import Popular from "./components/popular";
import { useGlobalContext } from "./context/global";

function App(){
  const global = useGlobalContext();
  console.log(global);
  return(
    <div className="App">
      <Popular/>
    </div>
  )
}
export default App;
