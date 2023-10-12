const fetchAll = async () => {
  const authParameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=client_credentials&client_id=${import.meta.env.VITE_REACT_APP_CLIENT_ID}&client_secret=${import.meta.env.VITE_REACT_APP_CLIENT_SECRET}`
  };

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", authParameters);
    if (!response.ok) {
      throw new Error(`Failed to fetch access token. Status: ${response.status}`);
    }
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export default fetchAll;
