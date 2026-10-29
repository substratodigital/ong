# Histórico Oficial de Updates — Versão 5 (V5)
**Data:** 28 a 29 de Outubro de 2026  
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
  `(15) 99187-7880` com link direto para WhatsApp e ícone em `#ffffff`.
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
