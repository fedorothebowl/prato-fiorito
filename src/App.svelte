<script lang="ts">
  import InfoPopup from './components/InfoPopup.svelte';
  import Board from './components/Board.svelte';
  import Controls from './components/Controls.svelte';
  import Header from './components/Header.svelte';

  // Stato del popup iniziale
  let showInfo = true;

  // Dati di gioco
  let found = 0;    // Terroristi neutralizzati
  let people = 0;   // Contatore civili
  let didWin = false;
  let resetCount = 0;

  function onGameWin() {
    didWin = true;
  }
  function onFlagChange(e: CustomEvent<{ flaggedCount: number }>) {
    found = e.detail.flaggedCount;
  }
  function onPeople(e: CustomEvent<{ count: number }>) {
    people += e.detail.count;
  }
  function onReset() {
    didWin = false;
    found = 0;
    people = 0;
    resetCount++;
  }
</script>

<!-- Layout senza side‑bar: il contenuto viene centrato -->
<div class="h-screen flex items-center justify-center bg-gray-100">
  {#if showInfo}
    <InfoPopup on:close={() => (showInfo = false)} />
  {/if}

  {#if !showInfo}
    <div class="bg-white shadow-lg rounded-lg p-4 w-full max-w-xs">
      <Header />

      {#if didWin}
        <div class="text-center text-green-600 font-bold mb-2">
          Hai trovato tutte le mine! 🎉
        </div>
      {/if}

      <Board
        rows={10}
        cols={10}
        mines={10}
        resetCount={resetCount}
        on:gamewin={onGameWin}
        on:flagchange={onFlagChange}
        on:people={onPeople}
        class="mb-4"
      />

      <Controls
        totalMines={10}
        flaggedCount={found}
        peopleCount={people}
        gameEnded={didWin}
        on:reset={onReset}
      />
    </div>
  {/if}
</div>

<style>
  /* Margine leggero sui lati per schermi molto stretti */
  :global(body) { margin: 0; }
</style>
