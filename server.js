// Servidor estático simples (zero dependências) para o site ByteCode.
// Uso: npm start  →  http://localhost:4000
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const PORT = process.env.PORT || 4000;

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