/**
 * Zero-dependency static file server for local development.
 * Serves the current directory on http://localhost:3001
 *
 * Usage:
 *   npm run build   (compiles + bundles src/agent.ts -> dist/agent.js)
 *   npm start       (serves this folder on port 3001)
 *
 * Once running, upload public/agent-schema.json in the HERE Admin Console
 * to register this as a custom search agent. See README.md for details.
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
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
	".ico": "image/x-icon"
};

const server = http.createServer((req, res) => {
	let requestPath = decodeURIComponent((req.url || "/").split("?")[0]);
	if (requestPath === "/") requestPath = "/public/agent.html";

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
	console.log(`\nHERE.io custom search agent running at http://localhost:${PORT}\n`);
	console.log(`Agent page:    http://localhost:${PORT}/public/agent.html`);
	console.log(`Agent schema:  http://localhost:${PORT}/public/agent-schema.json`);
	console.log(`Data source:   http://localhost:${PORT}/public/data/contacts.json\n`);
});
