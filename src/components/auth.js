const verifyToken = async (googleToken) => {
  let response = await fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + googleToken);
  let responseJson = await response.json();
  if (responseJson.error) return false;
  return true;
};

export { verifyToken };