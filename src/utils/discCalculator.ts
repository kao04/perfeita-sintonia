import { DISCProfile, QuizAnswer, QuizResult, CompatibilityResult } from "@/types/disc";

export const calculateDISCProfile = (answers: QuizAnswer[]): QuizResult => {
  const scores = { D: 0, I: 0, S: 0, C: 0 };
  
  answers.forEach(answer => {
    scores[answer.profile]++;
  });

  // Find the dominant profile
  let maxScore = 0;
  let profile: DISCProfile = 'D';
  
  (Object.keys(scores) as DISCProfile[]).forEach(key => {
    if (scores[key] > maxScore) {
      maxScore = scores[key];
      profile = key;
    }
  });

  return { profile, scores };
};

const compatibilityMatrix: Record<string, { percentage: number; strengths: string[]; challenges: string[] }> = {
  'D-D': {
    percentage: 67,
    strengths: ['Ambos são determinados e focados em resultados', 'Respeitam a independência um do outro', 'Tomam decisões rapidamente juntos'],
    challenges: ['Podem competir demais entre si', 'Dificuldade em ceder e ser flexível', 'Necessário cultivar mais empatia e paciência']
  },
  'D-I': {
    percentage: 73,
    strengths: ['D traz foco e I traz entusiasmo', 'Complementam-se na ação e na interação social', 'Relação dinâmica e energética'],
    challenges: ['D pode achar I desorganizado', 'I pode sentir D muito frio ou direto', 'Precisam equilibrar seriedade e diversão']
  },
  'D-S': {
    percentage: 58,
    strengths: ['D traz direção e S traz estabilidade', 'S ajuda D a ser mais paciente', 'D motiva S a sair da zona de conforto'],
    challenges: ['Ritmos muito diferentes podem gerar conflitos', 'S pode se sentir pressionado por D', 'D precisa aprender a valorizar a calma de S']
  },
  'D-C': {
    percentage: 71,
    strengths: ['Ambos valorizam competência e resultados', 'C traz precisão e D traz ação', 'Trabalham bem em projetos juntos'],
    challenges: ['Podem ser muito críticos um com o outro', 'Dificuldade em expressar emoções', 'Precisam desenvolver mais afeto e conexão emocional']
  },
  'I-D': {
    percentage: 73,
    strengths: ['I traz alegria e D traz determinação', 'Complementam-se perfeitamente em energia', 'Relação vibrante e cheia de vida'],
    challenges: ['Estilos de comunicação muito diferentes', 'I pode achar D insensível', 'D pode ver I como superficial às vezes']
  },
  'I-I': {
    percentage: 82,
    strengths: ['Muita diversão e conexão emocional', 'Ambos são sociais e otimistas', 'Relação leve e cheia de momentos felizes'],
    challenges: ['Podem faltar organização e planejamento', 'Dificuldade em lidar com tarefas chatas', 'Necessário desenvolver mais disciplina juntos']
  },
  'I-S': {
    percentage: 76,
    strengths: ['I traz energia e S traz equilíbrio', 'S apoia I quando necessário', 'Relação harmoniosa e afetuosa'],
    challenges: ['I pode ser intenso demais para S', 'S pode achar I impulsivo', 'Precisam alinhar expectativas de rotina']
  },
  'I-C': {
    percentage: 54,
    strengths: ['I ajuda C a relaxar e se divertir', 'C traz estrutura para I', 'Aprendem muito um com o outro'],
    challenges: ['Personalidades muito opostas', 'C pode achar I superficial', 'I pode ver C como rígido demais']
  },
  'S-D': {
    percentage: 58,
    strengths: ['S traz calma e paciência a D', 'D motiva S a crescer', 'Complementam-se quando respeitam diferenças'],
    challenges: ['Ritmos completamente diferentes', 'S precisa de mais tempo que D oferece', 'D deve aprender a desacelerar']
  },
  'S-I': {
    percentage: 76,
    strengths: ['Relação acolhedora e afetuosa', 'S oferece estabilidade e I diversão', 'Comunicação aberta e afetiva'],
    challenges: ['S pode se cansar da agitação de I', 'I pode achar S lento demais', 'Necessário equilíbrio entre rotina e novidade']
  },
  'S-S': {
    percentage: 79,
    strengths: ['Muita harmonia e compreensão mútua', 'Relação estável e segura', 'Ambos valorizam a paz e o cuidado'],
    challenges: ['Podem evitar conflitos necessários', 'Falta de energia para mudanças', 'Precisam desenvolver mais assertividade']
  },
  'S-C': {
    percentage: 68,
    strengths: ['Ambos valorizam estabilidade e ordem', 'S oferece apoio emocional a C', 'Relação previsível e confiável'],
    challenges: ['Podem ser muito cautelosos juntos', 'Dificuldade em sair da rotina', 'Precisam cultivar mais espontaneidade']
  },
  'C-D': {
    percentage: 71,
    strengths: ['C traz análise e D ação', 'Ambos focados em resultados', 'Complementam-se em planejamento e execução'],
    challenges: ['Ambos podem ser teimosos', 'Falta de expressão emocional', 'Necessário desenvolver mais afeto']
  },
  'C-I': {
    percentage: 54,
    strengths: ['I ajuda C a ser mais social', 'C dá estrutura aos planos de I', 'Crescem através das diferenças'],
    challenges: ['Personalidades muito contrastantes', 'C acha I desorganizado', 'I vê C como crítico demais']
  },
  'C-S': {
    percentage: 68,
    strengths: ['Ambos são confiáveis e leais', 'Valorizam estabilidade e ordem', 'Relação consistente e segura'],
    challenges: ['Podem ser resistentes a mudanças', 'Excesso de cautela pode limitar crescimento', 'Precisam de mais aventura e espontaneidade']
  },
  'C-C': {
    percentage: 64,
    strengths: ['Entendem a necessidade um do outro por precisão', 'Ambos são organizados e confiáveis', 'Comunicação clara e detalhada'],
    challenges: ['Podem ser muito críticos entre si', 'Perfeccionismo pode gerar tensão', 'Necessário cultivar mais leveza e afeto']
  }
};

export const calculateCompatibility = (
  userProfile: DISCProfile,
  partnerProfile: DISCProfile
): CompatibilityResult => {
  const key1 = `${userProfile}-${partnerProfile}`;
  const key2 = `${partnerProfile}-${userProfile}`;
  
  const data = compatibilityMatrix[key1] || compatibilityMatrix[key2];

  return {
    userProfile,
    partnerProfile,
    ...data
  };
};

export const getProfileDescription = (profile: DISCProfile): { name: string; description: string; traits: string[] } => {
  const profiles = {
    D: {
      name: 'Dominante',
      description: 'Pessoas diretas, focadas em resultados e que gostam de desafios. São decididas e valorizam autonomia.',
      traits: ['Objetivo', 'Determinado', 'Confiante', 'Direto', 'Competitivo']
    },
    I: {
      name: 'Influente',
      description: 'Pessoas comunicativas, otimistas e entusiasmadas. Adoram interagir e criar conexões emocionais.',
      traits: ['Sociável', 'Otimista', 'Expressivo', 'Empolgado', 'Persuasivo']
    },
    S: {
      name: 'Estável',
      description: 'Pessoas calmas, pacientes e leais. Valorizam harmonia, estabilidade e relações duradouras.',
      traits: ['Paciente', 'Leal', 'Calmo', 'Confiável', 'Harmonioso']
    },
    C: {
      name: 'Cauteloso',
      description: 'Pessoas analíticas, precisas e detalhistas. Valorizam qualidade, organização e exatidão.',
      traits: ['Analítico', 'Preciso', 'Organizado', 'Cuidadoso', 'Sistemático']
    }
  };

  return profiles[profile];
};
