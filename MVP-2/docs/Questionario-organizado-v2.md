# Dicionário do Questionário MVP-2 — Fundação Net do Bem

Total: **151 questões/telas** distribuídas em **14 blocos temáticos enxutos** (média de 10.8 itens por bloco).

## Etapa 1: Sua entidade (`identificacao` — 14 itens)
- **Ícone Lucide:** `building-2` | **Animação GSAP:** `bounceScale`
- **Título de Parabéns:** *Parabéns! A identidade da sua instituição já está registrada.*
- **Copy de Incentivo:** *Dar visibilidade a quem acolhe é o primeiro passo para fortalecermos essa rede. Agora que já conhecemos os dados básicos da sua entidade, vamos olhar para o espaço físico que recebe as crianças no dia a dia?*

| ID | Seção | Pergunta | Tipo | Opções / Detalhes |
|---|---|---|---|---|
| `entidade` | A identidade da entidade | Nome oficial da entidade (Razão Social) | `text` | Ex.: Associação Caminhos do Bem |
| `casa` | A identidade da entidade | Nome fantasia / Nome da casa ou unidade de acolhimento | `text` | Ex.: Casa de Acolhimento Girassol |
| `natureza` | A identidade da entidade | Natureza jurídica da instituição | `options` | Associação privada, Organização religiosa, Organização pública, Outra |
| `fundacao_data` | A identidade da entidade | Mês e Ano de fundação da instituição (MM/AAAA) | `month_year` | Ex.: 04/2008 |
| `cnpj` | A identidade da entidade | CNPJ da entidade | `cnpj` | Ex.: 12.345.678/0001-95 |
| `cep` | Onde o cuidado acontece | CEP e Endereço da unidade | `cep` | Ex.: 01310-100 |
| `endereco` | Onde o cuidado acontece | Logradouro, número, complemento e bairro | `text` | Ex.: Rua das Flores, 120 - Vila Mariana |
| `cidade` | Onde o cuidado acontece | Município | `text` | Ex.: São Paulo |
| `uf` | Onde o cuidado acontece | Estado (UF) | `select` | SP, AC, AL, AP, AM, BA, CE, DF, ES, GO, MA, MT, MS, MG, PA, PB, PR, PE, PI, RJ, RN, RS, RO, RR, SC, SE, TO |
| `gestor` | Dados de contato | Quem está respondendo a pesquisa (Nome completo) | `text` | Ex.: Maria Oliveira |
| `funcao` | Dados de contato | Função de quem está respondendo a pesquisa | `text` | Ex.: Coordenadora Técnica / Gestora |
| `email` | Dados de contato | E-mail de comunicação com a entidade | `email` | Ex.: contato@entidade.org.br |
| `telefone` | Dados de contato | Telefone fixo e WhatsApp de contato | `text` | Ex.: (11) 99999-0000 / (11) 3333-0000 |
| `conselhos` | Registro nos Conselhos | Possui inscrição ativa nos conselhos (CMDCA / CMAS)? | `options` | Sim, em ambos (CMDCA e CMAS), Apenas no CMDCA, Apenas no CMAS, Em processo de regularização, Não possui |

## Etapa 2: Estrutura (`estrutura` — 10 itens)
- **Ícone Lucide:** `home` | **Animação GSAP:** `roofLift`
- **Título de Parabéns:** *Excelente! Mapeamos toda a estrutura física da casa.*
- **Copy de Incentivo:** *Cada quarto, espaço de lazer e detalhe da casa faz diferença no bem-estar de quem chega. Você está indo muito bem! Na próxima etapa, vamos entender como funciona a ocupação atual e a rotina das crianças.*

| ID | Seção | Pergunta | Tipo | Opções / Detalhes |
|---|---|---|---|---|
| `q_ambientes_grid` | Ambientes e mobiliário | Informe a quantidade de ambientes, cômodos e mobiliário da casa | `quintoandar` | Quartos / Dormitórios, Camas / Beliches, Banheiros, Chuveiros, Mesas para refeição, Cadeiras para refeição, Mesas para estudos, Cadeiras para estudos, Televisores, Vídeo Game |
| `q_acessibilidade` | Ambientes e mobiliário | O imóvel possui acessibilidade física? | `options` | Sim, totalmente acessível, Parcialmente acessível (apenas alguns ambientes), Não possui acessibilidade |
| `q_internet_computadores` | Ambientes e mobiliário | Como é a disponibilidade de internet (Wi-Fi) e computadores para os acolhidos? | `options` | Internet estável e computadores suficientes para estudo/lazer, Parcial (internet restrita ou poucos computadores para os acolhidos), Apenas computadores de uso administrativo, Não possui internet ou computadores |
| `q016_brinquedos_faixas` | Ambientes e mobiliário | A casa possui brinquedos e materiais lúdicos em bom estado para quais faixas etárias? | `multi` | 0 a 3 anos, 4 a 7 anos, 8 a 12 anos, 13 a 18 anos (jogos, livros, esportes) |
| `q016_brinquedos_obs` | Ambientes e mobiliário | Observações sobre brinquedos e materiais lúdicos | `textarea` | Se desejar, descreva em até 300 caracteres o que falta ou precisa ser reposto em brinquedos por idade... |
| `q018_veiculo_proprio` | Veículos e segurança no transporte | A instituição possui veículo próprio? | `options` | Sim, Não |
| `q018_veiculo_tipos` | Veículos e segurança no transporte | Quais tipos de veículo a instituição possui ou utiliza? | `multi` | Van / Kombi, Carro de passeio, Caminhonete / Utilitário, Não possui veículo próprio |
| `q018_veiculo_seguranca` | Veículos e segurança no transporte | Possui sistema de segurança de veículo para criança (Bebê conforto, cadeirinha e assento de elevação)? | `options` | Sim, Parcial, Não |
| `q018_veiculo_obs` | Veículos e segurança no transporte | Observações sobre veículos e transporte | `textarea` | Descreva em até 300 caracteres a quantidade, estado de conservação ou demandas de transporte da casa... |
| `q030` | Ambientes e mobiliário | A estrutura física atende às necessidades dos acolhidos? | `options` | Sim, Não, Parcial |

## Etapa 3: Cotidiano e acolhimento (`cotidiano` — 10 itens)
- **Ícone Lucide:** `sun` | **Animação GSAP:** `spinGlow`
- **Título de Parabéns:** *Muito obrigado! O retrato do cotidiano das crianças está completo.*
- **Copy de Incentivo:** *Compreender o perfil etário e os motivos de acolhimento nos ajuda a mostrar a realidade real dos abrigos no Brasil. Vamos avançar mais um passo para valorizar quem faz esse cuidado acontecer todos os dias: a sua equipe!*

| ID | Seção | Pergunta | Tipo | Opções / Detalhes |
|---|---|---|---|---|
| `q022` | O acolhimento em números | A casa tem capacidade autorizada para acolher quantas crianças e adolescentes? | `number` | Ex.: 20 |
| `q021_faixas` | O acolhimento em números | Quantos acolhimentos estão na casa NO MOMENTO, por faixa etária? | `quintoandar` | 0 a 3 anos, 4 a 7 anos, 8 a 12 anos, 13 a 18 anos |
| `q019_faixas` | O acolhimento em números | Quantos acolhimentos ocorreram nos ÚLTIMOS 12 MESES, por faixa etária? | `quintoandar` | 0 a 3 anos, 4 a 7 anos, 8 a 12 anos, 13 a 18 anos |
| `q020_faixas` | O acolhimento em números | Quantos desligamentos (desacolhimentos) ocorreram nos ÚLTIMOS 12 MESES, por faixa etária? | `quintoandar` | 0 a 3 anos, 4 a 7 anos, 8 a 12 anos, 13 a 18 anos |
| `q023` | O acolhimento em números | Tempo (em meses) em média que as crianças ficam acolhidas na casa | `number` | Ex.: 14 |
| `q024` | Rotina de acolhimento | Qual é a faixa etária predominante entre os acolhidos? | `options` | 0 a 3 anos, 4 a 7 anos, 8 a 12 anos, 13 a 18 anos, Não há faixa predominante |
| `q026` | Rotina de acolhimento | Ordene os motivos mais frequentes de acolhimento (1º, 2º e 3º lugar) | `rank` | Violência, Negligência / Abandono, Álcool / drogas |
| `q028` | Rotina de acolhimento | Quais refeições são oferecidas diariamente? | `multi` | Café da manhã, Almoço, Lanche, Jantar, Ceia noturna |
| `q_padrinhos_afetivo` | Rotina de acolhimento | A instituição possui sistema de padrinhos — Afetivo? | `options` | Sim, Não |
| `q_padrinhos_financeiro` | Rotina de acolhimento | A instituição possui sistema de padrinhos — Financeiro? | `options` | Sim, Não |

## Etapa 4: Pessoas (`pessoas` — 6 itens)
- **Ícone Lucide:** `users` | **Animação GSAP:** `waveUsers`
- **Título de Parabéns:** *Incrível! Você concluiu o mapeamento da sua equipe.*
- **Copy de Incentivo:** *Sabemos que cuidar de quem cuida é um dos maiores desafios do acolhimento institucional. Suas respostas já estão salvas! Que tal aproveitarmos o ritmo para registrar as práticas de Governança da instituição? É um bloco super rápido!*

| ID | Seção | Pergunta | Tipo | Opções / Detalhes |
|---|---|---|---|---|
| `q_equipe_grid` | Quem compõe a equipe | Quem compõe a equipe da unidade? (Informe a quantidade por função) | `quintoandar` | Cuidadores / Educadores, Assistente Social, Psicólogo, Pedagogia, Coordenação Técnica, Coordenação Funcional (RH / Apoio), Supervisão (equipe externa), Voluntários, Padrinhos cadastrados |
| `q042` | Formação e composição | A equipe recebe capacitação periódica? | `options` | Sim, Não, Parcial |
| `q043` | Formação e composição | A equipe mínima prevista na legislação (NOB-RH/SUAS) está completa? | `options` | Sim, Não, Parcial |
| `q125` | Formação e composição | Qual o grau de dificuldade com capacitação e estabilidade (rotatividade) da equipe? | `options` | Alto, Médio, Baixo |
| `q_pessoas_funcao_extra` | Desafios da equipe | Descreva os desafios de pagar alguma função extra de equipe técnica | `textarea` | Descreva em até 300 caracteres as dificuldades financeiras para custear especialistas ou horas técnicas extras... |
| `q_pessoas_obs` | Desafios da equipe | Observações ou comentários adicionais sobre a equipe (Opcional) | `textarea` | Se houver algo mais a acrescentar sobre a realidade da sua equipe, registre aqui... |

## Etapa 5: Governança (`governanca` — 14 itens)
- **Ícone Lucide:** `shield-check` | **Animação GSAP:** `shieldPulse`
- **Título de Parabéns:** *Parabéns! Mais uma etapa fundamental concluída: Governança.*
- **Copy de Incentivo:** *A clareza na gestão e na prestação de contas é o que constrói pontes sólidas com grandes apoiadores e financiadores. Você já chegou quase na metade da jornada! Vamos falar agora sobre a Sustentabilidade financeira da casa?*

| ID | Seção | Pergunta | Tipo | Opções / Detalhes |
|---|---|---|---|---|
| `q046` | Práticas | A instituição possui planejamento estratégico? | `options` | Sim, Não |
| `q047` | Práticas | Existem indicadores para acompanhar resultados? | `options` | Sim, Não |
| `q048` | Práticas | Há conselho diretor? | `options` | Sim, Não |
| `q049` | Práticas | O conselho diretor é atuante? | `options` | Sim, Não |
| `q050` | Práticas | Há reuniões de governança? | `options` | Sim, Não |
| `q051` | Práticas | As reuniões de governança ocorrem regularmente? | `options` | Sim, Não |
| `q052` | Práticas | Existe gestão de risco? | `options` | Sim, Não |
| `q053` | Práticas | A instituição possui políticas internas (compliance, ética, proteção de dados, compras)? | `options` | Sim, Não |
| `q056` | Práticas | O balanço financeiro é publicado? | `options` | Sim, Não |
| `q_gov_prestacao_simnao` | Práticas | As prestações de contas são feitas aos financiadores? | `options` | Sim, Não |
| `q060` | Práticas | Descreva como você dá retorno de prestações de contas aos financiadores. | `textarea` | Ex.: Enviamos relatórios periódicos com notas fiscais, balancete contábil e registro das atividades realizadas... |
| `q057` | Práticas | A instituição divulga relatório anual de atividades? | `options` | Sim, Não |
| `q058` | Práticas | Possui auditoria? | `options` | Sim, Não |
| `q059` | Práticas | Há um portal de atividades e financiamento disponíveis ao público? | `options` | Sim, Não |

## Etapa 6: Sustentabilidade (`sustentabilidade` — 12 itens)
- **Ícone Lucide:** `wallet` | **Animação GSAP:** `coinFlip`
- **Título de Parabéns:** *Ótimo avanço! O diagnóstico financeiro de custeio está salvo.*
- **Copy de Incentivo:** *Mapear onde o orçamento mais aperta — da alimentação à manutenção, vestuário e higiene — é essencial para direcionarmos apoios que realmente aliviem o seu caixa. No próximo bloco, vamos focar especificamente nas fontes e desafios de Captação.*

| ID | Seção | Pergunta | Tipo | Opções / Detalhes |
|---|---|---|---|---|
| `q063` | De onde vêm os recursos | Quais são as principais fontes de receita da instituição? | `multi` | Poder público, Pessoas físicas, Empresas, Imposto de Renda, Eventos, Outros |
| `q065` | De onde vêm os recursos | Qual percentual da receita vem do poder público? | `options` | 0% a 25%, Mais de 25% a 50%, Mais de 50% a 75%, Mais de 75% a 100% |
| `q067` | De onde vêm os recursos | Qual percentual da receita vem de doações? | `options` | 0% a 25%, Mais de 25% a 50%, Mais de 50% a 75%, Mais de 75% a 100% |
| `q069` | De onde vêm os recursos | A instituição possui reserva financeira? | `options` | Sim, Não |
| `q071` | De onde vêm os recursos | Quantos meses conseguiria manter as atividades sem novos recursos? | `options` | Até 1 mês, Mais de 1 até 3 meses, Mais de 3 até 6 meses, Mais de 6 meses |
| `q074` | Dificuldades financeiras | Custo com equipe (salários de cuidadores, educadores, psicólogos, coordenadores...) | `options` | Alto, Médio, Baixo |
| `q075` | Dificuldades financeiras | Alimentação (fornecimento de refeições e dietas especiais quando necessário) | `options` | Alto, Médio, Baixo |
| `q076` | Dificuldades financeiras | Saúde (medicamentos não fornecidos pelo SUS, consultas e exames...) | `options` | Alto, Médio, Baixo |
| `q077` | Dificuldades financeiras | Educação e desenvolvimento (material escolar, uniformes, transporte...) | `options` | Alto, Médio, Baixo |
| `q078` | Dificuldades financeiras | Moradia e manutenção (aluguel, energia elétrica, água, gás, manutenção predial...) | `options` | Alto, Médio, Baixo |
| `q079_vestuario` | Dificuldades financeiras | Vestuário (roupas, calçados, enxoval de cama e banho) | `options` | Alto, Médio, Baixo |
| `q079_higiene` | Dificuldades financeiras | Higiene (produtos de higiene pessoal, fraldas e limpeza) | `options` | Alto, Médio, Baixo |

## Etapa 7: Captação (`captacao` — 17 itens)
- **Ícone Lucide:** `hand-coins` | **Animação GSAP:** `bounceScale`
- **Título de Parabéns:** *Parabéns! Fechamos o panorama de Captação de Recursos.*
- **Copy de Incentivo:** *Suas respostas sobre Imposto de Renda PF/PJ, editais e burocracia vão enriquecer diretamente o nosso diagnóstico nacional sobre as casas de acolhimento. Agora, vamos entrar no coração do cuidado diário, começando pela Saúde das crianças!*

| ID | Seção | Pergunta | Tipo | Opções / Detalhes |
|---|---|---|---|---|
| `q080` | Desafios estruturais de captação | Captação de recursos instável (oscilação de doações sazonais) | `options` | Alto, Médio, Baixo |
| `q081` | Desafios estruturais de captação | Exigências legais e administrativas (contabilidade, certificações, auditorias...) | `options` | Alto, Médio, Baixo |
| `q084` | Caminhos de captação | Possui profissional dedicado/responsável pela captação de recursos? | `options` | Sim, Não |
| `q085` | Caminhos de captação | Realiza campanhas periódicas de doação? | `options` | Sim, Não |
| `q086_pf` | Caminhos de captação | Recebe doações via Imposto de Renda — Pessoa Física (PF)? | `options` | Sim, Não |
| `q086_pj` | Caminhos de captação | Recebe doações via Imposto de Renda — Pessoa Jurídica (PJ)? | `options` | Sim, Não |
| `q087_pub` | Caminhos de captação | Participa de Editais Públicos? | `options` | Sim, Não |
| `q087_priv` | Caminhos de captação | Participa de Editais Privados? | `options` | Sim, Não |
| `q088` | Caminhos de captação | Possui relacionamento ativo e parcerias com empresas? | `options` | Sim, Não |
| `q089` | Caminhos de captação | Recebe doações por programas de nota fiscal (ex.: Nota Fiscal Paulista)? | `options` | Sim, Não |
| `q091` | Caminhos de captação | Número estimado de doadores recorrentes ativos | `number` | Ex.: 35 |
| `q092` | Desafios para captar | Grande concorrência entre instituições e dependência de campanhas sazonais | `options` | Alto, Médio, Baixo |
| `q093` | Desafios para captar | Baixa visibilidade do trabalho (por sigilo legal não poder expor histórias das crianças) | `options` | Alto, Médio, Baixo |
| `q095` | Desafios para captar | Pouca profissionalização da captação e dificuldade em acessar empresas | `options` | Alto, Médio, Baixo |
| `q097_pub` | Desafios para captar | Burocracia para obtenção de recursos públicos | `options` | Alto, Médio, Baixo |
| `q097_priv` | Desafios para captar | Burocracia para obtenção de recursos privados | `options` | Alto, Médio, Baixo |
| `q099` | Desafios para captar | Necessidade de demonstrar impacto e recursos financeiros limitados | `options` | Alto, Médio, Baixo |

## Etapa 8: Saúde (`saude` — 6 itens)
- **Ícone Lucide:** `heart-pulse` | **Animação GSAP:** `heartbeat`
- **Título de Parabéns:** *Etapa de Saúde concluída com sucesso!*
- **Copy de Incentivo:** *Registrar como funciona o atendimento médico, emocional e a relação com a rede pública de saúde dá voz às necessidades mais urgentes dos acolhidos. O próximo bloco é bem curtinho e trata da Educação e relação com a escola!*

| ID | Seção | Pergunta | Tipo | Opções / Detalhes |
|---|---|---|---|---|
| `q102` | Saúde | Acesso a atendimento psicológico regular para os acolhidos? | `options` | Sim, Parcial, Não |
| `q103` | Saúde | Acesso a atendimento psiquiátrico quando necessário? | `options` | Sim, Parcial, Não |
| `q104` | Saúde | Acesso a saúde geral (hospital, consultas médicas, odontologia e exames)? | `options` | Sim, Parcial, Não |
| `q105` | Saúde | Existem programas de preparação gradual para saída / autonomia dos adolescentes? | `options` | Sim, Parcial, Não |
| `q145` | Relação com a Rede de Saúde | Como avalia a articulação e o atendimento da Rede de Saúde (UBS, CAPS, Hospitais) à casa? | `options` | Bom, Regular, Ruim, Não há relacionamento |
| `q_saude_relacao_obs` | Relação com a Rede de Saúde | Descreva a relação das casas de acolhimento com a Saúde e os principais problemas enfrentados | `textarea` | Relate em até 300 caracteres dificuldades como filas de espera, atendimento em saúde mental/CAPS, acesso a medicamentos... |

## Etapa 9: Educação (`educacao` — 10 itens)
- **Ícone Lucide:** `graduation-cap` | **Animação GSAP:** `capToss`
- **Título de Parabéns:** *Maravilha! Você concluiu o bloco de Educação.*
- **Copy de Incentivo:** *Garantir o desenvolvimento escolar e o contraturno das crianças transforma futuros. Você já superou mais de dois terços da pesquisa! Vamos avançar agora para os desafios técnicos do Atendimento?*

| ID | Seção | Pergunta | Tipo | Opções / Detalhes |
|---|---|---|---|---|
| `q107` | Educação | Defasagem na aprendizagem (histórico de negligência ou evasão gerando dificuldades escolares) | `options` | Alto, Médio, Baixo |
| `q108` | Educação | Impactos emocionais e comportamentais refletindo no ambiente escolar | `options` | Alto, Médio, Baixo |
| `q109` | Educação | Preconceito e estigmatização na escola (rotulagem, exclusão ou redução de expectativas) | `options` | Alto, Médio, Baixo |
| `q110` | Educação | Falta de articulação entre serviços (comunicação entre escola, instituição e rede) | `options` | Alto, Médio, Baixo |
| `q111` | Educação | Necessidade de atendimento pedagógico individualizado / reforço escolar | `options` | Alto, Médio, Baixo |
| `q112` | Educação | Baixa expectativa em relação ao futuro e baixa motivação para os estudos | `options` | Alto, Médio, Baixo |
| `q113` | Educação | Desafios na socialização escolar (vínculos de confiança, atividades em grupo e conflitos) | `options` | Alto, Médio, Baixo |
| `q114` | Educação | Formação insuficiente dos professores para lidar com o contexto do acolhimento institucional | `options` | Alto, Médio, Baixo |
| `q146` | Relação com a Escola | Como avalia a relação e articulação direta da casa com as Escolas / Rede de Educação? | `options` | Bom, Regular, Ruim, Não há relacionamento |
| `q_educacao_relacao_obs` | Relação com a Escola | Detalhe a relação da casa de acolhimento com a Educação e os principais problemas com as escolas | `textarea` | Descreva em até 300 caracteres como é o diálogo com a direção/professores, acesso a vagas, contraturno e transporte... |

## Etapa 10: Atendimento (`atendimento` — 11 itens)
- **Ícone Lucide:** `heart-handshake` | **Animação GSAP:** `heartbeat`
- **Título de Parabéns:** *Parabéns pelo cuidado! O bloco de Atendimento está completo.*
- **Copy de Incentivo:** *Falar sobre reparação de traumas, adoção, desacolhimento e preparação para a maioridade exige sensibilidade e vivência real. Na sequência, vamos registrar rapidamente como é a articulação da casa com a Rede de Proteção.*

| ID | Seção | Pergunta | Tipo | Opções / Detalhes |
|---|---|---|---|---|
| `q116_simnao` | Reparação de experiências traumáticas | A instituição já teve experiência bem-sucedida na reparação dos impactos de experiências traumáticas? | `options` | Sim, Não |
| `q116_pct` | Reparação de experiências traumáticas | Qual o percentual estimado de reparação de experiências traumáticas nas crianças atendidas? | `options` | Até 10%, Até 25%, Até 50%, Mais que 50% |
| `q117` | Desafios do atendimento | Construção de vínculo de confiança com as crianças e adolescentes | `options` | Alto, Médio, Baixo |
| `q118` | Desafios do atendimento | Manejo de comportamentos desafiadores | `options` | Alto, Médio, Baixo |
| `q119` | Desafios do atendimento | Promoção contínua da saúde mental | `options` | Alto, Médio, Baixo |
| `q120` | Desafios do atendimento | Garantia de desenvolvimento integral | `options` | Alto, Médio, Baixo |
| `q121` | Desafios do atendimento | Atendimento individualizado a cada acolhido | `options` | Alto, Médio, Baixo |
| `q122` | Desafios do atendimento | Fortalecimento dos vínculos familiares durante o acolhimento | `options` | Alto, Médio, Baixo |
| `q123_adocao` | Adoção e Desacolhimento | Preparação para adoção | `options` | Alto, Médio, Baixo |
| `q123_desacolhimento` | Adoção e Desacolhimento | Preparação para o desacolhimento | `options` | Alto, Médio, Baixo |
| `q128` | Plano Individual de Atendimento | Realizar o Plano Individual de Atendimento (PIA) com causas, necessidades e ações para reintegração | `options` | Alto, Médio, Baixo |

## Etapa 11: Rede de proteção (`rede` — 8 itens)
- **Ícone Lucide:** `network` | **Animação GSAP:** `spinGlow`
- **Título de Parabéns:** *Excelente! Articulação com a Rede de Proteção registrada.*
- **Copy de Incentivo:** *Esse foi super rápido! Entender o diálogo com Assistência Social, Conselho Tutelar, MP e Judiciário mostra onde o sistema precisa evoluir. Agora vamos para a etapa de Vínculos Familiares!*

| ID | Seção | Pergunta | Tipo | Opções / Detalhes |
|---|---|---|---|---|
| `q124_assistencia` | Articulação da rede de proteção | Grau de dificuldade na articulação integrada com a Assistência Social (CRAS / CREAS) | `options` | Alto, Médio, Baixo |
| `q124_ct` | Articulação da rede de proteção | Grau de dificuldade na articulação integrada com o Conselho Tutelar | `options` | Alto, Médio, Baixo |
| `q124_mp` | Articulação da rede de proteção | Grau de dificuldade na articulação integrada com o MP (Ministério Público) | `options` | Alto, Médio, Baixo |
| `q124_judiciario` | Articulação da rede de proteção | Grau de dificuldade na articulação integrada com o Poder Judiciário (Vara da Infância e Juventude) | `options` | Alto, Médio, Baixo |
| `q140` | Qualidade do relacionamento com a Rede | Como classifica o relacionamento institucional com o Poder Judiciário? | `options` | Bom, Regular, Ruim, Não há relacionamento |
| `q141` | Qualidade do relacionamento com a Rede | Como classifica o relacionamento institucional com o Ministério Público? | `options` | Bom, Regular, Ruim, Não há relacionamento |
| `q142` | Qualidade do relacionamento com a Rede | Como classifica o relacionamento institucional com o Conselho Tutelar? | `options` | Bom, Regular, Ruim, Não há relacionamento |
| `q143` | Qualidade do relacionamento com a Rede | Como classifica o relacionamento institucional com o CREAS e o CRAS? | `options` | Bom, Regular, Ruim, Não há relacionamento |

## Etapa 12: Vínculos familiares (`vinculos` — 11 itens)
- **Ícone Lucide:** `house` | **Animação GSAP:** `roofLift`
- **Título de Parabéns:** *Quase lá! Você concluiu a etapa de Vínculos Familiares.*
- **Copy de Incentivo:** *O trabalho com as famílias de origem e a reintegração é uma das missões mais complexas do acolhimento. Agora falta muito pouco: vamos construir o Plano de Melhoria com as prioridades práticas da sua casa!*

| ID | Seção | Pergunta | Tipo | Opções / Detalhes |
|---|---|---|---|---|
| `q129` | Frequência de visitas e contatos | Frequência de visita dos familiares à instituição | `options` | Alta, Média, Baixa |
| `q130` | Frequência de visitas e contatos | Frequência de contato de familiares (vídeo, telefone ou cartas) | `options` | Alta, Média, Baixa |
| `q131` | Grau de dificuldade no trabalho com famílias | Grau de dificuldade de atendimento psicossocial à família | `options` | Alto, Médio, Baixo |
| `q132` | Grau de dificuldade no trabalho com famílias | Grau de dificuldade de orientação parental (comunicação, resolução de conflitos e fortalecimento do cuidado) | `options` | Alto, Médio, Baixo |
| `q133_trabalho` | Encaminhamento da família na rede | Grau de dificuldade do encaminhamento dos responsáveis (família) para o mercado de trabalho | `options` | Alto, Médio, Baixo |
| `q133_saude_mental` | Encaminhamento da família na rede | Grau de dificuldade do encaminhamento dos responsáveis (familiares) para saúde mental (casos de dependência química) | `options` | Alto, Médio, Baixo |
| `q133_moradia` | Encaminhamento da família na rede | Grau de dificuldade do encaminhamento dos responsáveis para moradia | `options` | Alto, Médio, Baixo |
| `q134` | Participação e Reintegração Familiar | Grau de participação da família na vida da criança durante o acolhimento (na instituição) | `options` | Alto, Médio, Baixo |
| `q135` | Participação e Reintegração Familiar | Grau de dificuldade de promover visitas das crianças acolhidas aos familiares (criança ir na casa do familiar) | `options` | Alto, Médio, Baixo, Não ocorre |
| `q136` | Participação e Reintegração Familiar | Grau de dificuldade de realizar preparação gradual para a reintegração (finais de semana e férias) | `options` | Alto, Médio, Baixo |
| `q137` | Participação e Reintegração Familiar | Grau de dificuldade de realizar escuta qualificada da criança e da família | `options` | Alto, Médio, Baixo |

## Etapa 13: Plano de melhoria (`plano_melhoria` — 12 itens)
- **Ícone Lucide:** `sprout` | **Animação GSAP:** `sproutGrow`
- **Título de Parabéns:** *Fantástico! O Plano de Melhoria da sua casa foi registrado!*
- **Copy de Incentivo:** *Saber exatamente quais reformas, veículos, equipamentos e profissionais são prioritários hoje nos permite conectar sua instituição a apoios reais e construir o nosso E-book diagnóstico. Vamos para o fechamento de Impacto e Futuro?*

| ID | Seção | Pergunta | Tipo | Opções / Detalhes |
|---|---|---|---|---|
| `q155_ambientes` | Situação estrutural e Reforma | Reforma Estrutural: avalie a situação estrutural atual dos 5 ambientes da casa e detalhe o que precisa ser reformado | `structural_condition` | Cômodos (Quartos / Salas), Banheiro, Cozinha, Área de lazer, Quintal |
| `q158` | Prioridades físicas e equipamentos | Veículo — Nível de prioridade/urgência e especificação | `urgency_detail` | Que tipo de veículo a casa precisa e para qual finalidade? (Ex.: van de 15 lugares para levar crianças à escola e consultas)... |
| `q159_mobilia` | Prioridades físicas e equipamentos | Equipamentos — Mobília (camas, beliches, armários, mesas, sofás) | `urgency_detail` | Quais itens de mobília e quantidades são mais urgentes hoje? |
| `q159_eletrodomesticos` | Prioridades físicas e equipamentos | Equipamentos — Eletrodomésticos (geladeira, fogão industrial, máquina de lavar, freezer) | `urgency_detail` | Quais eletrodomésticos e quantidades são mais urgentes hoje? |
| `q159_eletroeletronicos` | Prioridades físicas e equipamentos | Equipamentos — Eletroeletrônicos (computadores, notebooks, tablets, TVs, impressoras) | `urgency_detail` | Quais equipamentos eletroeletrônicos e quantidades são mais urgentes hoje? |
| `q156` | Equipe e Capacitação | Ampliação da equipe | `urgency_detail` | Quais os profissionais mais importantes que faltam hoje na equipe? (Ex.: 1 psicólogo, 2 cuidadores noturnos, 1 pedagogo)... |
| `q157` | Equipe e Capacitação | Capacitação da equipe | `urgency_detail` | Quais as principais lacunas de capacitação e quais treinamentos a equipe precisa? |
| `q_melhoria_psicologico` | Equipe e Capacitação | Apoio psicológico e cuidado emocional (para acolhidos e equipe) | `urgency_detail` | Especifique a necessidade de apoio psicológico, psiquiátrico ou supervisão clínica... |
| `q_melhoria_cultura` | Gestão, Captação e Projetos | Atividades culturais, pedagógicas e esportivas | `urgency_detail` | Quais atividades culturais, esportivas ou de lazer gostaria de implementar para as crianças? |
| `q160` | Gestão, Captação e Projetos | Tecnologia e ferramentas de gestão | `urgency_detail` | Quais sistemas, prontuário eletrônico ou ferramentas de gestão a instituição precisa? |
| `q161` | Gestão, Captação e Projetos | Estruturação do setor de captação de recursos | `urgency_detail` | Qual o apoio necessário para estruturar ou profissionalizar o setor de captação de recursos da casa? |
| `q162` | Gestão, Captação e Projetos | Programas e projetos adicionais ao acolhimento (ex.: horta, oficinas de trabalho, jovem aprendiz, etc.) | `urgency_detail` | Quais programas ou projetos adicionais ao acolhimento a instituição deseja implantar? |

## Etapa 14: Impacto e futuro (`impacto_futuro` — 10 itens)
- **Ícone Lucide:** `compass` | **Animação GSAP:** `spinGlow`
- **Título de Parabéns:** *🎉 Missão Cumprida! Você concluiu 100% do Retrato da sua Instituição!*
- **Copy de Incentivo:** *Em nome da Fundação Net do Bem, nosso muito obrigado! Cada resposta sua ajuda a construir um retrato fiel, humano e estratégico das instituições de acolhimento no Brasil.*

| ID | Seção | Pergunta | Tipo | Opções / Detalhes |
|---|---|---|---|---|
| `q149` | Tecnologia e Desenvolvimento Institucional | A instituição já utiliza tecnologia para gestão, prontuário eletrônico ou automação? | `options` | Sim, utiliza sistema e prontuário eletrônico, Utiliza parcialmente (apenas planilhas/controles básicos), Não utiliza |
| `q_onde_apoio_diferenca` | Onde o apoio faz diferença | Em quais frentes o apoio da Rede Net do Bem faria maior diferença para o desenvolvimento da sua instituição? | `multi` | Governança e Planejamento Estratégico, Captação de Recursos e Marketing, Prestação de Contas e Indicadores, Formação e Desenvolvimento de Equipe, Aspectos Jurídicos e Regularização, Tecnologia e Inovação, Comunicação com o Município e Rede |
| `a004` | Impacto social | Como a instituição mede seus resultados e quais indicadores acompanha hoje? | `textarea` | Descreva brevemente como acompanham a evolução das crianças e as metas da casa... |
| `a006` | Impacto social | Quais foram as principais conquistas da instituição nos últimos anos? | `textarea` | Compartilhe marcos importantes, melhorias conquistadas ou histórias institucionais de superação... |
| `a007` | Impacto social | Quais mudanças estruturais ou metodológicas considera prioritárias para melhorar o acolhimento? | `textarea` | O que mais transformaria o dia a dia da casa hoje? |
| `a012` | Parcerias | Quais parcerias considera estratégicas e quais parcerias ainda fazem falta? | `textarea` | Ex.: parcerias com clínicas de psicologia, escolas profissionalizantes, empresas apoiadoras... |
| `a014` | Parcerias | A instituição mantém relacionamento ou parcerias com Universidades? | `options` | Sim, mantemos parceria ativa, Já tivemos no passado, mas não atualmente, Não temos, mas gostaríamos de iniciar, Não |
| `a018` | Visão de futuro | Onde a instituição quer estar nos próximos 5 anos? | `textarea` | Descreva a visão de futuro e os sonhos da sua instituição para os próximos 5 anos... |
| `a019` | Visão de futuro | O que considera essencial para o fortalecimento das Casas de Acolhimento no Estado de São Paulo e no Brasil? | `textarea` | Sua visão contribuirá diretamente para o E-book diagnóstico da Fundação Net do Bem... |
| `a020` | Visão de futuro | Que tipo de apoio uma organização parceira como a Fundação Net do Bem poderia oferecer para gerar maior impacto? | `textarea` | Deixe sua mensagem final e sugestões de apoio para a Fundação Net do Bem... |

