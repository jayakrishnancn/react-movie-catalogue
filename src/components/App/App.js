import React from 'react';
import './App.css'
import {BrowserRouter, Route} from 'react-router-dom'
import Container from '../../hoc/Container'
import Navbar from '../Navbar/Navbar'
import Explore from '../Explore/Explore'
import MovieDetails from '../MovieDetails/MovieDetails'

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Container>
        <Route path="/explore" exact component={Explore}/>
        <Route path="/movie/:id" exact  component={MovieDetails}/>
      </Container>
    </BrowserRouter>
  );
}

export default App;
