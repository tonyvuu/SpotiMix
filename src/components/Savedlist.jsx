import React, { useState, useEffect, useContext } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { FaMoon, FaSun } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import fetchAll from './FetchAPI';
import { ThemeContext } from '../App';
import '../css/Savedlist.css';  

function SavedList() {
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

  const [showSavedMessage, setShowSavedMessage] = useState({});

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

    // check if the track is already saved
    if (!savedTracks.find(savedTrack => savedTrack.name === trackInfo.name)) {
      setSavedTracks([...savedTracks, trackInfo]);

      // show the "Saved successfully" message for this track
      setShowSavedMessage(prevState => ({
        ...prevState,
        [track.name]: true,
      }));

      setTimeout(() => {
        setShowSavedMessage(prevState => ({
          ...prevState,
          [track.name]: false,
        }));
      }, 5000);
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
      <h1 className={`${isDarkMode ? 'text-white' : 'text-dark'}`}>Welcome to Premium Status</h1>
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
            <Card
              className={`saved-container ${isDarkMode ? 'dark-card' : 'light-card'}`} 
              key={index}
            >
              <Card.Img src={track.album.images[0].url} alt={track.name} />
              <Card.Body>
                <Card.Title>{track.name}</Card.Title>
                <Card.Text>Artists: {track.artists.map(artist => artist.name).join(', ')}</Card.Text>
                <Card.Text>Release Date: {track.album.release_date}</Card.Text>
                {showSavedMessage[track.name] && <div className='success-message'>Saved successfully!</div>}
              </Card.Body>
              <Button className='save-track-button' onClick={() => handleSaveTrack(track)}>Save Track</Button>
            </Card>
          ))}
        </Row>
      </Container>
      <Container>
        <h2 className={`${isDarkMode ? 'text-white' : 'text-dark'}`}>Saved Tracks</h2>
        <Row className='mx-2 row row-cols-4'>
          {savedTracks.map((savedTrack, index) => (
            <Card
              className={`tracks-container ${isDarkMode ? 'dark-card' : 'light-card'}`} 
              key={index}
            >
              <Card.Img src={savedTrack.imageUrl} alt={savedTrack.name} />
              <Card.Body>
                <Card.Title>{savedTrack.name}</Card.Title>
                <Card.Text className={isDarkMode ? '' : 'text-dark'}>
                  Artists: {savedTrack.artists}</Card.Text>
                  <Card.Text className={isDarkMode ? '' : 'text-dark'}>
                  Release Date: {savedTrack.releaseDate}</Card.Text>
              </Card.Body>
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

export default SavedList;
