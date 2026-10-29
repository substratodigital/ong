# Lançamento Oficial V5 — Fundação Net do Bem

Esta pasta `V5` reúne os ativos, documentos renomeados e referências da versão de lançamento oficial do site `https://www.netdobem.org.br/`.

## 1. Documentos de Transparência (Hospedados no Git / Vercel)
Os documentos foram padronizados conforme os tópicos da seção **Transparência** e copiados tanto em `V5/documentos/` quanto em `public/v5/documentos/` (servidos diretamente pela CDN da Vercel):

- **Tópico Institucional:**
  - `institucional-ata-constituicao.pdf` (`/v5/documentos/institucional-ata-constituicao.pdf`)
  - `institucional-estatuto-social.pdf` (`/v5/documentos/institucional-estatuto-social.pdf`)
  - `institucional-cartao-cnpj.pdf` (`/v5/documentos/institucional-cartao-cnpj.pdf`)
- **Tópico Planejamento:**
  - `planejamento-plano-estrategico.pdf` (`/v5/documentos/planejamento-plano-estrategico.pdf`)
- **Tópico Integridade:**
  - Direciona para o canal de integridade/contato na página `/contato`.

## 2. Configuração do Resend + Cloudflare Turnstile na Vercel
No painel do projeto na Vercel (**Settings → Environment Variables**), adicione:

1. `RESEND_API_KEY`: Sua API Key gerada no painel do [Resend](https://resend.com/api-keys) (com o domínio `netdobem.org.br` verificado).
2. `CONTACT_TO_EMAIL`: `site@netdobem.org.br` (já configurado como padrão caso omitido).
3. `RESEND_FROM_EMAIL`: `Fundação Net do Bem <site@netdobem.org.br>`
4. `VITE_TURNSTILE_SITE_KEY`: Site Key gerada no painel da Cloudflare (Turnstile).
5. `TURNSTILE_SECRET_KEY`: Secret Key gerada no painel da Cloudflare (Turnstile).

