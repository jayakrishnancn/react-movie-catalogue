import React from 'react';
import './App.css'
import {BrowserRouter, Route} from 'react-router-dom'
import Container from '../../hoc/Container'
import Navbar from '../Navbar/Navbar'
import ExploreOptions from '../ExploreOptions/ExploreOptions'
import Explore from '../Explore/Explore'
import MovieDetails from '../MovieDetails/MovieDetails'
import axios from 'axios';
import movieDb from '../util/movieDb'

axios.defaults.baseURL = movieDb.BASEURL
axios.interceptors.request.use(function (config) {
 
  config.params = {
    api_key: movieDb.API_KEY
  };
  return config;

}, function (error) {
 
  return Promise.reject(error);
});

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Container>
        <Route path="/explore" exact component={ExploreOptions}/>
        <Route path="/explore/:id" exact component={Explore}/>
        <Route path="/movie/:id" exact  component={MovieDetails}/>
      </Container>
    </BrowserRouter>
  );
}

export default App;
