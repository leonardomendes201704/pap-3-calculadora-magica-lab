# Deploy lab/staging — Caddy VPS (Plano B)

Decisão Owner ([PAP-11](/PAP/issues/PAP-11)): **HTTPS via Caddy** na VPS company. O repositório GitHub permanece **fonte do FE**; a URL pública é servida pelo Caddy.

**Owner infra:** [PAP-12](/PAP/issues/PAP-12) (CTO) — URL final + TLS.  
**Publish / `preview_url`:** [PAP-8](/PAP/issues/PAP-8) (Release) após handoff da URL.

## Artefato estático

Sem build. Publicar estes arquivos na raiz do site:

- `index.html`
- `styles.css`
- `app.js`

Origem canônica: branch `main` de [pap-3-calculadora-magica-lab](https://github.com/leonardomendes201704/pap-3-calculadora-magica-lab).

## Sincronizar para a VPS

Exemplo (ajustar host e caminho):

```bash
export VPS=user@lab-vps.example
export SITE_ROOT=/var/www/pap-3-calculadora-lab

rsync -avz --delete \
  ./index.html ./styles.css ./app.js \
  "$VPS:$SITE_ROOT/"
```

Ou `git clone` / `git pull` no `$SITE_ROOT` se o CTO preferir deploy por git na VPS.

## Caddy

1. Copiar `Caddyfile.example` para o path usado na VPS.
2. Definir variáveis de ambiente (systemd drop-in ou `/etc/caddy/env`):

   - `LAB_HOST` — hostname público (ex. `calculadora-lab.example.com`)
   - `SITE_ROOT` — diretório com os três arquivos estáticos

3. Validar e recarregar:

```bash
caddy validate --config /etc/caddy/Caddyfile
systemctl reload caddy
```

Caddy obtém certificado TLS (Let's Encrypt) automaticamente quando `LAB_HOST` resolve para a VPS.

## Verificação

- `curl -sI "https://$LAB_HOST/"` → **200**
- Abrir no celular (sem VPN): badge **LAB / staging** visível na UI
- Release registra `preview_url` em PAP-8 com a URL final

## Rollback

Manter cópia anterior do `$SITE_ROOT` ou checkout git anterior; `rsync` com snapshot ou `git revert` + reload Caddy. Documentar tag/commit em comentário na issue de deploy.

## GitHub Pages (não usado no Plano B)

Pages permanece desabilitado; o repo GitHub é apenas **source control**. Histórico day-0: [PAP-10](/PAP/issues/PAP-10).
