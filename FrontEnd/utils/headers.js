import {getAccessToken} from './Token';

function getConfig() {
  const headers = {Authorization: `Bearer ${getAccessToken()}`};
  const config = {
    headers,
  };
  return config;
}

export default getConfig;
