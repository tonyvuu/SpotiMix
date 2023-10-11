const fetchAll = async () => {
  
  const authParameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials&client_id=' + import.meta.env.VITE_REACT_APP_CLIENT_ID + '&client_secret=' + import.meta.env.VITE_REACT_APP_CLIENT_SECRET
  };

    const response = await fetch("https://accounts.spotify.com/api/token", authParameters);
    const data = await response.json();
    return data.access_token;
};

export default fetchAll;

  