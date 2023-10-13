import React, { useState, useEffect, useContext } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { FaMoon, FaSun } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import fetchAll from './FetchAPI';
import { ThemeContext } from '../App';

function TopTracks({ updateTopTracks }) {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [topTracks, setTopTracks] = useState([]);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [savedTracks, setSavedTracks] = useState([]);

  const [errorMessage, setErrorMessage] = useState({
    index: null,
    message: ''
  });

  const [successMessage, setSuccessMessage] = useState({
    index: null,
    message: ''
  });

  document.body.style.backgroundColor = isDarkMode ? '#000' : '#fff';

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

    const artistResponse = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, searchArtistParameters);
    const artistData = await artistResponse.json();
    const artistID = artistData.artists.items[0].id;

    const artistTopTracksResponse = await fetch(`https://api.spotify.com/v1/artists/${artistID}/top-tracks?country=US`, searchArtistParameters);
    const artistTopTracksData = await artistTopTracksResponse.json();
    const artistTopTracks = artistTopTracksData.tracks;

    setTopTracks(artistTopTracks);
  };

  const themeSwitchText = isDarkMode ? 'Dark' : 'Light';
  const themeSwitchIcon = isDarkMode ? <FaMoon color="#fff" /> : <FaSun color="#000" />;

  const handleSaveTrack = (track, index) => {
    const isTrackSaved = savedTracks.some(savedTrack => savedTrack.name === track.name);
    if (isTrackSaved) {
      setErrorMessage({
        index,
        message: 'Track is already saved.'
      });
      return;
    }

    const topTrackInfo = {
      name: track.name,
      artists: track.artists.map(artist => artist.name).join(', '),
      releaseDate: track.album.release_date,
      imageUrl: track.album.images[0].url,
    };

    updateTopTracks(topTrackInfo);
    setSavedTracks([...savedTracks, topTrackInfo]);

    setSuccessMessage({
      index,
      message: 'Track saved successfully!'
    });
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
            placeholder='Search for top tracks of an artist'
            type="input"
            className={`form-control-${isDarkMode ? 'dark' : 'light'}`}
            onKeyPress={event => {
              if (event.key === "Enter") {
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
                {successMessage.index === index && (
                  <div className='success-message'>{successMessage.message}</div>
                  )}
                  {errorMessage.index === index && (
                    <div className='error-message'>{errorMessage.message}</div>
                  )}
              </Card.Body>
              <Button className='save-track-button' onClick={() => handleSaveTrack(track, index)}>Save Track</Button>
            </Card>
          ))}
        </Row>
      </Container>
      <fieldset className="flex-container flex flex-nowrap items-center max-w-xs space-x-2 dark:text-gray-100">
	<label for="slider" className="text-sm">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Volume down" className="w-5 h-5 fill-current shrink-0 dark:text-gray-400">
			<path d="M320,168v32a56,56,0,0,1,0,112v32a88,88,0,0,0,0-176Z"></path>
			<path d="M145.373,120H16V392H145.373l104,104H288V16H249.373ZM128,360H48V152h80Zm128,97.373-96-96V150.627l96-96Z"></path>
		</svg>
	</label>
	<input id="slider" type="range" value="75" className="w-full h-2 rounded-lg cursor-pointer accent-violet-400" />
	<label for="slider" className="text-sm">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Volume up" className="w-5 h-5 fill-current shrink-0 dark:text-gray-400">
			<path d="M145.373,120H16V392H145.373l104,104H288V16H249.373ZM128,360H48V152h80Zm128,97.373-96-96V150.627l96-96Z"></path>
			<path d="M408,256a88.1,88.1,0,0,0-88-88v32a56,56,0,0,1,0,112v32A88.1,88.1,0,0,0,408,256Z"></path>
			<path d="M320,57.445V89.722C401.307,101.4,464,171.512,464,256S401.307,410.6,320,422.278v32.277C419.005,442.66,496,358.158,496,256S419.005,69.34,320,57.445Z"></path>
		</svg>
	</label>
</fieldset>
    </div>
  );
}

export default TopTracks;
