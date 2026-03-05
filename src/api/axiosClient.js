import axios from 'axios';

// Exponential backoff helper
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

const createClient = () => {
  const baseURL = import.meta.env.DEV ? '/api' : 'https://api.coingecko.com/api';

  const client = axios.create({
    baseURL,
    timeout: 15000,
  });

  // Attach retry metadata
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error.config;
      if (!config) return Promise.reject(error);

      // Initialize metadata
      config.__retryCount = config.__retryCount || 0;
      config.__maxRetries = config.__maxRetries || 5;
      const status = error.response?.status;

      // Only retry on 429 or network errors
      if (status === 429 || !error.response) {
        if (config.__retryCount >= config.__maxRetries) return Promise.reject(error);

        // Exponential backoff (2^n * 1s)
        const delay = Math.pow(2, config.__retryCount) * 1000;
        config.__retryCount += 1;
        await wait(delay);
        return client(config);
      }

      return Promise.reject(error);
    }
  );

  return client;
};

const axiosClient = createClient();
export default axiosClient;
