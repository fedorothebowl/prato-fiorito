<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import Cell from './Cell.svelte';

  export let rows = 10;
  export let cols = 10;
  export let mines = 10;
  export let resetCount = 0;

  const dispatch = createEventDispatcher();

  type CellType = {
    hasMine: boolean;
    adjacent: number;
    state: 'covered' | 'open' | 'flagged';
    found?: boolean;
  };

  let grid: CellType[][] = [];
  let foundMines = 0;

  export function initGrid() {
    foundMines = 0;
    dispatch('flagchange', { flaggedCount: foundMines });

    grid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        hasMine: false,
        adjacent: 0,
        state: 'covered',
        found: false,
      }))
    );

    let placed = 0;
    while (placed < mines) {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);
      if (!grid[r][c].hasMine) {
        grid[r][c].hasMine = true;
        placed++;
      }
    }

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c].hasMine) continue;
        let cnt = 0;
        for (let dr = -1; dr <= 1; dr++)
          for (let dc = -1; dc <= 1; dc++) {
            const rr = r + dr, cc = c + dc;
            if (
              rr >= 0 && rr < rows &&
              cc >= 0 && cc < cols &&
              grid[rr][cc].hasMine
            ) cnt++;
          }
        grid[r][c].adjacent = cnt;
      }
    }

    grid = grid; // forza reattività
  }

  function floodFill(r: number, c: number) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;
    const cell = grid[r][c];
    if (cell.state !== 'covered' || cell.hasMine) return;
    cell.state = 'open';
    if (cell.adjacent === 0) {
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++)
          floodFill(r + dr, c + dc);
    }
  }

  function openCell(e: CustomEvent<{ row: number; col: number }>) {
    const { row, col } = e.detail;
    const cell = grid[row][col];
    if (cell.state !== 'covered') return;

    if (cell.hasMine && !cell.found) {
      cell.state = 'open';
      cell.found = true;
      foundMines++;
      dispatch('flagchange', { flaggedCount: foundMines });
      grid = grid;
      checkWin();
    } else if (!cell.hasMine) {
      // incrementa people ad ogni click sicuro
      dispatch('people', { count: 1 });
      floodFill(row, col);
      grid = grid;
      checkWin();
    }
  }

  function checkWin() {
    if (foundMines >= mines) {
      dispatch('gamewin');
    }
  }

  $: if (resetCount) initGrid();
  onMount(initGrid);
</script>

<div
  class="grid gap-1"
  style="grid-template-columns: repeat({cols}, minmax(0,1fr))"
>
  {#each grid as row, ri}
    {#each row as cell, ci}
      <Cell
        {cell}
        row={ri}
        col={ci}
        on:open={openCell}
      />
    {/each}
  {/each}
</div>
