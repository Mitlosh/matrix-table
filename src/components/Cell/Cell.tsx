import { memo, useEffect, useMemo, useState } from 'react';
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
    const percentValue = rowSum > 0 ? (amount / rowSum) * 100 : 0;

    const intensity = maxInRow > 0 ? amount / maxInRow : 0;

    const style = useMemo(() => {
      if (!isPercentMode) return undefined;

      const s: React.CSSProperties = {
        backgroundColor: `rgba(255,152,0,${intensity})`,
      };

      if (intensity > 0.6) s.color = 'white';

      return s;
    }, [isPercentMode, intensity]);

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

    return (
      <td
        className={`${styles.cell} ${isNearest ? styles.nearest : ''}`}
        onClick={() => onClick(id)}
        onMouseEnter={() => onEnter(id)}
        onMouseLeave={onLeave}
        style={style}
      >
        <span className={styles.value}>
          {isPercentMode ? `${percentValue.toFixed(1)}%` : amount}
        </span>
      </td>
    );
  },
);
