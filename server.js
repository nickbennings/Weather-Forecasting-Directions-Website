require('dotenv').config();

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

console.log('Environment Variables:', process.env);

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    console.log(`Received request for ${pathname}`); // Log the received request

    if (pathname === '/apikey') {
        console.log(`API Key requested`); // Log when API key is requested
        console.log(`API Key from .env: ${process.env.API_KEY}`); // Log the actual API key value
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ apiKey: process.env.API_KEY }));
    } else {
        const filePath = path.join(__dirname, 'index.html');

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }
}).listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
