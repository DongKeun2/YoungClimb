import {getAccessToken} from './Token';

async function getConfig() {
  const token = await getAccessToken();
  console.log('토큰 타입이 뭐지', token, typeof token);

  const header = {Authorization: `Bearer ${token}`};
  const config = {
    headers: header,
  };
  console.log(config);
  return config;
}

export default getConfig;
