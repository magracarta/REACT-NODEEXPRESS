//setupProxy,js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000', // 여기를 서버 포트로 설정해야 합니다.
      changeOrigin: true,
    })
  );
};
