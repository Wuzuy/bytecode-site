// Servidor estático simples (zero dependências) para o site ByteCode.
// Uso: npm start  →  http://localhost:4000
// /api/* é PROXY para o backend real (igual ao vercel.json no deploy).
import { createServer } from 'node:http';
import { request } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const PORT = process.env.PORT || 4000;
const BACKEND = process.env.BACKEND || 'http://177.202.185.67:30051';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = createServer(async (req, res) => {
  try {
    // Proxy /api/* → backend real (mesmo comportamento do Vercel).
    if (req.url.startsWith('/api/')) {
      const alvo = new URL(req.url.slice(4), BACKEND);
      const p = request(alvo, { method: req.method, headers: req.headers }, (pr) => {
        res.writeHead(pr.statusCode, pr.headers);
        pr.pipe(res);
      });
      p.on('error', () => {
        res.writeHead(502, { 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'Backend offline' }));
      });
      req.pipe(p);
      return;
    }

    let caminho = decodeURIComponent((req.url || '/').split('?')[0]);
    if (caminho === '/') caminho = '/index.html';
    const arquivo = normalize(join(ROOT, caminho));
    if (!arquivo.startsWith(ROOT)) {
      res.writeHead(403).end('Proibido');
      return;
    }
    const conteudo = await readFile(arquivo);
    res.writeHead(200, { 'Content-Type': MIME[extname(arquivo)] || 'application/octet-stream' });
    res.end(conteudo);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Não encontrado');
  }
});

server.listen(PORT, () => {
  console.log(`ByteCode site em http://localhost:${PORT}`);
});