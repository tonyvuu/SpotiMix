import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import fetchAll from './FetchAPI';
import { ThemeContext } from '../App';
import RecommendationsContent from './RecommendationsContent';
import '../css/Home.css'

function Home({updateRecommendations}) {
  const [accessToken, setAccessToken] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [savedTracks, setSavedTracks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const {isDarkMode} = useContext(ThemeContext);

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
      console.error('access token not available');
      return;
    }

    // example seed track IDs 
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

  const handleSaveTrack = (track) => {
    if (savedTracks.find(savedTrack => savedTrack.name === track.name)) {
      console.log('Track is already saved:', track.name);
      setErrorMessage({ id: track.id, message: 'Track is already saved.' });
      setTimeout(() => {
        setErrorMessage(null);
      }, 10000);
      return;
    }

    const trackInfo = {
      name: track.name,
      artists: track.artists.map(artist => artist.name).join(', '),
      releaseDate: track.album.release_date,
      imageUrl: track.album.images[0].url,
    };

    updateRecommendations(trackInfo);
    setSavedTracks([...savedTracks, trackInfo]);
  };

  return (
    <div>
      
      <RecommendationsContent
        isDarkMode={isDarkMode}
        recommendations={recommendations}
        savedTracks={savedTracks}
        errorMessage={errorMessage}
        fetchRecommendations={fetchRecommendations}
        handleSaveTrack={handleSaveTrack}
      />
      
    </div>
  );
}

export default Home;
