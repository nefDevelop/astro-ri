<script>
	import {
		headlineFont,
		bodyFont,
		labelFont,
		headlineSize,
		bodySize,
		labelSize,
		titleWeight,
		letterSpacing,
		uppercaseTitles,
		headlineLineHeight // Importar el nuevo store
	} from './stores.js';

	const fontOptions = [
		'Abel',
		'Abril Fatface',
		'Albert Sans',
		'Anton',
		'Archivo',
		'Assistant',
		'Barlow',
		'Bebas Neue',
		'Bitter',
		'Cabin',
		'Cardo',
		'Caveat',
		'Chivo',
		'Cinzel',
		'Comfortaa',
		'Cormorant Garamond',
		'Crimson Text',
		'DM Sans',
		'Dancing Script',
		'Domine',
		'Dosis',
		'Epilogue',
		'Exo 2',
		'Figtree',
		'Fira Code',
		'Fira Sans',
		'Fredoka',
		'Heebo',
		'Hind',
		'IBM Plex Sans',
		'IBM Plex Serif',
		'Inconsolata',
		'Inter',
		'Josefin Sans',
		'Josefin Serif',
		'Jost',
		'Kanit',
		'Karla',
		'Lato',
		'League Spartan',
		'Lexend',
		'Libre Baskerville',
		'Lora',
		'Manrope',
		'Maven Pro',
		'Merriweather',
		'Montserrat',
		'Mukta',
		'Mulish',
		'Noto Sans',
		'Noto Serif',
		'Nunito',
		'Nunito Sans',
		'Open Sans',
		'Oswald',
		'Outfit',
		'Oxygen',
		'Pacifico',
		'Playfair Display',
		'Plus Jakarta Sans',
		'Poppins',
		'Prompt',
		'PT Sans',
		'PT Serif',
		'Public Sans',
		'Quicksand',
		'Raleway',
		'Red Hat Display',
		'Righteous',
		'Roboto',
		'Roboto Flex',
		'Roboto Mono',
		'Roboto Slab',
		'Rubik',
		'Sora',
		'Source Code Pro',
		'Source Sans Pro',
		'Space Grotesk',
		'Spectral',
		'Syne',
		'Teko',
		'Titillium Web',
		'Ubuntu',
		'Urbanist',
		'Varela Round',
		'Vollkorn',
		'Work Sans',
		'Zilla Grotesk'
	];
	const weightOptions = ['400', '500', '600', '700', '800', '900'];
</script>

<div
	class="bg-[var(--card-bg)] p-5 rounded-[var(--radius-md)] shadow-sm border border-white/5 flex flex-col gap-5 transition-colors duration-500"
>
	<div class="flex items-center gap-2 mb-1">
		<i data-lucide="type" class="w-4 h-4 text-[var(--secondary)]"></i>
		<span class="design-label" style="color: var(--text-main);">Tipografía Core</span>
	</div>

	<!-- Headline Config -->
	<div class="flex flex-col gap-3 p-3 bg-black/5 rounded-2xl">
		<div class="flex justify-between items-center">
			<span class="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]"
				>Titulares</span
			>
			<div class="flex gap-1">
				<button
					onclick={() => ($uppercaseTitles = !$uppercaseTitles)}
					class="w-6 h-6 rounded-md flex items-center justify-center transition-colors {$uppercaseTitles
						? 'bg-[var(--primary)] text-white'
						: 'bg-black/10 text-[var(--text-muted)]'}"
				>
					<span class="text-[10px] font-bold">AA</span>
				</button>
			</div>
		</div>

		<select
			bind:value={$headlineFont}
			class="bg-white/50 border-none rounded-xl px-3 py-2 text-xs font-bold text-[var(--text-main)] outline-none"
		>
			{#each fontOptions as font}
				<option value={font} style="font-family: '{font}', sans-serif;">{font}</option>
			{/each}
		</select>

		<div class="grid grid-cols-2 gap-2">
			<div class="flex flex-col gap-1">
				<span class="text-[7px] font-bold uppercase opacity-40 ml-1">Peso</span>
				<select
					bind:value={$titleWeight}
					class="bg-black/5 border-none rounded-lg px-2 py-1.5 text-[10px] font-bold text-[var(--text-main)] outline-none"
				>
					{#each weightOptions as weight}
						<option value={weight}>{weight}</option>
					{/each}
				</select>
			</div>
			<div class="flex flex-col gap-1">
				<span class="text-[7px] font-bold uppercase opacity-40 ml-1">Tamaño</span>
				<input
					type="number"
					bind:value={$headlineSize}
					class="bg-black/5 border-none rounded-lg px-2 py-1.5 text-[10px] font-mono font-bold text-[var(--text-main)] outline-none"
				/>
			</div>
			<div class="flex flex-col gap-1 col-span-2">
				<span class="text-[7px] font-bold uppercase opacity-40 ml-1"
					>Espaciado Letras ({Math.round($letterSpacing)}px)</span
				>
				<input
					type="range"
					min="-5"
					max="10"
					step="0.5"
					bind:value={$letterSpacing}
					class="w-full h-1.5 bg-black/5 rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
				/>
			</div>
			<div class="flex flex-col gap-1 col-span-2">
				<span class="text-[7px] font-bold uppercase opacity-40 ml-1"
					>Interlineado ({parseFloat($headlineLineHeight).toFixed(1)})</span
				>
				<input
					type="range"
					min="0.8"
					max="2.0"
					step="0.1"
					bind:value={$headlineLineHeight}
					class="w-full h-1.5 bg-black/5 rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
				/>
			</div>
		</div>
	</div>

	<!-- Body Config -->
	<div class="flex flex-col gap-3 p-3 bg-black/5 rounded-2xl">
		<span class="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]"
			>Cuerpo de Texto</span
		>
		<select
			bind:value={$bodyFont}
			class="bg-white/50 border-none rounded-xl px-3 py-2 text-xs font-bold text-[var(--text-main)] outline-none"
		>
			{#each fontOptions as font}
				<option value={font} style="font-family: '{font}', sans-serif;">{font}</option>
			{/each}
		</select>
		<div class="flex flex-col gap-1">
			<span class="text-[7px] font-bold uppercase opacity-40 ml-1">Size</span>
			<input
				type="number"
				bind:value={$bodySize}
				class="bg-black/5 border-none rounded-lg px-2 py-1.5 text-[10px] font-mono font-bold text-[var(--text-main)] outline-none"
			/>
		</div>
	</div>

	<!-- Label Config -->
	<div class="flex flex-col gap-3 p-3 bg-black/5 rounded-2xl">
		<span class="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]"
			>Labels & UI</span
		>
		<select
			bind:value={$labelFont}
			class="bg-white/50 border-none rounded-xl px-3 py-2 text-xs font-bold text-[var(--text-main)] outline-none"
		>
			{#each fontOptions as font}
				<option value={font} style="font-family: '{font}', sans-serif;">{font}</option>
			{/each}
		</select>
		<div class="flex flex-col gap-1">
			<span class="text-[7px] font-bold uppercase opacity-40 ml-1">Size</span>
			<input
				type="number"
				bind:value={$labelSize}
				class="bg-black/5 border-none rounded-lg px-2 py-1.5 text-[10px] font-mono font-bold text-[var(--text-main)] outline-none"
			/>
		</div>
	</div>
</div>
