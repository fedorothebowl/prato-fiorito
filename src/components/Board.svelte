<script lang="ts">

  import { terrorism, people, reset, gameWin } from '../js/Store';
  import { mines } from '../js/Store';

  import { createEventDispatcher, onMount } from 'svelte';
  import Cell from './Cell.svelte';

  let rows = 10;
  let cols = 10;

  const dispatch = createEventDispatcher();

  type CellType = {
    hasMine: boolean;
    adjacent: number;
    state: 'covered' | 'open';
    found?: boolean;
  };

  let grid: CellType[][] = [];
  let foundMines = 0;
  let gameOver = false; // blocca ulteriori azioni a vittoria avvenuta

  function initGrid() {
    foundMines = 0;
    gameOver = false;

    // Crea griglia
    grid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        hasMine: false,
        adjacent: 0,
        state: 'covered'
      }))
    );

    // Posiziona mine casuali
    let placed = 0;
    while (placed < $mines) {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);
      if (!grid[r][c].hasMine) {
        grid[r][c].hasMine = true;
        placed++;
      }
    }

    // Calcola numeri adiacenti
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

  onMount(initGrid);

  function floodFill(r: number, c: number, opened: CellType[]) {
    const cell = grid[r][c];
    if (cell.state !== 'covered') return;
    cell.state = 'open';
    opened.push(cell);

    if (cell.adjacent === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const rr = r + dr;
          const cc = c + dc;
          if (rr >= 0 && rr < rows && cc >= 0 && cc < cols) {
            floodFill(rr, cc, opened);
          }
        }
      }
    }
  }

  function openCell(e: CustomEvent<{ row: number; col: number }>) {
    if (gameOver) return; // blocca interazione a gioco finito

    const { row, col } = e.detail;
    const cell = grid[row][col];
    if (cell.state !== 'covered') return;

    if (cell.hasMine && !cell.found) {
      cell.state = 'open';
      cell.found = true;
      foundMines++;
      dispatch('flagchange', { terrorism: foundMines });
      grid = grid;
      checkWin();
    } else if (!cell.hasMine) {
      const openedCells: CellType[] = [];
      floodFill(row, col, openedCells);
      grid = grid;
      const sumVisible = openedCells.reduce((acc, c) => acc + c.adjacent, 0);
      dispatch('people', { count: sumVisible });
      checkWin();
    }
  }

  function checkWin() {
    if (foundMines >= $mines) {
      gameOver = true; // stop ulteriori click
      $gameWin = true;
    }
  }

  // Ricrea griglia ad ogni reset
  reset.subscribe(value =>{
    if(value){
      initGrid();
    }
  });

</script>

<div class="w-md">
  <div class="bg-gradient-to-b from-[#ffbe99]  to-[#ffeac9] shadow-lg rounded-lg p-4 w-full">
    <div class="grid gap-1" style="grid-template-columns: repeat({cols}, minmax(0,1fr))">
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
  </div>
  
  <div class="flex items-center justify-between font-mono text-lg gap-4 mt-4">
    <span class="w-1/2 text-center rounded-full px-6 py-2 shadow-xl bg-[#ffeac9] font-bold text-amber-900">Terrorism: {$terrorism}</span>
    <span class="w-1/2 text-center rounded-full px-6 py-2 shadow-xl bg-[#ffeac9] font-bold text-amber-900">Civilians: {$people}</span>
  </div>
</div>