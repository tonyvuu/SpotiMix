
import React, {useContext} from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { ThemeContext } from '../App';
import { Container, Card, Button, Row } from 'react-bootstrap';

const RecommendationsContent = ({ isDarkMode, recommendations, savedTracks, errorMessage, fetchRecommendations, handleSaveTrack }) => {
    const { toggleTheme } = useContext(ThemeContext);


  const themeSwitchText = isDarkMode ? 'Dark' : 'Light';
  const themeSwitchIcon = isDarkMode ? <FaMoon color="#fff" /> : <FaSun color="#000" />;
  return (
    <div>
         <div className="theme-switch-container">
        <span className="theme-switch-icon" onClick={toggleTheme}>{themeSwitchIcon}</span>
        <span className={`theme-switch-text ${isDarkMode ? 'text-white' : 'text-dark'}`} onClick={toggleTheme}>
          {themeSwitchText}
        </span>
      </div>
      <section className={`section-home ${isDarkMode ? 'text-white' : 'text-dark'}`}>
        <div className='section-home2'>
          <h1 className='mb-5'>Welcome to Our Music Platform</h1>
          <p>Uncover the world of music at your fingertips. Our platform offers an extensive music library where you can effortlessly search for your preferred tracks and albums. Dive into the discography of your beloved artists, discovering their top 10 tracks with just a few clicks. The journey through melodies, beats, and rhythms is made simple and enjoyable with our user-friendly interface, ensuring you can navigate through your music choices easily. Enjoy!</p>
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
                
                {savedTracks.find(savedTrack => savedTrack.name === track.name) && (
                  <div className='success-message'>Saved successfully!</div>
                )}
                {errorMessage && errorMessage.id === track.id && (
                  <div className='error-message'>{errorMessage.message}</div>
                )}
              </Card.Body>
              <Button className='save-track-button' onClick={() => handleSaveTrack(track)}>Save Track</Button>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default RecommendationsContent;
