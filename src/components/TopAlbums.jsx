import React, { useState, useEffect, useContext } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { FaMoon, FaSun } from 'react-icons/fa'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import fetchAll from './FetchAPI';
import { ThemeContext } from '../App';  

function ArtistAlbum({ updateAlbum }) {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [savedAlbums, setSavedAlbums] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

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
    }

    const artistResponse = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, searchArtistParameters);
    const artistData = await artistResponse.json();
    const artistID = artistData.artists.items[0].id;

    const albumsResponse = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`, searchArtistParameters);
    const albumsData = await albumsResponse.json();
    setAlbums(albumsData.items);
  }

  const themeSwitchText = isDarkMode ? 'Dark' : 'Light';
  const themeSwitchIcon = isDarkMode ? <FaMoon color="#fff" /> : <FaSun color="#000" />;

  const handleSaveAlbum = (album) => {
    const isAlbumSaved = savedAlbums.some(savedAlbum => savedAlbum.name === album.name);
  
    if (isAlbumSaved) {
      console.log('Album is already saved:', album.name);
      // display a message indicating that the album is already saved
      setErrorMessage({ id: album.id, message: 'Album is already saved.' });
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000); // clear the error message after 2 seconds
      return;
    }

    // create an album info object
    const albumInfo = {
      id: album.id,
      name: album.name,
      artist: album.artists[0].name,
      releaseDate: album.release_date,
      imageUrl: album.images[0].url,
    };
    updateAlbum(albumInfo);
    setSavedAlbums([...savedAlbums, albumInfo]);
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
            placeholder='Search for albums of an artist'
            type="input"
            className={`form-control-${isDarkMode ? 'dark' : 'light'}`} 
            onKeyPress={event => {
              if(event.key === "Enter") {
                searchAny()
              }
            }}
            onChange={e => setSearchInput(e.target.value)}
          />
          <Button className='search-bar' onClick={searchAny}>Search Albums</Button>        
        </InputGroup>
      </Container>
      <Container>
        <Row className='mx-2 row row-cols-4'>
          {albums.map((user, index) => {
            const isAlbumSaved = savedAlbums.some(savedAlbum => savedAlbum.name === user.name);
          
            return (
              <Card className={`tracks-container ${isDarkMode ? 'dark' : 'light'}`} key={index}>
                <Card.Img src={user.images[0].url} />
                <Card.Body>
                  <Card.Title>{user.name}</Card.Title>
                  <p>Artist: {user.artists[0].name}</p>
                  <p>Total Tracks: {user.total_tracks}</p>
                  <p>Release Date: {user.release_date}</p>
                </Card.Body>

                <div className="action-buttons">

                  {isAlbumSaved && (
                    <div className='success-message'>Saved successfully!</div>
                  )}

                  {errorMessage && errorMessage.id === user.id && (
                    <div className='error-message'>{errorMessage.message}</div>
                  )}
                </div>
                  <Button className='save-track-button' onClick={() => handleSaveAlbum(user)}>
                    Save Album
                  </Button>
              </Card>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default ArtistAlbum;
