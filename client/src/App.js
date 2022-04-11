import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecipeList from "./components/recipeList";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
       <Route exact path="/" element={<RecipeList />} />
     </Routes>
    </div>
  );
}

export default App;
