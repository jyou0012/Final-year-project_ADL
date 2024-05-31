const express = require('express');
const next = require('next');
const fetch = require('node-fetch');
require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${port}`;

app.prepare().then(() => {
  const server = express();

  // Call the API route to reset and schedule the cron job on server start
  fetch(`${baseUrl}/api/cron`, {
    method: 'POST',
  })
    .then(response => response.json())
    .then(data => {
      if (!response.ok) {
        console.error('Error scheduling cron job:', data.error);
      } else {
        console.log(data.message);
      }
    })
    .catch(error => {
      console.error('Error calling cron API route:', error);
    });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
