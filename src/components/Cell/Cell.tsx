import { memo, useEffect, useState } from 'react';
import styles from './Cell.module.scss';
import type { CellId, CellValue } from '../../types/matrix';

interface Props {
  id: CellId;
  amount: CellValue;
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
    isPercentMode,
    rowSum,
    maxInRow,
    onClick,
    onEnter,
    onLeave,
  }: Props) => {
    const [isNearest, setIsNearest] = useState(false);

    useEffect(() => {
      const checkHighlight = (e: CustomEvent) => {
        const isInList = e.detail.nearestIds.includes(id);

        if (isNearest !== isInList) setIsNearest(isInList);
      };

      window.addEventListener(
        'matrix-highlight',
        checkHighlight as EventListener,
      );

      return () =>
        window.removeEventListener(
          'matrix-highlight',
          checkHighlight as EventListener,
        );
    }, [id, isNearest]);

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
);
