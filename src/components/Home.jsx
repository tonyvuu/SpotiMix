import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row } from 'react-bootstrap';
import { FaMoon, FaSun } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import fetchAll from './FetchAPI';
import { ThemeContext } from '../App';
import '../css/Home.css'

function Recommendations() {
  const [accessToken, setAccessToken] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  document.body.style.backgroundColor = isDarkMode ? '#000' : '#fff';

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
    const seedTracks = '4xqrdfXkTW4T0RauPLv3WA';

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
       <div className="theme-switch-container">
          <span className="theme-switch-icon" onClick={toggleTheme}>
            {themeSwitchIcon}
          </span>
          <span className={`theme-switch-text ${isDarkMode ? 'text-white' : 'text-dark'}`} onClick={toggleTheme}>
            {themeSwitchText}
          </span>
        </div>
      <section className={`section-home ${isDarkMode ? 'text-white' : 'text-dark'}`}>
        <div className='section-home2'>
        <h1 className='mb-5'>Welcome to Our Music Platform</h1>
        <p>Uncover the world of music at your fingertips. Our platform offers an extensive music library where you can effortlessly search for your preferred tracks and albums. Dive into the discography of your beloved artists, discovering their top 10 tracks with just a few clicks. The journey through melodies, beats, and rhythms is made simple and enjoyable with our user-friendly interface, ensuring you can navigate through your music choices easily. hi</p>
        </div>
      </section>
      <Container>
        <Button className="fetch-button mb-5" onClick={fetchRecommendations}>
          Click Here for Recommendations
        </Button>
      
      </Container>
      <Container>
      <Row className='mx-2 row row-cols-4'>
            {recommendations.map((track, index) => (
            <Card className={`tracks-container ${isDarkMode ? 'dark' : 'light'}`} key={index} style={{ width: '18rem' }}>
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
