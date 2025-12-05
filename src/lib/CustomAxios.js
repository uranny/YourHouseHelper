import axios from 'axios';

const url = import.meta.env.VITE_API_URL

const CustomAxios = axios.create({
  baseURL: url, // 실제 서버 baseURL로 변경 필요
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}
function onRefreshed(token) {
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = [];
}

CustomAxios.interceptors.request.use(
  config => {
    // accessToken이 있으면 헤더에 추가
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

CustomAxios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (!isRefreshing) {
        isRefreshing = true;
        const refreshToken = localStorage.getItem('refreshToken');
        try {
          // reissue는 axios로 직접 호출 (CustomAxios 사용 X)
          const res = await axios.post(`${url}/user/reissue`, { refreshToken }, {
            headers: { 'Content-Type': 'application/json' }
          });
          const { accessToken, refreshToken: newRefreshToken } = res.data.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);
          onRefreshed(accessToken);
          isRefreshing = false;
          // Authorization 헤더 갱신 후 재시도
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return CustomAxios(originalRequest);
        } catch (e) {
          isRefreshing = false;
          window.location.href = '/signin';
          return Promise.reject(e);
        }
      }
      // 토큰 갱신 중이면 대기
      return new Promise(resolve => {
        subscribeTokenRefresh(token => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          resolve(CustomAxios(originalRequest));
        });
      });
    }
    return Promise.reject(error);
  }
);

export default CustomAxios;
