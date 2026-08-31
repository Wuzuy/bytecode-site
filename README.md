# ByteCode — Site de Exibição

Site público para apresentar o projeto **ByteCode**: controle de acesso industrial em realidade virtual,
com autenticação corporal (traços da mão) e visão computacional.

Exibe o projeto sem necessidade do óculos VR — com prints do ambiente virtual reproduzidos em HTML.

## Páginas

- `index.html` — conceito, problema, solução e pilares.
- `vr.html` — reprodução dos estados de autenticação do protótipo Unity (sem acesso, autenticando, autorizado, não autorizado), leitura biométrica da mão e visão do porteiro.
- `dashboard.html` — Central de Segurança: métricas, logs de acesso, usuários/papéis (RBAC) e simulador de API.
- `biometria.html` — gestão dos cadastros das mãos (API real: 3D, impressão palmar, remover).
- `acessos.html` — histórico de acessos (API real) + limpar.
- `hud-demo.html` — réplica da HUD do kiosk (Quest) para apresentação.

## Como rodar localmente

```bash
node server.js   # http://localhost:4000
```

O servidor faz proxy de `/api/*` para o backend real (mesmo comportamento do Vercel).

## Publicação

Deploy no **Vercel** (framework *Other*): `vercel.json` configura o proxy `/api/*` para o
backend e as URLs limpas. O site não tem `package.json` de propósito — sem ele o Vercel
serve o diretório como estático puro (todos os arquivos).

---

Projeto ByteCode · parceria de desenvolvimento.