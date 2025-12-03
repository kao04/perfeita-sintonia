import { DISCProfile } from "@/types/disc";

export interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    profile: DISCProfile;
  }[];
}

export const discQuestions: Question[] = [
  {
    id: 1,
    question: "Em uma situação de conflito, você tende a:",
    options: [
      { text: "Confrontar diretamente e buscar resolver rapidamente", profile: "D" },
      { text: "Conversar de forma animada e buscar um acordo amigável", profile: "I" },
      { text: "Evitar o conflito e dar tempo para as coisas se acalmarem", profile: "S" },
      { text: "Analisar a situação cuidadosamente antes de agir", profile: "C" }
    ]
  },
  {
    id: 2,
    question: "Quando está tomando uma decisão importante, você:",
    options: [
      { text: "Decide rapidamente e age com confiança", profile: "D" },
      { text: "Consulta amigos e busca opiniões variadas", profile: "I" },
      { text: "Reflete bastante e considera o impacto em todos", profile: "S" },
      { text: "Pesquisa todas as opções e analisa dados", profile: "C" }
    ]
  },
  {
    id: 3,
    question: "Em um grupo de amigos, você geralmente:",
    options: [
      { text: "Lidera e organiza as atividades", profile: "D" },
      { text: "É o centro das atenções e anima o ambiente", profile: "I" },
      { text: "Apoia os outros e mantém a harmonia", profile: "S" },
      { text: "Observa e contribui quando necessário", profile: "C" }
    ]
  },
  {
    id: 4,
    question: "Diante de mudanças inesperadas, você:",
    options: [
      { text: "Adapta-se rapidamente e vê oportunidades", profile: "D" },
      { text: "Fica empolgado com novas possibilidades", profile: "I" },
      { text: "Prefere estabilidade, mas aceita se necessário", profile: "S" },
      { text: "Analisa os riscos antes de aceitar", profile: "C" }
    ]
  },
  {
    id: 5,
    question: "Seu estilo de comunicação é mais:",
    options: [
      { text: "Direto, objetivo e sem rodeios", profile: "D" },
      { text: "Expressivo, animado e cheio de histórias", profile: "I" },
      { text: "Calmo, paciente e bom ouvinte", profile: "S" },
      { text: "Preciso, detalhado e cuidadoso com as palavras", profile: "C" }
    ]
  },
  {
    id: 6,
    question: "Você se sente mais motivado quando:",
    options: [
      { text: "Está alcançando metas e superando desafios", profile: "D" },
      { text: "Está se divertindo e interagindo com pessoas", profile: "I" },
      { text: "Está ajudando outros e mantendo a paz", profile: "S" },
      { text: "Está sendo preciso e fazendo as coisas corretamente", profile: "C" }
    ]
  },
  {
    id: 7,
    question: "Em relação ao ritmo de trabalho ou atividades:",
    options: [
      { text: "Prefiro ritmo acelerado e resultados rápidos", profile: "D" },
      { text: "Gosto de variedade e atividades dinâmicas", profile: "I" },
      { text: "Prefiro ritmo constante e previsível", profile: "S" },
      { text: "Trabalho de forma metódica e organizada", profile: "C" }
    ]
  },
  {
    id: 8,
    question: "Sua maior preocupação em um relacionamento é:",
    options: [
      { text: "Ter autonomia e respeito mútuo", profile: "D" },
      { text: "Ter diversão e conexão emocional", profile: "I" },
      { text: "Ter estabilidade e segurança", profile: "S" },
      { text: "Ter clareza e entendimento", profile: "C" }
    ]
  },
  {
    id: 9,
    question: "Quando enfrenta um problema, você:",
    options: [
      { text: "Age imediatamente para resolver", profile: "D" },
      { text: "Busca apoio e discute com outros", profile: "I" },
      { text: "Pensa calmamente em soluções pacíficas", profile: "S" },
      { text: "Analisa todas as variáveis antes de agir", profile: "C" }
    ]
  },
  {
    id: 10,
    question: "Seu ambiente ideal de trabalho é:",
    options: [
      { text: "Desafiador e com liberdade para decidir", profile: "D" },
      { text: "Colaborativo e com interação social", profile: "I" },
      { text: "Harmonioso e com rotina estável", profile: "S" },
      { text: "Organizado e com procedimentos claros", profile: "C" }
    ]
  },
  {
    id: 11,
    question: "Como você lida com críticas?",
    options: [
      { text: "Defendo meu ponto de vista firmemente", profile: "D" },
      { text: "Fico chateado mas tento manter o clima leve", profile: "I" },
      { text: "Aceito tranquilamente e evito confrontos", profile: "S" },
      { text: "Avalio se a crítica é válida e justificada", profile: "C" }
    ]
  },
  {
    id: 12,
    question: "Seu maior medo em relacionamentos é:",
    options: [
      { text: "Perder controle ou ser dominado", profile: "D" },
      { text: "Ser rejeitado ou ignorado", profile: "I" },
      { text: "Ter conflitos ou perder a estabilidade", profile: "S" },
      { text: "Cometer erros ou ser julgado", profile: "C" }
    ]
  }
];
