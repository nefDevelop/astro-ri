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
		harmonyType,
		isDarkMode
	} from './stores.js';
	import { get } from 'svelte/store';

	let exportStatus = $state('');

	function getDesignTokens() {
		return {
			version: '1.0',
			colors: get(palette),
			typography: {
				headline: {
					family: get(headlineFont),
					size: get(headlineSize),
					weight: get(titleWeight),
					spacing: get(letterSpacing)
				},
				body: { family: get(bodyFont), size: get(bodySize) },
				label: { family: get(labelFont), size: get(labelSize) }
			},
			geometry: { radius: get(radius) },
			settings: { harmony: get(harmonyType), darkMode: get(isDarkMode) }
		};
	}
	function downloadFile(filename, text) {
		const element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', filename);
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}

	function exportJSON() {
		const designTokens = getDesignTokens();
		downloadFile('vault-design-tokens.json', JSON.stringify(designTokens, null, 2));
		showStatus('JSON Exportado');
	}

	async function copyJSONToClipboard() {
		const designTokens = getDesignTokens();
		const jsonString = JSON.stringify(designTokens, null, 2);
		try {
			await navigator.clipboard.writeText(jsonString);
			showStatus('JSON Copiado');
		} catch (err) {
			console.error('Error al copiar JSON al portapapeles:', err);
			showStatus('Error al copiar');
		}
	}

	function exportCSS() {
		const currentPalette = get(palette);
		let cssVariables = `:root {\n`;

		// Colores principales y tonalidades
		const colorKeys = ['primary', 'secondary', 'tertiary', 'neutral'];
		const shadeKeys = ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '95', '100'];

		colorKeys.forEach((key) => {
			shadeKeys.forEach((shade) => {
				const varName = `--${key}-${shade}`;
				const value = currentPalette[`${key}${shade}`];
				if (value) {
					cssVariables += `  ${varName}: ${value};\n`;
				}
			});
			// También los colores principales sin sufijo
			cssVariables += `  --${key}: ${currentPalette[key]};\n`;
		});

		// Colores de UI
		cssVariables += `  --bento-bg: ${currentPalette.containerBg};\n`;
		cssVariables += `  --card-bg: ${currentPalette.cardBg};\n`;
		cssVariables += `  --text-main: ${currentPalette.textMain};\n`;
		cssVariables += `  --text-muted: ${currentPalette.textMuted};\n`;

		// Geometría
		cssVariables += `  --radius: ${get(radius)}px;\n`;

		// Tipografía
		cssVariables += `  --font-headline: "${get(headlineFont)}", serif;\n`;
		cssVariables += `  --font-body: "${get(bodyFont)}", sans-serif;\n`;
		cssVariables += `  --font-label: "${get(labelFont)}", sans-serif;\n`;
		cssVariables += `  --font-size-headline: ${get(headlineSize)}px;\n`;
		cssVariables += `  --font-size-body: ${get(bodySize)}px;\n`;
		cssVariables += `  --font-size-label: ${get(labelSize)}px;\n`;
		cssVariables += `  --font-weight-headline: ${get(titleWeight)};\n`;
		cssVariables += `  --letter-spacing: ${get(letterSpacing)}px;\n`;
		cssVariables += `  --text-transform-headline: ${get(uppercaseTitles) ? 'uppercase' : 'none'};\n`;
		cssVariables += `  --line-height-headline: ${get(headlineLineHeight)};\n`;

		cssVariables += `}\n`;
		downloadFile('vault-styles.css', cssVariables);
		showStatus('CSS Exportado');
	}

	async function exportImage() {
		const canvas = document.querySelector('main');
		if (!canvas || !window.htmlToImage) {
			alert('Error: html-to-image library not loaded or main canvas not found.');
			return;
		}

		showStatus('Generando Imagen...');
		try {
			const dataUrl = await window.htmlToImage.toPng(canvas, {
				backgroundColor: get(palette).containerBg,
				quality: 1,
				pixelRatio: 2
			});
			const link = document.createElement('a');
			link.download = 'vault-design-preview.png';
			link.href = dataUrl;
			link.click();
			showStatus('Imagen Lista');
		} catch (error) {
			console.error('oops, something went wrong!', error);
			showStatus('Error al exportar');
		}
	}

	async function exportDoc() {
		const canvas = document.getElementById('doc-capture-area');
		if (!canvas || !window.htmlToImage) {
			alert('Error: html-to-image library not loaded or doc area not found.');
			return;
		}

		showStatus('Generando Hoja de Estilo...');
		try {
			const dataUrl = await window.htmlToImage.toPng(canvas, {
				backgroundColor: '#FFFFFF',
				quality: 1,
				pixelRatio: 3 // Ultra alta calidad para impresión/presentación
			});
			const link = document.createElement('a');
			link.download = 'vault-style-guide.png';
			link.href = dataUrl;
			link.click();
			showStatus('Hoja de Estilo Lista');
		} catch (error) {
			console.error('oops, something went wrong!', error);
			showStatus('Error al exportar');
		}
	}

	function showStatus(msg) {
		exportStatus = msg;
		setTimeout(() => (exportStatus = ''), 3000);
	}
</script>

<div
	class="bg-[var(--card-bg)] p-5 rounded-[var(--radius-md)] flex flex-col gap-4 transition-colors duration-500 shadow-sm border border-white/5"
>
	<div class="flex items-center gap-2 mb-2">
		<i data-lucide="download" class="w-4 h-4 text-[var(--primary)]"></i>
		<span class="design-label" style="color: var(--text-main);">Exportar Sistema</span>
	</div>

	<div class="grid grid-cols-3 gap-2">
		<button
			onclick={exportJSON}
			class="flex flex-col items-center justify-center gap-2 p-4 bg-black/5 hover:bg-black/10 rounded-2xl transition-all group"
		>
			<i
				data-lucide="file-json"
				class="w-5 h-5 text-yellow-500 group-hover:scale-110 transition-transform"
			></i>
			<span class="text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)]"
				>Descargar JSON</span
			>
		</button>

		<button
			onclick={copyJSONToClipboard}
			class="flex flex-col items-center justify-center gap-2 p-4 bg-black/5 hover:bg-black/10 rounded-2xl transition-all group"
		>
			<i
				data-lucide="copy"
				class="w-5 h-5 text-[var(--tertiary)] group-hover:scale-110 transition-transform"
			></i>
			<span class="text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)]"
				>Copiar JSON</span
			>
		</button>

		<button
			onclick={exportImage}
			class="col-span-3 flex items-center justify-center gap-3 p-4 bg-black/5 hover:bg-white/10 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all text-[var(--text-main)] border border-black/5"
		>
			<i data-lucide="layout-grid" class="w-5 h-5"></i>
			<span class="text-[10px] font-bold uppercase tracking-widest">Capturar Browser</span>
		</button>

		<button
			onclick={exportDoc}
			class="col-span-3 flex items-center justify-center gap-3 p-6 bg-[var(--primary)] text-white rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[var(--primary)]/20"
		>
			<i data-lucide="presentation" class="w-6 h-6"></i>
			<div class="flex flex-col items-start leading-tight">
				<span class="text-[11px] font-black uppercase tracking-widest">Hoja de Estilo</span>
				<span class="text-[8px] opacity-80 uppercase font-bold">Ideal para Presentación</span>
			</div>
		</button>
	</div>

	{#if exportStatus}
		<div class="text-center animate-pulse">
			<span class="text-[10px] font-black text-[var(--primary)] uppercase tracking-widest"
				>{exportStatus}</span
			>
		</div>
	{/if}
</div>
v>
