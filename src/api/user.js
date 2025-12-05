import CustomAxios from '../lib/CustomAxios';

export const userApi = {
  signup: async ({ username, password }) => {
    return await CustomAxios.post('/user/signup', { username, password });
  },
  signin: async ({ username, password }) => {
    return await CustomAxios.post('/user/signin', { username, password });
  },
  reissue: async (refreshToken) => {
    return await CustomAxios.post('/user/reissue', { refreshToken });
  },
};
