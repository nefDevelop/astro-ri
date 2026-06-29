<script>
	import { palette, radius } from './stores.js';
	import { draggableColor } from '$lib/dragActions';

	let { oncopy } = $props();

	const colorKeys = ['primary', 'secondary', 'tertiary', 'neutral'];
	const shadeKeys = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '95'];

	function handleCopy(color) {
		if (oncopy) {
			oncopy(color);
		}
	}
</script>

<div class="flex flex-col gap-3 flex-1">
	{#each colorKeys as key}
		<div
			class="bg-[var(--card-bg)] p-3 rounded-[var(--radius-sm)] flex flex-col gap-2 shadow-sm flex-1"
		>
			<div class="flex justify-between items-center px-1">
				<span class="design-label">{key}</span>
				<span class="text-[8px] font-mono">{$palette[key].toUpperCase()}</span>
			</div>
			<div class="flex flex-col rounded-lg overflow-hidden border border-black/5 flex-1">
				<div
					class="flex-1 cursor-grab active:cursor-grabbing"
					style="min-height: 60px; background-color: var(--{key});"
					use:draggableColor={$palette[key]}
					onclick={() => handleCopy($palette[key])}
					onkeydown={() => {}}
					role="button"
					tabindex="0"
				></div>
				<div class="flex h-5">
					{#each shadeKeys as shade}
						<div
							class="flex-1 cursor-grab active:cursor-grabbing"
							style="background-color: var(--{key}-{shade});"
							use:draggableColor={$palette[key + shade]}
							onclick={() => handleCopy($palette[key + shade])}
							onkeydown={() => {}}
							role="button"
							tabindex="0"
						></div>
					{/each}
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	/* Estilos para los divs de color para asegurar que el cursor sea pointer */
	div[role='button'] {
		cursor: pointer;
	}
</style>
