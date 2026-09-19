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

Repositório: **https://github.com/leonardomendes201704/pap-calculadora-magica**

Site público (HTTPS, ambiente **LAB/staging** — badge na página):

**https://leonardomendes201704.github.io/pap-calculadora-magica/**

Deploy: branch `main`, pasta raiz (`/`), GitHub Actions workflow `pages` (static HTML, sem build). Ponto de entrada: `index.html`.

## Comportamento

- Operações encadeadas: primeiro número → operador → segundo número → `=`.
- Divisão por zero e expressão inválida: mensagem **«Ops! Tenta outra vez»** e display **—**.
- Acerto após `=`: mensagens rotativas («Muito bem!», «Isso aí!», «Boa!»).
- Spec visual: issue [PAP-5](/PAP/issues/PAP-5) (paleta, grid, feedback).
