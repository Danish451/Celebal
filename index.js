const express  = require('express')
const http = require('http');
const fs = require('fs');
const path = require('path');

// Helper function to send a response
const sendResponse = (res, statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
};

// Create an HTTP server
const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const filePath = path.join(__dirname, url.pathname);

    // Handle different HTTP methods
    if (req.method === 'POST') {
        // Create a new file
        fs.writeFile(filePath, '', (err) => {
            if (err) {
                sendResponse(res, 500, { message: 'File creation failed', error: err });
            } else {
                sendResponse(res, 201, { message: 'File created successfully' });
            }
        });
    } else if (req.method === 'GET') {
        // Read a file
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    sendResponse(res, 404, { message: 'File not found' });
                } else {
                    sendResponse(res, 500, { message: 'File read failed', error: err });
                }
            } else {
                sendResponse(res, 200, { message: 'File read successfully', data });
            }
        });
    } else if (req.method === 'DELETE') {
        // Delete a file
        fs.unlink(filePath, (err) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    sendResponse(res, 404, { message: 'File not found' });
                } else {
                    sendResponse(res, 500, { message: 'File deletion failed', error: err });
                }
            } else {
                sendResponse(res, 200, { message: 'File deleted successfully' });
            }
        });
    } else {
        sendResponse(res, 405, { message: 'Method not allowed' });
    }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
