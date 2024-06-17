const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);

    // Ensure only .html files are served from public directory
    const ext = path.extname(filePath);
    if (ext === '' || !['.html', '.js', '.css'].includes(ext)) {
        filePath += '.html';
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            return res.end('Page not found');
        }

        let contentType = 'text/html';
        if (filePath.endsWith('.css')) {
            contentType = 'text/css';
        } else if (filePath.endsWith('.js')) {
            contentType = 'application/javascript';
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}).listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
