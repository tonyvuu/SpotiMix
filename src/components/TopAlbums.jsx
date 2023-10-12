import React, { useState, useEffect, useContext } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { FaMoon, FaSun } from 'react-icons/fa'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import fetchAll from './FetchAPI';
import { ThemeContext } from '../App';  



function artistAlbum({updateAlbum}) {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [savedAlbums, setSavedAlbums] = useState([]);


  
  document.body.style.backgroundColor = isDarkMode ? '#000' : '#fff';
  


  useEffect(() => {
    const fetchData = async () => {
        const token = await fetchAll();  // call fetchAll to get the access token
        setAccessToken(token);
      };

    fetchData();  // call the fetchData function to fetch the access token
  }, []);
  

// SEARCH
const searchAny = async () => {
  console.log(searchInput); // this is the user inputting in the search bar


  const searchArtistParameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    }
  }
    // fetch artist ID
    const artistResponse = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, searchArtistParameters);
    const artistData = await artistResponse.json();
    const artistID = artistData.artists.items[0].id;
    console.log("artist id is " + artistID);
  
    // fetch albums for the artist
    const albumsResponse = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`, searchArtistParameters);
    const albumsData = await albumsResponse.json();
    console.log(albumsData);
    setAlbums(albumsData.items);
}

const themeSwitchText = isDarkMode ? 'Dark' : 'Light';
const themeSwitchIcon = isDarkMode ? <FaMoon color="#fff" /> : <FaSun color="#000" />;

const handleSaveAlbum = (album) => {
  // create an album info object
  const albumInfo = {
    name: album.name,
    artist: album.artists[0].name,
    releaseDate: album.release_date,
    imageUrl: album.images[0].url,
  };
  updateAlbum(albumInfo)
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
        type = "input"
        className={`form-control-${isDarkMode ? 'dark' : 'light'}`} 
        onKeyPress={event => {
          if(event.key == "Enter") {
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
      return (
        <Card className={`tracks-container ${isDarkMode ? 'dark' : 'light'}`} key={index}>
        <Card.Img src={user.images[0].url} />
          <Card.Body>
            <Card.Title>{user.name}</Card.Title>
            <p>Artist: {user.artists[0].name}</p>
            <p>Total Tracks: {user.total_tracks}</p>
            <p>Release Date: {user.release_date}</p>
            {/* <p>Type: {user.type}</p> */}

          </Card.Body>
          <Button className='save-album-button' onClick={() => handleSaveAlbum(user)}>Save Album</Button>
        </Card>
      );
    })}
  </Row>
</Container>

    </div>
  )}

export default artistAlbum