<script>
	import {
		palette,
		radius,
		headlineFont,
		bodyFont,
		labelFont,
		headlineSize,
		bodySize,
		labelSize,
		titleWeight,
		letterSpacing,
		uppercaseTitles
	} from './stores.js';

	const types = ['primary', 'secondary', 'tertiary', 'neutral'];
</script>

<div
	id="doc-capture-area"
	class="w-[800px] bg-white p-16 flex flex-col gap-12 text-[#18181B] font-sans"
>
	<!-- HEADER -->
	<div class="flex justify-between items-end border-b-2 border-black pb-6">
		<div class="flex flex-col gap-1">
			<h1 class="text-4xl font-black uppercase tracking-tighter">Vault Style Guide</h1>
			<p class="text-sm font-bold opacity-40 uppercase tracking-[0.3em]">Generated System v4.0</p>
		</div>
		<div class="text-right">
			<p class="text-xs font-mono font-bold opacity-40">
				TIMESTAMP: {new Date().toLocaleDateString()}
			</p>
		</div>
	</div>

	<!-- COLOR PALETTE SECTION -->
	<div class="flex flex-col gap-6">
		<h2 class="text-xs font-black uppercase tracking-[0.4em] text-black/30">01. Color Palette</h2>
		<div class="grid grid-cols-4 gap-4">
			{#each types as type}
				<div class="flex flex-col gap-3">
					<div
						class="w-full h-32 rounded-[var(--radius-md)] shadow-lg border border-black/5"
						style="background-color: {$palette[type]};"
					></div>
					<div class="flex flex-col">
						<span class="text-[10px] font-black uppercase tracking-widest">{type}</span>
						<span class="text-xs font-mono opacity-60">{$palette[type].toUpperCase()}</span>
					</div>
					<div class="flex h-4 gap-1">
						<div class="flex-1 rounded" style="background-color: {$palette[type + '10']}"></div>
						<div class="flex-1 rounded" style="background-color: {$palette[type + '50']}"></div>
						<div class="flex-1 rounded" style="background-color: {$palette[type + '90']}"></div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- TYPOGRAPHY SECTION -->
	<div class="flex flex-col gap-8 pt-4">
		<h2 class="text-xs font-black uppercase tracking-[0.4em] text-black/30">02. Typography Core</h2>

		<div class="flex flex-col gap-10">
			<div class="flex flex-col gap-2">
				<span class="text-[8px] font-black uppercase tracking-widest opacity-40"
					>Headline / {$headlineFont}</span
				>
				<h3
					class="text-6xl leading-tight"
					style="font-family: '{$headlineFont}'; font-weight: {$titleWeight}; letter-spacing: {$letterSpacing}px; text-transform: {$uppercaseTitles
						? 'uppercase'
						: 'none'};"
				>
					Design is thinking made visual.
				</h3>
			</div>

			<div class="grid grid-cols-2 gap-12">
				<div class="flex flex-col gap-3">
					<span class="text-[8px] font-black uppercase tracking-widest opacity-40"
						>Body / {$bodyFont}</span
					>
					<p class="text-lg leading-relaxed" style="font-family: '{$bodyFont}';">
						The design system provides a common language for designers and developers, ensuring
						consistency across all touchpoints of the user journey.
					</p>
				</div>
				<div class="flex flex-col gap-3">
					<span class="text-[8px] font-black uppercase tracking-widest opacity-40"
						>UI Labels / {$labelFont}</span
					>
					<div class="flex flex-wrap gap-2">
						{#each ['Confirm', 'Cancel', 'Submit', 'Delete'] as label}
							<span
								class="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider"
								style="font-family: '{$labelFont}'; border-radius: var(--radius-full);"
								>{label}</span
							>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- GEOMETRY SECTION -->
	<div class="flex flex-col gap-6 pt-4">
		<h2 class="text-xs font-black uppercase tracking-[0.4em] text-black/30">
			03. Geometry & Rules
		</h2>
		<div class="flex items-center gap-12">
			<div class="flex flex-col gap-2">
				<span class="text-[8px] font-black uppercase tracking-widest opacity-40">Border Radius</span
				>
				<div class="flex items-center gap-4">
					<div
						class="w-16 h-16 bg-black/5 border-2 border-black border-dashed"
						style="border-radius: {$radius}px;"
					></div>
					<span class="text-2xl font-black font-mono">{$radius}PX</span>
				</div>
			</div>
			<div class="flex flex-col gap-2">
				<span class="text-[8px] font-black uppercase tracking-widest opacity-40">Spacing Unit</span>
				<div class="flex items-center gap-4">
					<div class="w-8 h-8 bg-black"></div>
					<span class="text-2xl font-black font-mono text-black/20">8PX BASE</span>
				</div>
			</div>
		</div>
	</div>

	<!-- FOOTER -->
	<div class="mt-auto pt-12 border-t border-black/5 flex justify-between items-center">
		<div class="flex items-center gap-2">
			<div
				class="w-6 h-6 bg-black rounded flex items-center justify-center text-white text-[10px] font-black"
			>
				V
			</div>
			<span class="text-[10px] font-black uppercase tracking-tighter">Vault Engine v4.0</span>
		</div>
		<span class="text-[10px] font-bold opacity-20 uppercase tracking-[0.2em]"
			>Confidential Style Property</span
		>
	</div>
</div>
