# Histórico Oficial de Updates — Versão 5 (V5)
**Data inicial:** 28 a 29 de Outubro de 2026  
**Última atualização:** 09 de Novembro de 2026  
**Projeto:** Fundação Net do Bem — Lançamento Oficial  
**URL:** [https://www.netdobem.org.br/](https://www.netdobem.org.br/)  
**Repositório:** [https://github.com/substratodigital/ong](https://github.com/substratodigital/ong) (Deploy automático via Vercel)

---

## 📌 Ponto de Partida e Estrutura Arquitetural da V5

A versão V5 representa a consolidação do site institucional e das ferramentas de captação e transparência para o lançamento oficial. Todos os arquivos de backup e referência estão mantidos nesta pasta `V5/` para servir de ponto de partida seguro e reprodutível.

```
V5/
├── App.tsx                     # Componente principal do site (One-Page + roteamento de visualização)
├── ContactPage.tsx             # Nova página de Contato, Doação e QR Code PIX
├── styles.css                  # Estilos globais polidos e responsivos (Desktop, Tablet e Mobile)
├── contact-api.ts              # Endpoint serverless /api/contact (Resend + Turnstile)
├── config-api.ts               # Endpoint serverless /api/config (Runtime Site Key)
├── index.html                  # HTML base com Google Analytics gtag.js configurado
├── vercel.json                 # Regras de rewrite para /contato e /doar
├── README-V5.md                # Guia técnico e checklist de variáveis de ambiente
├── HISTORICO-UPDATES-V5.md     # Este documento detalhado com todo o changelog
├── documentos/                 # PDFs de transparência renomeados para o padrão oficial
│   ├── institucional-ata-constituicao.pdf
│   ├── institucional-cartao-cnpj.pdf
│   ├── institucional-estatuto-social.pdf
│   └── planejamento-plano-estrategico.pdf
└── DOCUMENTOS TRANSPARENCIA/   # Arquivos originais recebidos
```

---

## 📝 Registro Completo de Mudanças Realizadas

### 1. Limpeza de Layout e Remoção de Numerações
- **Remoção de prefixos artificiais:** Eliminados todos os números que antecediam títulos de seção (`01 — Nossa história`, `02 — Propósito institucional`, `03 — Como atuamos`, `04 — A jornada`, `05 — Impacto em construção`, `06 — Transparência`, `07 — Faça parte`).
- **Remoção de numeração interna em cards:**
  - Seção *Como atuamos*: removidos os marcadores `01` a `04` do topo dos 4 cards de pilares.
  - Seção *A jornada*: removidos os números `01` a `04` antes de cada etapa do processo.
  - Seção *Transparência*: removida a numeração que antecedia o título de cada sanfona/acordeão.

### 2. Seção "Impacto em Construção"
- **Novos Ícones Minimalistas:** Substituição dos numerais `01` a `04` por ícones em traço fino vazado (`stroke`, sem preenchimento, espessura `1.6`), na cor branca `#ffffff` sobre o card verde:
  - `Building2` para *Organizações fortalecidas*
  - `GraduationCap` para *Profissionais capacitados*
  - `ClipboardCheck` para *Planos de melhoria implantados*
  - `Coins` para *Recursos mobilizados*

### 3. Reestruturação da Seção Transparência & Documentos Oficiais
- **Remoção de item desnecessário:** Excluído o card "Financeiro e impacto" (que ainda não continha documentos aplicáveis no lançamento).
- **Consolidação em 3 tópicos:**
  1. **Institucional:** disponibiliza para download direto os 3 documentos:
     - `Ata de Constituição (PDF)` (`/v5/documentos/institucional-ata-constituicao.pdf`)
     - `Estatuto Social (PDF)` (`/v5/documentos/institucional-estatuto-social.pdf`)
     - `Comprovante de CNPJ (PDF)` (`/v5/documentos/institucional-cartao-cnpj.pdf`)
  2. **Planejamento:**
     - `Plano Estratégico Institucional (PDF)` (`/v5/documentos/planejamento-plano-estrategico.pdf`)
  3. **Integridade:**
     - Link direto para o canal de integridade e contato.
- **Hospedagem:** Os arquivos foram alocados em `public/v5/documentos/` para entrega de altíssima performance via CDN global da Vercel através do próprio versionamento do Git.

### 4. Simplificação do Rodapé (Footer)
- Mantido o logotipo branco oficial da Fundação.
- Removido o campo provisório *"E-mail institucional em definição"* e a grade extensa de sublinks repetidos.
- **Endereço físico oficial adicionado:**
  `Av. Antônio Carlos Comitre, 1074 — Parque Campolim, Sorocaba — SP • CEP 18047-620` (com ícone de localização em `#ffffff`).
- **Contato telefônico e WhatsApp oficial:**
  `(15) 99100-3425` com link direto para WhatsApp e ícone em `#ffffff`.
- **Botão Flutuante de WhatsApp:** Ícone oficial responsivo fixado no canto inferior direito com animação de pulso e link direto `https://wa.me/5515991003425`.
- Navegação simplificada alinhada ao menu superior: `Quem somos`, `Como atuamos`, `Impacto`, `Transparência`, `Contato` e botão de destaque `Quero ajudar`.

### 5. Nova Página de Contato e Captação via PIX (`/contato` e `/doar`)
- Criação do componente `ContactPage.tsx` e integração nativa com o roteamento da aplicação.
- **Seletor Principal:**
  - *Para Doações e Parcerias*
  - *Casas de Acolhimento*
- **Sub-seletores para Doações:**
  - *Pessoa Física:* Nome completo, E-mail, WhatsApp, Mensagem.
  - *Pessoa Jurídica:* Empresa, Contato/Responsável, E-mail, WhatsApp, Mensagem.
- **Campos para Casas de Acolhimento:** Instituição, Contato/Responsável, E-mail, WhatsApp, Mensagem.
- **Textos Contextuais (Copywriting):** Mensagens orientadoras para cada público selecionado com tipografia equilibrada contra quebras órfãs.
- **QR Code PIX Animado:**
  - Vinculado à chave CNPJ: `69.084.154/0001-05`.
  - Padrão EMV BR Code oficial do Banco Central gerado dinamicamente (`qrcode.react`).
  - Efeitos visuais modernos: anéis orbitais com pulso suave, cantoneiras estilizadas e linha de scanner animada contínua.
  - Botão de um clique para copiar a chave CNPJ e botão para copiar o código Copia e Cola completo.
- **Card de Atendimento Direto:** Exibição do telefone/WhatsApp, e-mail `site@netdobem.org.br` e endereço físico.

### 6. Integração do Backend Serverless (Resend + Cloudflare Turnstile)
- Criação de `api/contact.ts` integrado à API oficial do Resend para envio automático de notificações formatadas para `site@netdobem.org.br`.
- Proteção contra bots com **Cloudflare Turnstile**, incluindo validação segura de token via backend (`challenges.cloudflare.com/turnstile/v0/siteverify`).
- Criação de `api/config.ts` para fornecimento da *Site Key* em tempo de execução, garantindo funcionamento ininterrupto tanto em build estático quanto em preview.
- Preservação da regra no `vercel.json` permitindo rotas amigáveis sem interferir na aplicação `/mvp`.

### 7. Google Analytics (GA4)
- Inclusão da tag oficial de monitoramento no `<head>` do `index.html`:
  ```html
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-HXF8TB2BEZ"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-HXF8TB2BEZ');
  </script>
  ```

### 8. Polimento Visual & Ajustes Finos de Cores e Contraste
- **Hero:** Travessão inicial antes de *"Uma rede de cuidado que transforma"* alterado de vermelho/coral para o verde oficial da marca.
- **Carrossel da Equipe:** Texto e seta `BIO ->` corrigidos para branco `#ffffff` no fundo verde, com inversão harmoniosa no hover.
- **Card Objetivo:** Palavra e ícone alterados para branco `#ffffff`; botão circular de expansão com contraste balanceado no hover.
- **Impacto:** Ícones novos padronizados em branco `#ffffff`.
- **Footer:** Título *"Onde estamos e contato"*, ícone de mapa e ícone de telefone padronizados em branco `#ffffff`.

### 9. Responsividade Mobile e Ajustes Tipográficos (Android / iOS)
- Eliminação total de vazamentos horizontais (*overflow-x*) em telas pequenas.
- Ajuste das larguras e margens do container, inputs e card do QR Code no mobile.
- Aplicação de `text-wrap: balance`, `text-wrap: pretty` e espaçamentos não-quebráveis (`&nbsp;`) para evitar palavras viúvas em títulos, abas e parágrafos institucionais.
- Preservação total dos arquivos e rotas da pesquisa em `/mvp`.

### 10. Atualização de Contato WhatsApp e Botão Flutuante (05/11/2026)
- **Correção do número oficial de WhatsApp:**
  - Atualizado para **`(015) 99100-3425`** / link internacional `https://wa.me/5515991003425`.
  - Aplicado no rodapé institucional (`App.tsx`) e na seção de Atendimento Direto da página de contato (`ContactPage.tsx`).
- **Botão Flutuante Responsivo de WhatsApp:**
  - Implementado com ícone oficial SVG em verde `#25d366` e sombra com profundidade.
  - Efeito de pulso suave contínuo (`@keyframes whatsapp-pulse`).
  - **Posicionamento final:** canto inferior **direito** (`right: clamp(16px, 3vw, 28px)` e `bottom: clamp(18px, 3.5vw, 30px)` no desktop; `14px / 16px` no mobile).
  - Tooltip animado surgindo à esquerda do botão (*"Fale conosco no WhatsApp"*), com desativação em telas touch para não poluir a interface mobile.
  - Mensagem inicial pré-formatada: *"Olá! Gostaria de falar com a Fundação Net do Bem."*

### 11. Nova Página e Rota Oficial de Convite (`/convite`) (06/11/2026)
- **Criação da rota `/convite` (e `/inauguracao`):**
  - Integração no `vercel.json` e no roteador do React (`App.tsx`).
  - Criação do componente isolado e responsivo `InvitePage.tsx`.
- **Embed Seguro do Tally Forms (`Qo1jd8`):**
  - **Sandboxing do iframe:** `sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation-by-user-activation"` protegendo o site hospedeiro contra acessos não autorizados a cookies ou scripts do domínio principal.
  - **Isolamento de dados:** O formulário Tally processa dados e submissões nos servidores certificados e em conformidade GDPR do Tally via HTTPS/TLS, sem expor chaves ou credenciais sensíveis da aplicação.
  - **Suporte a parâmetros dinâmicos de URL:** Preservação automática de query parameters (`?ref=...&email=...`) repassados para o iframe.
  - **Carregamento dinâmico e responsivo:** integração com `embed.js` do Tally para cálculo automático de altura (`dynamicHeight=1`), eliminando barras de rolagem duplas.
  - Tela de carregamento (*skeleton spinner*) suave até o formulário estar pronto.

### 12. Cabeçalhos de Segurança HTTP e Ícone Oficial do Instagram (06/11/2026)
- **Implementação de Cabeçalhos HTTP de Segurança (`vercel.json`):**
  - `X-Content-Type-Options: nosniff` (impede MIME-sniffing malicioso).
  - `X-Frame-Options: SAMEORIGIN` (proteção contra clickjacking).
  - `Referrer-Policy: strict-origin-when-cross-origin` (privacidade em navegações externas).
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()` (restringe sensores desnecessários).
- **Adição do Instagram Oficial no Footer e Contato:**
  - Link configurado para `https://www.instagram.com/fundacao.netdobem/`.
  - Botão estilizado com ícone Lucide `Instagram`, transição gradiente da marca e hover animado.
  - Adicionado no rodapé (`App.tsx`) ao lado do WhatsApp e no card de Atendimento Direto da página de contato (`ContactPage.tsx`).

### 13. Auditoria Técnica Global e Diagnóstico de Bloqueio Corporativo (06/11/2026)
- **Auditoria de Infraestrutura em Produção (100% Operacional):**
  - **HTTP Status:** `200 OK` instantâneo (~0.15s via CDN Vercel com Cache HIT).
  - **Certificado SSL/HTTPS:** Válido, Let's Encrypt com cabeçalho `Strict-Transport-Security: max-age=63072000` (HSTS de 2 anos).
  - **Cabeçalhos de Segurança HTTP:** `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin` e `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
  - **Autenticação de E-mail Institucional e DNS:**
    - `DMARC`: Ativo e em quarentena de proteção (`v=DMARC1; p=quarantine; rua=mailto:site@netdobem.org.br`).
    - `SPF`: Ativo (`v=spf1 include:spf.spacemail.com ~all`).
    - `DKIM (Resend)`: Chave criptográfica ativa e validada no subdomínio `resend._domainkey.netdobem.org.br`.
  - **Página de Convite (`/convite`):** Rota e embed do formulário Tally operando com sandboxing e ajuste de altura dinâmico.
- **Diagnóstico do Bloqueio em Redes Corporativas (Ex: sek.io / Empresas de Cibersegurança):**
  - **Origem do bloqueio:** O bloqueio não ocorre por falha no código, no servidor Vercel ou na configuração de DNS, mas sim dentro de máquinas corporativas equipadas com soluções de proxy/EDR (como Zscaler, Palo Alto Networks, Fortinet, CrowdStrike ou Microsoft Defender for Endpoint).
  - **Causa 1 — NRD (*Newly Registered Domain*):** Domínio registrado em 14/09/2026 (menos de 60 dias de vida). Políticas de segurança corporativa bloqueiam preventivamente domínios com menos de 30–90 dias de idade para proteção contra campanhas de *phishing* recém-criadas.
  - **Causa 2 — Categoria "Sem Classificação" (*Uncategorized / Unknown*):** Como o domínio foi colocado no ar recentemente, os motores globais de reputação (Palo Alto URL Filtering, FortiGuard, Zscaler, Cisco Talos) ainda não o haviam classificado sob a etiqueta institucional `Non-profit / NGO` (Organização sem fins lucrativos).
  - **Validação cruzada:** Em dispositivos móveis no 4G/5G (fora da VPN/Wi-Fi corporativo), o site abre normalmente e sem qualquer aviso.
- **Plano de Ação para Liberação:**
  1. *Ação Imediata Interna:* Solicitação de adição de `netdobem.org.br` à *whitelist* de navegação da equipe de TI/InfoSec da corporação.
  2. *Ação Global de Categorização:* Submissão do domínio nos portais oficiais de reputação de URL (Palo Alto Networks, FortiGuard Web Filter, Zscaler Site Review e Cisco Talos) solicitando a categoria **Non-profit / NGO**.

### 14. Correção e Eliminação da Barra de Rolagem Interna no Embed do Tally (`/convite`) (09/11/2026)
- **Causa Raiz Identificada:** O componente React renderizava o `<iframe>` contendo antecipadamente o atributo `src={...}` junto a `data-tally-src`. A biblioteca oficial do Tally (`embed.js`) utiliza estritamente o seletor `iframe[data-tally-src]:not([src])` para detectar embeds pendentes e instanciar o motor do `iframe-resizer`. Devido à presença prematura do `src`, o motor do Tally ignorava o elemento, impedindo o cálculo de altura em tempo real (`dynamicHeight=1`) e prendendo o formulário em uma altura fixa estática de 818px com barra de rolagem interna dupla no desktop e mobile.
- **Soluções Técnicas Aplicadas:**
  - **Ativação Nativa do `iframe-resizer`:** Removido o `src` direto do JSX mantendo apenas `data-tally-src`, permitindo que o `Tally.loadEmbeds()` inicialize o cálculo de altura dinâmico sem restrições.
  - **Eliminação de Scrollbar:** Inseridos `scrolling="no"`, `style={{ overflow: 'hidden' }}` e a regra CSS `.invite-iframe::-webkit-scrollbar { display: none; width: 0; height: 0; }`.
  - **Sincronização de Eventos:** Ouvinte ativo para mensagens `window.addEventListener('message')` capturando `Tally.FormLoaded`, `Tally.FormSizeChanged` e eventos `[iFrameSizer]`, além de fallback com timeout de segurança.
  - **Responsividade Mobile:** Ajuste fino nas margens e padding interno do container para evitar quebras em telas pequenas (Android/iOS).

### 15. Tarjamento e Omissão Permanente de Dados Sensíveis e Patrimônio na Ata de Constituição (09/11/2026)
- **Adequação e Proteção (LGPD & Transparência Institucional):**
  - **Omissão do Patrimônio Inicial:** O valor `R$ 1.000.000,00 (um milhão de reais)` na primeira página foi tarjado permanentemente através do mecanismo oficial de *Redaction* do PyMuPDF, purgando o texto subjacente dos fluxos de dados do PDF para que não seja copiável, selecionável ou pesquisável.
  - **Proteção Integral de Dados Pessoais (LGPD):** Tarjamento contínuo e alinhado de todas as informações pessoais dos membros da Diretoria Executiva, Conselho Curador, Conselho Fiscal e Suplentes:
    - Todos os números de CPF e RG (com órgãos emissores).
    - Datas de nascimento de todos os integrantes.
    - Endereços residenciais particulares de todas as pessoas físicas (preservando intacto apenas o endereço público oficial da sede da Fundação).
    - E-mails particulares pessoais (`@netbr.com.br`, `@gmail.com`, `@hotmail.com`).
    - Dados técnicos de auditoria do ZapSign (telefones móveis pessoais, IPs particulares e coordenadas geográficas de localização residencial/dispositivo).
  - **Distribuição e Atualização:** O arquivo sanitizado foi salvo diretamente na Área de Trabalho (`Desktop\institucional-ata-constituicao.pdf`), nos diretórios oficiais do projeto (`public/v5/documentos/` e `V5/documentos/`) e sincronizado para o link de download direto da seção Transparência.

---

## 🔒 Variáveis de Ambiente Necessárias na Vercel

Configuradas em **Project Settings → Environment Variables**:

| Variável | Tipo | Descrição |
| :--- | :--- | :--- |
| `RESEND_API_KEY` | Secret | Chave gerada no painel do Resend |
| `CONTACT_TO_EMAIL` | Config | `site@netdobem.org.br` |
| `RESEND_FROM_EMAIL` | Config | `Fundação Net do Bem <site@netdobem.org.br>` |
| `VITE_TURNSTILE_SITE_KEY` | Config | Site Key gerada no Cloudflare Turnstile |
| `TURNSTILE_SECRET_KEY` | Secret | Secret Key gerada no Cloudflare Turnstile |

