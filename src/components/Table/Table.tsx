import { useState, useMemo, useCallback } from 'react';
import {
  calculate60thPercentile,
  generateCellValue,
} from '../../utils/matrixHelpers';
import styles from './Table.module.scss';
import { TableRow } from '../TableRow/TableRow';
import { useMatrix } from '../../hooks/useMatrix';
import type { CellId } from '../../types/matrix';

export const Table = () => {
  const { state, dispatch } = useMatrix();
  const { rows, M, N, X, hoveredRowId } = state;

  const [config, setConfig] = useState({ m: M, n: N, x: X });

  const handleGenerate = () => {
    const newRows = Array.from({ length: config.m }, () => ({
      id: crypto.randomUUID(),
      cells: Array.from({ length: config.n }, () => ({
        id: crypto.randomUUID(),
        amount: generateCellValue(),
      })),
    }));

    dispatch({
      type: 'SET_MATRIX',
      rows: newRows,
      M: config.m,
      N: config.n,
      X: config.x,
    });
  };

  const columnPercentiles = useMemo(() => {
    if (rows.length === 0) return [];

    return Array.from({ length: N }, (_, colIndex) => {
      const values = rows.map((row) => row.cells[colIndex].amount);

      return calculate60thPercentile(values);
    });
  }, [rows, N]);

  const incrementCell = useCallback(
    (id: CellId) => dispatch({ type: 'INCREMENT_CELL', cellId: id }),
    [dispatch],
  );

  const removeRow = useCallback(
    (id: string) => dispatch({ type: 'REMOVE_ROW', rowId: id }),
    [dispatch],
  );

  const setHoveredCell = useCallback(
    (id: CellId | null) => dispatch({ type: 'SET_HOVERED_CELL', cellId: id }),
    [dispatch],
  );

  const setHoveredRow = useCallback(
    (id: string | null) => dispatch({ type: 'SET_HOVERED_ROW', rowId: id }),
    [dispatch],
  );

  const clearHoveredCell = useCallback(
    () => setHoveredCell(null),
    [setHoveredCell],
  );

  const clearHoveredRow = useCallback(
    () => setHoveredRow(null),
    [setHoveredRow],
  );

  return (
    <div className={styles.container}>
      <h1>Matrix</h1>
      <div className={styles.controls}>
        <input
          type='number'
          value={config.m}
          onChange={(e) => setConfig({ ...config, m: +e.target.value })}
          placeholder='M'
        />
        <input
          type='number'
          value={config.n}
          onChange={(e) => setConfig({ ...config, n: +e.target.value })}
          placeholder='N'
        />
        <input
          type='number'
          value={config.x}
          onChange={(e) => setConfig({ ...config, x: +e.target.value })}
          placeholder='X'
        />
        <button onClick={handleGenerate}>Generate Matrix</button>
      </div>

      {rows.length > 0 && (
        <table className={styles.matrixTable}>
          <thead>
            <tr>
              <th>Action</th>
              <th>Sum</th>
              {Array.from({ length: N }).map((_, i) => (
                <th key={i}>{i + 1}</th>
              ))}
              <th>Sum</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                row={row}
                isPercentMode={hoveredRowId === row.id}
                onCellClick={incrementCell}
                onCellEnter={setHoveredCell}
                onCellLeave={clearHoveredCell}
                onRowRemove={removeRow}
                onSumEnter={setHoveredRow}
                onSumLeave={clearHoveredRow}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2} className={styles.labelCell}>
                60th %
              </td>

              {columnPercentiles.map((val, i) => (
                <td key={i} className={styles.percentileCell}>
                  {val}
                </td>
              ))}
              <td colSpan={2}></td>
            </tr>
          </tfoot>
        </table>
      )}
      <button
        className={styles.addRowBtn}
        onClick={() => dispatch({ type: 'ADD_ROW' })}
      >
        Add Row
      </button>
    </div>
  );
};
