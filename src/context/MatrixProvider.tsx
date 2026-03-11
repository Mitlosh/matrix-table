import React, { useReducer, useMemo, useEffect } from 'react';
import { matrixReducer } from './MatrixReducer';
import { MatrixContext } from './MatrixContext';
import { findNearestCellIds } from '../utils/matrixHelpers';

export function MatrixProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(matrixReducer, {
    rows: [],
    M: 0,
    N: 0,
    X: 0,
    hoveredCellId: null,
    hoveredRowId: null,
  });

  const nearestIds = useMemo(() => {
    if (state.hoveredCellId === null) return [];

    const allCells = state.rows.flatMap((r) => r.cells);
    const target = allCells.find((c) => c.id === state.hoveredCellId);

    if (!target) return [];

    return findNearestCellIds(
      state.rows,
      target.amount,
      state.X,
      state.hoveredCellId,
    );
  }, [state.hoveredCellId, state.rows, state.X]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('matrix-highlight', { detail: { nearestIds } }),
    );
  }, [nearestIds]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <MatrixContext.Provider value={value}>{children}</MatrixContext.Provider>
  );
}
