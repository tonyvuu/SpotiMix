import React, { useState, useEffect } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import fetchAll from './FetchAPI';



function ArtistAlbum() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [tracks, setTracks] = useState([]);

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
  
  return (
    <div className='App'>
      <Container>
        <InputGroup className="m-3" size='lg'>
          <FormControl
            placeholder='Search for tracks'
            type="input"
            onKeyPress={event => {
              if (event.key === "Enter") {
                searchTracks()
              }
            }}
            onChange={e => setSearchInput(e.target.value)}
          />
          <Button onClick={searchTracks}>Search Top Tracks</Button>
        </InputGroup>
      </Container>
      <Container>
        <Row className='mx-2 row row-cols-4'>
          {tracks.map((track, index) => {
            console.log(track);
            return (
              <Card key={index}>
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
