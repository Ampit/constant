import dotenv from "dotenv";
dotenv.config({ path: "./.env.development.local" });

import { createServer } from "http";
// import { parse } from "url";
import { createReadStream } from "fs";
import next from "next";
const PORT = process.env.NEXT_PUBLIC_PORT || 5000;
const HOST = process.env.NEXT_PUBLIC_HOST || "localhost";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // const parsedUrl = parse(req.url, true);
    const parsedUrl = new URL(req.url!, process.env.NEXT_PUBLIC_NEXTAUTH_URL ?? `http://${HOST}:${PORT}`);
    const { pathname } = parsedUrl;

    if (pathname === "/sw.js") {
      res.setHeader("content-type", "text/javascript");
      createReadStream("./serviceWorker.js").pipe(res);
    } else {
      handle(req, res, parsedUrl as any);
    }
  }).listen(PORT, () => {
    console.log(`> Ready on http://${HOST}:${PORT}`);
  });
});
