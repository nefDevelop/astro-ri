<script>
	import { isDarkMode } from './stores.js';
</script>

<div
	class="bg-[var(--card-bg)] p-4 rounded-[calc(var(--radius)*0.75)] shadow-sm border border-white/5 flex flex-col gap-3 transition-colors duration-500"
>
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-2">
			<i data-lucide={$isDarkMode ? 'moon' : 'sun'} class="w-4 h-4 text-[var(--primary)]"></i>
			<span class="design-label" style="color: var(--text-main);">Modo de Color</span>
		</div>

		<button
			onclick={() => ($isDarkMode = !$isDarkMode)}
			class="w-12 h-6 rounded-full p-1 flex items-center transition-all relative {$isDarkMode
				? 'bg-[var(--primary)]'
				: 'bg-black/5'}"
			aria-label="Alternar modo oscuro"
		>
			<div
				class="w-4 h-4 rounded-full bg-white shadow-md transition-all flex items-center justify-center"
				style="transform: translateX({$isDarkMode ? '20px' : '0px'})"
			></div>
		</button>
	</div>
</div>
