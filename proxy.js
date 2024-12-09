const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, '../frontend')));

// Proxy routes
const forwardRequest = (req, res, path) => {
    const url = `https://srpropertiesbackend.vercel.app${path}`;
    const options = {
        method: req.method,
        headers: { 'Content-Type': 'application/json', ...req.headers },
        body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    };

    fetch(url, options)
        .then(async (response) => {
            const data = await response.json();
            res.status(response.status).json(data);
        })
        .catch((error) => {
            console.error(`Error forwarding request to ${url}:`, error);
            res.status(500).json({ message: 'Internal server error' });
        });
};

// Define API routes
app.use('/api/residentialproperties', (req, res) => forwardRequest(req, res, req.originalUrl));
app.use('/api/retailproperties', (req, res) => forwardRequest(req, res, req.originalUrl));
app.use('/api/lands', (req, res) => forwardRequest(req, res, req.originalUrl));
app.use('/api/commercialproperties', (req, res) => forwardRequest(req, res, req.originalUrl));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
