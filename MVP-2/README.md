# Rede Net do Bem — Pesquisa Institucional MVP-2 (`/mvp-2`)

Versão 2 da Pesquisa de Mapeamento de Instituições de Acolhimento da **Fundação Net do Bem** (`https://www.netdobem.org.br/mvp-2`).

## Principais Evoluções do MVP-2

1. **Nova Arquitetura em 14 Blocos Enxutos (~10 questões por bloco):**
   - `1. Sua entidade` (Identidade, Natureza Jurídica atualizada, Data de Fundação `MM/AAAA` com cálculo automático de idade, CNPJ, CEP ViaCEP, UF padrão `SP`, Dados de Contato e Conselhos CMDCA/CMAS).
   - `2. Estrutura` (Painel visual estilo QuintoAndar para ambientes/mobiliário, acessibilidade, internet/computadores, brinquedos por faixa etária `0-3, 4-7, 8-12` + observação, veículos e sistema de segurança veicular).
   - `3. Cotidiano e acolhimento` (Capacidade vs. ocupação atual por faixa etária `0-3, 4-7, 8-12, 13-18`, acolhimentos e desligamentos nos últimos 12 meses, motivos de acolhimento com `Negligência / Abandono`, rotina de refeições e sistema de padrinhos `Afetivo` e `Financeiro`).
   - `4. Pessoas` (Quadro de colaboradores em painel rápido com `Coordenação Técnica`, `Coordenação Funcional` e `Supervisão (equipe externa)`, capacitação, equipe mínima NOB-RH/SUAS, estabilidade e desafios para custear função extra).
   - `5. Governança` (Subtítulo unificado `Práticas`, balanço financeiro, retorno de prestação de contas aos financiadores em até 300 caracteres, relatório anual, auditoria e portal de atividades e financiamento).
   - `6. Sustentabilidade` (Fontes de receita, reserva financeira e dificuldades de custeio com `Vestuário` e `Higiene` desmembrados).
   - `7. Captação` (Doações via Imposto de Renda `PF` e `PJ` separadas, `Editais Públicos` e `Editais Privados` separados, e `Burocracia pública` vs. `Burocracia privada`).
   - `8. Saúde` (Acompanhamento psicológico, psiquiátrico, médico e relação/problemas com a Rede de Saúde SUS/CAPS).
   - `9. Educação` (Inclusão escolar sem a opção `"Não se aplica"` + relação direta e desafios com as Escolas).
   - `10. Atendimento` (Reparação de experiências traumáticas em `Sim/Não` + faixas percentuais `Até 10%, Até 25%, Até 50%, Mais que 50%`, `Preparação para adoção` e `Preparação para o desacolhimento`).
   - `11. Rede de proteção` (Articulação desmembrada com `Assistência Social (CRAS/CREAS)`, `Conselho Tutelar`, `Ministério Público` e `Poder Judiciário`).
   - `12. Vínculos familiares` (Frequência de visitas e contatos, grau de dificuldade de encaminhamento para trabalho, saúde mental e moradia, e visitas domiciliares com opção `Não ocorre`).
   - `13. Plano de melhoria` (Avaliação estrutural dos 5 ambientes `Cômodos, Banheiro, Cozinha, Área de lazer, Quintal` em `Bom / Médio / Péssimo` + Régua Visual de Urgência `0 a 5` e campo aberto em todos os itens prioritários).
   - `14. Impacto e futuro` (Tecnologia na gestão, onde o apoio faz diferença, conquistas, parcerias e visão de 5 anos).
2. **Painel Geral de Etapas em Cards Responsivos (Hub Pós-Capa com GSAP 3):**
   - Micro-animações temáticas no hover por ícone (`spinGlow`, `heartbeat`, `sproutGrow`, `shieldPulse`, `capToss`, `roofLift`, `bounceScale`), spotlight radial acompanhando o cursor, filtros por status (`Todas`, `Concluídas`, `Não concluídas`) e explosão de partículas ao concluir etapas.
3. **Tela de Parabéns Personalizada ao Final de Cada Etapa:**
   - Exibe as 14 copys empáticas de celebração e incentivo da Fundação Net do Bem, com preview da próxima etapa.

## Comandos

```sh
npm test
npm run build
```
