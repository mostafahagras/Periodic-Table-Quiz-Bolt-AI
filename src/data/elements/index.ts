import { Element } from '../types';
import { sBlockElements } from './sBlock';
import { pBlockElements } from './pBlock';
import { dBlockElements } from './dBlock';
import { fBlockElements } from './fBlock';

// Combine all elements from different blocks
export const elements: Element[] = [
  ...sBlockElements,
  ...pBlockElements,
  ...dBlockElements,
  ...fBlockElements
].sort((a, b) => a.atomicNumber - b.atomicNumber); // Sort by atomic number

// Export individual block elements for direct access if needed
export { sBlockElements } from './sBlock';
export { pBlockElements } from './pBlock';
export { dBlockElements } from './dBlock';
export { fBlockElements } from './fBlock';