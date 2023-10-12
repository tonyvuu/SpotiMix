import React, { useContext } from 'react';
import { Container, Row, Card, Button } from 'react-bootstrap';
import { ThemeContext } from '../App';
import { FaMoon, FaSun } from 'react-icons/fa';

function SavedMusic({ savedTrackInfo, savedAlbumInfo, updateTopTracks }) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  document.body.style.backgroundColor = isDarkMode ? '#000' : '#fff';

  const themeSwitchText = isDarkMode ? 'Dark' : 'Light';
  const themeSwitchIcon = isDarkMode ? <FaMoon color="#fff" /> : <FaSun color="#000" />;

  const limit = 8;

  const handleClickPremiumFeature = () => {
    window.location.href = 'https://buy.stripe.com/test_14k8yg5cy3St3zG6op';
  };

  return (
    <div>
      <div className="theme-switch-container">
        <span className="theme-switch-icon" onClick={toggleTheme}>
          {themeSwitchIcon}
        </span>
        <span
          className={`theme-switch-text ${isDarkMode ? 'text-white' : 'text-dark'}`}
          onClick={toggleTheme}
        >
          {themeSwitchText}
        </span>
      </div>
      <Container>
        <h2 className={`mt-3 ${isDarkMode ? 'text-white' : 'text-dark'}`}>Saved Music Tracks</h2>
        <Row>
          {savedTrackInfo &&
            savedTrackInfo.slice(0, limit).map((track, index) => (
              <Card
                className={`tracks-container ${isDarkMode ? 'dark' : 'light'}`}
                key={index}
                style={{ width: '18rem' }}
              >
                <Card.Img variant="top" src={track.imageUrl} alt={track.name} />
                <Card.Body>
                  <Card.Title>{track.name}</Card.Title>
                  <Card.Text className={isDarkMode ? '' : 'text-dark'}>
                    Artists: {track.artists}
                  </Card.Text>
                  <Card.Text className={isDarkMode ? '' : 'text-dark'}>
                    Release Date: {track.releaseDate}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
        </Row>
        <h3 className='free-8'>You only get 8 free saved songs</h3>
        <Button className='save-track-button' onClick={handleClickPremiumFeature}>Click here for unlimited adds</Button>
        <Row>
          {savedAlbumInfo &&
            savedAlbumInfo.slice(0, limit).map((album, index) => (
              <Card
                className={`tracks-container ${isDarkMode ? 'dark' : 'light'}`}
                key={index}
                style={{ width: '18rem' }}
              >
                <Card.Img variant="top" src={album.imageUrl} alt={album.name} />
                <Card.Body>
                  <Card.Title>{album.name}</Card.Title>
                  <Card.Text className={isDarkMode ? '' : 'text-dark'}>
                    Artist: {album.artist}
                  </Card.Text>
                  <Card.Text className={isDarkMode ? '' : 'text-dark'}>
                    Release Date: {album.releaseDate}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
        </Row>
        <Row>
          {updateTopTracks &&
            updateTopTracks.slice(0, limit).map((track, index) => (
              <Card
                className={`tracks-container ${isDarkMode ? 'dark' : 'light'}`}
                key={index}
                style={{ width: '18rem' }}
              >
                <Card.Img variant="top" src={track.imageUrl} alt={track.name} />
                <Card.Body>
                  <Card.Title>{track.name}</Card.Title>
                  <Card.Text className={isDarkMode ? '' : 'text-dark'}>
                    Artists: {track.artists}
                  </Card.Text>
                  <Card.Text className={isDarkMode ? '' : 'text-dark'}>
                    Release Date: {track.releaseDate}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default SavedMusic;
