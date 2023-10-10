import React, { useContext } from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import { ThemeContext } from '../App';
import { FaMoon, FaSun } from 'react-icons/fa';

function SavedMusic({ savedTrackInfo }) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  // Set the body background color based on the theme
  document.body.style.backgroundColor = isDarkMode ? '#000' : '#fff';

  const themeSwitchText = isDarkMode ? 'Dark' : 'Light';
  const themeSwitchIcon = isDarkMode ? <FaMoon color="#fff" /> : <FaSun color="#000" />;

  return (
    <Container>
      <h2 className={`mt-3 ${isDarkMode ? 'text-white' : 'text-dark'}`}>Saved Music Tracks</h2>
      <div className="theme-switch-container">
        <span className="theme-switch-icon" onClick={toggleTheme}>{themeSwitchIcon}</span>
        <span className={`theme-switch-text ${isDarkMode ? 'text-white' : 'text-dark'}`} onClick={toggleTheme}>
          {themeSwitchText}
        </span>
      </div>
      <Row>
        {savedTrackInfo && savedTrackInfo.length > 0 ? (
          savedTrackInfo.map((track, index) => (
            <Card className={`tracks-container ${isDarkMode ? 'dark' : 'light'}`} key={index} style={{ width: '18rem' }}>
              <Card.Img variant="top" src={track.imageUrl} alt={track.name} />
              <Card.Body>
                <Card.Title>{track.name}</Card.Title>
                <Card.Text className={isDarkMode ? '' : 'text-dark'}>Artists: {track.artists}</Card.Text>
                <Card.Text className={isDarkMode ? '' : 'text-dark'}>Release Date: {track.releaseDate}</Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p className={`mt-3 ${isDarkMode ? 'text-white' : 'text-dark'}`}>No saved tracks yet.</p>
        )}
      </Row>
    </Container>
  );
}

export default SavedMusic;
