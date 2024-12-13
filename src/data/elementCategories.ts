export const categories = {
  s: 'S-Block',
  p: 'P-Block',
  d: 'D-Block',
  f: 'F-Block'
} as const;

export type Block = keyof typeof categories;

export const blockDescriptions = {
  s: 'Elements with their highest-energy electrons in s-orbitals',
  p: 'Elements with their highest-energy electrons in p-orbitals',
  d: 'Transition metals with partially filled d-orbitals',
  f: 'Lanthanides and Actinides with partially filled f-orbitals'
};