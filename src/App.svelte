<script lang="ts">
  import Board from './components/Board.svelte';
  import Controls from './components/Controls.svelte';
  import Header from './components/Header.svelte';

  let found = 0;          // Hamas
  let people = 0;         // nuovo contatore
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
    resetCount += 1;
  }
</script>

<div class="flex items-center justify-center min-h-screen p-4">
  <div class="bg-white shadow-lg rounded-lg p-4 max-w-xs w-full">

    <Header/>

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
    />

    <Controls
      totalMines={10}
      flaggedCount={found}
      peopleCount={people}
      gameEnded={didWin}
      on:reset={onReset}
    />
    
  </div>
</div>
