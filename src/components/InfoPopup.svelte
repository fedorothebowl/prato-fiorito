<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
  </script>
  
  <div class="fixed w-screen h-screen z-[1] bg-black/50 grid place-items-center inset-0">
    <div class="bg-gradient-to-t from-[#ffeac9]  to-[#ffbe99] w-max h-max px-4 py-10  text-center rounded-xl shadow-xl max-w-lg">
      <h3 class="text-3xl font-bold mb-4 font-honk">Rules</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem consectetur nobis similique impedit amet ratione illo earum. Id ab dignissimos, in fugiat minima commodi nam eius aliquam impedit pariatur soluta!</p>
      <button
        on:click={() => dispatch('close')}
        class="rounded-full text-xl px-6 py-2 shadow-xl bg-[#ffeac9] font-bold cursor-pointer font-honk mt-8 hover:translate-y-1 transition-transform duration-200 ease-in-out "
      >
        play
      </button>
    </div>
  </div>
  