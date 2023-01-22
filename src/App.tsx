import { PokemonIndex } from "./components";
import "./App.css";
import { Timer } from "./components/test";
import { Footer } from "./components/footer/index";

function App() {
  return (
    <>
      <div className="App">
        <PokemonIndex />
        {/* <Timer /> */}
      </div>
      <Footer />
    </>
  );
}

export default App;
