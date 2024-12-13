import { shuffle } from './arrayUtils';

export function generateOptions(
  correctAnswer: string | number,
  allPossibleAnswers: (string | number)[],
  optionCount = 4
): (string | number)[] {
  const otherOptions = allPossibleAnswers.filter(answer => answer !== correctAnswer);
  if (otherOptions.length < optionCount - 1) {
    return shuffle([correctAnswer, ...otherOptions]);
  }
  const wrongOptions = shuffle(otherOptions).slice(0, optionCount - 1);
  return shuffle([correctAnswer, ...wrongOptions]);
}