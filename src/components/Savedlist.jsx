import React, { useState, useEffect, useContext } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { FaMoon, FaSun } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import fetchAll from './FetchAPI';
import { ThemeContext } from '../App';

function FindTracks() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [savedTracks, setSavedTracks] = useState([]);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  document.body.style.backgroundColor = isDarkMode ? '#000' : '#fff';

  useEffect(() => {
    const fetchData = async () => {
      const token = await fetchAll();  // call fetchAll to get the access token
      setAccessToken(token);
    };

    fetchData();  // call the fetchData function to fetch the access token
  }, []);

  const searchTracks = async () => {
    if (!accessToken) {
      console.error("access token not available");
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

    if (data.tracks) {
      setTracks(data.tracks.items);
    }
  };

  const themeSwitchText = isDarkMode ? 'Dark' : 'Light';
  const themeSwitchIcon = isDarkMode ? <FaMoon color="#fff" /> : <FaSun color="#000" />;

  const handleSaveTrack = (track) => {
    const trackInfo = {
      name: track.name,
      artists: track.artists.map(artist => artist.name).join(', '),
      releaseDate: track.album.release_date,
      imageUrl: track.album.images[0].url,
    };

    // Check if the track is already saved
    if (!savedTracks.find(savedTrack => savedTrack.name === trackInfo.name)) {
      setSavedTracks([...savedTracks, trackInfo]);
    }
  };

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
            placeholder='Search for tracks'
            type="input"
            className={`form-control-${isDarkMode ? 'dark' : 'light'}`}
            onKeyPress={event => {
              if (event.key === "Enter") {
                searchTracks();
              }
            }}
            onChange={e => setSearchInput(e.target.value)}
          />
          <Button className='search-bar' onClick={searchTracks}>Search Top Tracks</Button>
        </InputGroup>
      </Container>
      <Container>
        <Row className='mx-2 row row-cols-4'>
          {tracks.map((track, index) => (
            <Card className={`tracks-container ${isDarkMode ? 'dark' : 'light'}`} key={index}>
              <Card.Img src={track.album.images[0].url} alt={track.name} />
              <Card.Body>
                <Card.Title>{track.name}</Card.Title>
                <Card.Text>Artists: {track.artists.map(artist => artist.name).join(', ')}</Card.Text>
                <Card.Text>Release Date: {track.album.release_date}</Card.Text>
                {savedTracks.find(savedTrack => savedTrack.name === track.name) ? (
                  <div className='success-message'>Saved successfully!</div>
                ) : (
                  <Button className='save-track-button' onClick={() => handleSaveTrack(track)}>Save Track</Button>
                )}
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
      <Container>
        <h2 className={`${isDarkMode ? 'text-white' : 'text-dark'}`}>Saved Tracks</h2>
        <Row className='mx-2 row row-cols-4'>
          {savedTracks.map((savedTrack, index) => (
            <Card className={`tracks-container ${isDarkMode ? 'dark' : 'light'}`} key={index}>
              <Card.Img src={savedTrack.imageUrl} alt={savedTrack.name} />
              <Card.Body>
                <Card.Title>{savedTrack.name}</Card.Title>
                <Card.Text>Artists: {savedTrack.artists}</Card.Text>
                <Card.Text>Release Date: {savedTrack.releaseDate}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default FindTracks;
