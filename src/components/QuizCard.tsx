import React from 'react';
import { Question } from '../types/quiz';

interface QuizCardProps {
  question: Question;
  onAnswer: (answer: string | number) => void;
}

export function QuizCard({ question, onAnswer }: QuizCardProps) {
  const formatQuestionType = (type: string) => {
    return type.replace(/([A-Z])/g, ' $1').toLowerCase();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <div className="text-center mb-6">
        <span className="text-6xl font-bold text-blue-600">{question.elementSymbol}</span>
      </div>
      
      <p className="text-lg text-gray-700 mb-4">
        What is the {formatQuestionType(question.type)} of this element?
      </p>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className="w-full py-3 px-4 text-left rounded-lg bg-gray-50 hover:bg-blue-50 
                     transition-colors duration-200 border border-gray-200 hover:border-blue-300"
          >
            {option.toString()}
          </button>
        ))}
      </div>
    </div>
  );
}