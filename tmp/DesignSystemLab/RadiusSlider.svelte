<script>
	import { radius } from './stores.js';
</script>

<div
	class="bg-[var(--card-bg)] p-4 rounded-[var(--radius-md)] shadow-sm border border-white/5 flex flex-col gap-3 transition-colors duration-500"
>
	<div class="flex items-center justify-between mb-1">
		<div class="flex items-center gap-2">
			<i data-lucide="square" class="w-4 h-4 text-[var(--neutral)]"></i>
			<span class="design-label" style="color: var(--text-main);">Radio Bordes</span>
		</div>
		<span
			class="text-[10px] font-mono font-bold text-[var(--primary)] bg-black/5 px-2 py-0.5 rounded-full"
			>{$radius}px</span
		>
	</div>

	<div class="flex flex-col gap-2">
		<input
			type="range"
			min="0"
			max="64"
			bind:value={$radius}
			class="w-full h-1.5 bg-black/5 rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
		/>
		<div class="flex justify-between px-1">
			<span class="text-[7px] font-bold text-[var(--text-muted)] uppercase">Sharp</span>
			<span class="text-[7px] font-bold text-[var(--text-muted)] uppercase">Round</span>
		</div>
	</div>
</div>
