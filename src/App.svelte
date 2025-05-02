<script lang="ts">
  import InfoPopup from './components/InfoPopup.svelte';
  import Board from './components/Board.svelte';
  import Controls from './components/Controls.svelte';
  import Header from './components/Header.svelte';

  import { terrorism, people } from './js/Store';

  // Stato del popup iniziale
  let showInfo = true;

  // Dati di gioco
  let didWin = false;
  let resetCount = 0;

  // countdown per il refresh
  let countdown = 5;
  let countdownInterval: ReturnType<typeof setInterval>;

  // Reagisce alla vittoria: avvia il countdown
  function onWin() {
    didWin = true;
    countdown = 5;
    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
      countdown -= 1;
      if (countdown === 0) {
        clearInterval(countdownInterval);
        window.location.reload();
      }
    }, 1000);
  }

  // Aggiorna il contatore dei “terrorism flags”
  function onFlagChange(e: CustomEvent<{ terrorism: number }>) {
    $terrorism = e.detail.terrorism;
  }

  // Aggiorna il contatore delle persone
  function onPeople(e: CustomEvent<{ count: number }>) {
    $people += e.detail.count;
  }

  // Reset di partita
  function onReset() {
    didWin = false;
    $terrorism = 0;
    $people = 0;
    resetCount++;
  }
</script>

<div class="h-screen bg-gradient-to-b from-[#ffeac9] to-[#ffbe99] flex items-center justify-between flex-col pb-4">
  {#if showInfo}
    <InfoPopup on:close={() => (showInfo = false)} />
  {/if}

  <Header />

  <!--
    Qui colleghiamo l’evento gamewin direttamente a onWin,
    così il countdown parte sempre non appena Board emette gamewin
  -->
  <Board
    {resetCount}
    on:gamewin={onWin}
    on:flagchange={onFlagChange}
    on:people={onPeople}
  />

  <Controls gameEnded={didWin} on:reset={onReset} />
</div>

{#if didWin}
  <div class="fixed w-screen h-screen z-[1] bg-black/50 grid place-items-center inset-0">
    <div class="bg-gradient-to-t from-[#ffeac9] to-[#ffbe99] w-max h-max px-20 py-10 text-center rounded-xl shadow-xl">
      <p class="font-honk  text-3xl">
        <span class="text-6xl">Congratulations!</span><br>
        You have neutralized {$terrorism} terrorists
        at the cost of {$people + $terrorism} human lives.
      </p>
      <p class="mt-4 ">Reloading in {countdown}…</p>
    </div>
  </div>
{/if}

<style>
  :global(body) {
    margin: 0;
  }
</style>
