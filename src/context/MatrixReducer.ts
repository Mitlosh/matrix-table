import type { MatrixAction, MatrixState, Row } from '../types/matrix';

export const matrixReducer = (
  state: MatrixState,
  action: MatrixAction,
): MatrixState => {
  let newRow: Row;

  switch (action.type) {
    case 'SET_MATRIX':
      return {
        ...state,
        rows: action.rows,
        M: action.M,
        N: action.N,
        X: action.X,
      };
    case 'INCREMENT_CELL':
      return {
        ...state,
        rows: state.rows.map((row) => ({
          ...row,
          cells: row.cells.map((cell) =>
            cell.id === action.cellId
              ? { ...cell, amount: cell.amount + 1 }
              : cell,
          ),
        })),
      };

    case 'ADD_ROW':
      newRow = {
        id: crypto.randomUUID(),
        cells: Array.from({ length: state.N }, () => ({
          id: Math.floor(Math.random() * 1000000),
          amount: Math.floor(Math.random() * 900) + 100,
        })),
      };
      return { ...state, rows: [...state.rows, newRow], M: state.M + 1 };

    case 'REMOVE_ROW':
      return {
        ...state,
        rows: state.rows.filter((row) => row.id !== action.rowId),
        M: state.M - 1,
      };
    case 'SET_HOVERED_CELL':
      return {
        ...state,
        hoveredCellId: action.cellId,
      };

    case 'SET_HOVERED_ROW':
      return {
        ...state,
        hoveredRowId: action.rowId,
      };

    default:
      return state;
  }
};
