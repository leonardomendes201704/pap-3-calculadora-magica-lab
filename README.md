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

## Publicação (lab/staging HTTPS)

Repositório canônico (fonte do FE): **https://github.com/leonardomendes201704/pap-3-calculadora-magica-lab**

| Caminho | Uso |
|---------|-----|
| **Plano B (ativo)** | Caddy na VPS company — ver [`deploy/README.md`](deploy/README.md) e [`deploy/Caddyfile.example`](deploy/Caddyfile.example) |
| GitHub Pages | Não usado; repo é só source ([PAP-11](/PAP/issues/PAP-11) decisão Owner) |

**URL HTTPS lab:** entregue pelo CTO em [PAP-12](/PAP/issues/PAP-12); Release registra `preview_url` em [PAP-8](/PAP/issues/PAP-8) quando estiver **200** no mobile.

Ambiente **LAB/staging** (badge na UI). Site estático — sem build. Entrada: `index.html`.

## Comportamento

- Operações encadeadas: primeiro número → operador → segundo número → `=`.
- Divisão por zero e expressão inválida: mensagem **«Ops! Tenta outra vez»** e display **—**.
- Acerto após `=`: mensagens rotativas («Muito bem!», «Isso aí!», «Boa!»).
- Spec visual: issue [PAP-5](/PAP/issues/PAP-5) (paleta, grid, feedback).
