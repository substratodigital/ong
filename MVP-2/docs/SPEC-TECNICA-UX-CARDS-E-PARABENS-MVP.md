# Especificação Técnica e Funcional de Implementação (Spec GitHub / Protótipo V2) — Pesquisa Institucional `/mvp` (Fundação Net do Bem)

- **Repositório / Hospedagem Atual:** GitHub (Aplicação Web Front-end / SPA)
- **URL de Produção / Homologação:** `https://www.netdobem.org.br/mvp`
- **Protótipo Interativo HTML V2 (Para visualizar no navegador):** [`PROTOTIPO-INTERATIVO-V2-MVP-NETDOBEM.html`](file:///G:/00%20-%20CLIENTES/REUNIOES%20ANALISE/NETDOBEM/PROTOTIPO-INTERATIVO-V2-MVP-NETDOBEM.html)
- **Documentação Base da Reunião:** [`V1.md`](file:///G:/00%20-%20CLIENTES/REUNIOES%20ANALISE/NETDOBEM/V1.md)

---

## 1. Novas Funcionalidades de Experiência do Usuário (UX) e Gamificação Empática

Além das alterações de blocos e perguntas definidas na reunião com o André e a Patrícia, esta especificação incorpora **duas grandes melhorias estruturais de UX** no fluxo do formulário:

### 1.1. Painel Geral de Etapas em Cards Responsivos (Hub Pós-Capa)
Logo após o usuário passar pela **Capa (Tela de Boas-Vindas / Login por ID da Casa)** — e também acessível a qualquer momento pelo botão **"Ver painel de etapas / Ver resumo"** no cabeçalho ou rodapé — o usuário visualiza um **Dashboard Responsivo em Cards** representando todas as etapas da pesquisa:

- **Layout Responsivo (CSS Grid):**
  - **Desktop (`>= 1024px`):** Grid de 3 ou 4 colunas (`grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))`).
  - **Tablet (`768px - 1023px`):** Grid de 2 colunas.
  - **Mobile (`< 768px`):** 1 coluna (cards empilhados em largura total, com barra de progresso compacta e fácil toque).
- **Elementos Visuais de Cada Card:**
  1. **Ícone Temático SVG** (seguindo exatamente a família de ícones de linha fina verde `#2b7a4b` sobre fundo verde-claro `#e9f3ed` da identidade Net do Bem).
  2. **Número e Título da Etapa** (ex.: `Etapa 1 • Sua entidade`, `Etapa 2 • Estrutura`, etc.).
  3. **Badge de Status:**
     - 🟢 **`Concluído` (`completed`):** Borda verde suave (`#8fd1a8`), selo verde com check (`✓ Concluído`), barra de progresso em `100%` e botão *"Revisar respostas"*.
     - 🟡 **`Em andamento` (`in_progress`):** Borda destacada no verde institucional (`#2b7a4b`), badge *"Em andamento (X de Y)"*, barra de progresso parcial e botão primário *"Continuar de onde parei →"*.
     - ⚪ **`Não concluído / Pendente` (`pending`):** Fundo branco/neutro (`#ffffff`), borda cinza suave (`#e2e8f0`), ícone em tom neutro, contador *"Y perguntas • ~3 min"* e botão *"Iniciar etapa"*.
- **Cabeçalho do Hub de Cards:**
  - Mostra o progresso global da instituição (ex.: *"4 de 13 etapas concluídas (31%)"*), lembrando que todas as respostas ficam salvas automaticamente.

---

### 1.2. Tela de Parabéns Personalizada ao Final de Cada Etapa (Micro-Celebrações + Copys de Incentivo)
Sempre que o participante responde à última pergunta de um bloco e clica em **`Continuar →`**, antes de carregar a 1ª pergunta do próximo bloco, o sistema exibe um **Card / Tela de Celebração de Fim de Etapa**:

- **Objetivo Psicológico e de Conversão:** Como a pesquisa completa é extensa (~13 blocos), a celebração ao final de cada bloco curto (~10 a 15 perguntas) gera sensação real de conquista, reduz a fadiga cognitiva e incentiva o gestor da casa a emendar mais uma etapa.
- **Estrutura Visual da Tela de Parabéns:**
  1. **Ícone de Conquista Animado** (Ícone da etapa concluída com selo `✓` + brilho suave).
  2. **Badge de Progresso:** `"Etapa X de 13 concluída com sucesso!"`
  3. **Título Personalizado de Parabéns** (usando, quando disponível, o nome da instituição preenchido na Etapa 1).
  4. **Copy Empática de Incentivo** (contextualizada exatamente com o tema que acabou de ser respondido e explicando por que a próxima etapa é importante para o diagnóstico e para o E-book da Fundação Net do Bem).
  5. **Preview da Próxima Etapa:** Card compacto mostrando o ícone, nome e tempo estimado da próxima etapa.
  6. **Ações Claras (CTAs):**
     - Botão Primário (`#236b42`): **`Avançar para: [Nome da Próxima Etapa] →`**
     - Botão Secundário: **`Ver painel de etapas (Cards)`** (ou *"Salvar e descansar um pouco"*).

---

## 2. Tabela Oficial de Ícones, Etapas e Copys de Parabéns (13 Blocos)

Abaixo está a matriz completa das **13 etapas** (já com os desmembramentos definidos na reunião para manter média de ~12 a 15 perguntas por bloco), seus respectivos **ícones Lucide/SVG** e as **Copys de Parabéns + Incentivo** ao concluir cada etapa:

| # | ID do Bloco | Nome na Sidebar e no Card | Ícone (Lucide) | Qtd. Est. Perguntas | Título da Tela de Parabéns (Fim da Etapa) | Copy Personalizada de Incentivo para Avançar à Próxima Etapa |
| :-: | :--- | :--- | :--- | :-: | :--- | :--- |
| **1** | `identificacao` | **Sua entidade** *(Identificação)* | `building-2` | 10 | **Parabéns! A identidade da sua instituição já está registrada.** | *"Dar visibilidade a quem acolhe é o primeiro passo para fortalecermos essa rede. Agora que já conhecemos os dados básicos da sua entidade, vamos olhar para o espaço físico que recebe as crianças no dia a dia?"* |
| **2** | `estrutura` | **Estrutura** | `home` | 12 | **Excelente! Mapeamos toda a estrutura física da casa.** | *"Cada quarto, espaço de lazer e detalhe da casa faz diferença no bem-estar de quem chega. Você está indo muito bem! Na próxima etapa, vamos entender como funciona a ocupação atual e a rotina das crianças."* |
| **3** | `cotidiano` | **Cotidiano e acolhimento** | `sun` / `users` | 11 | **Muito obrigado! O retrato do cotidiano das crianças está completo.** | *"Compreender o perfil etário e os motivos de acolhimento nos ajuda a mostrar a realidade real dos abrigos no Brasil. Vamos avançar mais um passo para valorizar quem faz esse cuidado acontecer todos os dias: a sua equipe!"* |
| **4** | `pessoas` | **Pessoas** | `users-round` | 10 | **Incrível! Você concluiu o mapeamento da sua equipe.** | *"Sabemos que cuidar de quem cuida é um dos maiores desafios do acolhimento institucional. Suas respostas já estão salvas! Que tal aproveitarmos o ritmo para registrar as práticas de Governança da instituição? É um bloco super rápido!"* |
| **5** | `governanca` | **Governança** | `shield-check` | 15 | **Parabéns! Mais uma etapa fundamental concluída: Governança.** | *"A clareza na gestão e na prestação de contas é o que constrói pontes sólidas com grandes apoiadores e financiadores. Você já chegou quase na metade da jornada! Vamos falar agora sobre a Sustentabilidade financeira da casa?"* |
| **6** | `sustentabilidade` | **Sustentabilidade** | `TrendingUp` / `wallet` | 14 | **Ótimo avanço! O diagnóstico financeiro de custeio está salvo.** | *"Mapear onde o orçamento mais aperta — da alimentação à manutenção e higiene — é essencial para direcionarmos apoios que realmente aliviem o seu caixa. No próximo bloco, vamos focar especificamente nas fontes e desafios de Captação."* |
| **7** | `captacao` | **Captação** | `hand-heart` / `coins` | 12 | **Parabéns! Fechamos o panorama de Captação de Recursos.** | *"Suas respostas sobre editais, doações e burocracia vão enriquecer diretamente o nosso diagnóstico nacional sobre as casas de acolhimento. Agora, vamos entrar no coração do cuidado diário, começando pela Saúde das crianças!"* |
| **8** | `saude` | **Saúde** | `heart-pulse` | 9 | **Etapa de Saúde concluída com sucesso!** | *"Registrar como funciona o atendimento médico, emocional e a relação com a rede pública de saúde dá voz às necessidades mais urgentes dos acolhidos. O próximo bloco é bem curtinho e trata da Educação e relação com a escola!"* |
| **9** | `educacao` | **Educação** | `graduation-cap` | 8 | **Maravilha! Você concluiu o bloco de Educação.** | *"Garantir o desenvolvimento escolar e o contraturno das crianças transforma futuros. Você já superou mais de dois terços da pesquisa! Vamos avançar agora para os desafios técnicos do Atendimento?"* |
| **10** | `atendimento` | **Atendimento** | `heart-handshake` | 10 | **Parabéns pelo cuidado! O bloco de Atendimento está completo.** | *"Falar sobre reparação de traumas, adoção, desacolhimento e preparação para a maioridade exige sensibilidade e vivência real. Na sequência, vamos registrar rapidamente como é a articulação da casa com a Rede de Proteção."* |
| **11** | `rede` | **Rede de proteção** | `network` / `share-2` | 6 | **Excelente! Articulação com a Rede de Proteção registrada.** | *"Esse foi super rápido! Entender o diálogo com Assistência Social, Conselho Tutelar, MP e Judiciário mostra onde o sistema precisa evoluir. Agora vamos para a etapa de Vínculos Familiares!"* |
| **12** | `vinculos` | **Vínculos familiares** | `house-heart` / `users` | 11 | **Quase lá! Você concluiu a etapa de Vínculos Familiares.** | *"O trabalho com as famílias de origem e a reintegração é uma das missões mais complexas do acolhimento. Agora falta muito pouco: vamos construir o Plano de Melhoria com as prioridades práticas da sua casa!"* |
| **13** | `plano_melhoria` | **Plano de melhoria** | `sprout` | 12 | **Fantástico! O Plano de Melhoria da sua casa foi registrado!** | *"Saber exatamente quais reformas, veículos, equipamentos e profissionais são prioritários hoje nos permite conectar sua instituição a apoios reais e construir o nosso E-book diagnóstico. Vamos para o fechamento de Impacto e Futuro?"* |
| **14** | `impacto_futuro` | **Impacto e futuro** *(Pendente revisão final)* | `compass` | 14 | **🎉 Missão Cumprida! Você concluiu 100% do Retrato da sua Instituição!** | *"Em nome da Fundação Net do Bem, nosso muito obrigado! Cada resposta sua ajuda a construir um retrato fiel, humano e estratégico das instituições de acolhimento no Brasil."* |

---

## 3. Especificação de Dados e Perguntas por Bloco (JSON / TypeScript Schema para o GitHub)

Abaixo está a estrutura pronta para alimentar o estado da aplicação no código do GitHub, refletindo **todas as alterações definidas na Parte 1 e na Parte 2 da reunião**:

```typescript
export type BlockStatus = 'completed' | 'in_progress' | 'pending';

export interface SurveyBlock {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  icon: string; // Nome do ícone Lucide
  introWarning?: string; // Texto de orientação no topo do bloco (ex.: Plano de Melhoria)
  celebration: {
    badge: string;
    title: string;
    message: string;
    nextCtaLabel: string;
  };
  questions: SurveyQuestion[];
}
```

### Detalhamento Técnico das Alterações Críticas de Componentes de UI:

1. **Componente `QuintoAndarCounterGrid` (Usado em `Estrutura` — Cômodos e Ambientes):**
   - Em vez de 9 páginas separadas perguntando *"Quantos quartos?"*, *"Quantos banheiros?"*, renderizar um grid de cards com botões `[-]` e `[+]` na mesma tela:
     - `Quartos para acolhidos`, `Banheiros`, `Cozinha`, `Refeitório`, `Sala de estudos/leitura`, `Brinquedoteca`, `Área externa / Quintal`, `Sala de atendimento técnico individual`.
2. **Componente `StaffMatrixTable` (Usado em `Pessoas` — Quadro de Equipe):**
   - Matriz responsiva onde as linhas são as funções (*Coordenador, Psicólogo, Assistente Social, Educadores/Cuidadores, Auxiliares, Apoio/Cozinha/Limpeza, Administrativo*) e as colunas são os vínculos (*CLT, PJ/Terceirizado, Cedido Prefeitura, Voluntário*).
3. **Componente `UrgencySliderWithDetail` (Usado em `Plano de melhoria` — Substitui o Dropdown antigo):**
   - Conforme definido aos `58:58` da Parte 2, cada item de prioridade da casa tem:
     - **Seletor Visual de Nota / Urgência de 1 a 5** (`1 = Baixa prioridade` a `5 = Urgente / Crítico`, ou `0 = Não precisa`);
     - **Textarea aberto logo abaixo** com placeholder contextual (*"Quais veículos?", "Quais equipamentos?", "Quais profissionais?", "Quais treinamentos?"*).
4. **Componente `StructuralConditionGrid` (Usado na 1ª pergunta de `Plano de melhoria` — Reforma Estrutural):**
   - Avalia os **5 ambientes definidos pelo André** (`Cômodos`, `Banheiro`, `Cozinha`, `Área de lazer`, `Quintal`), cada um com botões segmentados **`Bom` | `Médio` | `Péssimo`**, seguido de campo aberto para detalhar a reforma.

---

## 4. Código-Fonte de Referência: Protótipo Interativo em HTML/CSS/JS

Para que você possa **testar na prática agora mesmo** a navegação, o **Painel de Cards (Concluídos / Em andamento / Pendentes)** logo após a capa, a barra lateral fiel ao print enviado (`#2b7a4b`, ícones suaves, indicador *"Salvo"*) e o **Modal/Tela de Parabéns Personalizada ao final de cada etapa**, gerei o arquivo autocontido:

👉 **[`PROTOTIPO-INTERATIVO-V2-MVP-NETDOBEM.html`](file:///G:/00%20-%20CLIENTES/REUNIOES%20ANALISE/NETDOBEM/PROTOTIPO-INTERATIVO-V2-MVP-NETDOBEM.html)**
*(Basta dar dois cliques no arquivo no Windows Explorer ou abrir no navegador).*



---

## 5. Especificação de Micro-Animações GSAP 3 nos Cards Temáticos (`Hover`, `Concluído` e `Navegação`)

Para tornar a experiência do **Painel de Cards** e a transição entre etapas mais viva, acolhedora e fluida (sem pesar na performance), implementamos o motor de animações com **GSAP 3 (`gsap.min.js`)**:

### 5.1. Micro-Animações de `Hover` Personalizadas por Tema (Ícone + Card + Spotlight)
Cada um dos 13 cards possui um atributo `data-anim` que dispara uma reação específica no ícone SVG quando o gestor passa o mouse sobre o card, além da elevação elástica (`y: -6, scale: 1.012`) e de um **brilho radial (`card-glow`)** que acompanha o cursor:

| Tipo de Animação (`animType`) | Blocos que Utilizam | Comportamento GSAP no Hover |
| :--- | :--- | :--- |
| **`spinGlow`** | `3. Cotidiano` (`sun`), `11. Rede` (`network`) | Rotação suave de `45deg` com escala `1.12` (`ease: "back.out(1.7)"`). |
| **`heartbeat`** | `8. Saúde` (`heart-pulse`), `10. Atendimento` (`heart-handshake`) | Pulso duplo de batimento cardíaco (`scale: 1.24`, `yoyo: true, repeat: 3`). |
| **`sproutGrow`** | `13. Plano de melhoria` (`sprout`) | Crescimento orgânico a partir da base (`transformOrigin: "bottom center"`, `scaleY: 1.18`, `ease: "elastic.out(1.2, 0.4)"`). |
| **`shieldPulse`** | `5. Governança` (`shield-check`) | Inclinação 3D protetora (`rotationY: 25, scale: 1.14`). |
| **`capToss`** | `9. Educação` (`graduation-cap`) | Leve salto do capelo de formatura para cima (`y: -4, rotation: -10`). |
| **`roofLift` / `bounceScale`** | `1. Sua entidade`, `2. Estrutura`, `4. Pessoas`, `6. Sustentabilidade`, `7. Captação`, `12. Vínculos` | Balanço elástico acolhedor com destaque no container verde do ícone e avanço da seta `→` no botão CTA (`x: 4`). |

---

### 5.2. Micro-Animação de `Concluído` (`toggleCompleteCardGSAP` + Explosão de Partículas)
Quando um card muda de estado para **`Concluído`** (seja ao finalizar a última pergunta do bloco ou ao testar pelo botão rápido `✓` no canto superior direito do card):
1. **Explosão de Partículas Verdes/Douradas (`spawnCompletionParticles`):** 16 partículas sutis nas cores da Fundação Net do Bem (`#216e43`, `#38a169`, `#8fd1a8`, `#f6ad55`) se expandem em `360°` com `ease: "power3.out"`.
2. **Pulso Elástico da Borda e do Badge:** O card dá um pulso (`scale: 1.035 -> 1` com `elastic.out(1.2, 0.5)`) enquanto o selo `✓ Concluído` entra com efeito *pop* (`scale: 0.5 -> 1`, `back.out(2.2)`).
3. **Preenchimento Progressivo da Barra + Contador Numérico:** A barra interna do card corre suavemente até `100%` enquanto o texto percentual sobe de `0%` a `100%` interpolado pelo GSAP (`onUpdate`).
4. **Atualização Sincronizada do Topo e da Sidebar:** O contador geral (`X Concluídas`) no topo e o indicador `✓ Salvo` dão um micro-salto confirmando a gravação.

---

### 5.3. Animações de `Navegação` (Entrada em Cascata, Zoom de Abertura e Slide de Perguntas)
1. **Entrada em Cascata (`Stagger`) ao Abrir o Painel de Cards ou Filtrar:**
   - Todos os cards entram em sequência (`stagger: 0.045s`, `y: 24 -> 0`, `scale: 0.96 -> 1`, `ease: "back.out(1.3)"`) seguidos pelo preenchimento sincronizado das barras de progresso.
2. **Transição ao Clicar em um Card (`openBlockWithGSAP`):**
   - Ao clicar em um card para responder, os demais cards recuam suavemente (`opacity: 0, scale: 0.94`) enquanto o card escolhido destaca (`scale: 1.04`) antes de abrir as perguntas do bloco.
3. **Slide Horizontal Entre Perguntas (`nextQuestion` / `prevQuestion`):**
   - Ao clicar em `Continuar →` ou `← Voltar`, o bloco da pergunta atual desliza com fade (`x: -24` ou `x: +24`) e os elementos da nova pergunta entram em cascata (`stagger: 0.05s`).
