import React from 'react';
import { categories, Block, blockDescriptions } from '../data/elementCategories';

interface BlockSelectorProps {
  selectedBlocks: Block[];
  onToggleBlock: (block: Block) => void;
}

export function BlockSelector({ selectedBlocks, onToggleBlock }: BlockSelectorProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-center">Select Blocks to Study</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(Object.keys(categories) as Block[]).map((block) => (
          <div key={block} className="relative">
            <button
              onClick={() => onToggleBlock(block)}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedBlocks.includes(block)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className="text-xl font-bold mb-2">{categories[block]}</div>
              <p className="text-sm text-gray-600">{blockDescriptions[block]}</p>
            </button>
          </div>
        ))}
      </div>
      {selectedBlocks.length === 0 && (
        <p className="text-red-500 text-center mt-4">
          Please select at least one block to start the quiz
        </p>
      )}
    </div>
  );
}