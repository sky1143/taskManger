import express from "express";
import next from "next";

const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

export default async function handler(req, res) {
  await app.prepare();
  const server = express();
  server.use(express.json());

  // Let Next.js handle all requests
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  return server(req, res);
}
