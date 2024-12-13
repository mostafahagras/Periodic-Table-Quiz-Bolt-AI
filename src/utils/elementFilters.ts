import { Element } from '../types';
import { Block } from '../data/elementCategories';

export function filterElementsByBlocks(elements: Element[], selectedBlocks: Block[]): Element[] {
  return elements.filter(element => 
    selectedBlocks.includes(element.block as Block)
  );
}