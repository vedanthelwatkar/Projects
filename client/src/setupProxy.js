const { createProxyMiddleware } = require('http-proxy-middleware');
console.log('Setting up proxy...');
module.exports = function (app) {
    console.log('Proxy middleware is running...');
    app.use(
        '/api',
        createProxyMiddleware({
        target: 'https://vtube-ycci.onrender.com',
        changeOrigin: true,
        })
    );
};
