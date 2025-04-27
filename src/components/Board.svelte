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
    state: 'covered' | 'open';
    found?: boolean;
  };

  let grid: CellType[][] = [];
  let foundMines = 0;

  /**
   * Inizializza la griglia, piazza le mine, calcola adiacenze
   * e azzera il contatore "Hamas" (foundMines)
   */
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

    // Piazza le mine
    let placed = 0;
    while (placed < mines) {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);
      if (!grid[r][c].hasMine) {
        grid[r][c].hasMine = true;
        placed++;
      }
    }

    // Calcola adiacenze
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c].hasMine) continue;
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const rr = r + dr;
            const cc = c + dc;
            if (
              rr >= 0 && rr < rows &&
              cc >= 0 && cc < cols &&
              grid[rr][cc].hasMine
            ) {
              count++;
            }
          }
        }
        grid[r][c].adjacent = count;
      }
    }

    // Forza reattività
    grid = grid;
  }

  /**
   * Flood-fill che apre e raccoglie le celle scoperte
   */
  function floodFill(r: number, c: number, opened: CellType[]) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;
    const cell = grid[r][c];
    if (cell.state !== 'covered' || cell.hasMine) return;
    cell.state = 'open';
    opened.push(cell);
    if (cell.adjacent === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          floodFill(r + dr, c + dc, opened);
        }
      }
    }
  }

  /**
   * Gestisce il click su una cella:
   * - se mina: conta come "Hamas"
   * - se non mina: flood-fill e conteggia il numero totale visibile
   */
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
      const openedCells: CellType[] = [];
      floodFill(row, col, openedCells);
      grid = grid;
      // Somma i numeri visibili nelle celle aperte
      const sumVisible = openedCells.reduce((acc, c) => acc + c.adjacent, 0);
      dispatch('people', { count: sumVisible });
      checkWin();
    }
  }

  /** Controlla vittoria: tutte le mine individuate */
  function checkWin() {
    if (foundMines >= mines) {
      dispatch('gamewin');
    }
  }

  // Ricrea la griglia ad ogni reset
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
