# Matrix Table

## Live demo

https://mitlosh.github.io/matrix-table/

## Tech

React, TypeScript, Context Api, SCSS, Vite

## Optimization

- Used React.memo, useMemo, useCallback for optimization

## Features

- Create matrices of size $M \times N$ with a configurable number of "nearest neighbors" ($X$).

- Hovering over any cell highlights exactly $X$ other cells across the entire matrix that are mathematically closest in value.

- Hovering over a row's sum transforms all cells in that row into percentage values (relative to the sum), featuring a color-coded intensity background.

- Automatic calculation of the 60th percentile for each column, displayed in the table footer.

- Add/remove rows and increment cell values.
