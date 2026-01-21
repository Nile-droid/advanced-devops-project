const express = require('express');
const client = require('prom-client');
const app = express();
const port = 3000;

// Prometheus metrics setup
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();
const register = client.register;

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello from the Microservice Backend!',
        hostname: require('os').hostname(),
        timestamp: new Date().toISOString()
    });
});

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

app.listen(port, () => {
    console.log(`Backend API running on port ${port}`);
});
