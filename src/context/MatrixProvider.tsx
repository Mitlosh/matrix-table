import React, { useReducer, useMemo } from 'react';
import { matrixReducer } from './MatrixReducer';
import { MatrixContext } from './MatrixContext';

export function MatrixProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(matrixReducer, {
    rows: [],
    M: 0,
    N: 0,
    X: 0,
    hoveredCellId: null,
    hoveredRowId: null,
  });

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <MatrixContext.Provider value={value}>{children}</MatrixContext.Provider>
  );
}
