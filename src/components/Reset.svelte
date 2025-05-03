<script lang="ts">

  import { terrorism, people, reset, gameWin, rules } from '../js/Store';

  function onReset() {
    $reset = true;
    onInitGame();
  }

  function onInitGame(){
    $terrorism = 0;
    $people = 0;
    $reset = false;
    $gameWin = false;
    $rules = false;
  }
</script>

<button class="rounded-full px-6 py-2 shadow-xl bg-[#ffeac9] font-bold text-amber-900 cursor-pointer" on:click={onReset}>Reset</button>
