import React, { useState, useEffect, useContext } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { FaMoon, FaSun } from 'react-icons/fa'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import fetchAll from './FetchAPI';
import { ThemeContext } from '../App';  



function ArtistAlbum() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);


  useEffect(() => {
    const fetchData = async () => {
        const token = await fetchAll();  // call fetchAll to get the access token
        setAccessToken(token);
      };

    fetchData();  // call the fetchData function to fetch the access token
  }, []);

  const searchTracks = async () => {
    if (!accessToken) {
      console.error("Access token not available!");
      return;
    }

    const searchTracksParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    };
    const response = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=track`, searchTracksParameters);
    const data = await response.json();
    console.log(data);

    if (data.tracks) {
        setTracks(data.tracks.items);
    }
      
  }
  const themeSwitchText = isDarkMode ? 'Dark' : 'Light';
  const themeSwitchIcon = isDarkMode ? <FaMoon /> : <FaSun />;
  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <Container>
      <InputGroup size='lg' className={`m-3 ${isDarkMode ? 'dark' : 'light'}`}>
          <FormControl
            placeholder='Search for tracks'
            type="input"
            className={`form-control-${isDarkMode ? 'dark' : 'light'}`} // Dynamic class based on theme
            onKeyPress={event => {
              if (event.key === "Enter") {
                searchTracks()
              }
            }}
            onChange={e => setSearchInput(e.target.value)}
          />
          <Button className='search-bar' onClick={searchTracks}>Search Top Tracks</Button>
          
        </InputGroup>
        <div className="theme-switch-container">
          <span className="theme-switch-icon">{themeSwitchIcon}</span>
          <span className="theme-switch-text" onClick={toggleTheme}>
         {themeSwitchText}
          </span>
        </div>
      </Container>
      <Container>
        <Row className='mx-2 row row-cols-4'>
          {tracks.map((track, index) => {
            console.log(track);
            return (
                <Card className={`tracks-container ${isDarkMode ? 'dark' : 'light'}`} key={index}>
                <Card.Img src={track.album.images[0].url} alt={track.name} />
                <Card.Body>
                  <Card.Title>{track.name}</Card.Title>
                  <Card.Text>Artists: {track.artists.map(artist => artist.name).join(', ')}</Card.Text>
                  <Card.Text>Release Date: {track.album.release_date}</Card.Text>

                </Card.Body>
              </Card>
            )
          })}
        </Row>
      </Container>
    </div>
    
  );
}

export default ArtistAlbum;