import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row } from 'react-bootstrap';
import { FaMoon, FaSun } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import fetchAll from './FetchAPI';
import { ThemeContext } from '../App';

function Recommendations() {
  const [accessToken, setAccessToken] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      const token = await fetchAll();
      setAccessToken(token);
    };

    fetchData();
  }, []);

  const fetchRecommendations = async () => {
    if (!accessToken) {
      console.error('Access token not available!');
      return;
    }

    // example seed track IDs (replace with actual track IDs)
    const seedTracks = '3yfqSUWxFvZELEM4PmlwIR';

    const recommendationParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    };

    const response = await fetch(`https://api.spotify.com/v1/recommendations?seed_tracks=${seedTracks}`, recommendationParameters);
    const data = await response.json();

    if (data.tracks) {
      setRecommendations(data.tracks);
    }
  };

  const themeSwitchText = isDarkMode ? 'Dark' : 'Light';
  const themeSwitchIcon = isDarkMode ? <FaMoon color="#fff" /> : <FaSun color="#000" />;

  return (
    <div>
      <Container>
        <Button className="fetch-button" onClick={fetchRecommendations}>
          Fetch Recommendations
        </Button>
        <div className="theme-switch-container">
          <span className="theme-switch-icon" onClick={toggleTheme}>
            {themeSwitchIcon}
          </span>
          <span className={`theme-switch-text ${isDarkMode ? 'text-white' : 'text-dark'}`} onClick={toggleTheme}>
            {themeSwitchText}
          </span>
        </div>
      </Container>
      <Container>
      <Row className='mx-2 row row-cols-4'>
            {recommendations.map((track, index) => (
              <Card className={`track-card ${isDarkMode ? 'dark' : 'light'}`} key={index}>
                <Card.Img src={track.album.images[0].url} alt={track.name} />
                <Card.Body>
                  <Card.Title>{track.name}</Card.Title>
                  <Card.Text>Artists: {track.artists.map(artist => artist.name).join(', ')}</Card.Text>
                  <Card.Text>Album: {track.album.name}</Card.Text>
                </Card.Body>
              </Card>
            ))}
            </Row>
      </Container>
    </div>
  );
}

export default Recommendations;
