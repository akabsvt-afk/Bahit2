
export enum Role {
  USER = 'user',
  MODEL = 'model'
}

export interface Message {
  role: Role;
  text: string;
  isEvaluating?: boolean;
}

export interface EvaluationCriteria {
  pertinence: string;
  cadreTheorique: string;
  methodologie: string;
  analyse: string;
  discussion: string;
  qualiteRedactionnelle: string;
}
