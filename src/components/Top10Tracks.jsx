import React, { useState, useEffect, useContext } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { FaMoon, FaSun } from 'react-icons/fa'; 
import 'bootstrap/dist/css/bootstrap.min.css';
// import fetchAll from './FetchAPI';  
import { ThemeContext } from '../App';  


function topTracks() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [topTracks, setTopTracks] = useState([]);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  document.body.style.backgroundColor = isDarkMode ? '#000' : '#fff';

  const fetchAll = async () => {
    const authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + import.meta.env.VITE_REACT_APP_CLIENT_ID + '&client_secret=' + import.meta.env.VITE_REACT_APP_CLIENT_SECRET
    };
  
      const response = await fetch("https://accounts.spotify.com/api/token", authParameters);
      const data = await response.json();
      return data.access_token;
  };
  

  
  useEffect(() => {
    const fetchData = async () => {
        const token = await fetchAll();  // call fetchAll to get the access token
        setAccessToken(token);
      };

    fetchData();  // call the fetchData function to fetch the access token
  }, []);

  const searchAny = async () => {
    const searchArtistParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    };

    // fetch artist ID
      const artistResponse = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, searchArtistParameters);
      const artistData = await artistResponse.json();
      const artistID = artistData.artists.items[0].id;
    
    // fetch top tracks for the artist
      const artistTopTracksResponse = await fetch(`https://api.spotify.com/v1/artists/${artistID}/top-tracks?country=US`, searchArtistParameters);
      const artistTopTracksData = await artistTopTracksResponse.json();
      const artistTopTracks = artistTopTracksData.tracks;
    
      setTopTracks(artistTopTracks);
  }
  const themeSwitchText = isDarkMode ? 'Dark' : 'Light';
  const themeSwitchIcon = isDarkMode ? <FaMoon color="#fff" /> : <FaSun color="#000" />;
  
  return (
    <div>
       <div className="theme-switch-container">
        <span className="theme-switch-icon" onClick={toggleTheme}>{themeSwitchIcon}</span>
        <span className={`theme-switch-text ${isDarkMode ? 'text-white' : 'text-dark'}`} onClick={toggleTheme}>
            {themeSwitchText}
          </span>
      </div>
      <Container>
      <InputGroup size='lg' className={`m-3`}>
          <FormControl 
            placeholder='Search for top tracks of an artist'
            type="input"
            className={`form-control-${isDarkMode ? 'dark' : 'light'}`} 
            onKeyPress={event => {
              if(event.key === "Enter") {
                searchAny();
              }
            }}
            onChange={e => setSearchInput(e.target.value)}
          />
          <Button className='search-bar' onClick={searchAny}>Search 10 Top Ten</Button>        
        </InputGroup>
      </Container>
      <Container>
        <Row className='mx-2 row row-cols-4'>
          {topTracks.map((track, index) => (
        <Card className={`tracks-container ${isDarkMode ? 'dark' : 'light'}`} key={index}>
        <Card.Img src={track.album.images[0].url} alt={`${track.name} album cover`} />
              <Card.Body>
                <Card.Title>{track.name}</Card.Title>
                <p>Artist: {track.artists[0].name}</p>
                <p>Album: {track.album.name}</p>
                <p>Release Date: {track.album.release_date}</p>

              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default topTracks;