# Calculadora Mágica (PAP-3)

Calculadora estática **mobile-first** para crianças (5–10 anos). HTML, CSS e JavaScript vanilla — sem build, sem login, sem analytics de terceiros.

## Rodar localmente

Na pasta do projeto:

```bash
python3 -m http.server 8080
```

Abra `http://localhost:8080/` no navegador (teste em portrait no celular ou nas DevTools).

Alternativa com Node:

```bash
npx --yes serve -p 8080
```

## Arquivos

| Arquivo       | Função                          |
|---------------|---------------------------------|
| `index.html`  | Estrutura e teclado 4×4         |
| `styles.css`  | Tokens PAP-5, layout, feedback  |
| `app.js`      | Lógica +, −, ×, ÷, C, =         |

## Publicação (GitHub Pages — lab)

Repositório canônico: **https://github.com/leonardomendes201704/pap-3-calculadora-magica-lab**

URL HTTPS planejada (após habilitar Pages em Settings → Pages, branch `main`, pasta `/`):

**https://leonardomendes201704.github.io/pap-3-calculadora-magica-lab/**

Ambiente **LAB/staging** (badge na UI). Site estático na raiz do repo — sem build. Entrada: `index.html`.

> Release (PAP-8): código FE em `main`; falta grant/scopes para `POST /pages` via API — ver [PAP-11](/PAP/issues/PAP-11).

## Comportamento

- Operações encadeadas: primeiro número → operador → segundo número → `=`.
- Divisão por zero e expressão inválida: mensagem **«Ops! Tenta outra vez»** e display **—**.
- Acerto após `=`: mensagens rotativas («Muito bem!», «Isso aí!», «Boa!»).
- Spec visual: issue [PAP-5](/PAP/issues/PAP-5) (paleta, grid, feedback).
