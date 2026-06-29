import { writable, derived } from 'svelte/store';
import { hexToHsl, hslToHex, getContrastRatio, mixColors } from './colorUtils.js';

// --- Estado Global ---
export const sourceColor = writable('#AC6605');
export const harmonyType = writable('tonal');
export const isDarkMode = writable(false);
export const radius = writable(32); // en px

export const headlineFont = writable('Domine');
export const bodyFont = writable('Manrope');
export const labelFont = writable('Manrope');

// --- Advanced Typography Controls ---
export const titleWeight = writable('800');
export const letterSpacing = writable(0); // Cambiado a número para el input range
export const uppercaseTitles = writable(false);
export const headlineLineHeight = writable('1.1'); // Nuevo control para interlineado

// --- Font Size Controls ---
export const headlineSize = writable('48'); // in px
export const bodySize = writable('16'); // in px
export const labelSize = writable('12'); // in px

// --- Paleta de Colores Derivada ---
export const palette = derived(
	[sourceColor, harmonyType, isDarkMode],
	([$sourceColor, $harmonyType, $isDarkMode]) => {
		const hsl = hexToHsl($sourceColor);
		const newPalette = {
			primary: $sourceColor,
			secondary: '',
			tertiary: '',
			neutral: '',
			containerBg: '',
			cardBg: '',
			textMain: '', // Initialize with default empty string
			textMuted: '' // Initialize with default empty string
		};

		if ($isDarkMode) {
			newPalette.containerBg = hslToHex(hsl.h, Math.min(20, hsl.s), 10);
			newPalette.cardBg = hslToHex(hsl.h, Math.min(10, hsl.s), 15);
			newPalette.textMain = '#ffffff';
			newPalette.textMuted = '#a1a1aa';
		} else {
			newPalette.containerBg = hslToHex(hsl.h, Math.min(30, hsl.s), 90);
			newPalette.cardBg = hslToHex(hsl.h, Math.min(15, hsl.s), 97);
			newPalette.textMain = '#18181b';
			newPalette.textMuted = '#71717a';
		}

		switch ($harmonyType) {
			case 'tonal':
				newPalette.secondary = hslToHex(hsl.h, Math.max(10, hsl.s * 0.4), hsl.l);
				newPalette.tertiary = hslToHex((hsl.h + 60) % 360, Math.max(20, hsl.s * 0.6), hsl.l);
				newPalette.neutral = hslToHex(hsl.h, 8, 45);
				break;
			case 'analogous':
				newPalette.secondary = hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l);
				newPalette.tertiary = hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l);
				newPalette.neutral = hslToHex(hsl.h, 5, 50);
				break;
			case 'triadic':
				newPalette.secondary = hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l);
				newPalette.tertiary = hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l);
				newPalette.neutral = hslToHex(hsl.h, 5, 50);
				break;
			case 'complementary':
				newPalette.secondary = hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l);
				newPalette.tertiary = hslToHex((hsl.h + 180) % 360, hsl.s * 0.5, hsl.l + 10);
				newPalette.neutral = hslToHex(hsl.h, 5, 50);
				break;
		}

		// Generate tonal shades for primary, secondary, tertiary, neutral
		const colorKeys = ['primary', 'secondary', 'tertiary', 'neutral'];

		colorKeys.forEach((key) => {
			const baseColor = newPalette[key];
			if (baseColor) {
				// Replicate color-mix logic from index.css
				// color-mix(in srgb, var(--base), black X%) means X% black, (100-X)% base
				// color-mix(in srgb, var(--base), white X%) means X% white, (100-X)% base
				newPalette[`${key}0`] = mixColors(baseColor, '#000000', 100); // Pure black
				newPalette[`${key}10`] = mixColors(baseColor, '#000000', 80); // 80% black, 20% base
				newPalette[`${key}20`] = mixColors(baseColor, '#000000', 60); // 60% black, 40% base
				newPalette[`${key}30`] = mixColors(baseColor, '#000000', 40); // 40% black, 60% base
				newPalette[`${key}40`] = mixColors(baseColor, '#000000', 20); // 20% black, 80% base
				newPalette[`${key}50`] = baseColor; // The base color itself
				newPalette[`${key}60`] = mixColors(baseColor, '#FFFFFF', 20); // 20% white, 80% base
				newPalette[`${key}70`] = mixColors(baseColor, '#FFFFFF', 40); // 40% white, 60% base
				newPalette[`${key}80`] = mixColors(baseColor, '#FFFFFF', 60); // 60% white, 40% base
				newPalette[`${key}90`] = mixColors(baseColor, '#FFFFFF', 80); // 80% white, 20% base
				newPalette[`${key}95`] = mixColors(baseColor, '#FFFFFF', 90); // 90% white, 10% base
				newPalette[`${key}100`] = mixColors(baseColor, '#FFFFFF', 100); // Pure white
			}
		});

		return newPalette;
	}
);

// --- Ratio de Contraste Derivado ---
export const contrastInfo = derived(palette, ($palette) => {
	const contrast = getContrastRatio($palette.primary, $palette.cardBg);
	let badgeText, badgeClass, barClass;

	if (contrast >= 4.5) {
		badgeText = 'Pass AAA';
		badgeClass = 'bg-success/20 text-success';
		barClass = 'bg-success';
	} else if (contrast >= 3) {
		badgeText = 'Pass AA';
		badgeClass = 'bg-warning/20 text-warning';
		barClass = 'bg-warning';
	} else {
		badgeText = 'Fail';
		badgeClass = 'bg-error/20 text-error';
		barClass = 'bg-error';
	}

	return {
		ratio: contrast.toFixed(1),
		badgeText,
		badgeClass,
		barClass,
		percentage: Math.min(100, (contrast / 7) * 100)
	};
});
