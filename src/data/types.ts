export interface Element {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: number;
  group: number | null;
  period: number;
  block: 's' | 'p' | 'd' | 'f';
  category: string;
  electronConfiguration: string;
}