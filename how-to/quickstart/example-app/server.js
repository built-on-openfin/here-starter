/**
 * Zero-dependency static file server for local development.
 * Serves the current directory on http://localhost:3000
 *
 * Usage:
 *   npm run build   (compiles src/app.ts -> dist/app.js)
 *   npm start       (serves this folder on port 3000)
 *
 * Open the page:
 *   - In plain Chrome:  http://localhost:3000  (FDC3 features will show the
 *     "window.fdc3 not found" banner, since no FDC3 desktop agent is present)
 *   - In HERE Enterprise Browser: navigate to http://localhost:3000 as an app/
 *     tab so window.fdc3 is injected and every feature works end to end.
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
  let requestPath = decodeURIComponent((req.url || "/").split("?")[0]);
  if (requestPath === "/") requestPath = "/index.html";

  // Prevent path traversal outside the project root.
  const filePath = path.normalize(path.join(ROOT, requestPath));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end(`Not found: ${requestPath}`);
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\nHERE.io FDC3 example app running at http://localhost:${PORT}\n`);
  console.log("Open in plain Chrome to see the app without FDC3, or open inside");
  console.log("the HERE Enterprise Browser to see full FDC3 + Notifications support.\n");
});
