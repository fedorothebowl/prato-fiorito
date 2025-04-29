<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
  </script>
  
  <div
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <div
      class="bg-white p-6 rounded-lg shadow-lg max-w-lg text-gray-800"
    >
      <h2 class="text-xl font-bold mb-4">Lorem</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam sed magni natus ab. Fugiat nulla amet ex. Fugit perspiciatis illo, rem earum hic inventore dolor tenetur ad reprehenderit asperiores quae.
        </p>
      <button
        on:click={() => dispatch('close')}
        class="mt-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded border border-gray-400"
      >
        Ho capito
      </button>
    </div>
  </div>
  