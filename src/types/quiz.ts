export type QuestionType = 'atomicNumber' | 'group' | 'period' | 'block' | 'category';

export interface Question {
  elementSymbol: string;
  type: QuestionType;
  correctAnswer: string | number;
  options: (string | number)[];
}