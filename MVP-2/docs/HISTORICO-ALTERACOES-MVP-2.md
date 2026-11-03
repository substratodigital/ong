# Histórico de Alterações e Evolução — MVP 2 (Pesquisa Institucional)
**Fundação Net do Bem**  
**Data:** 30 de Outubro de 2026  
**Ambiente de Produção:** [https://www.netdobem.org.br/mvp-2/](https://www.netdobem.org.br/mvp-2/)  
**Repositório GitHub:** `https://github.com/substratodigital/ong.git` (Branch `main`)  
**Versão Anterior Preservada:** [https://www.netdobem.org.br/mvp/](https://www.netdobem.org.br/mvp/)  

---

## 1. Visão Geral do MVP 2

O **MVP 2** foi desenvolvido para transformar o questionário institucional da Fundação Net do Bem em uma experiência fluida, acolhedora, visualmente rica e tecnicamente precisa, atendendo integralmente a todas as diretrizes das reuniões técnicas de análise, documentos de especificação (`V1.md`, `SPEC-TECNICA-UX-CARDS-E-PARABENS-MVP.md`) e ao protótipo interativo.

A versão original (`/mvp`) foi mantida 100% funcional e intocada em sua rota, permitindo comparações diretas, enquanto a nova versão foi publicada na rota `/mvp-2`.

---

## 2. Principais Alterações Implementadas Hoje

### A. Reestruturação do Questionário em 14 Blocos Temáticos (~10 questões por bloco)
O questionário anterior possuía blocos desbalanceados (com etapas de até 40 perguntas consecutivas). No MVP 2, organizamos **151 questões/telas** em **14 etapas enxutas e bem dosadas**:

1. **Etapa 1 — Sua entidade (`building-2`):** CNPJ no topo, cálculo automático do tempo de existência a partir de `MM/AAAA`, busca automática de endereço via **ViaCEP** com `UF = SP` pré-selecionada (editável), dados do gestor e conselhos.
2. **Etapa 2 — Estrutura (`home`):** Contadores rápidos estilo QuintoAndar para cômodos e mobiliário, acessibilidade, conectividade e computadores, **brinquedos por idade (`0-3`, `4-7`, `8-12`, `13-18 anos`)** com observação aberta, veículo próprio e **dispositivos de retenção infantil (bebê conforto, cadeirinha e assento de elevação)**.
3. **Etapa 3 — Cotidiano e acolhimento (`sun`):** Capacidade total autorizada, acolhidos no momento por faixa etária (com soma automática), acolhimentos e desligamentos nos últimos 12 meses, tempo médio de permanência, ordenação de motivos de acolhimento (1º, 2º e 3º lugar) e **sistema de apadrinhamento (Afetivo e Financeiro)**.
4. **Etapa 4 — Pessoas (`users`):** Quadro de colaboradores em seletores `[-]` e `[+]` incluindo **Coordenação Técnica**, **Coordenação Funcional** e **Supervisão (equipe externa)**, capacitação, cumprimento da NOB-RH/SUAS, rotatividade e campo aberto para desafios financeiros na contratação de especialistas.
5. **Etapa 5 — Governança (`shield-check`):** Subtítulo unificado *"Práticas"*, perguntas Sim/Não condicionais sobre conselho diretor atuante, reuniões periódicas, gestão de risco, compliance, publicação de balanço, auditoria e **retorno formal de prestação de contas aos financiadores**.
6. **Etapa 6 — Sustentabilidade (`wallet`):** Fontes de receita, dependência de verbas públicas e doações, reserva financeira, e régua de dificuldade de custeio com o **desmembramento oficial de Vestuário (roupas, calçados e enxoval) e Higiene (pessoal, fraldas e limpeza)**.
7. **Etapa 7 — Captação (`hand-coins`):** Instabilidade de doações, profissional dedicado, campanhas, **doações via Imposto de Renda desmembradas em PF e PJ (FIA/CMDCA)**, **editais desmembrados em Públicos e Privados**, doadores recorrentes e burocracia governamental vs empresarial.
8. **Etapa 8 — Saúde (`heart-pulse`):** Atendimento psicológico, psiquiátrico, odontológico e médico geral, preparação gradual para a saída na maioridade, e **avaliação direta do relacionamento com a Rede de Saúde (UBS, CAPS e hospitais)** com campo aberto para gargalos.
9. **Etapa 9 — Educação (`graduation-cap`):** Defasagem de aprendizagem, estigma, reforço escolar, motivação, socialização, capacitação de professores e **relação com a rede de ensino/escolas locais**.
10. **Etapa 10 — Atendimento (`heart-handshake`):** Pergunta binária e percentual sobre reparação de traumas, desafios psicossociais, **desmembramento técnico de Preparação para Adoção vs Preparação para Desacolhimento** e Plano Individual de Atendimento (PIA).
11. **Etapa 11 — Rede de proteção (`network`):** Grau de dificuldade na articulação desmembrado órgão por órgão (**Assistência Social CRAS/CREAS, Conselho Tutelar, Ministério Público e Poder Judiciário/Vara da Infância**), além da classificação da qualidade do relacionamento com cada um.
12. **Etapa 12 — Vínculos familiares (`house`):** Frequência de visitas presenciais e contatos remotos, orientação parental, **encaminhamento da família desmembrado em 3 frentes (Mercado de trabalho, Saúde mental/dependência química e Moradia)**, além da opção *"Não ocorre"* em visitas externas.
13. **Etapa 13 — Plano de melhoria (`sprout`):** **Grid de condição estrutural dos 5 ambientes (Quartos, Banheiro, Cozinha, Lazer e Quintal)** em *Bom/Médio/Péssimo* com detalhamento de reformas, e **réguas de prioridade/urgência de 0 a 5 com campos abertos integrados de até 300 caracteres** para Veículo, Mobília, Eletrodomésticos, Eletroeletrônicos, Equipe e Projetos.
14. **Etapa 14 — Impacto e futuro (`compass`):** Uso de tecnologia e prontuário eletrônico, frentes onde a Fundação Net do Bem faz diferença, conquistas históricas da entidade, projetos prioritários e visão de futuro em 5 anos.

---

### B. Painel de Etapas em Cards (Cards Hub pós-capa)
- Substituição da capa estática por uma jornada clara: Capa institucional acolhedora (`#3F7D59`) $\rightarrow$ Painel Geral de Cards $\rightarrow$ Formulário focado $\rightarrow$ Tela de Parabéns.
- Botões de filtro dinâmicos: **Todas as etapas (14)**, **Concluídas** e **Não concluídas**.
- Efeito de **spotlight radial** acompanhando o movimento do mouse em cada card.
- Micro-animações temáticas nos ícones Lucide com GSAP 3 no hover de cada card (`spinGlow`, `heartbeat`, `sproutGrow`, `shieldPulse`, `capToss`, `roofLift`, `bounceScale`).

---

### C. Ilustrações 3D Claymation (.webp) com Contraste Dinâmico
- Criação de **14 ilustrações exclusivas em estilo 3D de massinha de modelar artesanal (Claymation)**, alinhadas à estética humana e calorosa da Fundação Net do Bem (paleta verde floresta `#2F6F4C`, sálvia `#66AA83`, ocre dourado `#E2B955` e terracota).
- Todas salvas em formato otimizado `.webp` (entre 25 KB e 55 KB cada, carregamento ultrarrápido).
- **Efeito visual de progresso:**
  - Etapas não iniciadas (0%) começam com **contraste e saturação rebaixados** (tons suaves e discretos).
  - À medida que as perguntas são respondidas, o card **ganha cor, nitidez e saturação dinamicamente**.
  - Ao atingir 100% de conclusão, a arte exibe sua paleta completa, viva e com selo verde de concluído.
- A arte colorida também foi integrada à **Tela de Celebração/Parabéns** ao término de cada bloco.

---

### D. Ajustes de Conteúdo e Interface (Rodada 2)
1. **Limpeza de textos burocráticos:** Remoção de notas técnicas internas dos formulários (como *"Faixas padronizadas conforme revisão técnica da Fundação Net do Bem"*), deixando as perguntas limpas e agradáveis.
2. **Navegação em Breadcrumb:** Eliminação de títulos repetidos (`A identidade da entidade / A identidade da entidade (grade)`). Adicionada barra superior discreta em trilha:  
   `Etapa X de 14 > Nome da Etapa > Seção`
3. **Pergunta como Título Principal:** A pergunta passou a ocupar a posição de maior destaque visual na tela, com tipografia Manrope 800 legível e imersiva.
4. **Setas verdes grandes para campos numéricos:** Substituição dos spinners nativos minúsculos dos navegadores por um componente Stepper com botões verdes amplos (`ChevronUp` / `ChevronDown`) com área de toque de 40px no desktop e 48px no mobile, ideal para o toque no celular.
5. **Telas de Celebração e Incentivo:** 14 telas de parabéns ao final de cada bloco, com copys motivacionais oficiais, botão para avançar para a próxima etapa recomendada e disparo de partículas coloridas GSAP.

---

## 3. Arquitetura e Estrutura dos Arquivos

```text
G:\00 - CLIENTES\ONG\PESQUISA ENTIDADE\V2\
├── src\
│   ├── Survey.tsx               # Shell da pesquisa, Cards Hub, Breadcrumbs e Telas de Parabéns
│   ├── main.tsx                 # Estados, rotas, stepper numérico, viaCEP e formulário
│   ├── survey.css               # Estilos dos 14 blocos, animações GSAP e stepper verde
│   ├── domain.mjs               # Validações, máscara de CNPJ e idade por MM/AAAA
│   └── questionnaire.json       # Schema oficial com 14 blocos e 151 questões
├── public\
│   ├── cards\                   # 14 artes 3D claymation (stage-01.webp até stage-14.webp)
│   ├── brand\                   # Logos oficiais verde e branca em SVG
│   └── fonts\                   # Manrope e Montserrat (.woff2)
├── scripts\
│   └── organize_questionnaire.py# Script gerador do questionário a partir dos requisitos
└── docs\
    ├── Questionario-organizado-v2.md
    └── HISTORICO-ALTERACOES-MVP-2.md (este documento)

G:\00 - CLIENTES\ONG\FUNDACAO-NETDOBEM\
├── MVP-2\                       # Cópia completa do código-fonte e documentação no Git
└── public\mvp-2\                # Build de produção compilado entregue pela Vercel
```

---

## 4. Ajustes Responsivos, Header Unificado e Governança (Rodada 3 — 31/10/2026)

1. **Capa de Boas-Vindas (`intro`) sem rolagem no Mobile e Desktop:**
   - Remoção do texto superior `"PESQUISA OFICIAL · FUNDAÇÃO NET DO BEM"` e do texto auxiliar `"Ao avançar, você verá o Painel de Etapas em Cards para responder no seu ritmo."`.
   - Simplificação dos bullets em linha única: `"Etapas curtas, em média 10 questões"` e `"Salvo automaticamente"`.
   - Simplificação dos links inferiores para `"Quem somos"` e `"Termo privacidade"`.
   - Compactação vertical responsiva (`100dvh`) garantindo zero rolagem vertical em celulares (iPhone/Android) e notebooks.
2. **Nomenclatura Enxuta de Navegação:**
   - Padronização dos 3 modos de visão e atalhos para:
     - **`Painel`** (substituindo *"Painel de Cards (X/14)"*, *"Ver Painel de Etapas (Cards)"* e *"Ver cards de etapas"*)
     - **`Formulário`**
     - **`Concluídos`** (substituindo *"Ver Parabéns"*)
3. **Header Único no Desktop/Notebook com Governança (Casa Vinculada + Usuário Logado):**
   - Eliminação do segundo header redundante no desktop (`.survey-context`), subindo todos os controles para a barra superior principal e liberando ~60px de área útil vertical.
   - Separação clara lado a lado no topo:
     - **Seletor da Casa Vinculada** (`Casa vinculada` + troca rápida de unidade da mantenedora).
     - **Seletor do Usuário Logado** (`Participante / Função` + nome do responsável + menu rápido de governança com acesso à **Área do Participante / Entidade** e à **Área Gestores · Fundação Net do Bem**, preparado para a futura autenticação e banco de dados no Replit).
   - Indicador **`✓ Salvo`** posicionado diretamente no header principal ao lado do botão de tema Claro/Escuro.
4. **Tela de Concluídos (`celebration`) sem rolagem no Computador e Mobile:**
   - Redimensionamento da arte superior (`.celeb-art`), anel de ícone, tipografia e botões lado a lado (`Painel` + `Avançar para: ...`), fazendo o card de conclusão caber 100% na tela sem rolagem vertical.
5. **Experiência Mobile do Formulário sem rolagem desnecessária:**
   - Barra de contexto mobile em linha única (`Painel | Formulário | Concluídos` + `✓ Salvo`).
   - Rodapé mobile em linha única (`Voltar | Painel | Continuar`) com suporte a `safe-area-inset-bottom` e espaçamento compacto nas opções e campos.


---

## 5. Relatório com Gráfico de Radar, Exportação .CSV, Login Split-Screen e Tutorial em 4 Balões (Rodadas 4 a 7 — 01 a 03/11/2026)

1. **Gráfico de Radar em SVG Nativo + Relatório com Ícones + Exportação `.CSV` (`ReportTools.tsx`):**
   - Implementação do componente **`DiagnosticRadarSection`** em SVG puro (0 KB de dependências externas), permitindo alternar entre **6 Eixos Estratégicos** e **14 Etapas Completa**, com cards de índice por eixo.
   - Implementação do **`DetailedIconReport`** listando todas as 14 etapas com seus respectivos ícones Lucide, filtro de busca textual, filtro por status (*Todas, Concluídas, Pendentes*) e acordeão de respostas.
   - Exportador nativo **`.CSV` com UTF-8 BOM** (`exportUnitReportCsv` e `exportAllUnitsNetworkCsv`), compatível diretamente com Microsoft Excel e Google Planilhas.
   - Ocultação total do menu da **Fundação** para participantes comuns (acessível exclusivamente via rota administrativa `/admin`, `#fundacao` ou `?admin=1`).

2. **Tela Clássica de Login Dividida (Estilo Hotmart) + Inscrição Simplificada (`main.tsx` e `survey.css`):**
   - Remoção do cabeçalho de navegação (`Painel | Entidade | Relatório`) nas telas de Login e Inscrição.
   - **Tela Clássica de Login primeiro:** E-mail + Senha (com botão *Mostrar/Ocultar*), botão **`Entrar`**, divisor `ou`, botão **`Entrar com Google`** (pronto para integração OAuth no Replit) e botão secundário **`Fazer inscrição da instituição`**.
   - **Tela de Inscrição Direta:** Apenas Nome, Nome da Casa de Acolhimento, E-mail e Senha, sem balões ou banners extras no rodapé.
   - **Layout Split-Screen no Desktop:** Formulário à esquerda e arte 3D em destaque da pasta do Calendário otimizada em `.webp` (`public/brand/login-hero-casa.webp`, 78 KB) com o logo oficial da Fundação Net do Bem à direita.

3. **Tutorial Interativo em 4 Balões de Popup no 1º Acesso (`Survey.tsx`):**
   - Ao concluir a inscrição ou clicar em **`? Tutorial`** no topo do painel, abre uma sequência acolhedora de 4 balões de popup pensada para coordenadoras e senhoras de casas de acolhimento.
   - Animação suave com **GSAP** destacando e pulsando o primeiro card (**`1. Sua entidade`**) com selo indicador verde.

4. **Painel de Cards Enxuto e Menu Lateral Fixo em 1 Linha (`Survey.tsx` e `survey.css`):**
   - Remoção do cabeçalho grande no topo do painel para que **os cards apareçam imediatamente na primeira dobra da tela** no celular e no computador.
   - Barra superior compacta em linha única: **`Etapas (14)`** · **`Concluídas`** · **`Incompletas`** e botão **`? Tutorial`**.
   - Atalho **`Ver relatório e exportar .CSV`** posicionado exclusivamente dentro da seção **`Concluídos`**, junto com o botão **`Avançar →`** em linha única.
   - Rodapé do menu lateral fixo em **uma única linha horizontal** com 3 botões: **`[👤 Usuário]`**, **`[🏠 Casa]`** e **`[💾 Sair]`** (removendo o seletor redundante *"Casa em acompanhamento"*).

5. **Botão `✓ Salvo ▾` com Dropdown `Apagar` e Balão de Confirmação:**
   - Transformação do indicador **`✓ Salvo ▾`** em botão com menu dropdown contendo a opção **`🗑️ Apagar`**.
   - Ao clicar em **`Apagar`**, exibe um balão modal de alerta perguntando se a participante deseja recomeçar toda a pesquisa do zero, destacando o botão verde **`Retornar`** como ação principal segura e **`Sim, quero recomeçar`** abaixo.

6. **Plano Técnico e Passo a Passo para o Replit (`PLANO-TECNICO-REPLIT-MVP-2.md`):**
   - Documentação completa da arquitetura PostgreSQL (`JSONB`) + Express + Drizzle ORM, sequência de 4 prompts blindados contra lentidão e guia passo a passo para repositório privado no GitHub, configuração de `Secrets` e apontamento de domínio/URL.
