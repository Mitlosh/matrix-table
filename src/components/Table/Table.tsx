import { useState, useMemo, useCallback } from 'react';
import {
  calculate60thPercentile,
  generateCellValue,
} from '../../utils/matrixHelpers';
import styles from './Table.module.scss';
import { TableRow } from '../TableRow/TableRow';
import { useMatrix } from '../../hooks/useMatrix';

export const Table = () => {
  const { state, dispatch } = useMatrix();
  const { rows, M, N, X, hoveredRowId } = state;

  const [config, setConfig] = useState({ m: M, n: N, x: X });

  const handleGenerate = () => {
    const newRows = Array.from({ length: config.m }, () => ({
      id: crypto.randomUUID(),
      cells: Array.from({ length: config.n }, () => ({
        id: Math.floor(Math.random() * 1000000),
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

  const handleCellClick = useCallback(
    (id: number) => dispatch({ type: 'INCREMENT_CELL', cellId: id }),
    [dispatch],
  );
  const handleCellEnter = useCallback(
    (id: number | null) => dispatch({ type: 'SET_HOVERED_CELL', cellId: id }),
    [dispatch],
  );
  const handleRowRemove = useCallback(
    (id: string) => dispatch({ type: 'REMOVE_ROW', rowId: id }),
    [dispatch],
  );
  const handleSumHover = useCallback(
    (id: string | null) => dispatch({ type: 'SET_HOVERED_ROW', rowId: id }),
    [dispatch],
  );
  const handleCellLeave = useCallback(
    () => handleCellEnter(null),
    [handleCellEnter],
  );
  const handleSumHover1 = useCallback(
    () => handleSumHover(null),
    [handleSumHover],
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
                onCellClick={handleCellClick}
                onCellEnter={handleCellEnter}
                onCellLeave={handleCellLeave}
                onRowRemove={handleRowRemove}
                onSumEnter={handleSumHover}
                onSumLeave={handleSumHover1}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className={styles.labelCell}>60th %</td>
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
