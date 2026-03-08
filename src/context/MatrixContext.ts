import { createContext, type Dispatch } from 'react';
import type { MatrixAction, MatrixState } from '../types/matrix';

export const MatrixContext = createContext<{
  state: MatrixState;
  dispatch: Dispatch<MatrixAction>;
} | null>(null);
