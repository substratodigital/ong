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

## 4. Pauta de Foco para Amanhã (Ajustes Responsivos & Mobile)

Para a sessão de amanhã, o foco principal será o refinamento da experiência no **celular e tablets**:

1. **Ajuste de Altura e Safe Areas:**
   - Garantir que a barra inferior de navegação (`Voltar`, `Continuar`, `Progresso`) respeite perfeitamente a *home indicator* do iOS (`env(safe-area-inset-bottom)`).
   - Ajustar o padding vertical da área de rolagem para que nenhuma pergunta ou opção fique oculta atrás da barra inferior quando o teclado virtual estiver aberto.
2. **Layout dos Cards de Etapas no Mobile (320px a 430px):**
   - Refinar a proporção de aspecto das artes nos cards e a altura dos cards em telas estreitas para caber com elegância na rolagem vertical.
   - Avaliar a visualização em lista compacta vs cards verticais no smartphone.
3. **Grades QuintoAndar e Sliders no Mobile:**
   - Garantir que os contadores `[-]` e `[+]` tenham espaçamento generoso para toque sem risco de clique acidental.
   - Otimizar o grid de condição estrutural dos 5 ambientes em telas abaixo de 375px.
4. **Header e Gaveta de Etapas Móvel:**
   - Polir a abertura e fechamento da gaveta lateral de etapas no mobile (`mobile-menu-trigger`), assegurando transição suave e bloqueio de scroll de fundo enquanto aberta.
