import React from "react";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecipeList from "./components/recipeList";

const theme = createTheme({
  palette: {
    primary: {
      main: '#c6d6ab',
    },
    secondary: {
      main: '#9e6a53',
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Navbar />
        <Routes>
        <Route exact path="/" element={<RecipeList />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
