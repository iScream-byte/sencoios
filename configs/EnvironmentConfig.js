const dev = {
   
  // API_ENDPOINT_URL: 'https://beasdev.beas.in:1443/',
  // API_ENDPOINT_URL: 'https://goalgetter.sencogold.ai/',
  // API_ENDPOINT_URL: 'http://182.73.216.90:5000/',
  API_ENDPOINT_URL: 'http://4.213.114.57:444/',
};

const stag = {

};

const prod = {
  // API_ENDPOINT_URL: 'http://192.168.1.17:8000',
  // REACT_APP_VAPID_KEY: 'BIvCdh1PH5-RtIu2CCEbVJ-JeKt_VZ_kGzDGl-DjFGeQw7WzT4aul3S7wO0ITuEs5swDFGiEgQtvqcDMmVFq5M8',
};

const getEnv = () => {
  switch (process.env.REACT_APP_ENV) {
    case 'dev':
      return dev;
    case 'prod':
      return prod;
    case 'stag':
      return stag;
    default:
      return dev;
  }
};

// eslint-disable-next-line import/prefer-default-export
export const env = getEnv();