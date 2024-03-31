import {QuestionType} from "@/types/question";

export const anual_avaliation: QuestionType[] = [
  {
    type: 'choose',
    question:
      'No início do semestre, os professores discutiram os planos de ensino com os alunos?',
    options: [
      'Sim e retomou a discussão outras vezes durante o semestre',
      'Sim no início das aulas',
      'Não discutiu, apenas informou sua existência',
      'Não discutiu e nem fez referências a ele',
    ],
  },
  {
    type: 'choose',
    question:
      'Os professores cumprem totalmente o conteúdo estabelecido no plano de ensino?',
    options: ['Sempre', 'Às vezes', 'Raramente', 'Nunca'],
  },
  {
    type: 'choose',
    question:
      'Que tipo de material, entre os listados abaixo, foi mais utilizado por indicação de seus professores durante as disciplinas?',
    options: [
      'Livros, texto e ou manuais',
      'Artigos de revistas especializadas online',
      'Conteúdo Virtual',
      'Vídeo aula',
      'Material autoral',
      'Aplicativos Educacionais',
    ],
  },
  {
    type: 'choose',
    question:
      'Como você avalia o nível de exigência dos professores nas disciplinas?',
    options: ['Muito exigente', 'Exigente', 'Pouco exigente'],
  },
  {
    type: 'choose',
    question:
      'As atitudes dos professores contribuem para uma relação de respeito, cordialidade e integração, favorecendo o processo ensino aprendizagem?',
    options: ['Sempre', 'Às vezes', 'Raramente', 'Nunca'],
  },
  {
    type: 'choose',
    question:
      'Nas disciplinas, você tem sido incentivado a participar, discutir e expressar suas ideias?',
    options: ['Sempre', 'Às vezes', 'Raramente', 'Nunca'],
  },
  {
    type: 'choose',
    question:
      'Os professores apresentam os resultados das avaliações no prazo estabelecido?',
    options: ['Sempre', 'Às vezes', 'Raramente', 'Nunca'],
  },
  {
    type: 'choose',
    question: 'O professor cumpre o horário na sala de aula?',
    options: ['Sim', 'Não', 'Às vezes'],
  },
  {
    type: 'choose',
    question:
      'Seus professores demonstraram domínio atualizado das disciplinas (Híbridas) ministrada das tecnologias utilizadas no ensino mediado (Canvas UniFacema)?',
    options: ['Sim', 'Não'],
  },
  {
    type: 'choose',
    question:
      'Como você avalia a interação dos professores com os alunos ao longo das disciplinas?',
    options: ['Ótima', 'Boa', 'Regular', 'Ruim', 'Péssima'],
  },
  {
    type: 'choose',
    question:
      'O coordenador está disponível na instituição para atendimento ao aluno nos horários determinados pela coordenação?',
    options: ['Sim', 'Não'],
  },
  {
    type: 'choose',
    question: 'O coordenador soluciona os problemas cotidianos do curso?',
    options: ['Sempre', 'Às vezes', 'Nunca'],
  },
  {
    type: 'choose',
    question:
      'Quando você manifesta dificuldade de aprendizagem o coordenador do curso adota alguma medida para solucionar/minimizar o problema?',
    options: ['Sempre', 'Às vezes', 'Nunca'],
  },
  {
    type: 'choose',
    question:
      'Você percebe o comprometimento do coordenador através de seu envolvimento nas atividades do curso?',
    options: ['Sempre', 'Às vezes', 'Nunca'],
  },
  {
    type: 'choose',
    question:
      'O coordenador divulga o projeto do curso e as informações da IES?',
    options: ['Sempre', 'Às vezes', 'Nunca'],
  },
  {
    type: 'choose',
    question:
      'As decisões relevantes para os alunos acerca do curso (tomadas pelo colegiado de curso, direção ou coordenação) são amplamente divulgadas para os alunos do curso?',
    options: ['Sempre', 'Às vezes', 'Nunca'],
  },
  {
    type: 'choose',
    question:
      'O coordenador teve um bom desempenho e dedicação, contribuindo para a qualidade do ensino neste semestre letivo?',
    options: ['Sim', 'Não'],
  },
  {
    type: 'choose',
    question:
      'No Canvas, a organização das informações (plano de ensino, cronograma das atividades) e conteúdo de estudo (Unidades de Aprendizagem, fóruns e material complementar) facilitaram seu acesso como?',
    options: ['Ótimo', 'Bom', 'Regular', 'Ruim', 'Péssimo'],
  },
  {
    type: 'choose',
    question:
      'As orientações a respeito do uso das ferramentas e recursos do Canvas foram suficientes para seu manuseio de forma adequada?',
    options: ['Ótimo', 'Bom', 'Regular', 'Ruim', 'Péssimo'],
  },
  {
    type: 'choose',
    question: 'Houve dificuldade no acesso e manuseio do Canvas no UniFacema?',
    options: ['Sim', 'Não'],
  },
  {
    type: 'choose',
    question:
      'O CANVAS oferece recursos adequados para acesso ao conteúdo, participação em atividades e interação com professores e colegas?',
    options: ['Sempre', 'Às vezes', 'Nunca'],
  },
  {
    type: 'choose',
    question:
      'Referente a metodologia utilizada na Disciplina Presencial (DP) – 80h, onde a carga horária é trabalhada presencialmente com aulas teóricas, aulas práticas e Trabalho Discente Efetivo (TDE), qual a sua avaliação?',
    options: ['Ótima', 'Boa', 'Regular', 'Ruim', 'Péssima'],
  },
  {
    type: 'choose',
    question: 'Seu professor depositou o TDE no prazo exigido?',
    options: ['Sim', 'Não'],
  },
  {
    type: 'choose',
    question:
      'O UniFacema oferece condições adequadas de facilidade de acesso às suas instalações?',
    options: ['Sim', 'Não'],
  },
  {
    type: 'choose',
    question: 'O UniFacema oferece condições adequadas de segurança?',
    options: ['Sim', 'Não'],
  },
  {
    type: 'choose',
    question:
      'O serviço de biblioteca atende aos anseios da comunidade acadêmica?',
    options: ['Sempre', 'Às vezes', 'Nunca'],
  },
  {
    type: 'choose',
    question:
      'A biblioteca virtual dispõe dos livros e periódicos recomendados nas disciplinas?',
    options: ['Sim', 'Não'],
  },
  {
    type: 'choose',
    question:
      'A biblioteca física dispõe de títulos em número suficiente aos usuários?',
    options: ['Sim', 'Não'],
  },
  {
    type: 'choose',
    question:
      'Os meios de comunicação utilizados pelo UniFacema difundem informações sobre as ações desenvolvidas pelo Centro Universitário para a comunidade externa, são eficientes?',
    options: ['Sim', 'Não'],
  },
  {
    type: 'choose',
    question:
      'A política de marketing do UniFacema gera uma imagem positiva do Centro Universitário para a sociedade?',
    options: ['Sim', 'Não'],
  },
  {
    type: 'choose',
    question:
      'Qual é a sua avaliação sobre a qualidade do conteúdo disponibilizado nos seguintes meios de comunicação do UniFacema: página na internet, tv corporativa, fanpage, Instagram?',
    options: ['Excelente', 'Bom', 'Ruim'],
  },
];
