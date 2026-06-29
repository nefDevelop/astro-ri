<script>
	import { onMount } from 'svelte';
	import {
		sourceColor,
		harmonyType,
		isDarkMode,
		radius,
		headlineFont,
		bodyFont,
		labelFont,
		titleWeight,
		letterSpacing,
		uppercaseTitles,
		headlineLineHeight, // Importar el nuevo store
		headlineSize,
		bodySize,
		labelSize,
		palette,
		contrastInfo
	} from './stores.js';
	import { theme } from '$lib/themeStore.js';
	import { loadGoogleFont } from './fontUtils.js';
	import { rgbToHex, getContrastInfo } from './colorUtils.js';

	// Importar componentes
	import ColorPicker from './ColorPicker.svelte';
	import ColorPaletteDisplay from './ColorPaletteDisplay.svelte';
	import TypographySettings from './TypographySettings.svelte';
	import RadiusSlider from './RadiusSlider.svelte';
	import DarkModeToggle from './DarkModeToggle.svelte';
	import ExportPanel from './ExportPanel.svelte';
	import Toast from './Toast.svelte';
	import DocumentationPreview from './DocumentationPreview.svelte';

	let lucide = $state(null); // Usar $state para que los efectos puedan reaccionar a su carga

	onMount(async () => {
		// Cargar Lucide solo una vez si no está ya disponible
		if (typeof window !== 'undefined' && !window.lucide) {
			// Usar un import dinámico para cargar la librería
			await import('https://unpkg.com/lucide@latest');
		}
		// Asignar window.lucide a la variable reactiva
		lucide = window.lucide;
	});

	$effect(() => {
		if (lucide) {
			lucide.createIcons();
		}
	});

	$effect(() => {
		const currentTheme = $theme.colorTheme;
		if (typeof window !== 'undefined') {
			setTimeout(() => {
				const rootStyle = getComputedStyle(document.documentElement);
				const themePrimary = rootStyle.getPropertyValue('--primary').trim();
				if (themePrimary) {
					const hexColor = rgbToHex(themePrimary);
					if (hexColor && hexColor.length === 7) $sourceColor = hexColor;
				}
			}, 10);
		}
	});

	$effect(() => {
		const root = document.documentElement;
		if (root) {
			root.style.setProperty('--primary', $palette.primary || '#AC6605');
			root.style.setProperty('--secondary', $palette.secondary || '#687797');
			root.style.setProperty('--tertiary', $palette.tertiary || '#4078C1');
			root.style.setProperty('--neutral', $palette.neutral || '#8C7353');
			root.style.setProperty('--bento-bg', $palette.containerBg || '#F5E6D3');
			root.style.setProperty('--card-bg', $palette.cardBg || '#FFFFFF');
			root.style.setProperty('--text-main', $palette.textMain || '#18181B');
			root.style.setProperty('--text-muted', $palette.textMuted || '#71717A');
			root.style.setProperty('--radius', `${$radius}px`);

			loadGoogleFont($headlineFont, $titleWeight); // Cargar el peso específico para la fuente de titulares
			loadGoogleFont($bodyFont, '400,700'); // Cargar pesos comunes para la fuente de cuerpo
			loadGoogleFont($labelFont, '400,700'); // Cargar pesos comunes para la fuente de etiquetas
			root.style.setProperty('--font-headline', `'${$headlineFont}', serif`);
			root.style.setProperty('--font-body', `'${$bodyFont}', sans-serif`);
			root.style.setProperty('--font-label', `'${$labelFont}', sans-serif`);

			root.style.setProperty('--font-size-headline', `${$headlineSize}px`);
			root.style.setProperty('--font-size-body', `${$bodySize}px`);
			root.style.setProperty('--font-size-label', `${$labelSize}px`);

			root.style.setProperty('--font-weight-headline', $titleWeight);
			root.style.setProperty('--letter-spacing', `${$letterSpacing}px`);
			root.style.setProperty('--text-transform-headline', $uppercaseTitles ? 'uppercase' : 'none');
			root.style.setProperty('--line-height-headline', $headlineLineHeight); // Aplicar interlineado
		}
	});

	import './index.css';

	let toastMessage = $state('');

	function copyToClipboard(text) {
		const hex = rgbToHex(text);
		if (!hex) return;
		navigator.clipboard.writeText(hex).then(() => {
			toastMessage = `Copiado: ${hex}`;
		});
	}
</script>

{#snippet interactiveElements()}
	{@const buttonBgColor = $palette.primary}
	{@const buttonTextColor = '#FFFFFF'}
	{@const contrastButton = getContrastInfo(buttonBgColor, buttonTextColor)}

	{@const secondaryButtonBgColor = $palette.secondary}
	{@const secondaryButtonTextColor = '#FFFFFF'}
	{@const contrastSecondaryButton = getContrastInfo(
		secondaryButtonBgColor,
		secondaryButtonTextColor
	)}

	{@const outlineButtonBgColor = $palette.cardBg}
	{@const outlineButtonTextColor = $palette.primary}
	{@const contrastOutlineButton = getContrastInfo(outlineButtonBgColor, outlineButtonTextColor)}

	{@const inputBgColor = $palette.cardBg}
	{@const inputTextMainColor = $palette.textMain}
	{@const inputTextMutedColor = $palette.textMuted}
	{@const contrastInputText = getContrastInfo(inputBgColor, inputTextMainColor)}
	{@const contrastInputPlaceholder = getContrastInfo(inputBgColor, inputTextMutedColor)}

	{@const linkBgColor = $palette.cardBg}
	{@const linkTextColor = $palette.primary}
	{@const contrastLink = getContrastInfo(linkBgColor, linkTextColor)}

	{@const contrastTagTertiary = getContrastInfo($palette.tertiary90, $palette.tertiary10)}
	{@const contrastTagNeutral = getContrastInfo($palette.neutral90, $palette.neutral10)}

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		<!-- Primary Button Example -->
		<div
			class="bg-[var(--card-bg)] p-6 rounded-[calc(var(--radius)*0.75)] flex flex-col gap-4 border border-white/10 shadow-sm"
		>
			<span class="design-label">Primary Button</span>
			<button
				class="w-full py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all
                   bg-[var(--primary)] text-white hover:opacity-90 active:scale-95"
				style="border-radius: var(--radius);"
			>
				Action Button
			</button>
			<button
				class="w-full py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all
                   bg-[var(--primary)] text-white opacity-50 cursor-not-allowed"
				style="border-radius: var(--radius);"
				disabled
			>
				Disabled Button
			</button>
			<div class="flex items-center gap-2">
				<span class="text-xs font-bold text-[var(--text-main)]"
					>Contrast (Primary vs White): {contrastButton.ratio}:1</span
				>
				<span
					class="px-2 py-0.5 rounded-full text-[8px] font-bold uppercase {contrastButton.badgeClass}"
				>
					{contrastButton.badgeText}
				</span>
			</div>
		</div>

		<!-- Secondary Button Example -->
		<div
			class="bg-[var(--card-bg)] p-6 rounded-[calc(var(--radius)*0.75)] flex flex-col gap-4 border border-white/10 shadow-sm"
		>
			<span class="design-label">Secondary Button</span>
			<button
				class="w-full py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all
                   bg-[var(--secondary)] text-white hover:opacity-90 active:scale-95"
				style="border-radius: var(--radius);"
			>
				Secondary Action
			</button>
			<div class="flex items-center gap-2">
				<span class="text-xs font-bold text-[var(--text-main)]"
					>Contrast (Secondary vs White): {contrastSecondaryButton.ratio}:1</span
				>
				<span
					class="px-2 py-0.5 rounded-full text-[8px] font-bold uppercase {contrastSecondaryButton.badgeClass}"
				>
					{contrastSecondaryButton.badgeText}
				</span>
			</div>
		</div>

		<!-- Outline Button Example -->
		<div
			class="bg-[var(--card-bg)] p-6 rounded-[calc(var(--radius)*0.75)] flex flex-col gap-4 border border-white/10 shadow-sm"
		>
			<span class="design-label">Outline Button</span>
			<button
				class="w-full py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all
                   bg-transparent border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary-95)] active:scale-95"
				style="border-radius: var(--radius);"
			>
				Learn More
			</button>
			<div class="flex items-center gap-2">
				<span class="text-xs font-bold text-[var(--text-main)]"
					>Contrast (CardBg vs Primary): {contrastOutlineButton.ratio}:1</span
				>
				<span
					class="px-2 py-0.5 rounded-full text-[8px] font-bold uppercase {contrastOutlineButton.badgeClass}"
				>
					{contrastOutlineButton.badgeText}
				</span>
			</div>
		</div>

		<!-- Input Field Example -->
		<div
			class="bg-[var(--card-bg)] p-6 rounded-[calc(var(--radius)*0.75)] flex flex-col gap-4 border border-white/10 shadow-sm"
		>
			<span class="design-label">Input Field</span>
			<input
				type="text"
				placeholder="Your Name"
				class="w-full p-3 rounded-lg text-sm bg-black/5 text-[var(--text-main)] placeholder-[var(--text-muted)] border border-black/10 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
				style="border-radius: var(--radius);"
			/>
			<input
				type="text"
				placeholder="Error message"
				class="w-full p-3 rounded-lg text-sm bg-red-100 text-red-700 placeholder-red-400 border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all"
				style="border-radius: var(--radius);"
			/>
			<div class="flex flex-col gap-1">
				<div class="flex items-center gap-2">
					<span class="text-xs font-bold text-[var(--text-main)]"
						>Text vs Bg: {contrastInputText.ratio}:1</span
					>
					<span
						class="px-2 py-0.5 rounded-full text-[8px] font-bold uppercase {contrastInputText.badgeClass}"
					>
						{contrastInputText.badgeText}
					</span>
				</div>
				<div class="flex items-center gap-2">
					<span class="text-xs font-bold text-[var(--text-main)]"
						>Placeholder vs Bg: {contrastInputPlaceholder.ratio}:1</span
					>
					<span
						class="px-2 py-0.5 rounded-full text-[8px] font-bold uppercase {contrastInputPlaceholder.badgeClass}"
					>
						{contrastInputPlaceholder.badgeText}
					</span>
				</div>
			</div>
		</div>
		<!-- Link Example -->
		<div
			class="bg-[var(--card-bg)] p-6 rounded-[calc(var(--radius)*0.75)] flex flex-col gap-4 border border-white/10 shadow-sm"
		>
			<span class="design-label">Link</span>
			<button
				class="text-[var(--primary)] text-sm font-medium hover:underline transition-colors text-left"
				>Visit our documentation</button
			>
			<div class="flex items-center gap-2">
				<span class="text-xs font-bold text-[var(--text-main)]"
					>Contrast (CardBg vs Primary): {contrastLink.ratio}:1</span
				>
				<span
					class="px-2 py-0.5 rounded-full text-[8px] font-bold uppercase {contrastLink.badgeClass}"
				>
					{contrastLink.badgeText}
				</span>
			</div>
		</div>

		<!-- Tag/Badge Example -->
		<div
			class="bg-[var(--card-bg)] p-6 rounded-[calc(var(--radius)*0.75)] flex flex-col gap-4 border border-white/10 shadow-sm"
		>
			<span class="design-label">Tag / Badge</span>
			<div class="flex gap-2">
				<span
					class="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-[var(--tertiary-90)] text-[var(--tertiary-10)]"
					style="border-radius: calc(var(--radius) / 2);">New Feature</span
				>
				<span
					class="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-[var(--neutral-90)] text-[var(--neutral-10)]"
					style="border-radius: calc(var(--radius) / 2);">Beta</span
				>
			</div>
			<div class="flex flex-col gap-1">
				<div class="flex items-center gap-2">
					<span class="text-xs font-bold text-[var(--text-main)]"
						>Tertiary Tag: {contrastTagTertiary.ratio}:1</span
					>
					<span
						class="px-2 py-0.5 rounded-full text-[8px] font-bold uppercase {contrastTagTertiary.badgeClass}"
					>
						{contrastTagTertiary.badgeText}
					</span>
				</div>
				<div class="flex items-center gap-2">
					<span class="text-xs font-bold text-[var(--text-main)]"
						>Neutral Tag: {contrastTagNeutral.ratio}:1</span
					>
					<span
						class="px-2 py-0.5 rounded-full text-[8px] font-bold uppercase {contrastTagNeutral.badgeClass}"
					>
						{contrastTagNeutral.badgeText}
					</span>
				</div>
			</div>
		</div>
	</div>
{/snippet}

<div
	class="flex flex-col bg-[#121212] text-[#e0e0e0] overflow-hidden font-sans min-h-[800px] rounded-3xl shadow-2xl border border-white/5"
>
	<!-- CONTENEDOR CENTRAL: CONFIGURACIÓN + EJEMPLOS -->
	<div class="flex-1 flex overflow-hidden p-6">
		<!-- ZONA LATERAL: CONFIGURACIÓN -->
		<aside
			class="w-80 border-r border-white/5 flex flex-col gap-4 p-5 overflow-y-auto bg-[#121212] scrollbar-thin shrink-0"
		>
			<div class="flex flex-col gap-6">
				<div class="space-y-4">
					<h3 class="design-label px-1">Laboratorio de Color</h3>
					<ColorPicker />
					<ColorPaletteDisplay oncopy={copyToClipboard} />
				</div>

				<div class="space-y-4 pt-2">
					<h3 class="design-label px-1">Tipografía y Estilo</h3>
					<TypographySettings />
				</div>

				<div class="space-y-4 pt-2">
					<h3 class="design-label px-1">Geometría y Modo</h3>
					<RadiusSlider />
					<DarkModeToggle />
				</div>

				<div class="pt-4 pb-8">
					<ExportPanel />
				</div>
			</div>
		</aside>

		<!-- ZONA PRINCIPAL: EJEMPLOS -->
		<main
			class="flex-1 bg-[var(--bento-bg)] overflow-y-auto p-12 transition-colors duration-500 relative scrollbar-thin"
			style="border-radius: var(--radius);"
		>
			<div class="max-w-[1200px] mx-auto flex flex-col gap-12">
				<!-- SECTION 1: FONTS SHOWCASE -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div
						class="bg-[var(--card-bg)] p-8 rounded-[calc(var(--radius)*0.75)] flex flex-col gap-4 border border-white/10 shadow-sm"
					>
						<span class="design-label" style="color: var(--primary);">Headline Showcase</span>
						<div class="flex flex-col gap-2">
							<h1
								class="font-serif text-[var(--text-main)] leading-tight"
								style="font-size: var(--font-size-headline); font-weight: var(--font-weight-headline); letter-spacing: var(--letter-spacing); text-transform: var(--text-transform-headline);"
							>
								The quick brown fox
							</h1>
							<p class="text-xs text-[var(--text-muted)] font-mono">
								Size: {$headlineSize}px | Family: {$headlineFont}
							</p>
						</div>
					</div>
					<div
						class="bg-[var(--card-bg)] p-8 rounded-[calc(var(--radius)*0.75)] flex flex-col gap-4 border border-white/10 shadow-sm"
					>
						<span class="design-label" style="color: var(--secondary);">Body Showcase</span>
						<div class="flex flex-col gap-2">
							<p
								class="font-sans text-[var(--text-main)] leading-relaxed"
								style="font-size: var(--font-size-body);"
							>
								Jumps over the lazy dog. Designers use this sentence to preview typography in
								various sizes and styles.
							</p>
							<p class="text-xs text-[var(--text-muted)] font-mono">
								Size: {$bodySize}px | Family: {$bodyFont}
							</p>
						</div>
					</div>
					<div
						class="bg-[var(--card-bg)] p-8 rounded-[calc(var(--radius)*0.75)] flex flex-col gap-4 border border-white/10 shadow-sm"
					>
						<span class="design-label" style="color: var(--tertiary);">Label Showcase</span>
						<div class="flex flex-wrap gap-2">
							<span
								class="font-label bg-[var(--tertiary-95)] text-[var(--tertiary)] px-3 py-1 rounded-full border border-[var(--tertiary-90)]"
								style="font-size: var(--font-size-label);">UI Component</span
							>
							<span
								class="font-label bg-[var(--neutral-90)] text-[var(--neutral-10)] px-3 py-1 rounded-full"
								style="font-size: var(--font-size-label);">Active</span
							>
						</div>
						<p class="text-xs text-[var(--text-muted)] font-mono mt-auto">
							Size: {$labelSize}px | Family: {$labelFont}
						</p>
					</div>
				</div>

				<!-- SECTION 2: DASHBOARD PREVIEW (MORE EXAMPLES) -->
				<div class="grid grid-cols-1 md:grid-cols-12 gap-5">
					<!-- Columna Izquierda: Pricing & Settings -->
					<div class="md:col-span-4 flex flex-col gap-5">
						<!-- Pricing (Keep old example) -->
						<div
							class="bg-[var(--card-bg)] p-8 rounded-[calc(var(--radius)*0.75)] flex flex-col gap-6 shadow-sm border-2 border-[var(--primary)] min-h-[350px]"
						>
							<div class="flex justify-between items-center text-[var(--primary)]">
								<span class="design-label">Pro Plan</span><span
									class="font-bold text-[8px] uppercase">Popular</span
								>
							</div>
							<div class="flex items-baseline gap-1">
								<span
									class="font-serif text-[var(--text-main)]"
									style="font-size: calc(var(--font-size-headline) * 0.7); font-weight: var(--font-weight-headline); letter-spacing: var(--letter-spacing); text-transform: var(--text-transform-headline);"
									>$29</span
								><span class="text-xs text-[var(--text-muted)]">/mo</span>
							</div>
							<ul class="space-y-3 mt-4 flex-1">
								<li class="flex items-center gap-2 text-xs font-bold text-[var(--text-main)]">
									<i data-lucide="check" class="w-4 h-4 text-[var(--primary)]"></i> AI Styling
								</li>
								<li class="flex items-center gap-2 text-xs font-bold text-[var(--text-main)]">
									<i data-lucide="check" class="w-4 h-4 text-[var(--primary)]"></i> 5MB Export
								</li>
							</ul>
							<button
								class="w-full py-4 bg-[var(--primary)] text-white rounded-2xl font-bold uppercase tracking-wider shadow-lg"
								>Upgrade</button
							>
						</div>

						<!-- Dashboard Settings (New Example) -->
						<div
							class="bg-[var(--card-bg)] p-6 rounded-[calc(var(--radius)*0.75)] flex flex-col gap-4 border border-black/5 shadow-sm"
						>
							<span class="design-label">Account Settings</span>
							<div class="flex flex-col gap-3">
								<div class="flex items-center justify-between p-3 bg-black/5 rounded-xl">
									<div class="flex items-center gap-3">
										<div
											class="w-8 h-8 rounded-full bg-[var(--secondary)] flex items-center justify-center text-white"
										>
											<i data-lucide="user" class="w-4 h-4"></i>
										</div>
										<span class="text-xs font-bold text-[var(--text-main)]">Profile Visibility</span
										>
									</div>
									<div class="w-10 h-5 bg-[var(--primary)] rounded-full flex items-center px-1">
										<div
											class="w-3 h-3 bg-white rounded-full translate-x-5 transition-transform"
										></div>
									</div>
								</div>
								<div class="flex items-center justify-between p-3 bg-black/5 rounded-xl">
									<div class="flex items-center gap-3">
										<div
											class="w-8 h-8 rounded-full bg-[var(--neutral)] flex items-center justify-center text-white"
										>
											<i data-lucide="bell" class="w-4 h-4"></i>
										</div>
										<span class="text-xs font-bold text-[var(--text-main)]">Notifications</span>
									</div>
									<div class="w-10 h-5 bg-black/10 rounded-full flex items-center px-1">
										<div class="w-3 h-3 bg-white rounded-full"></div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Columna Central/Derecha: Article, Stats, Chat -->
					<div class="md:col-span-8 flex flex-col gap-5">
						<!-- Main Article (Keep old example) -->
						<div
							class="bg-[var(--card-bg)] p-10 rounded-[calc(var(--radius)*0.75)] flex flex-col gap-6 shadow-sm border border-white/5 relative overflow-hidden group"
						>
							<span
								class="design-label"
								style="background-color: var(--primary-90); color: var(--primary-10); width: fit-content; padding: 4px 12px; border-radius: 99px;"
								>Strategy</span
							>
							<h3
								class="font-serif text-[var(--text-main)] relative z-10"
								style="font-size: var(--font-size-headline); font-weight: var(--font-weight-headline); letter-spacing: var(--letter-spacing); text-transform: var(--text-transform-headline); line-height: var(--line-height-headline);"
							>
								Dynamic Harmony Design
							</h3>
							<p
								class="font-sans text-[var(--text-muted)] leading-relaxed max-w-2xl relative z-10"
								style="font-size: var(--font-size-body);"
							>
								Building modular interfaces with generative color science and modern typography
								rules.
							</p>
							<div class="mt-4 flex items-center gap-4 relative z-10">
								<div
									class="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] border-2 border-white shadow-xl"
								></div>
								<div class="flex flex-col">
									<span class="font-bold text-sm text-[var(--text-main)]">Studio Nefutari</span
									><span class="text-[10px] text-[var(--text-muted)]">Design Lead</span>
								</div>
								<button
									class="ml-auto p-4 bg-[var(--primary)] text-white rounded-full"
									aria-label="Siguiente"><i data-lucide="arrow-right" class="w-5 h-5"></i></button
								>
							</div>
						</div>

						<!-- Bottom Grid: Stats & Chat -->
						<div class="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
							<!-- Stats Card (Improved) -->
							<div
								class="bg-[#18181B] p-8 rounded-[calc(var(--radius)*0.75)] flex flex-col gap-6 text-white shadow-2xl"
							>
								<div class="flex justify-between items-center">
									<span
										class="design-label text-white/50 tracking-[0.2em] font-serif"
										style="text-transform: var(--text-transform-headline);">Performance</span
									><i data-lucide="trending-up" class="w-4 h-4 text-green-400"></i>
								</div>
								<div class="flex flex-col gap-1">
									<span
										class="text-4xl font-serif"
										style="font-weight: var(--font-weight-headline); letter-spacing: var(--letter-spacing);"
										>98.4%</span
									><span class="text-[10px] font-bold text-green-400 uppercase"
										>+12% vs last month</span
									>
								</div>
								<div class="flex items-end gap-2 h-16 mt-2">
									<div
										class="flex-1 bg-[var(--primary)] rounded-t-sm opacity-40"
										style="height: 40%"
									></div>
									<div
										class="flex-1 bg-[var(--primary)] rounded-t-sm opacity-60"
										style="height: 70%"
									></div>
									<div
										class="flex-1 bg-[var(--primary)] rounded-t-sm opacity-80"
										style="height: 50%"
									></div>
									<div class="flex-1 bg-[var(--primary)] rounded-t-sm" style="height: 90%"></div>
								</div>
							</div>

							<!-- Messages/Chat Overlay (New Example) -->
							<div
								class="bg-[var(--card-bg)] p-6 rounded-[calc(var(--radius)*0.75)] flex flex-col gap-4 border border-black/5 shadow-sm relative overflow-hidden h-full min-h-[250px]"
							>
								<div class="flex items-center justify-between border-b border-black/5 pb-3">
									<span class="design-label">Team Chat</span>
									<div class="flex -space-x-3">
										<div
											class="w-6 h-6 rounded-full bg-[var(--primary)] border-2 border-white"
										></div>
										<div
											class="w-6 h-6 rounded-full bg-[var(--secondary)] border-2 border-white"
										></div>
										<div
											class="w-6 h-6 rounded-full bg-[var(--tertiary)] border-2 border-white"
										></div>
									</div>
								</div>
								<div class="flex flex-col gap-3 flex-1">
									<div class="bg-[var(--primary-95)] p-3 rounded-2xl self-start max-w-[80%]">
										<p class="text-[10px] font-medium text-[var(--primary-10)]">
											¿Has visto la nueva paleta?
										</p>
									</div>
									<div class="bg-black/5 p-3 rounded-2xl self-end max-w-[80%]">
										<p class="text-[10px] font-medium text-[var(--text-main)]">
											¡Se ve increíble! El contraste es perfecto.
										</p>
									</div>
								</div>
								<div class="mt-auto flex gap-2">
									<input
										type="text"
										placeholder="Type..."
										class="flex-1 bg-black/5 rounded-xl px-4 py-2 text-[10px] outline-none"
									/>
									<button
										class="p-2 bg-[var(--primary)] text-white rounded-xl"
										aria-label="Enviar mensaje"><i data-lucide="send" class="w-4 h-4"></i></button
									>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- SECTION 3: DATA LIST (New Example) -->
				<div
					class="bg-[var(--card-bg)] p-8 rounded-[calc(var(--radius)*0.75)] flex flex-col gap-6 shadow-sm border border-white/5"
				>
					<div class="flex justify-between items-center border-b border-black/5 pb-4">
						<h3
							class="text-xl font-serif text-[var(--text-main)] uppercase tracking-wider"
							style="font-weight: var(--font-weight-headline); letter-spacing: var(--letter-spacing); text-transform: var(--text-transform-headline); line-height: var(--line-height-headline);"
						>
							Recent Activities
						</h3>
						<button class="design-label hover:text-[var(--primary)] transition-colors"
							>View All Archive</button
						>
					</div>
					<div class="space-y-4">
						{#each [1, 2, 3] as i}
							<div
								class="flex items-center justify-between p-4 bg-black/5 rounded-2xl hover:bg-black/10 transition-colors cursor-pointer group"
							>
								<div class="flex items-center gap-4">
									<div
										class="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[var(--primary)]"
									>
										<i data-lucide="file-code" class="w-5 h-5"></i>
									</div>
									<div class="flex flex-col">
										<span class="text-xs font-bold text-[var(--text-main)]"
											>DesignTokens_v{i}.json</span
										>
										<span class="text-[10px] text-[var(--text-muted)]"
											>Last synced 2 minutes ago</span
										>
									</div>
								</div>
								<div class="flex items-center gap-6">
									<div class="flex gap-2">
										<span
											class="px-2 py-1 bg-success/20 text-success text-[8px] font-bold rounded uppercase"
											>Synced</span
										>
										<span
											class="px-2 py-1 bg-info/20 text-info text-[8px] font-bold rounded uppercase"
											>Vault</span
										>
									</div>
									<button
										class="p-2 opacity-0 group-hover:opacity-100 transition-opacity"
										aria-label="Más opciones"
										><i data-lucide="more-horizontal" class="w-4 h-4"></i></button
									>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- NEW SECTION: INTERACTIVE UI ELEMENTS -->
				<div class="flex flex-col gap-6">
					<h3
						class="text-xl font-serif text-[var(--text-main)] uppercase tracking-wider"
						style="font-weight: var(--font-weight-headline); letter-spacing: var(--letter-spacing); text-transform: var(--text-transform-headline);"
					>
						Interactive UI Elements
					</h3>
					{@render interactiveElements()}
				</div>

				<!-- NEW SECTION: COLOR CONTRAST OVERVIEW -->
				<div class="flex flex-col gap-6">
					<h3
						class="text-xl font-serif text-[var(--text-main)] uppercase tracking-wider"
						style="font-weight: var(--font-weight-headline); letter-spacing: var(--letter-spacing); text-transform: var(--text-transform-headline); line-height: var(--line-height-headline);"
					>
						Color Contrast Overview
					</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{#each ['primary', 'secondary', 'tertiary', 'neutral'] as key}
							{@const colorHex = $palette[key]}
							{@const cardBgHex = $palette.cardBg}
							{@const textMainHex = $palette.textMain}
							{@const contrastWithCardBg = getContrastInfo(colorHex, cardBgHex)}
							{@const contrastWithTextMain = getContrastInfo(colorHex, textMainHex)}

							<div
								class="bg-[var(--card-bg)] p-6 rounded-[calc(var(--radius)*0.75)] flex flex-col gap-4 border border-white/10 shadow-sm"
							>
								<div class="w-full h-20 rounded-lg" style="background-color: var(--{key});"></div>
								<div class="flex flex-col">
									<span class="design-label capitalize">{key}</span>
									<span class="text-sm font-mono text-[var(--text-main)]"
										>{$palette[key].toUpperCase()}</span
									>
								</div>

								<div class="flex flex-col gap-2">
									<span class="text-[9px] font-bold uppercase text-[var(--text-muted)]"
										>Contraste con Fondo</span
									>
									<div class="flex items-center gap-2">
										<span class="text-xs font-bold text-[var(--text-main)]"
											>{contrastWithCardBg.ratio}:1</span
										>
										<span
											class="px-2 py-0.5 rounded-full text-[8px] font-bold uppercase {contrastWithCardBg.badgeClass}"
										>
											{contrastWithCardBg.badgeText}
										</span>
									</div>
								</div>

								<div class="flex flex-col gap-2">
									<span class="text-[9px] font-bold uppercase text-[var(--text-muted)]"
										>Contraste con Texto Principal</span
									>
									<div class="flex items-center gap-2">
										<span class="text-xs font-bold text-[var(--text-main)]"
											>{contrastWithTextMain.ratio}:1</span
										>
										<span
											class="px-2 py-0.5 rounded-full text-[8px] font-bold uppercase {contrastWithTextMain.badgeClass}"
										>
											{contrastWithTextMain.badgeText}
										</span>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
				<!-- NEW SECTION: TEXT ON COLOR CONTRAST EXAMPLES -->
				<div class="flex flex-col gap-6">
					<h3
						class="text-xl font-serif text-[var(--text-main)] uppercase tracking-wider"
						style="font-weight: var(--font-weight-headline); letter-spacing: var(--letter-spacing); text-transform: var(--text-transform-headline);"
					>
						Text on Color Contrast
					</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{#each ['primary', 'secondary', 'tertiary', 'neutral'] as key}
							{@const bgColor = $palette[key]}
							{@const textMainColor = $palette.textMain}
							{@const textMutedColor = $palette.textMuted}

							{@const contrastMain = getContrastInfo(bgColor, textMainColor)}
							{@const contrastMuted = getContrastInfo(bgColor, textMutedColor)}

							<div
								class="p-6 rounded-[calc(var(--radius)*0.75)] flex flex-col gap-4 border border-white/10 shadow-sm"
								style="background-color: {bgColor};"
							>
								<div class="flex flex-col">
									<span class="design-label capitalize" style="color: {textMainColor};"
										>{key} as Background</span
									>
									<span class="text-sm font-mono" style="color: {textMainColor};"
										>{bgColor.toUpperCase()}</span
									>
								</div>

								<div class="flex flex-col gap-2">
									<span class="text-sm font-bold" style="color: {textMainColor};"
										>Main Text Example</span
									>
									<div class="flex items-center gap-2">
										<span class="text-xs font-bold" style="color: {textMainColor};"
											>{contrastMain.ratio}:1</span
										>
										<span
											class="px-2 py-0.5 rounded-full text-[8px] font-bold uppercase {contrastMain.badgeClass}"
										>
											{contrastMain.badgeText}
										</span>
									</div>
								</div>

								<div class="flex flex-col gap-2">
									<span class="text-sm font-bold" style="color: {textMutedColor};"
										>Muted Text Example</span
									>
									<div class="flex items-center gap-2">
										<span class="text-xs font-bold" style="color: {textMutedColor};"
											>{contrastMuted.ratio}:1</span
										>
										<span
											class="px-2 py-0.5 rounded-full text-[8px] font-bold uppercase {contrastMuted.badgeClass}"
										>
											{contrastMuted.badgeText}
										</span>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</main>
	</div>

	<!-- ZONA OCULTA PARA EXPORTACIÓN DE DOCUMENTACIÓN -->
	<div class="fixed top-[1000%] left-[1000%] pointer-events-none">
		<DocumentationPreview />
	</div>

	{#if toastMessage}
		<Toast message={toastMessage} />
	{/if}
</div>

<style global>
	:root {
		scrollbar-width: thin;
		scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
	}

	.scrollbar-thin::-webkit-scrollbar {
		width: 6px;
	}
	.scrollbar-thin::-webkit-scrollbar-track {
		background: transparent;
	}
	.scrollbar-thin::-webkit-scrollbar-thumb {
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 20px;
	}

	/* body selector removed as it is unused in this context */

	.font-serif {
		font-family: var(--font-headline);
	}

	.font-sans {
		font-family: var(--font-body);
	}

	.font-label {
		font-family: var(--font-label);
	}

	/* Asegurar que las fuentes de Google se carguen correctamente */
	@layer base {
		h1,
		h3,
		.font-serif {
			font-family: var(--font-headline);
		}
		p,
		span,
		.font-sans {
			font-family: var(--font-body);
		}
	}
</style>
>
