import React, { useState, useCallback } from 'react';
import { QuizCard } from './components/QuizCard';
import { ScoreDisplay } from './components/ScoreDisplay';
import { BlockSelector } from './components/BlockSelector';
import { generateQuestion } from './utils/quizUtils';
import { Question } from './types/quiz';
import { Block } from './data/elementCategories';

export default function App() {
  const [selectedBlocks, setSelectedBlocks] = useState<Block[]>(['s', 'p']);
  const [question, setQuestion] = useState<Question | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateNewQuestion = useCallback(() => {
    try {
      if (selectedBlocks.length > 0) {
        const newQuestion = generateQuestion(selectedBlocks);
        setQuestion(newQuestion);
        setError(null);
      } else {
        setQuestion(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setQuestion(null);
    }
  }, [selectedBlocks]);

  const handleToggleBlock = useCallback((block: Block) => {
    setSelectedBlocks(prev => {
      const newBlocks = prev.includes(block)
        ? prev.filter(b => b !== block)
        : [...prev, block];
      return newBlocks;
    });
  }, []);

  const handleAnswer = useCallback((answer: string | number) => {
    if (!question) return;
    
    const correct = answer === question.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    setTotal(prev => prev + 1);
    if (correct) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      setShowFeedback(false);
      generateNewQuestion();
    }, 1500);
  }, [question, generateNewQuestion]);

  React.useEffect(() => {
    generateNewQuestion();
  }, [selectedBlocks, generateNewQuestion]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Periodic Table Quiz
          </h1>
          <p className="text-gray-600">
            Test your knowledge of chemical elements!
          </p>
        </div>

        <BlockSelector 
          selectedBlocks={selectedBlocks}
          onToggleBlock={handleToggleBlock}
        />

        <ScoreDisplay score={score} total={total} />

        {error && (
          <div className="text-center text-red-600 mb-4">
            {error}
          </div>
        )}

        {selectedBlocks.length > 0 && question && (
          <div className="relative">
            {showFeedback && (
              <div className={`absolute inset-0 flex items-center justify-center bg-opacity-90 ${
                isCorrect ? 'bg-green-100' : 'bg-red-100'
              } rounded-lg z-10`}>
                <p className={`text-2xl font-bold ${
                  isCorrect ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isCorrect ? 'Correct!' : 'Incorrect!'}
                </p>
              </div>
            )}
            
            <div className="flex justify-center">
              <QuizCard question={question} onAnswer={handleAnswer} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}