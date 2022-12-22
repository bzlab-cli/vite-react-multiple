const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const proxyMiddleware = require('http-proxy-middleware');
// const compression = require('compression');

/*function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // 这里就过滤掉了请求头包含'x-no-compression'
        return false
    }

    return compression.filter(req, res)
}
app.use(compression({
    // filter: shouldCompress
}));*/

app.use(express.static(path.resolve(__dirname, '../dist')));

const proxyTable = {
    '/api': {
        target: 'http://api.jrucker.cn',
        changeOrigin: true
    }
};

Object.keys(proxyTable).forEach(function (context) {
    let options = proxyTable[context];
    if (typeof options === 'string') {
        options = {target: options}
    }
    app.use(proxyMiddleware(options.filter || context, options))
});

app.get('*', function (req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
    res.send(html)
});

const port = process.env.PORT || 8091;
app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
});
