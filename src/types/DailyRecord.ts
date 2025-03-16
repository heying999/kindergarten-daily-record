export interface DailyRecord {
  // 基本信息
  className: string;
  studentName: string;
  date: string;
  recorder: string;

  // 生活习惯
  healthStatus: {
    general: boolean;
    cough: boolean;
    runnyNose: boolean;
    diarrhea: boolean;
    vomit: boolean;
    other: boolean;
  };
  
  emotionalStatus: {
    happy: boolean;
    peaceful: boolean;
    interested: boolean;
    upset: boolean;
    energetic: boolean;
  };

  diningStatus: {
    amount: 'good' | 'normal' | 'poor';
    speed: 'fast' | 'normal' | 'slow';
    hygiene: 'clean' | 'average' | 'poor';
  };

  napStatus: {
    duration: string;
    sleepQuality: 'independent' | 'needsCompany' | 'restless';
  };

  toiletStatus: {
    urination: number;
    defecation: number;
    stoolQuality: 'hard' | 'normal' | 'soft';
    hygiene: 'independent' | 'needsHelp';
  };

  waterIntake: {
    amount: '500-1000' | '1000-1500' | '1500+';
    drinkingHabit: 'independent' | 'needsReminder' | 'avoidance';
  };

  // 学习能力与习惯
  activities: {
    english: {
      content?: string;
      attention: boolean;
      thinking: boolean;
      observation: boolean;
      cooperation: boolean;
      parentSignature: boolean;
      parentInteraction: boolean;
      participation: 'high' | 'needsEffort' | 'moderate' | 'poor';
    };
    language: {
      content?: string;
      attention: boolean;
      thinking: boolean;
      observation: boolean;
      cooperation: boolean;
      parentSignature: boolean;
      parentInteraction: boolean;
      participation: 'high' | 'needsEffort' | 'moderate' | 'poor';
    };
    art: {
      content?: string;
      attention: boolean;
      thinking: boolean;
      observation: boolean;
      cooperation: boolean;
      parentSignature: boolean;
      parentInteraction: boolean;
      participation: 'high' | 'needsEffort' | 'moderate' | 'poor';
    };
  };

  // 动作发展感统训练
  physicalActivities: {
    outdoor: {
      content?: string;
      safetyAwareness: boolean;
      discipline: boolean;
      coordination: boolean;
      balance: boolean;
    };
    exercise: {
      content?: string;
      safetyAwareness: boolean;
      discipline: boolean;
      coordination: boolean;
      balance: boolean;
    };
    sensoryTraining: {
      content?: string;
      safetyAwareness: boolean;
      discipline: boolean;
      coordination: boolean;
      balance: boolean;
      cleanupHabit: boolean;
    };
  };

  // 生活自理
  lifeCare: {
    content: string;
    status: 'independent' | 'basicComplete' | 'needsReminder';
  };
  
  // 礼仪习惯
  etiquette: string;
} 