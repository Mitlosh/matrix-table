import type { CellId, Row } from '../types/matrix';

export const calculate60thPercentile = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;

  const sorted = [...numbers].sort((a, b) => a - b);

  const index = Math.ceil(0.6 * sorted.length) - 1;

  return sorted[index];
};

export const findNearestCellIds = (
  rows: Row[],
  targetAmount: number,
  X: number,
  excludeId: CellId,
): CellId[] => {
  const allCells = rows
    .flatMap((row) => row.cells)
    .filter((c) => c.id !== excludeId);

  return allCells
    .sort(
      (a, b) =>
        Math.abs(a.amount - targetAmount) - Math.abs(b.amount - targetAmount),
    )
    .slice(0, X)
    .map((c) => c.id);
};

export const generateCellValue = (): number =>
  Math.floor(Math.random() * 900) + 100;
