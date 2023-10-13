
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
};

export default RecommendationsContent;
