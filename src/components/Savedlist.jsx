import React, { useContext } from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import { ThemeContext } from '../App';
import { FaMoon, FaSun } from 'react-icons/fa';

function SavedMusic({ savedTrackInfo, savedAlbumInfo }) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  document.body.style.backgroundColor = isDarkMode ? '#000' : '#fff';

  const themeSwitchText = isDarkMode ? 'Dark' : 'Light';
  const themeSwitchIcon = isDarkMode ? <FaMoon color="#fff" /> : <FaSun color="#000" />;

  

  return (
    <div>
      <div className="theme-switch-container">
        <span className="theme-switch-icon" onClick={toggleTheme}>{themeSwitchIcon}</span>
        <span className={`theme-switch-text ${isDarkMode ? 'text-white' : 'text-dark'}`} onClick={toggleTheme}>{themeSwitchText}</span>
      </div>
      <Container>
        <h2 className={`mt-3 ${isDarkMode ? 'text-white' : 'text-dark'}`}>Saved Music Tracks</h2>
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

        <h2 className={`mt-3 ${isDarkMode ? 'text-white' : 'text-dark'}`}>Saved Albums</h2>
        <Row>
          {savedAlbumInfo && savedAlbumInfo.length > 0 ? (
            savedAlbumInfo.map((album, index) => (
              <Card className={`tracks-container ${isDarkMode ? 'dark' : 'light'}`} key={index} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={album.imageUrl} alt={album.name} />
                <Card.Body>
                  <Card.Title>{album.name}</Card.Title>
                  <Card.Text className={isDarkMode ? '' : 'text-dark'}>Artist:{album.artist}</Card.Text>
                  <Card.Text className={isDarkMode ? '' : 'text-dark'}>Release Date: {album.releaseDate}</Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p className={`mt-3 ${isDarkMode ? 'text-white' : 'text-dark'}`}>No saved albums yet.</p>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default SavedMusic;
