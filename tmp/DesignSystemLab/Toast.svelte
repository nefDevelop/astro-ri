<script>
	import { fade } from 'svelte/transition';

	let { message } = $props();
	let visible = $state(true);

	// Desaparecer el toast después de un tiempo
	setTimeout(() => {
		visible = false;
	}, 2000);
</script>

{#if visible}
	<div
		class="fixed bottom-24 left-1/2 -translate-x-1/2 bg-black/80 text-white px-6 py-3 rounded-full text-xs font-bold backdrop-blur-md z-50"
		transition:fade={{ duration: 300 }}
	>
		{message}
	</div>
{/if}
