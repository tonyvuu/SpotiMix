import React, { useState, createContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Top10Tracks from './components/Top10Tracks';
import TopAlbums from './components/TopAlbums';
import Tracks from './components/Tracks';
import Home from './components/Home';
import Savedlist from './components/Savedlist';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prevDarkMode => !prevDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};



function App() {
  return (
    <ThemeProvider>

      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand className='navbar-title-icon' as={Link} to="/home">
              SpotiMix <img className='image-title' src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-download-logo-30.png" alt="Spotify Logo" />
            </Navbar.Brand>
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/tracks">
                Tracks
              </Nav.Link>
              <Nav.Link as={Link} to="/toptracks">
                Top 10 Tracks of an Artist
              </Nav.Link>
              <Nav.Link as={Link} to="/topalbums">
                Albums of an Artist
              </Nav.Link>
              <Nav.Link as={Link} to="/saved">
                Saved Music
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="/toptracks" element={<Top10Tracks />} />
          <Route path="/topalbums" element={<TopAlbums />} />
          <Route path="/saved" element={<Savedlist />} />

        </Routes>
      </div>
      </ThemeProvider>

  );
}

export default App;