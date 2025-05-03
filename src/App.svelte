<script lang="ts">

  import InfoPopup from './components/InfoPopup.svelte';
  import Board from './components/Board.svelte';
  import Reset from './components/Reset.svelte';
  import Header from './components/Header.svelte';

  import { terrorism, people, gameWin, rules } from './js/Store';

  // Stato del popup iniziale

  // Aggiorna il contatore dei “terrorism flags”
  function onFlagChange(e: CustomEvent<{ terrorism: number }>) {
    $terrorism = e.detail.terrorism;
  }

  // Aggiorna il contatore delle persone
  function onPeople(e: CustomEvent<{ count: number }>) {
    $people += e.detail.count;
  }


</script>
{#if $rules}
<InfoPopup />
{/if}

<div class="h-screen bg-gradient-to-b from-[#ffeac9] to-[#ffbe99] flex items-center justify-between flex-col pb-4">



  <Header />

  <Board
    on:flagchange={onFlagChange}
    on:people={onPeople}
  />

  <!-- <div class="flex flex-col max-w-md w-full space-y-4">
    <Reset />
  </div> -->
<div></div>

</div>

{#if $gameWin}
  <div class="fixed w-screen h-screen z-[1] bg-black/50 grid place-items-center inset-0">
    <div class="bg-gradient-to-t from-[#ffeac9] to-[#ffbe99] w-max h-max px-20 py-10 text-center rounded-xl shadow-xl">
      <p class="font-honk  text-3xl">
        <span class="text-6xl">Congratulations!</span><br>
        You have neutralized {$terrorism} terrorists
        at the cost of {$people + $terrorism} human lives.
      </p>
      <Reset />

    </div>
  </div>
{/if}

<style>
  :global(body) {
    margin: 0;
  }
</style>
