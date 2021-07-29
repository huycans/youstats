import { googleURL } from "./constants";

const verifyToken = async (googleToken) => {
  let response = await fetch(
    googleURL.googleOAuth + "?id_token=" + googleToken
  );
  let responseJson = await response.json();
  if (responseJson.error) return false;
  return true;
};

export { verifyToken };
