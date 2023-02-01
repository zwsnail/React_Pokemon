import { PokemonIndex } from "./components";
import "./App.css";
import { Footer } from "./components/footer";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Helmet>
        <title>Pokemon React App</title>
        <meta name="description" content="Pokemon App" />
        <meta name="keywords" content="Pokemon, React, API" />
      </Helmet>
      <div className="App">
        <PokemonIndex />
      </div>
      <Footer />
    </>
  );
}

export default App;
