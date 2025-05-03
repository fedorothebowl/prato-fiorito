<script lang="ts">
  import { rules } from "../js/Store";
</script>
  
  <div class="fixed w-screen h-screen z-[1] bg-black/50 grid place-items-center inset-0">
    <div class="bg-gradient-to-t from-[#ffeac9]  to-[#ffbe99] w-max h-max px-4 py-10  text-center rounded-xl shadow-xl max-w-lg">
      <h3 class="text-3xl font-bold mb-4 font-honk">Rules</h3>
      <p>You’re in a minefield, but this time your goal isn’t to dodge the explosives—it’s to strike the enemy before he strikes you. Each click reveals a tile, and just like in the classic Minesweeper game, the numbers show how many confined enemies surround it. It’s up to you to neutralize them while keeping human casualties to a minimum. Good luck!</p>
      <button
        on:click={() => $rules = false}
        class="rounded-full text-xl px-6 py-2 shadow-xl bg-[#ffeac9] font-bold cursor-pointer font-honk mt-8 hover:translate-y-1 transition-transform duration-200 ease-in-out "
      >
        play
      </button>
    </div>
  </div>
  