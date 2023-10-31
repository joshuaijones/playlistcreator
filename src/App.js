import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap'

import SearchContainer from './components/SearchContainer';;

function App() {


  return (
    <div className="App">
      <Container>
        <h1>Playlist Creator</h1>
        <SearchContainer />
      </Container>
    </div>
  );
}

export default App;
