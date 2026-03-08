export type CellId = number;
export type CellValue = number;

export interface Cell {
  id: CellId;
  amount: CellValue;
}

export interface Row {
  id: string;
  cells: Cell[];
}

export interface MatrixState {
  rows: Row[];
  M: number;
  N: number;
  X: number;
  hoveredCellId: CellId | null;
  hoveredRowId: string | null;
}

export type MatrixAction =
  | {
      type: 'SET_MATRIX';
      rows: Row[];
      M: number;
      N: number;
      X: number;
    }
  | { type: 'INCREMENT_CELL'; cellId: CellId }
  | { type: 'ADD_ROW' }
  | { type: 'REMOVE_ROW'; rowId: string }
  | { type: 'SET_HOVERED_CELL'; cellId: CellId | null }
  | { type: 'SET_HOVERED_ROW'; rowId: string | null };
