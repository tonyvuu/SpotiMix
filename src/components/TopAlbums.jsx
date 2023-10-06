import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import fetchAll from './FetchAPI';
import { ThemeContext } from '../App';  


function artistAlbum() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  
  


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

const themeClass = isDarkMode ? 'dark' : 'light';



  return (
    <div className={`App ${themeClass}`}>
    <Container>
      <InputGroup className="m-3" size='lg'>
        <FormControl 
        placeholder='Search for albums of an artist'
        type = "input"
        onKeyPress={event => {
          if(event.key == "Enter") {
            searchAny()
          }
        }}
        onChange={e => setSearchInput(e.target.value)}
        />
      <Button className='search-bar' onClick={searchAny}>Search Albums</Button>        
      </InputGroup>
      <button onClick={toggleTheme}>
        Toggle Theme: {isDarkMode ? 'Dark' : 'Light'}
      </button>
    </Container>
    <Container>
  <Row className='mx-2 row row-cols-4'>
    {albums.map((user, index) => {
      return (
        <Card className={`tracks-container ${themeClass}`} key={index} onClick={toggleTheme}>
        <Card.Img src={user.images[0].url} />
          <Card.Body>
            <Card.Title>{user.name}</Card.Title>
          </Card.Body>
        </Card>
      );
    })}
  </Row>
</Container>

    </div>
  )}

export default artistAlbum