import express from "express";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();
server.use(express.json());

// Let Next.js handle all requests
server.all("*", (req, res) => {
  return handle(req, res);
});

export default server;
