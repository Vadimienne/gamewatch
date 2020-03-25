// import express from "express";
// import next from "next";

const express = require('express')
const next = require('next')
const cors = require('cors')

const allowedCorsOrigins = [
  'http://localhost:3000', 
  'http://localhost:3001', 
  'http://95.73.203.86:80',
  'http://95.73.203.86:81',
  'http://95.73.203.86'
]

console.log('node env: ', process.env.NODE_ENV)
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
  try {
    await app.prepare();
    const server = express();
    server.use(express.static('static'))
    server.use(cors({origin: allowedCorsOrigins}))
    server.all("*", (req, res) => {
      return handle(req, res);
    });
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();