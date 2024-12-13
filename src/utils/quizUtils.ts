import { elements } from '../data/elements';
import { Question, QuestionType } from '../types/quiz';
import { Block } from '../data/elementCategories';
import { filterElementsByBlocks } from './elementFilters';
import { generateOptions } from './optionsGenerator';
import { getUniqueValues } from './arrayUtils';

const questionTypes: QuestionType[] = ['atomicNumber', 'group', 'period', 'block', 'category'];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomQuestionType(): QuestionType {
  return getRandomElement(questionTypes);
}

export function generateQuestion(selectedBlocks: Block[]): Question {
  if (selectedBlocks.length === 0) {
    throw new Error('Please select at least one block to start the quiz');
  }

  const availableElements = filterElementsByBlocks(elements, selectedBlocks);
  
  if (availableElements.length === 0) {
    throw new Error('No elements available for the selected blocks');
  }
  
  const element = getRandomElement(availableElements);
  const questionType = getRandomQuestionType();
  
  let correctAnswer: string | number;
  let options: (string | number)[];
  
  switch (questionType) {
    case 'atomicNumber': {
      correctAnswer = element.atomicNumber;
      const allNumbers = availableElements.map(e => e.atomicNumber);
      options = generateOptions(correctAnswer, allNumbers);
      break;
    }
    case 'group': {
      correctAnswer = element.group || 'N/A';
      const allGroups = getUniqueValues(availableElements.map(e => e.group || 'N/A'));
      options = generateOptions(correctAnswer, allGroups);
      break;
    }
    case 'period': {
      correctAnswer = element.period;
      const allPeriods = getUniqueValues(availableElements.map(e => e.period));
      options = generateOptions(correctAnswer, allPeriods);
      break;
    }
    case 'block': {
      correctAnswer = element.block;
      options = selectedBlocks;
      break;
    }
    case 'category': {
      correctAnswer = element.category;
      const allCategories = getUniqueValues(availableElements.map(e => e.category));
      options = generateOptions(correctAnswer, allCategories);
      break;
    }
    default:
      throw new Error('Invalid question type');
  }
  
  return {
    elementSymbol: element.symbol,
    type: questionType,
    correctAnswer,
    options
  };
}