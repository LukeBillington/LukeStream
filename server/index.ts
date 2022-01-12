import { createServer } from "https";
import fs from "fs";
import next from "next";
import express from "express";
import proxy from "express-http-proxy";
import { Config } from "../client/types";
import socketConnection from "./socketConnection";

let config: Config & unknown = {
  port: 3000,
  certs: {
    key: "server.key",
    cert: "server.cert",
    ca: null,
  },
  reverseProxy: "cdn.example.com",
  movie: {
    movie: "movies/big-buck-bunny-2008/movie.mp4",
    subtitles: "movies/big-buck-bunny-2008/captions/english.vtt",
    thumbs: "movies/big-buck-bunny-2008/thumbs",
    title: "Big Buck Bunny",
    year: 2008,
  },
};

try {
  if (fs.existsSync("config.json")) {
    const configFile = fs.readFileSync("config.json");
    config = { ...config, ...JSON.parse(configFile.toString()) };
  } else {
    fs.writeFileSync("config.json", JSON.stringify(config));
  }
} catch (err) {
  fs.writeFileSync("config.json", JSON.stringify(config));
}

const dev = process.env.NODE_ENV !== "production";

const nextApp = next({ dev });
const nextRoutes = nextApp.getRequestHandler();

const expressApp = express();

expressApp.use("/stream-proxy", proxy(config.reverseProxy));

expressApp.use(
  "/static-proxy",
  proxy(config.reverseProxy, {
    userResHeaderDecorator: (headers, userReq, userRes) => {
      const newHeaders = headers;
      const url = userRes.req?.url;
      if (url?.substr(url.length - 4) === ".vtt") {
        newHeaders["content-type"] = "text/vtt";
      }
      return headers;
    },
  })
);

expressApp.get("/movie-conf", (req, res) => {
  res.send(JSON.stringify(config.movie));
});

expressApp.get("*", (req, res) => {
  return nextRoutes(req, res);
});

nextApp.prepare().then(() => {
  const server = createServer(
    {
      key: fs.readFileSync(config.certs.key),
      cert: fs.readFileSync(config.certs.cert),
      ca: config.certs.ca ? fs.readFileSync(config.certs.ca) : undefined,
    },
    expressApp
  );

  socketConnection(server);

  server.listen(config.port);
});
