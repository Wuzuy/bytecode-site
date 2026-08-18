# ByteCode — Site de Exibição

Site público para apresentar o projeto **ByteCode**: controle de acesso industrial em realidade virtual,
com autenticação corporal (traços da mão) e visão computacional.

Exibe o projeto sem necessidade do óculos VR — com prints do ambiente virtual reproduzidos em HTML.

## Páginas

- `index.html` — conceito, problema, solução e pilares.
- `vr.html` — reprodução dos estados de autenticação do protótipo Unity (sem acesso, autenticando, autorizado, não autorizado), leitura biométrica da mão e visão do porteiro.
- `dashboard.html` — Central de Segurança: métricas, logs de acesso, usuários/papéis (RBAC) e simulador de API.

## Como rodar localmente

Abra `index.html` no navegador, ou:

```bash
npx serve .
```

## Publicação

O site é publicado via GitHub Pages (branch `main`).

---

Projeto ByteCode · parceria de desenvolvimento.