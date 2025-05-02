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

<div class="h-screen bg-gradient-to-b from-[#ffeac9]  to-[#ffbe99] flex items-center justify-between flex-col pb-4">
  {#if showInfo}
    <InfoPopup on:close={() => (showInfo = false)} />
  {/if}

  <!-- {#if !showInfo} -->
  <Header />

    <div class="bg-gradient-to-b from-[#ffbe99]  to-[#ffeac9] shadow-lg rounded-lg p-4 w-full max-w-md">

      <Board
        rows={10}
        cols={10}
        mines={10}
        resetCount={resetCount}
        on:gamewin={onGameWin}
        on:flagchange={onFlagChange}
        on:people={onPeople}
      />

    </div>

    <Controls
      totalMines={10}
      flaggedCount={found}
      peopleCount={people}
      gameEnded={didWin}
      on:reset={onReset}
    />
   
</div>

{#if didWin}
  <div class="fixed w-screen h-screen z-[1] bg-black/50 grid place-items-center inset-0">
    <div class="bg-gradient-to-t from-[#ffeac9]  to-[#ffbe99] w-max h-max px-20 py-10 text-3xl text-center font-honk rounded-xl shadow-xl">
      <span class="text-6xl">Congratulations!</span> <br> You have neutralized {found} terrorists at the cost of {people + found} human lives.
    </div>
  </div>
{/if}

<style>
  :global(body) { margin: 0; }  
</style>
