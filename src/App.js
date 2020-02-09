import React from 'react';
import Navbar from './Navbar/Navbar'
import Search from './Search/Search'
import './App.css'
import {BrowserRouter, Route} from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Route path='/explore' component={Search} />
      <Route path='/search' component={Search} />
    </BrowserRouter>
  );
}

export default App;
