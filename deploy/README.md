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

## VPS company (descoberta day-0)

| Item | Valor |
|------|--------|
| Caddy | Container `deploy-caddy-1` (`/opt/instaads/deploy/Caddyfile`) |
| TLS | Let's Encrypt (já ativo em `preview.insta-ads.online`) |
| Site root lab | `/srv/lm-studios/previews/pap-3-calculadora-magica-lab/` |
| **URL HTTPS lab** | **https://preview.insta-ads.online/pap-3-calculadora-magica-lab/** |

O bloco `preview.insta-ads.online` já faz `file_server` em `/srv/lm-studios/previews` — **não é obrigatório** editar o Caddyfile para o caminho padrão (mesmo padrão que `qa-test`).

**Governança:** aguardar aprovação [Plano B](/PAP/approvals/ff57d1d9-5bab-49b9-88c7-8b413e4a1eb0) em [PAP-11](/PAP/issues/PAP-11) antes de gravar em `/srv/lm-studios/previews`.

## Sincronizar para a VPS

Na VPS, como usuário `paperclip`, a partir da raiz do repo:

```bash
bash deploy/deploy-static.sh
```

Se o agente roda como `company` (sem `runuser`), cópia equivalente via Docker:

```bash
docker run --rm \
  -v /srv/lm-studios/previews:/previews \
  -v "$(pwd):/src:ro" alpine:3.20 sh -c \
  'mkdir -p /previews/pap-3-calculadora-magica-lab && cp /src/index.html /src/styles.css /src/app.js /previews/pap-3-calculadora-magica-lab/ && chown -R 999:982 /previews/pap-3-calculadora-magica-lab'
```

Alternativa remota (`rsync`):

```bash
export VPS=paperclip@srv1956148.hstgr.cloud
export SITE_ROOT=/srv/lm-studios/previews/pap-3-calculadora-magica-lab
rsync -avz ./index.html ./styles.css ./app.js "$VPS:$SITE_ROOT/"
```

## Caddy (hostname dedicado — opcional)

1. Copiar `Caddyfile.example` ou adicionar bloco em `/opt/instaads/deploy/Caddyfile`.
2. DNS `LAB_HOST` → VPS; recarregar: `docker compose -f /opt/instaads/deploy/docker-compose.yml exec caddy caddy reload --config /etc/caddy/Caddyfile`

Para systemd Caddy standalone, use `caddy validate` + `systemctl reload caddy` conforme `Caddyfile.example`.

## Verificação

- `curl -sI "https://$LAB_HOST/"` → **200**
- Abrir no celular (sem VPN): badge **LAB / staging** visível na UI
- Release registra `preview_url` em PAP-8 com a URL final

## Rollback

```bash
rm -rf /srv/lm-studios/previews/pap-3-calculadora-magica-lab
```

Backup opcional antes do deploy: `tar -czf /tmp/pap-3-lab-backup.tgz -C /srv/lm-studios/previews pap-3-calculadora-magica-lab`. Documentar commit em comentário na issue de deploy.

## GitHub Pages (não usado no Plano B)

Pages permanece desabilitado; o repo GitHub é apenas **source control**. Histórico day-0: [PAP-10](/PAP/issues/PAP-10).
