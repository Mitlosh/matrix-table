import { memo } from 'react';
import styles from './Cell.module.scss';
import type { CellId, CellValue } from '../../types/matrix';

interface Props {
  id: CellId;
  amount: CellValue;
  isNearest: boolean;
  isPercentMode: boolean;
  rowSum: number;
  maxInRow: number;
  onClick: (id: CellId) => void;
  onEnter: (id: CellId) => void;
  onLeave: () => void;
}

export const Cell = memo(
  ({
    id,
    amount,
    isNearest,
    isPercentMode,
    rowSum,
    maxInRow,
    onClick,
    onEnter,
    onLeave,
  }: Props) => {
    const heatmapHeight = Math.min(100, Math.round((amount / maxInRow) * 100));

    const percentOfTotal =
      rowSum > 0 ? ((amount / rowSum) * 100).toFixed(1) : '0';

    return (
      <td
        className={`${styles.cell} ${isNearest ? styles.nearest : ''}`}
        onClick={() => onClick(id)}
        onMouseEnter={() => onEnter(id)}
        onMouseLeave={onLeave}
      >
        <span className={styles.value}>
          {isPercentMode ? `${percentOfTotal}%` : amount}
        </span>

        {isPercentMode && (
          <div
            className={styles.heatmapBar}
            style={{ height: `${heatmapHeight}%` }}
          />
        )}
      </td>
    );
  },
  (prev, next) => {
    return (
      prev.amount === next.amount &&
      prev.isNearest === next.isNearest &&
      prev.isPercentMode === next.isPercentMode &&
      prev.rowSum === next.rowSum &&
      prev.maxInRow === next.maxInRow
    );
  },
);
