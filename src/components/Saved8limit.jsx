import React, { useContext } from 'react';
import { Container, Row, Card, Button } from 'react-bootstrap';
import { ThemeContext } from '../App';
import { FaMoon, FaSun } from 'react-icons/fa';

function Saved8limit({ savedTrackInfo, savedAlbumInfo, updateTopTracks, updateRecommendations, onDeleteTrack }) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  // const [savedTracks, setSavedTracks] = useState([]);

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
        <span className={`theme-switch-text ${isDarkMode ? 'text-white' : 'text-dark'}`} onClick={toggleTheme}>
          {themeSwitchText}
        </span>
      </div>
      <Container>
        <h2 className={`header-3 mt-3 ${isDarkMode ? 'text-white' : 'text-dark'}`}>Saved Music Tracks</h2>
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
                  {/* <Button onClick={() => handleDeleteTrack(track)}>Delete</Button> */}
                </Card.Body>
              </Card>
            ))}
        </Row>
        <h4 className={`free-8 ${isDarkMode ? 'text-white' : 'text-dark'}`}>You only get 8 free saved songs</h4>
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
        <Row>
          {updateRecommendations &&
            updateRecommendations.slice(0, limit).map((track, index) => (
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
      <fieldset className="flex-container flex flex-nowrap items-center max-w-xs space-x-2 dark:text-gray-100">
	<label for="slider" className="text-sm">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Volume down" className="w-5 h-5 fill-current shrink-0 dark:text-gray-400">
			<path d="M320,168v32a56,56,0,0,1,0,112v32a88,88,0,0,0,0-176Z"></path>
			<path d="M145.373,120H16V392H145.373l104,104H288V16H249.373ZM128,360H48V152h80Zm128,97.373-96-96V150.627l96-96Z"></path>
		</svg>
	</label>
	<input id="slider" type="range" value="75" className="w-full h-2 rounded-lg cursor-pointer accent-violet-400" />
	<label for="slider" className="text-sm">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Volume up" className="w-5 h-5 fill-current shrink-0 dark:text-gray-400">
			<path d="M145.373,120H16V392H145.373l104,104H288V16H249.373ZM128,360H48V152h80Zm128,97.373-96-96V150.627l96-96Z"></path>
			<path d="M408,256a88.1,88.1,0,0,0-88-88v32a56,56,0,0,1,0,112v32A88.1,88.1,0,0,0,408,256Z"></path>
			<path d="M320,57.445V89.722C401.307,101.4,464,171.512,464,256S401.307,410.6,320,422.278v32.277C419.005,442.66,496,358.158,496,256S419.005,69.34,320,57.445Z"></path>
		</svg>
	</label>
</fieldset>
    </div>
  );
}

export default Saved8limit;
