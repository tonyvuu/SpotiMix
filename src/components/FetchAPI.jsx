const fetchAll = async () => {
  const ApiConfig = {
    CLIENT_ID: "33d0cc43ee83499ea4b731cb8c25416b",
    CLIENT_SECRET: "7a5a872661964d04a2ec7151c2a64477",
  };

  const authParameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials&client_id=' + ApiConfig.CLIENT_ID + '&client_secret=' + ApiConfig.CLIENT_SECRET
  };

    const response = await fetch("https://accounts.spotify.com/api/token", authParameters);
    const data = await response.json();
    return data.access_token;
};

export default fetchAll;

  