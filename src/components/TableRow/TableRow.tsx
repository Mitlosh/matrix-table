import { useMemo, memo } from 'react';
import styles from './TableRow.module.scss';
import type { CellId, Row } from '../../types/matrix';
import { Cell } from '../Cell/Cell';

interface Props {
  row: Row;
  isPercentMode: boolean;
  nearestIds: CellId[];
  onCellClick: (id: CellId) => void;
  onCellEnter: (id: CellId) => void;
  onCellLeave: () => void;
  onRowRemove: (id: string) => void;
  onSumEnter: (id: string) => void;
  onSumLeave: () => void;
}

export const TableRow = memo(
  ({
    row,
    isPercentMode,
    nearestIds,
    onCellClick,
    onCellEnter,
    onCellLeave,
    onRowRemove,
    onSumEnter,
    onSumLeave,
  }: Props) => {
    const rowSum = useMemo(
      () => row.cells.reduce((sum, cell) => sum + cell.amount, 0),
      [row.cells],
    );

    const maxInRow = useMemo(
      () => Math.max(...row.cells.map((c) => c.amount)),
      [row.cells],
    );

    return (
      <tr className={styles.row}>
        {row.cells.map((cell) => (
          <Cell
            key={cell.id}
            id={cell.id}
            amount={cell.amount}
            isNearest={nearestIds.includes(cell.id)}
            isPercentMode={isPercentMode}
            rowSum={rowSum}
            maxInRow={maxInRow}
            onClick={onCellClick}
            onEnter={onCellEnter}
            onLeave={onCellLeave}
          />
        ))}

        <td
          className={styles.sumCell}
          onMouseEnter={() => onSumEnter(row.id)}
          onMouseLeave={onSumLeave}
        >
          {rowSum}
        </td>

        <td className={styles.actionCell}>
          <button onClick={() => onRowRemove(row.id)}>X</button>
        </td>
      </tr>
    );
  },
);
