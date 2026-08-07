# Histórico de Ajustes da Home Page — Fundação Net do Bem (Versão V4)

**Data de Realização:** 07 de Agosto de 2026  
**Repositório:** [https://github.com/substratodigital/ong.git](https://github.com/substratodigital/ong.git)  
**URL de Produção (Vercel):** [https://net-do-bem.vercel.app/](https://net-do-bem.vercel.app/)

---

## 1. Resumo Executivo das Alterações

Nesta versão (V4), a home page da Fundação Net do Bem passou por atualizações pontuais de conteúdo, componentes interativos e responsividade, preservando rigorosamente as diretrizes do design system:
- **Fontes:** Muller (títulos display) e Montserrat (corpo de texto)
- **Cores & Tokens:** HSL / HEX institucionais (`--brand`, `--brand-deep`, `--brand-text`, `--brand-soft`, `--paper`, etc.)
- **Responsividade:** Suporte completo para Mobile (<600px), Tablet (600-899px) e Desktop (>=900px).

---

## 2. Detalhamento por Seção

### 2.1. Seção 00 — Hero (`#inicio`)
- **Remoção da Nota de Apoio:** A frase/caixa `<p className="hero__note">` contendo *"Não atendemos diretamente: fortalecemos quem já cuida."* foi totalmente removida para deixar a dobra principal mais limpa e focada no CTA.
- **Animações GSAP:** A linha da timeline do GSAP referente à classe `.hero__note` foi ajustada para evitar erros em tempo de execução.

### 2.2. Seção 01 — Nossa História (`#quem-somos`)
- **Texto Institucional:** O terceiro parágrafo foi ajustado para:
  > *"A Fundação assessora e fortalece as organizações responsáveis pelo acolhimento por meio de pesquisa, capacitação, consultoria, advocacy e mobilização de recursos."*
- **Carrossel de Colaboradores (Pasta `/v4/`):**
  - Integração dos 3 avatares da equipe principal:
    1. **Patrícia Galheigo** — Setor: *Operação* | Especialidade: *Psicóloga* (`/v4/patricia-operacoes-netdobem.webp`)
    2. **Agda Ximenes** — Setor: *Estratégia* | Especialidade: *Assistente Social* (`/v4/agda-estrategia-net-do-bem.webp`)
    3. **Andre Facciolli** — Setor: *Fundador* | Especialidade: *Fundador da Fundação Net do Bem* (`/v4/founder-net-do-bem.webp`)
  - **Autoplay & Pausa no Hover:** Rotação automática a cada 4 segundos com pausa inteligente quando o cursor estiver sobre o card ou quando o modal de bio estiver aberto.
  - **Legenda dos Cards:**
    - Padrão de nome: Primeiro e último nome com apenas a inicial em maiúsculo (Title Case: *Patrícia Galheigo*, *Agda Ximenes*, *Andre Facciolli*).
    - Abaixo do nome: Exibição do setor da pessoa (*Operação*, *Estratégia*, *Fundador*).
    - **Botão `BIO →`**: Texto em fonte branca por padrão, transicionando para a cor preta com fundo branco ao passar o `hover`.
- **Popup Fullscreen Responsivo (Mini CV):**
  - Clique em qualquer colaborador abre um modal em tela cheia com *backdrop blur* (desfoque de fundo).
  - Exibe o mini currículo/trajetória completa de cada profissional com divisões de experiência profissional e atuação.
  - Fechamento flexível: botão `X`, clique no fundo escuro ou pressionando a tecla `ESC`.

### 2.3. Seção 02 — Propósito Institucional (`#proposito`)
- **4 Cards Expansivos Interativos:**
  1. **Objetivo:** *"Fortalecer organizações que protegem a infância."*
  2. **Missão:** *"Transformar cuidado em capacidade institucional."*
  3. **Visão:** *"Uma rede de referência, proteção e oportunidades."*
  4. **Valores:** *"Compromisso com a infância"* (Integrando a lista completa com os 9 princípios e tópicos institucionais).
- **Alinhamento no Mobile:** Todos os cards do propósito e a lista de marcadores de valores foram alinhados à esquerda (`text-align: left`) no mobile para otimizar a leitura em telas menores.

### 2.4. Remoção da Seção Antiga de Valores
- A antiga seção `05 — Nossos valores` com o baralho de 9 cards foi descontinuada, unificando os valores dentro do card 4 do Propósito Institucional e reduzindo o peso do carregamento da página.

### 2.5. Renumeração Sequencial das Seções
1. `01 — Nossa história` (`#quem-somos`)
2. `02 — Propósito institucional` (`#proposito`)
3. `03 — Como atuamos` (`#como-atuamos`)
4. `04 — A jornada` (`#jornada`)
5. `05 — Impacto em construção` (`#impacto`)
6. `06 — Transparência` (`#transparencia`)
7. `07 — Faça parte` (`#ajude`)

---

## 3. Arquivos Modificados / Criados

- `src/App.tsx`: Estrutura de dados `TeamMember`, componente do carrossel, modal de mini CV e 4 cards de propósito expansivos.
- `src/styles.css`: Estilos `.team-carousel`, `.team-modal`, `.purpose-card` e regras de alinhamento à esquerda no breakpoint mobile.
- `public/v4/`: Avatares em formato `.webp` dos colaboradores.
- `docs/historico-ajustes-v4.md`: Este documento de registro.

---

## 4. Instruções para Futuras Atualizações

1. **Adicionar novos colaboradores ao carrossel:**
   - Adicionar a imagem `.webp` em `public/v4/`.
   - Incluir um novo objeto no array `teamMembers` em `src/App.tsx` seguindo o formato da interface `TeamMember`.
2. **Atualizar valores ou propósitos:**
   - Editar a lista `purposeCards` localizada no topo de `src/App.tsx`.
