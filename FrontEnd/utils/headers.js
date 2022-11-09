import {getAccessToken} from './Token';

async function getConfig() {
  const token = await getAccessToken();
  const header = {Authorization: `Bearer ${token}`};

  const config = {
    headers: header,
  };

  return config;
}

async function getHeader() {
  const token = await getAccessToken();

  const header = `Bearer ${token}`;

  return header;
}

export {getHeader};

export default getConfig;
