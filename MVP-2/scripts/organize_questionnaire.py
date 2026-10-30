"""Generates the MVP-2 questionnaire schema (14 blocks) and dictionary based on V1.md, transcripts, and SPEC-TECNICA."""
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]

blocks_meta = [
    {
        "id": "identificacao",
        "number": 1,
        "title": "Sua entidade",
        "intro": "Identidade, natureza jurídica, fundação, CNPJ, endereço via CEP e dados de contato.",
        "purpose": "Identificar a entidade mantenedora, a unidade de acolhimento e quem responde à pesquisa.",
        "icon": "building-2",
        "art": "cards/stage-01.webp",
        "animType": "bounceScale",
        "estimatedMinutes": 3,
        "celebration": {
            "title": "Parabéns! A identidade da sua instituição já está registrada.",
            "copy": "Dar visibilidade a quem acolhe é o primeiro passo para fortalecermos essa rede. Agora que já conhecemos os dados básicos da sua entidade, vamos olhar para o espaço físico que recebe as crianças no dia a dia?"
        }
    },
    {
        "id": "estrutura",
        "number": 2,
        "title": "Estrutura",
        "intro": "Ambientes e mobiliário (painel rápido), acessibilidade, brinquedos por idade e veículos.",
        "purpose": "Mapear a infraestrutura física, equipamentos lúdicos e recursos de transporte da casa.",
        "icon": "home",
        "art": "cards/stage-02.webp",
        "animType": "roofLift",
        "estimatedMinutes": 3,
        "celebration": {
            "title": "Excelente! Mapeamos toda a estrutura física da casa.",
            "copy": "Cada quarto, espaço de lazer e detalhe da casa faz diferença no bem-estar de quem chega. Você está indo muito bem! Na próxima etapa, vamos entender como funciona a ocupação atual e a rotina das crianças."
        }
    },
    {
        "id": "cotidiano",
        "number": 3,
        "title": "Cotidiano e acolhimento",
        "intro": "Capacidade, acolhidos hoje e nos últimos 12 meses por faixa etária, motivos e apadrinhamento.",
        "purpose": "Compreender o perfil etário, fluxo de acolhimento/desacolhimento e rotina diária.",
        "icon": "sun",
        "art": "cards/stage-03.webp",
        "animType": "spinGlow",
        "estimatedMinutes": 3,
        "celebration": {
            "title": "Muito obrigado! O retrato do cotidiano das crianças está completo.",
            "copy": "Compreender o perfil etário e os motivos de acolhimento nos ajuda a mostrar a realidade real dos abrigos no Brasil. Vamos avançar mais um passo para valorizar quem faz esse cuidado acontecer todos os dias: a sua equipe!"
        }
    },
    {
        "id": "pessoas",
        "number": 4,
        "title": "Pessoas",
        "intro": "Quadro de colaboradores, Coordenação Técnica/Funcional, equipe mínima e desafios de folha.",
        "purpose": "Dimensionar a equipe técnica, operacional e de apoio e suas demandas de capacitação.",
        "icon": "users",
        "art": "cards/stage-04.webp",
        "animType": "waveUsers",
        "estimatedMinutes": 3,
        "celebration": {
            "title": "Incrível! Você concluiu o mapeamento da sua equipe.",
            "copy": "Sabemos que cuidar de quem cuida é um dos maiores desafios do acolhimento institucional. Suas respostas já estão salvas! Que tal aproveitarmos o ritmo para registrar as práticas de Governança da instituição? É um bloco super rápido!"
        }
    },
    {
        "id": "governanca",
        "number": 5,
        "title": "Governança",
        "intro": "Práticas de gestão, conselho, balanço, retorno de prestação de contas aos financiadores e portal.",
        "purpose": "Conhecer práticas de governança, controle e prestação de contas aos financiadores.",
        "icon": "shield-check",
        "art": "cards/stage-05.webp",
        "animType": "shieldPulse",
        "estimatedMinutes": 3,
        "celebration": {
            "title": "Parabéns! Mais uma etapa fundamental concluída: Governança.",
            "copy": "A clareza na gestão e na prestação de contas é o que constrói pontes sólidas com grandes apoiadores e financiadores. Você já chegou quase na metade da jornada! Vamos falar agora sobre a Sustentabilidade financeira da casa?"
        }
    },
    {
        "id": "sustentabilidade",
        "number": 6,
        "title": "Sustentabilidade",
        "intro": "Fontes de recursos, reserva financeira e dificuldades de custeio (incluindo Vestuário e Higiene).",
        "purpose": "Identificar composição do orçamento e pressões de custeio mensal da instituição.",
        "icon": "wallet",
        "art": "cards/stage-06.webp",
        "animType": "coinFlip",
        "estimatedMinutes": 3,
        "celebration": {
            "title": "Ótimo avanço! O diagnóstico financeiro de custeio está salvo.",
            "copy": "Mapear onde o orçamento mais aperta — da alimentação à manutenção, vestuário e higiene — é essencial para direcionarmos apoios que realmente aliviem o seu caixa. No próximo bloco, vamos focar especificamente nas fontes e desafios de Captação."
        }
    },
    {
        "id": "captacao",
        "number": 7,
        "title": "Captação",
        "intro": "Doações sazonais, Imposto de Renda (PF e PJ), Editais (Públicos e Privados) e burocracia.",
        "purpose": "Compreender canais de mobilização de recursos, incentivos fiscais e gargalos de captação.",
        "icon": "hand-coins",
        "art": "cards/stage-07.webp",
        "animType": "bounceScale",
        "estimatedMinutes": 4,
        "celebration": {
            "title": "Parabéns! Fechamos o panorama de Captação de Recursos.",
            "copy": "Suas respostas sobre Imposto de Renda PF/PJ, editais e burocracia vão enriquecer diretamente o nosso diagnóstico nacional sobre as casas de acolhimento. Agora, vamos entrar no coração do cuidado diário, começando pela Saúde das crianças!"
        }
    },
    {
        "id": "saude",
        "number": 8,
        "title": "Saúde",
        "intro": "Acompanhamento psicológico, psiquiátrico, médico e relação com a rede de Saúde (SUS/CAPS).",
        "purpose": "Mapear o cuidado em saúde física e emocional e os gargalos na rede pública e privada.",
        "icon": "heart-pulse",
        "art": "cards/stage-08.webp",
        "animType": "heartbeat",
        "estimatedMinutes": 2,
        "celebration": {
            "title": "Etapa de Saúde concluída com sucesso!",
            "copy": "Registrar como funciona o atendimento médico, emocional e a relação com a rede pública de saúde dá voz às necessidades mais urgentes dos acolhidos. O próximo bloco é bem curtinho e trata da Educação e relação com a escola!"
        }
    },
    {
        "id": "educacao",
        "number": 9,
        "title": "Educação",
        "intro": "Inclusão escolar, aprendizagem, reforço, socialização e relação direta com as escolas.",
        "purpose": "Avaliar os desafios educacionais das crianças acolhidas e a articulação com a rede escolar.",
        "icon": "graduation-cap",
        "art": "cards/stage-09.webp",
        "animType": "capToss",
        "estimatedMinutes": 2,
        "celebration": {
            "title": "Maravilha! Você concluiu o bloco de Educação.",
            "copy": "Garantir o desenvolvimento escolar e o contraturno das crianças transforma futuros. Você já superou mais de dois terços da pesquisa! Vamos avançar agora para os desafios técnicos do Atendimento?"
        }
    },
    {
        "id": "atendimento",
        "number": 10,
        "title": "Atendimento",
        "intro": "Reparação de experiências traumáticas (Sim/Não e %), PIA, adoção e preparação para desacolhimento.",
        "purpose": "Compreender os desafios técnicos e psicossociais no atendimento cotidiano às crianças.",
        "icon": "heart-handshake",
        "art": "cards/stage-10.webp",
        "animType": "heartbeat",
        "estimatedMinutes": 3,
        "celebration": {
            "title": "Parabéns pelo cuidado! O bloco de Atendimento está completo.",
            "copy": "Falar sobre reparação de traumas, adoção, desacolhimento e preparação para a maioridade exige sensibilidade e vivência real. Na sequência, vamos registrar rapidamente como é a articulação da casa com a Rede de Proteção."
        }
    },
    {
        "id": "rede",
        "number": 11,
        "title": "Rede de proteção",
        "intro": "Articulação desmembrada com Assistência Social (CRAS/CREAS), Conselho Tutelar, MP e Judiciário.",
        "purpose": "Avaliar o diálogo e a qualidade da articulação com cada órgão do Sistema de Garantia de Direitos.",
        "icon": "network",
        "art": "cards/stage-11.webp",
        "animType": "spinGlow",
        "estimatedMinutes": 2,
        "celebration": {
            "title": "Excelente! Articulação com a Rede de Proteção registrada.",
            "copy": "Esse foi super rápido! Entender o diálogo com Assistência Social, Conselho Tutelar, MP e Judiciário mostra onde o sistema precisa evoluir. Agora vamos para a etapa de Vínculos Familiares!"
        }
    },
    {
        "id": "vinculos",
        "number": 12,
        "title": "Vínculos familiares",
        "intro": "Frequência de visitas/contatos, encaminhamento da família (trabalho, saúde mental, moradia) e reintegração.",
        "purpose": "Mapear a frequência de convivência familiar e o grau de dificuldade na reintegração.",
        "icon": "house",
        "art": "cards/stage-12.webp",
        "animType": "roofLift",
        "estimatedMinutes": 3,
        "celebration": {
            "title": "Quase lá! Você concluiu a etapa de Vínculos Familiares.",
            "copy": "O trabalho com as famílias de origem e a reintegração é uma das missões mais complexas do acolhimento. Agora falta muito pouco: vamos construir o Plano de Melhoria com as prioridades práticas da sua casa!"
        }
    },
    {
        "id": "plano_melhoria",
        "number": 13,
        "title": "Plano de melhoria",
        "intro": "Situação dos 5 ambientes, veículo, equipamentos, equipe, capacitação, captação e projetos adicionais.",
        "purpose": "Identificar e detalhar as prioridades práticas mais urgentes da instituição para o E-book e conexões de apoio.",
        "icon": "sprout",
        "art": "cards/stage-13.webp",
        "animType": "sproutGrow",
        "estimatedMinutes": 4,
        "introWarning": "Orientação importante: sabemos que as casas possuem muitas demandas, mas pedimos que avalie com rigor e reserve a nota 5 (Urgente) apenas para o que for realmente mais crítico hoje. Detalhe nos campos abertos os itens específicos para enriquecer nosso diagnóstico.",
        "celebration": {
            "title": "Fantástico! O Plano de Melhoria da sua casa foi registrado!",
            "copy": "Saber exatamente quais reformas, veículos, equipamentos e profissionais são prioritários hoje nos permite conectar sua instituição a apoios reais e construir o nosso E-book diagnóstico. Vamos para o fechamento de Impacto e Futuro?"
        }
    },
    {
        "id": "impacto_futuro",
        "number": 14,
        "title": "Impacto e futuro",
        "intro": "Tecnologia na gestão, onde o apoio faz diferença, conquistas, parcerias estratégicas e visão de 5 anos.",
        "purpose": "Conhecer o impacto alcançado, parcerias desejadas e visão de futuro da instituição.",
        "icon": "compass",
        "art": "cards/stage-14.webp",
        "animType": "spinGlow",
        "estimatedMinutes": 3,
        "celebration": {
            "title": "🎉 Missão Cumprida! Você concluiu 100% do Retrato da sua Instituição!",
            "copy": "Em nome da Fundação Net do Bem, nosso muito obrigado! Cada resposta sua ajuda a construir um retrato fiel, humano e estratégico das instituições de acolhimento no Brasil."
        }
    }
]

questions = []

def add(id, label, kind, block, page, source="Revisão V2", **kw):
    q = {
        "id": id,
        "label": label,
        "type": kind,
        "block": block,
        "page": page,
        "source": source,
        "required": block == 0 and kw.get("required", True),
        "options": [],
        "help": "",
        "placeholder": "",
        "maxLength": 300 if kind in ("textarea", "urgency_detail", "structural_condition") else 200,
        "unit": "",
        "condition": None,
        "review": "",
        "purpose": blocks_meta[block]["purpose"]
    }
    q.update(kw)
    questions.append(q)

# ==============================================================================
# BLOCO 0 (Etapa 1): SUA ENTIDADE (Identificação + Dados de Contato)
# ==============================================================================
add("entidade", "Nome oficial da entidade (Razão Social)", "text", 0, "A identidade da entidade", "Sheet1!A2",
    required=True, placeholder="Ex.: Associação Caminhos do Bem", help="Informe a razão social conforme consta no CNPJ.")
add("casa", "Nome fantasia / Nome da casa ou unidade de acolhimento", "text", 0, "A identidade da entidade", "Revisão V2",
    required=True, placeholder="Ex.: Casa de Acolhimento Girassol", help="Identifique esta unidade. Uma mesma mantenedora pode cadastrar mais de uma casa.")
add("natureza", "Natureza jurídica da instituição", "options", 0, "A identidade da entidade", "Sheet1!A3",
    required=True, options=["Associação privada", "Organização religiosa", "Organização pública", "Outra"],
    help="Selecione o enquadramento institucional da entidade.")
add("fundacao_data", "Mês e Ano de fundação da instituição (MM/AAAA)", "month_year", 0, "A identidade da entidade", "Sheet1!A4",
    required=False, placeholder="Ex.: 04/2008", help="O sistema calcula automaticamente o tempo de existência da instituição a partir desta data.")
add("cnpj", "CNPJ da entidade", "cnpj", 0, "A identidade da entidade", "Revisão V2",
    required=True, placeholder="Ex.: 12.345.678/0001-95", help="Digite os 14 dígitos do CNPJ (formatação automática).")
add("cep", "CEP e Endereço da unidade", "cep", 0, "Onde o cuidado acontece", "Revisão V2",
    required=False, placeholder="Ex.: 01310-100", help="Digite o CEP para preencher automaticamente rua, bairro, município e estado (UF).")
add("endereco", "Logradouro, número, complemento e bairro", "text", 0, "Onde o cuidado acontece", "Revisão V2",
    required=False, placeholder="Ex.: Rua das Flores, 120 - Vila Mariana", help="Preenchido automaticamente pelo CEP; complemente com o número do imóvel.")
add("cidade", "Município", "text", 0, "Onde o cuidado acontece", "Revisão V2",
    required=True, placeholder="Ex.: São Paulo", help="Município onde a casa de acolhimento está localizada.")
add("uf", "Estado (UF)", "select", 0, "Onde o cuidado acontece", "Revisão V2",
    required=True, options=["SP","AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SE","TO"],
    help="Estado pré-selecionado em SP; altere caso a unidade fique em outro estado.")
add("gestor", "Quem está respondendo a pesquisa (Nome completo)", "text", 0, "Dados de contato", "Revisão V2",
    required=True, placeholder="Ex.: Maria Oliveira", help="Informe o nome da pessoa responsável pelo preenchimento.")
add("funcao", "Função de quem está respondendo a pesquisa", "text", 0, "Dados de contato", "Revisão V2",
    required=True, placeholder="Ex.: Coordenadora Técnica / Gestora", help="Cargo ou função que exerce na instituição.")
add("email", "E-mail de comunicação com a entidade", "email", 0, "Dados de contato", "Revisão V2",
    required=True, placeholder="Ex.: contato@entidade.org.br", help="E-mail oficial para comunicação da Fundação Net do Bem com a entidade.")
add("telefone", "Telefone fixo e WhatsApp de contato", "text", 0, "Dados de contato", "Revisão V2",
    required=False, placeholder="Ex.: (11) 99999-0000 / (11) 3333-0000", help="Informe o principal número de contato da unidade.")
add("conselhos", "Possui inscrição ativa nos conselhos (CMDCA / CMAS)?", "options", 0, "Registro nos Conselhos", "Revisão V2",
    required=False, options=["Sim, em ambos (CMDCA e CMAS)", "Apenas no CMDCA", "Apenas no CMAS", "Em processo de regularização", "Não possui"],
    help="Informe a situação de registro nos Conselhos Municipais.")

# ==============================================================================
# BLOCO 1 (Etapa 2): ESTRUTURA (Ambientes e mobiliário + Brinquedos + Veículos)
# ==============================================================================
add("q_ambientes_grid", "Informe a quantidade de ambientes, cômodos e mobiliário da casa", "quintoandar", 1, "Ambientes e mobiliário", "Sheet1!B7:B17",
    options=[
        "Quartos / Dormitórios",
        "Camas / Beliches",
        "Banheiros",
        "Chuveiros",
        "Mesas para refeição",
        "Cadeiras para refeição",
        "Mesas para estudos",
        "Cadeiras para estudos",
        "Televisores",
        "Vídeo Game"
    ],
    help="Use os seletores [-] e [+] para informar rapidamente as quantidades disponíveis na casa.")
add("q_acessibilidade", "O imóvel possui acessibilidade física?", "options", 1, "Ambientes e mobiliário", "Revisão V2",
    options=["Sim, totalmente acessível", "Parcialmente acessível (apenas alguns ambientes)", "Não possui acessibilidade"],
    help="Considere rampas, banheiros adaptados e circulação sem barreiras.")
add("q_internet_computadores", "Como é a disponibilidade de internet (Wi-Fi) e computadores para os acolhidos?", "options", 1, "Ambientes e mobiliário", "Revisão V2",
    options=[
        "Internet estável e computadores suficientes para estudo/lazer",
        "Parcial (internet restrita ou poucos computadores para os acolhidos)",
        "Apenas computadores de uso administrativo",
        "Não possui internet ou computadores"
    ],
    help="Avalie os recursos digitais disponíveis para uso das crianças e adolescentes.")
add("q016_brinquedos_faixas", "A casa possui brinquedos e materiais lúdicos em bom estado para quais faixas etárias?", "multi", 1, "Ambientes e mobiliário", "Sheet1!B16",
    options=["0 a 3 anos", "4 a 7 anos", "8 a 12 anos", "13 a 18 anos (jogos, livros, esportes)"],
    help="Selecione todas as faixas etárias que contam com brinquedos adequados e em bom estado.")
add("q016_brinquedos_obs", "Observações sobre brinquedos e materiais lúdicos", "textarea", 1, "Ambientes e mobiliário", "Revisão V2",
    placeholder="Se desejar, descreva o que falta ou precisa ser reposto em brinquedos por idade...",
    help="")
add("q018_veiculo_proprio", "A instituição possui veículo próprio?", "options", 1, "Veículos e segurança no transporte", "Sheet1!B18",
    options=["Sim", "Não"],
    help="")
add("q018_veiculo_tipos", "Quais tipos de veículo a instituição possui ou utiliza?", "multi", 1, "Veículos e segurança no transporte", "Revisão V2",
    options=["Van / Kombi", "Carro de passeio", "Caminhonete / Utilitário", "Não possui veículo próprio"],
    help="Selecione todas as opções que se aplicam.")
add("q018_veiculo_seguranca", "Possui sistema de segurança de veículo para criança (Bebê conforto, cadeirinha e assento de elevação)?", "options", 1, "Veículos e segurança no transporte", "Revisão V2",
    options=["Sim", "Parcial", "Não"],
    help="")
add("q018_veiculo_obs", "Observações sobre veículos e transporte", "textarea", 1, "Veículos e segurança no transporte", "Revisão V2",
    placeholder="Descreva a quantidade, estado de conservação ou demandas de transporte da casa...",
    help="")
add("q030", "A estrutura física atende às necessidades dos acolhidos?", "options", 1, "Ambientes e mobiliário", "Sheet1!B30",
    options=["Sim", "Não", "Parcial"],
    help="")

# ==============================================================================
# BLOCO 2 (Etapa 3): COTIDIANO E ACOLHIMENTO (Números por Faixa Etária + Rotina + Padrinhos)
# ==============================================================================
add("q022", "A casa tem capacidade autorizada para acolher quantas crianças e adolescentes?", "number", 2, "O acolhimento em números", "Sheet1!B22",
    unit="vagas", placeholder="Ex.: 20", help="Informe a capacidade total autorizada da unidade.")
add("q021_faixas", "Quantos acolhimentos estão na casa NO MOMENTO, por faixa etária?", "quintoandar", 2, "O acolhimento em números", "Sheet1!B21",
    options=["0 a 3 anos", "4 a 7 anos", "8 a 12 anos", "13 a 18 anos"],
    help="Informe quantas crianças e adolescentes vivem na casa hoje em cada faixa etária.")
add("q019_faixas", "Quantos acolhimentos ocorreram nos ÚLTIMOS 12 MESES, por faixa etária?", "quintoandar", 2, "O acolhimento em números", "Sheet1!B19",
    options=["0 a 3 anos", "4 a 7 anos", "8 a 12 anos", "13 a 18 anos"],
    help="Informe a quantidade de novos acolhimentos recebidos nos últimos 12 meses em cada faixa.")
add("q020_faixas", "Quantos desligamentos (desacolhimentos) ocorreram nos ÚLTIMOS 12 MESES, por faixa etária?", "quintoandar", 2, "O acolhimento em números", "Sheet1!B20",
    options=["0 a 3 anos", "4 a 7 anos", "8 a 12 anos", "13 a 18 anos"],
    help="Informe quantas saídas, reintegrações ou adoções ocorreram nos últimos 12 meses por faixa etária.")
add("q023", "Tempo (em meses) em média que as crianças ficam acolhidas na casa", "number", 2, "O acolhimento em números", "Sheet1!B23",
    unit="meses", placeholder="Ex.: 14", help="Informe a média estimada em meses de permanência na unidade.")
add("q024", "Qual é a faixa etária predominante entre os acolhidos?", "options", 2, "Rotina de acolhimento", "Sheet1!B24",
    options=["0 a 3 anos", "4 a 7 anos", "8 a 12 anos", "13 a 18 anos", "Não há faixa predominante"],
    help="")
add("q026", "Ordene os motivos mais frequentes de acolhimento (1º, 2º e 3º lugar)", "rank", 2, "Rotina de acolhimento", "Sheet1!B26",
    options=["Violência", "Negligência / Abandono", "Álcool / drogas"],
    help="Escolha uma posição diferente (1º, 2º e 3º lugar) para cada motivo. Não descreva casos individuais.")
add("q028", "Quais refeições são oferecidas diariamente?", "multi", 2, "Rotina de acolhimento", "Sheet1!B28",
    options=["Café da manhã", "Almoço", "Lanche", "Jantar", "Ceia noturna"],
    help="Selecione todas as refeições servidas regularmente na rotina da casa.")
add("q_padrinhos_afetivo", "A instituição possui sistema de padrinhos — Afetivo?", "options", 2, "Rotina de acolhimento", "Revisão V2",
    options=["Sim", "Não"],
    help="")
add("q_padrinhos_financeiro", "A instituição possui sistema de padrinhos — Financeiro?", "options", 2, "Rotina de acolhimento", "Revisão V2",
    options=["Sim", "Não"],
    help="")

# ==============================================================================
# BLOCO 3 (Etapa 4): PESSOAS (Quadro de Equipe + Formação + Desafios de Folha)
# ==============================================================================
add("q_equipe_grid", "Quem compõe a equipe da unidade? (Informe a quantidade por função)", "quintoandar", 3, "Quem compõe a equipe", "Sheet1!B34:B40",
    options=[
        "Cuidadores / Educadores",
        "Assistente Social",
        "Psicólogo",
        "Pedagogia",
        "Coordenação Técnica",
        "Coordenação Funcional (RH / Apoio)",
        "Supervisão (equipe externa)",
        "Voluntários",
        "Padrinhos cadastrados"
    ],
    help="Use os seletores [-] e [+] para informar a quantidade de pessoas em cada função.")
add("q042", "A equipe recebe capacitação periódica?", "options", 3, "Formação e composição", "Sheet1!B42",
    options=["Sim", "Não", "Parcial"],
    help="")
add("q043", "A equipe mínima prevista na legislação (NOB-RH/SUAS) está completa?", "options", 3, "Formação e composição", "Sheet1!B43",
    options=["Sim", "Não", "Parcial"],
    help="Considere a proporção de coordenador, equipe técnica e educadores/cuidadores por turno.")
add("q125", "Qual o grau de dificuldade com capacitação e estabilidade (rotatividade) da equipe?", "options", 3, "Formação e composição", "Sheet1!B125",
    options=["Alto", "Médio", "Baixo"],
    help="")
add("q_pessoas_funcao_extra", "Descreva os desafios de pagar alguma função extra de equipe técnica", "textarea", 3, "Desafios da equipe", "Revisão V2",
    placeholder="Descreva as dificuldades financeiras para custear especialistas ou horas técnicas extras...",
    help="")
add("q_pessoas_obs", "Observações ou comentários adicionais sobre a equipe (Opcional)", "textarea", 3, "Desafios da equipe", "Revisão V2",
    placeholder="Se houver algo mais a acrescentar sobre a realidade da sua equipe, registre aqui...",
    help="")

# ==============================================================================
# BLOCO 4 (Etapa 5): GOVERNANÇA (Subtítulo único: Práticas)
# ==============================================================================
gov_yesno = ["Sim", "Não"]
add("q046", "A instituição possui planejamento estratégico?", "options", 4, "Práticas", "Sheet1!B46", options=gov_yesno)
add("q047", "Existem indicadores para acompanhar resultados?", "options", 4, "Práticas", "Sheet1!B47", options=gov_yesno)
add("q048", "Há conselho diretor?", "options", 4, "Práticas", "Sheet1!B48", options=gov_yesno)
add("q049", "O conselho diretor é atuante?", "options", 4, "Práticas", "Sheet1!B49", options=gov_yesno, condition={"id": "q048", "equals": "Sim"})
add("q050", "Há reuniões de governança?", "options", 4, "Práticas", "Sheet1!B50", options=gov_yesno)
add("q051", "As reuniões de governança ocorrem regularmente?", "options", 4, "Práticas", "Sheet1!B51", options=gov_yesno, condition={"id": "q050", "equals": "Sim"})
add("q052", "Existe gestão de risco?", "options", 4, "Práticas", "Sheet1!B52", options=gov_yesno)
add("q053", "A instituição possui políticas internas (compliance, ética, proteção de dados, compras)?", "options", 4, "Práticas", "Sheet1!B53", options=gov_yesno)
add("q056", "O balanço financeiro é publicado?", "options", 4, "Práticas", "Sheet1!B56", options=gov_yesno)
add("q_gov_prestacao_simnao", "As prestações de contas são feitas aos financiadores?", "options", 4, "Práticas", "Revisão V2",
    options=gov_yesno, help="")
add("q060", "Descreva como você dá retorno de prestações de contas aos financiadores.", "textarea", 4, "Práticas", "Sheet1!B60",
    placeholder="Ex.: Enviamos relatórios periódicos com notas fiscais, balancete contábil e registro das atividades realizadas...",
    help="")
add("q057", "A instituição divulga relatório anual de atividades?", "options", 4, "Práticas", "Sheet1!B57", options=gov_yesno)
add("q058", "Possui auditoria?", "options", 4, "Práticas", "Sheet1!B58", options=gov_yesno)
add("q059", "Há um portal de atividades e financiamento disponíveis ao público?", "options", 4, "Práticas", "Sheet1!B59",
    options=gov_yesno, help="")

# ==============================================================================
# BLOCO 5 (Etapa 6): SUSTENTABILIDADE (Fontes de recursos + Dificuldades até Vestuário e Higiene)
# ==============================================================================
scale_hmb = ["Alto", "Médio", "Baixo"]
add("q063", "Quais são as principais fontes de receita da instituição?", "multi", 5, "De onde vêm os recursos", "Sheet1!B63",
    options=["Poder público", "Pessoas físicas", "Empresas", "Imposto de Renda", "Eventos", "Outros"],
    help="Selecione todas as fontes de receita que compõem o orçamento da casa.")
add("q065", "Qual percentual da receita vem do poder público?", "options", 5, "De onde vêm os recursos", "Sheet1!B65",
    options=["0% a 25%", "Mais de 25% a 50%", "Mais de 50% a 75%", "Mais de 75% a 100%"])
add("q067", "Qual percentual da receita vem de doações?", "options", 5, "De onde vêm os recursos", "Sheet1!B67",
    options=["0% a 25%", "Mais de 25% a 50%", "Mais de 50% a 75%", "Mais de 75% a 100%"])
add("q069", "A instituição possui reserva financeira?", "options", 5, "De onde vêm os recursos", "Sheet1!B69", options=["Sim", "Não"])
add("q071", "Quantos meses conseguiria manter as atividades sem novos recursos?", "options", 5, "De onde vêm os recursos", "Sheet1!B71",
    options=["Até 1 mês", "Mais de 1 até 3 meses", "Mais de 3 até 6 meses", "Mais de 6 meses"])
add("q074", "Custo com equipe (salários de cuidadores, educadores, psicólogos, coordenadores...)", "options", 5, "Dificuldades financeiras", "Sheet1!B74",
    options=scale_hmb, help="Qual o grau de dificuldade financeira para custear este item?")
add("q075", "Alimentação (fornecimento de refeições e dietas especiais quando necessário)", "options", 5, "Dificuldades financeiras", "Sheet1!B75",
    options=scale_hmb, help="Qual o grau de dificuldade financeira para custear este item?")
add("q076", "Saúde (medicamentos não fornecidos pelo SUS, consultas e exames...)", "options", 5, "Dificuldades financeiras", "Sheet1!B76",
    options=scale_hmb, help="Qual o grau de dificuldade financeira para custear este item?")
add("q077", "Educação e desenvolvimento (material escolar, uniformes, transporte...)", "options", 5, "Dificuldades financeiras", "Sheet1!B77",
    options=scale_hmb, help="Qual o grau de dificuldade financeira para custear este item?")
add("q078", "Moradia e manutenção (aluguel, energia elétrica, água, gás, manutenção predial...)", "options", 5, "Dificuldades financeiras", "Sheet1!B78",
    options=scale_hmb, help="Qual o grau de dificuldade financeira para custear este item?")
add("q079_vestuario", "Vestuário (roupas, calçados, enxoval de cama e banho)", "options", 5, "Dificuldades financeiras", "Sheet1!B79",
    options=scale_hmb, help="Qual o grau de dificuldade financeira para custear este item?")
add("q079_higiene", "Higiene (produtos de higiene pessoal, fraldas e limpeza)", "options", 5, "Dificuldades financeiras", "Sheet1!B79",
    options=scale_hmb, help="Qual o grau de dificuldade financeira para custear este item?")

# ==============================================================================
# BLOCO 6 (Etapa 7): CAPTAÇÃO (Caminhos e Desafios para Captar)
# ==============================================================================
add("q080", "Captação de recursos instável (oscilação de doações sazonais)", "options", 6, "Desafios estruturais de captação", "Sheet1!B80",
    options=scale_hmb, help="Qual o grau de dificuldade enfrentado neste aspecto?")
add("q081", "Exigências legais e administrativas (contabilidade, certificações, auditorias...)", "options", 6, "Desafios estruturais de captação", "Sheet1!B81",
    options=scale_hmb, help="Qual o grau de dificuldade enfrentado neste aspecto?")
add("q084", "Possui profissional dedicado/responsável pela captação de recursos?", "options", 6, "Caminhos de captação", "Sheet1!B84", options=["Sim", "Não"])
add("q085", "Realiza campanhas periódicas de doação?", "options", 6, "Caminhos de captação", "Sheet1!B85", options=["Sim", "Não"])
add("q086_pf", "Recebe doações via Imposto de Renda — Pessoa Física (PF)?", "options", 6, "Caminhos de captação", "Sheet1!B86",
    options=["Sim", "Não"], help="Destinação de Imposto de Renda de Pessoas Físicas via Fundo da Infância e Adolescência (FIA/CMDCA).")
add("q086_pj", "Recebe doações via Imposto de Renda — Pessoa Jurídica (PJ)?", "options", 6, "Caminhos de captação", "Sheet1!B86",
    options=["Sim", "Não"], help="Destinação de incentivo fiscal de empresas via FIA/CMDCA.")
add("q087_pub", "Participa de Editais Públicos?", "options", 6, "Caminhos de captação", "Sheet1!B87",
    options=["Sim", "Não"], help="Chamamentos públicos, emendas ou editais governamentais.")
add("q087_priv", "Participa de Editais Privados?", "options", 6, "Caminhos de captação", "Sheet1!B87",
    options=["Sim", "Não"], help="Editais de fundações empresariais, institutos e bancos.")
add("q088", "Possui relacionamento ativo e parcerias com empresas?", "options", 6, "Caminhos de captação", "Sheet1!B88", options=["Sim", "Não"])
add("q089", "Recebe doações por programas de nota fiscal (ex.: Nota Fiscal Paulista)?", "options", 6, "Caminhos de captação", "Sheet1!B89", options=["Sim", "Não"])
add("q091", "Número estimado de doadores recorrentes ativos", "number", 6, "Caminhos de captação", "Sheet1!B91",
    unit="doadores", placeholder="Ex.: 35", help="Informe zero quando não houver doadores mensais recorrentes.")
add("q092", "Grande concorrência entre instituições e dependência de campanhas sazonais", "options", 6, "Desafios para captar", "Sheet1!B92",
    options=scale_hmb, help="Como avalia o nível de dificuldade neste aspecto?")
add("q093", "Baixa visibilidade do trabalho (por sigilo legal não poder expor histórias das crianças)", "options", 6, "Desafios para captar", "Sheet1!B93",
    options=scale_hmb, help="Como avalia o nível de dificuldade neste aspecto?")
add("q095", "Pouca profissionalização da captação e dificuldade em acessar empresas", "options", 6, "Desafios para captar", "Sheet1!B95",
    options=scale_hmb, help="Como avalia o nível de dificuldade neste aspecto?")
add("q097_pub", "Burocracia para obtenção de recursos públicos", "options", 6, "Desafios para captar", "Sheet1!B97",
    options=scale_hmb, help="Como avalia o nível de dificuldade neste aspecto?")
add("q097_priv", "Burocracia para obtenção de recursos privados", "options", 6, "Desafios para captar", "Sheet1!B97",
    options=scale_hmb, help="Como avalia o nível de dificuldade neste aspecto?")
add("q099", "Necessidade de demonstrar impacto e recursos financeiros limitados", "options", 6, "Desafios para captar", "Sheet1!B99",
    options=scale_hmb, help="Como avalia o nível de dificuldade neste aspecto?")

# ==============================================================================
# BLOCO 7 (Etapa 8): SAÚDE (Sem a palavra "autonomia" + Articulação com Rede de Saúde)
# ==============================================================================
add("q102", "Acesso a atendimento psicológico regular para os acolhidos?", "options", 7, "Saúde", "Sheet1!B102", options=["Sim", "Parcial", "Não"])
add("q103", "Acesso a atendimento psiquiátrico quando necessário?", "options", 7, "Saúde", "Sheet1!B103", options=["Sim", "Parcial", "Não"])
add("q104", "Acesso a saúde geral (hospital, consultas médicas, odontologia e exames)?", "options", 7, "Saúde", "Sheet1!B104", options=["Sim", "Parcial", "Não"])
add("q105", "Existem programas de preparação gradual para saída / autonomia dos adolescentes?", "options", 7, "Saúde", "Sheet1!B105", options=["Sim", "Parcial", "Não"])
add("q145", "Como avalia a articulação e o atendimento da Rede de Saúde (UBS, CAPS, Hospitais) à casa?", "options", 7, "Relação com a Rede de Saúde", "Sheet1!B145",
    options=["Bom", "Regular", "Ruim", "Não há relacionamento"],
    help="")
add("q_saude_relacao_obs", "Descreva a relação das casas de acolhimento com a Saúde e os principais problemas enfrentados", "textarea", 7, "Relação com a Rede de Saúde", "Revisão V2",
    placeholder="Relate dificuldades como filas de espera, atendimento em saúde mental/CAPS, acesso a medicamentos...",
    help="")

# ==============================================================================
# BLOCO 8 (Etapa 9): EDUCAÇÃO (Sem "Não se aplica" + Relação com as Escolas)
# ==============================================================================
add("q107", "Defasagem na aprendizagem (histórico de negligência ou evasão gerando dificuldades escolares)", "options", 8, "Educação", "Sheet1!B107",
    options=scale_hmb, help="Qual o grau de dificuldade enfrentado neste aspecto?")
add("q108", "Impactos emocionais e comportamentais refletindo no ambiente escolar", "options", 8, "Educação", "Sheet1!B108",
    options=scale_hmb, help="Qual o grau de dificuldade enfrentado neste aspecto?")
add("q109", "Preconceito e estigmatização na escola (rotulagem, exclusão ou redução de expectativas)", "options", 8, "Educação", "Sheet1!B109",
    options=scale_hmb, help="Qual o grau de dificuldade enfrentado neste aspecto?")
add("q110", "Falta de articulação entre serviços (comunicação entre escola, instituição e rede)", "options", 8, "Educação", "Sheet1!B110",
    options=scale_hmb, help="Qual o grau de dificuldade enfrentado neste aspecto?")
add("q111", "Necessidade de atendimento pedagógico individualizado / reforço escolar", "options", 8, "Educação", "Sheet1!B111",
    options=scale_hmb, help="Qual o grau de dificuldade enfrentado neste aspecto?")
add("q112", "Baixa expectativa em relação ao futuro e baixa motivação para os estudos", "options", 8, "Educação", "Sheet1!B112",
    options=scale_hmb, help="Qual o grau de dificuldade enfrentado neste aspecto?")
add("q113", "Desafios na socialização escolar (vínculos de confiança, atividades em grupo e conflitos)", "options", 8, "Educação", "Sheet1!B113",
    options=scale_hmb, help="Qual o grau de dificuldade enfrentado neste aspecto?")
add("q114", "Formação insuficiente dos professores para lidar com o contexto do acolhimento institucional", "options", 8, "Educação", "Sheet1!B114",
    options=scale_hmb, help="Qual o grau de dificuldade enfrentado neste aspecto?")
add("q146", "Como avalia a relação e articulação direta da casa com as Escolas / Rede de Educação?", "options", 8, "Relação com a Escola", "Sheet1!B146",
    options=["Bom", "Regular", "Ruim", "Não há relacionamento"],
    help="")
add("q_educacao_relacao_obs", "Detalhe a relação da casa de acolhimento com a Educação e os principais problemas com as escolas", "textarea", 8, "Relação com a Escola", "Revisão V2",
    placeholder="Descreva como é o diálogo com a direção/professores, acesso a vagas, contraturno e transporte...",
    help="")

# ==============================================================================
# BLOCO 9 (Etapa 10): ATENDIMENTO (Reparação Traumática Sim/Não + % | Adoção vs Desacolhimento)
# ==============================================================================
add("q116_simnao", "A instituição já teve experiência bem-sucedida na reparação dos impactos de experiências traumáticas?", "options", 9, "Reparação de experiências traumáticas", "Sheet1!B116",
    options=["Sim", "Não"],
    help="")
add("q116_pct", "Qual o percentual estimado de reparação de experiências traumáticas nas crianças atendidas?", "options", 9, "Reparação de experiências traumáticas", "Sheet1!B116",
    options=["Até 10%", "Até 25%", "Até 50%", "Mais que 50%"],
    help="")
add("q117", "Construção de vínculo de confiança com as crianças e adolescentes", "options", 9, "Desafios do atendimento", "Sheet1!B117",
    options=scale_hmb, help="Qual o grau de dificuldade neste aspecto?")
add("q118", "Manejo de comportamentos desafiadores", "options", 9, "Desafios do atendimento", "Sheet1!B118",
    options=scale_hmb, help="Qual o grau de dificuldade neste aspecto?")
add("q119", "Promoção contínua da saúde mental", "options", 9, "Desafios do atendimento", "Sheet1!B119",
    options=scale_hmb, help="Qual o grau de dificuldade neste aspecto?")
add("q120", "Garantia de desenvolvimento integral", "options", 9, "Desafios do atendimento", "Sheet1!B120",
    options=scale_hmb, help="Qual o grau de dificuldade neste aspecto?")
add("q121", "Atendimento individualizado a cada acolhido", "options", 9, "Desafios do atendimento", "Sheet1!B121",
    options=scale_hmb, help="Qual o grau de dificuldade neste aspecto?")
add("q122", "Fortalecimento dos vínculos familiares durante o acolhimento", "options", 9, "Desafios do atendimento", "Sheet1!B122",
    options=scale_hmb, help="Qual o grau de dificuldade neste aspecto?")
add("q123_adocao", "Preparação para adoção", "options", 9, "Adoção e Desacolhimento", "Sheet1!B123",
    options=scale_hmb, help="Qual o grau de dificuldade neste aspecto?")
add("q123_desacolhimento", "Preparação para o desacolhimento", "options", 9, "Adoção e Desacolhimento", "Sheet1!B123",
    options=scale_hmb, help="Qual o grau de dificuldade neste aspecto?")
add("q128", "Realizar o Plano Individual de Atendimento (PIA) com causas, necessidades e ações para reintegração", "options", 9, "Plano Individual de Atendimento", "Sheet1!B128",
    options=scale_hmb, help="Qual o grau de dificuldade na elaboração e execução do PIA?")

# ==============================================================================
# BLOCO 10 (Etapa 11): REDE DE PROTEÇÃO (4 Órgãos Desmembrados + Qualidade da Relação)
# ==============================================================================
add("q124_assistencia", "Grau de dificuldade na articulação integrada com a Assistência Social (CRAS / CREAS)", "options", 10, "Articulação da rede de proteção", "Sheet1!B124",
    options=scale_hmb, help="")
add("q124_ct", "Grau de dificuldade na articulação integrada com o Conselho Tutelar", "options", 10, "Articulação da rede de proteção", "Sheet1!B124",
    options=scale_hmb, help="")
add("q124_mp", "Grau de dificuldade na articulação integrada com o MP (Ministério Público)", "options", 10, "Articulação da rede de proteção", "Sheet1!B124",
    options=scale_hmb, help="")
add("q124_judiciario", "Grau de dificuldade na articulação integrada com o Poder Judiciário (Vara da Infância e Juventude)", "options", 10, "Articulação da rede de proteção", "Sheet1!B124",
    options=scale_hmb, help="")
rel_opts = ["Bom", "Regular", "Ruim", "Não há relacionamento"]
add("q140", "Como classifica o relacionamento institucional com o Poder Judiciário?", "options", 10, "Qualidade do relacionamento com a Rede", "Sheet1!B140", options=rel_opts)
add("q141", "Como classifica o relacionamento institucional com o Ministério Público?", "options", 10, "Qualidade do relacionamento com a Rede", "Sheet1!B141", options=rel_opts)
add("q142", "Como classifica o relacionamento institucional com o Conselho Tutelar?", "options", 10, "Qualidade do relacionamento com a Rede", "Sheet1!B142", options=rel_opts)
add("q143", "Como classifica o relacionamento institucional com o CREAS e o CRAS?", "options", 10, "Qualidade do relacionamento com a Rede", "Sheet1!B143", options=rel_opts)

# ==============================================================================
# BLOCO 11 (Etapa 12): VÍNCULOS FAMILIARES (Enunciados e Escalas Reformulados)
# ==============================================================================
add("q129", "Frequência de visita dos familiares à instituição", "options", 11, "Frequência de visitas e contatos", "Sheet1!B129",
    options=["Alta", "Média", "Baixa"], help="")
add("q130", "Frequência de contato de familiares (vídeo, telefone ou cartas)", "options", 11, "Frequência de visitas e contatos", "Sheet1!B130",
    options=["Alta", "Média", "Baixa"], help="")
add("q131", "Grau de dificuldade de atendimento psicossocial à família", "options", 11, "Grau de dificuldade no trabalho com famílias", "Sheet1!B131",
    options=scale_hmb, help="")
add("q132", "Grau de dificuldade de orientação parental (comunicação, resolução de conflitos e fortalecimento do cuidado)", "options", 11, "Grau de dificuldade no trabalho com famílias", "Sheet1!B132",
    options=scale_hmb, help="")
add("q133_trabalho", "Grau de dificuldade do encaminhamento dos responsáveis (família) para o mercado de trabalho", "options", 11, "Encaminhamento da família na rede", "Sheet1!B133",
    options=scale_hmb, help="")
add("q133_saude_mental", "Grau de dificuldade do encaminhamento dos responsáveis (familiares) para saúde mental (casos de dependência química)", "options", 11, "Encaminhamento da família na rede", "Sheet1!B133",
    options=scale_hmb, help="")
add("q133_moradia", "Grau de dificuldade do encaminhamento dos responsáveis para moradia", "options", 11, "Encaminhamento da família na rede", "Sheet1!B133",
    options=scale_hmb, help="")
add("q134", "Grau de participação da família na vida da criança durante o acolhimento (na instituição)", "options", 11, "Participação e Reintegração Familiar", "Sheet1!B134",
    options=scale_hmb, help="")
add("q135", "Grau de dificuldade de promover visitas das crianças acolhidas aos familiares (criança ir na casa do familiar)", "options", 11, "Participação e Reintegração Familiar", "Sheet1!B135",
    options=["Alto", "Médio", "Baixo", "Não ocorre"],
    help="")
add("q136", "Grau de dificuldade de realizar preparação gradual para a reintegração (finais de semana e férias)", "options", 11, "Participação e Reintegração Familiar", "Sheet1!B136",
    options=scale_hmb, help="")
add("q137", "Grau de dificuldade de realizar escuta qualificada da criança e da família", "options", 11, "Participação e Reintegração Familiar", "Sheet1!B137",
    options=scale_hmb, help="")

# ==============================================================================
# BLOCO 12 (Etapa 13): PLANO DE MELHORIA (5 Ambientes + Régua de Urgência 1-5 + Campo Aberto)
# ==============================================================================
add("q155_ambientes", "Reforma Estrutural: avalie a situação estrutural atual dos 5 ambientes da casa e detalhe o que precisa ser reformado", "structural_condition", 12, "Situação estrutural e Reforma", "Sheet1!B155",
    options=["Cômodos (Quartos / Salas)", "Banheiro", "Cozinha", "Área de lazer", "Quintal"],
    placeholder="Detalhe quais ambientes precisam de reforma estrutural e o que precisa ser feito (ex.: telhado, infiltração, pintura, adaptação de banheiro)...",
    help="Avalie cada ambiente em Bom, Médio ou Péssimo e descreva abaixo as reformas prioritárias.")
add("q158", "Veículo — Nível de prioridade/urgência e especificação", "urgency_detail", 12, "Prioridades físicas e equipamentos", "Sheet1!B158",
    placeholder="Que tipo de veículo a casa precisa e para qual finalidade? (Ex.: van de 15 lugares para levar crianças à escola e consultas)...",
    help="Selecione de 0 (Não precisa) a 5 (Urgente) na régua visual e especifique abaixo.")
add("q159_mobilia", "Equipamentos — Mobília (camas, beliches, armários, mesas, sofás)", "urgency_detail", 12, "Prioridades físicas e equipamentos", "Sheet1!B159",
    placeholder="Quais itens de mobília e quantidades são mais urgentes hoje?",
    help="Selecione o nível de urgência (0 a 5) e especifique os móveis necessários.")
add("q159_eletrodomesticos", "Equipamentos — Eletrodomésticos (geladeira, fogão industrial, máquina de lavar, freezer)", "urgency_detail", 12, "Prioridades físicas e equipamentos", "Sheet1!B159",
    placeholder="Quais eletrodomésticos e quantidades são mais urgentes hoje?",
    help="Selecione o nível de urgência (0 a 5) e especifique os eletrodomésticos necessários.")
add("q159_eletroeletronicos", "Equipamentos — Eletroeletrônicos (computadores, notebooks, tablets, TVs, impressoras)", "urgency_detail", 12, "Prioridades físicas e equipamentos", "Sheet1!B159",
    placeholder="Quais equipamentos eletroeletrônicos e quantidades são mais urgentes hoje?",
    help="Selecione o nível de urgência (0 a 5) e especifique os itens necessários.")
add("q156", "Ampliação da equipe", "urgency_detail", 12, "Equipe e Capacitação", "Sheet1!B156",
    placeholder="Quais os profissionais mais importantes que faltam hoje na equipe? (Ex.: 1 psicólogo, 2 cuidadores noturnos, 1 pedagogo)...",
    help="Selecione o nível de urgência (0 a 5) e informe quais profissionais são prioritários.")
add("q157", "Capacitação da equipe", "urgency_detail", 12, "Equipe e Capacitação", "Sheet1!B157",
    placeholder="Quais as principais lacunas de capacitação e quais treinamentos a equipe precisa?",
    help="Selecione o nível de urgência (0 a 5) e descreva os temas de treinamento necessários.")
add("q_melhoria_psicologico", "Apoio psicológico e cuidado emocional (para acolhidos e equipe)", "urgency_detail", 12, "Equipe e Capacitação", "Revisão V2",
    placeholder="Especifique a necessidade de apoio psicológico, psiquiátrico ou supervisão clínica...",
    help="Selecione o nível de urgência (0 a 5) e detalhe a demanda.")
add("q_melhoria_cultura", "Atividades culturais, pedagógicas e esportivas", "urgency_detail", 12, "Gestão, Captação e Projetos", "Revisão V2",
    placeholder="Quais atividades culturais, esportivas ou de lazer gostaria de implementar para as crianças?",
    help="Selecione o nível de urgência (0 a 5) e descreva as atividades desejadas.")
add("q160", "Tecnologia e ferramentas de gestão", "urgency_detail", 12, "Gestão, Captação e Projetos", "Sheet1!B160",
    placeholder="Quais sistemas, prontuário eletrônico ou ferramentas de gestão a instituição precisa?",
    help="Selecione o nível de urgência (0 a 5) e especifique a necessidade tecnológica.")
add("q161", "Estruturação do setor de captação de recursos", "urgency_detail", 12, "Gestão, Captação e Projetos", "Sheet1!B161",
    placeholder="Qual o apoio necessário para estruturar ou profissionalizar o setor de captação de recursos da casa?",
    help="Selecione o nível de urgência (0 a 5) e detalhe o apoio necessário.")
add("q162", "Programas e projetos adicionais ao acolhimento (ex.: horta, oficinas de trabalho, jovem aprendiz, etc.)", "urgency_detail", 12, "Gestão, Captação e Projetos", "Sheet1!B162",
    placeholder="Quais programas ou projetos adicionais ao acolhimento a instituição deseja implantar?",
    help="Selecione o nível de urgência (0 a 5) e descreva os projetos desejados.")

# ==============================================================================
# BLOCO 13 (Etapa 14): IMPACTO E FUTURO (Onde o apoio faz diferença + Visão de Futuro)
# ==============================================================================
add("q149", "A instituição já utiliza tecnologia para gestão, prontuário eletrônico ou automação?", "options", 13, "Tecnologia e Desenvolvimento Institucional", "Sheet1!B149:B151",
    options=["Sim, utiliza sistema e prontuário eletrônico", "Utiliza parcialmente (apenas planilhas/controles básicos)", "Não utiliza"])
add("q_onde_apoio_diferenca", "Em quais frentes o apoio da Rede Net do Bem faria maior diferença para o desenvolvimento da sua instituição?", "multi", 13, "Onde o apoio faz diferença", "Sheet1!B165:B176",
    options=[
        "Governança e Planejamento Estratégico",
        "Captação de Recursos e Marketing",
        "Prestação de Contas e Indicadores",
        "Formação e Desenvolvimento de Equipe",
        "Aspectos Jurídicos e Regularização",
        "Tecnologia e Inovação",
        "Comunicação com o Município e Rede"
    ],
    help="Selecione as áreas estratégicas em que mentoria e suporte técnico mais ajudariam sua entidade.")
add("a004", "Como a instituição mede seus resultados e quais indicadores acompanha hoje?", "textarea", 13, "Impacto social", "Perguntas Abertas!A4:A5",
    placeholder="Descreva brevemente como acompanham a evolução das crianças e as metas da casa...",
    help="Não inclua nomes ou histórias que identifiquem crianças e famílias.")
add("a006", "Quais foram as principais conquistas da instituição nos últimos anos?", "textarea", 13, "Impacto social", "Perguntas Abertas!A6",
    placeholder="Compartilhe marcos importantes, melhorias conquistadas ou histórias institucionais de superação...",
    help="")
add("a007", "Quais mudanças estruturais ou metodológicas considera prioritárias para melhorar o acolhimento?", "textarea", 13, "Impacto social", "Perguntas Abertas!A7",
    placeholder="O que mais transformaria o dia a dia da casa hoje?",
    help="")
add("a012", "Quais parcerias considera estratégicas e quais parcerias ainda fazem falta?", "textarea", 13, "Parcerias", "Perguntas Abertas!A12:A13",
    placeholder="Ex.: parcerias com clínicas de psicologia, escolas profissionalizantes, empresas apoiadoras...",
    help="")
add("a014", "A instituição mantém relacionamento ou parcerias com Universidades?", "options", 13, "Parcerias", "Perguntas Abertas!A14",
    options=["Sim, mantemos parceria ativa", "Já tivemos no passado, mas não atualmente", "Não temos, mas gostaríamos de iniciar", "Não"])
add("a018", "Onde a instituição quer estar nos próximos 5 anos?", "textarea", 13, "Visão de futuro", "Perguntas Abertas!A18",
    placeholder="Descreva a visão de futuro e os sonhos da sua instituição para os próximos 5 anos...",
    help="")
add("a019", "O que considera essencial para o fortalecimento das Casas de Acolhimento no Estado de São Paulo e no Brasil?", "textarea", 13, "Visão de futuro", "Perguntas Abertas!A19",
    placeholder="Sua visão contribuirá diretamente para o diagnóstico da Fundação Net do Bem...",
    help="")
add("a020", "Que tipo de apoio uma organização parceira como a Fundação Net do Bem poderia oferecer para gerar maior impacto?", "textarea", 13, "Visão de futuro", "Perguntas Abertas!A20",
    placeholder="Deixe sua mensagem final e sugestões de apoio para a Fundação Net do Bem...",
    help="")

pages = []
for b_idx in range(len(blocks_meta)):
    b_questions = [q for q in questions if q["block"] == b_idx]
    for q in b_questions:
        pages.append({
            "id": f"p{len(pages)+1:03}",
            "block": b_idx,
            "title": q["page"],
            "questionIds": [q["id"]]
        })

payload = {
    "version": "mvp-2",
    "blocks": blocks_meta,
    "questions": questions,
    "pages": pages
}

(root / "src").mkdir(parents=True, exist_ok=True)
(root / "docs").mkdir(parents=True, exist_ok=True)
(root / "src" / "questionnaire.json").write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

lines = [
    "# Dicionário do Questionário MVP-2 — Fundação Net do Bem",
    "",
    f"Total: **{len(questions)} questões/telas** distribuídas em **{len(blocks_meta)} blocos temáticos enxutos** (média de {round(len(questions)/len(blocks_meta), 1)} itens por bloco).",
    ""
]
for b in blocks_meta:
    b_idx = b["number"] - 1
    b_qs = [q for q in questions if q["block"] == b_idx]
    lines += [
        f"## Etapa {b['number']}: {b['title']} (`{b['id']}` — {len(b_qs)} itens)",
        f"- **Ícone Lucide:** `{b['icon']}` | **Animação GSAP:** `{b['animType']}`",
        f"- **Título de Parabéns:** *{b['celebration']['title']}*",
        f"- **Copy de Incentivo:** *{b['celebration']['copy']}*",
        "",
        "| ID | Seção | Pergunta | Tipo | Opções / Detalhes |",
        "|---|---|---|---|---|"
    ]
    for q in b_qs:
        opts_str = ", ".join(q["options"]) if q["options"] else (q["placeholder"] or "—")
        lines.append(f"| `{q['id']}` | {q['page']} | {q['label']} | `{q['type']}` | {opts_str} |")
    lines.append("")

(root / "docs" / "Questionario-organizado-v2.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
print(f"MVP-2 schema generated: {len(blocks_meta)} blocks, {len(questions)} questions.")

