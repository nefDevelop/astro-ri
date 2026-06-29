<script>
	import { sourceColor } from './stores.js';
	function generateRandomHexColor() {
		$sourceColor =
			'#' +
			Math.floor(Math.random() * 16777215)
				.toString(16)
				.padStart(6, '0')
				.toUpperCase();
	}
</script>

<div
	class="bg-[var(--card-bg)] p-4 rounded-[var(--radius-md)] shadow-sm border border-white/5 flex flex-col gap-3 transition-colors duration-500"
>
	<div class="flex items-center gap-2 mb-1">
		<i data-lucide="palette" class="w-4 h-4 text-[var(--primary)]"></i>
		<span class="design-label" style="color: var(--text-main);">Color de Origen</span>
	</div>

	<div class="flex items-center gap-4">
		<div class="relative group">
			<input
				type="color"
				bind:value={$sourceColor}
				class="w-14 h-14 rounded-2xl border-none cursor-pointer bg-transparent transition-transform hover:scale-105"
			/>
			<div
				class="absolute -inset-1 rounded-[1.25rem] border-2 border-[var(--primary)] opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"
			></div>
		</div>

		<div class="flex flex-col gap-1.5 flex-1">
			<div class="flex items-center justify-between gap-2">
				<span class="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]"
					>Hex Code</span
				>
				<div class="flex items-center gap-2">
					<button
						onclick={generateRandomHexColor}
						class="p-1 bg-black/5 rounded-md hover:bg-black/10 transition-colors"
						aria-label="Generar color aleatorio"
						><i data-lucide="shuffle" class="w-3 h-3 text-[var(--text-muted)]"></i></button
					>
					<span class="text-[10px] font-mono font-bold text-[var(--primary)]"
						>{$sourceColor.toUpperCase()}</span
					>
				</div>
			</div>
			<input
				type="text"
				bind:value={$sourceColor}
				placeholder="#000000"
				class="bg-black/5 border border-black/5 rounded-xl px-3 py-2 text-xs font-mono text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition-all uppercase w-full"
			/>
		</div>
	</div>
</div>
