// --- Utilidades de Color ---

export function hexToRgb(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex); // hex should be string
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
			}
		: null;
}

export function getLuminance(hex) {
	const rgb = hexToRgb(hex);
	if (!rgb) return 0;
	const a = [rgb.r, rgb.g, rgb.b].map((v) => {
		v /= 255;
		return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
	});
	return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function getContrastRatio(hex1, hex2) {
	const l1 = getLuminance(hex1) + 0.05;
	const l2 = getLuminance(hex2) + 0.05;
	return Math.max(l1, l2) / Math.min(l1, l2);
}

export function rgbToHex(color) {
	if (typeof color !== 'string') return '';
	if (color.startsWith('#')) return color.toUpperCase();

	// Handle rgb() and rgba()
	const match = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
	if (!match) return color;

	const r = parseInt(match[1]);
	const g = parseInt(match[2]);
	const b = parseInt(match[3]);

	const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
	return hex;
}

// Helper to convert RGB object to hex
function rgbObjectToHex(rgb) {
	const toHex = (c) => {
		// Clamp and round values to ensure they are within 0-255 range
		const hex = Math.round(Math.max(0, Math.min(255, c))).toString(16);
		return hex.length === 1 ? '0' + hex : hex;
	};
	return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`.toUpperCase();
}

export function hexToHsl(hex) {
	let r = parseInt(hex.slice(1, 3), 16) / 255;
	let g = parseInt(hex.slice(3, 5), 16) / 255;
	let b = parseInt(hex.slice(5, 7), 16) / 255;

	let max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	let h = 0, // Initialize h to 0
		s,
		l = (max + min) / 2;

	if (max === min) {
		h = s = 0;
	} else {
		let d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}

	return { h: h * 360, s: s * 100, l: l * 100 };
}

export function getContrastInfo(color1, color2) {
	const contrast = getContrastRatio(color1, color2);
	let badgeText, badgeClass;

	// Following the simplified WCAG interpretation used in stores.js
	if (contrast >= 4.5) {
		badgeText = 'Pass AAA';
		badgeClass = 'bg-success/20 text-success';
	} else if (contrast >= 3) {
		badgeText = 'Pass AA';
		badgeClass = 'bg-warning/20 text-warning';
	} else {
		badgeText = 'Fail';
		badgeClass = 'bg-error/20 text-error';
	}
	return { ratio: contrast.toFixed(2), badgeText, badgeClass };
}

export function hslToHex(h, s, l) {
	l /= 100;
	const a = (s * Math.min(l, 1 - l)) / 100;
	const f = (n) => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, '0');
	};
	return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

export function derivePalette(hex) {
	const hsl = hexToHsl(hex);
	if (!hsl) return { primary: hex, secondary: hex, tertiary: hex, neutral: hex };
	return {
		primary: hex,
		secondary: hslToHex(hsl.h, Math.max(10, hsl.s * 0.4), hsl.l),
		tertiary: hslToHex((hsl.h + 60) % 360, Math.max(20, hsl.s * 0.6), hsl.l),
		neutral: hslToHex(hsl.h, 8, 45)
	};
}

// Function to simulate CSS color-mix (simplified srgb mixing)
// percentage: how much of color2 to mix into color1 (0-100)
export function mixColors(color1Hex, color2Hex, percentage) {
	const rgb1 = hexToRgb(color1Hex);
	const rgb2 = hexToRgb(color2Hex);

	if (!rgb1 || !rgb2) {
		console.warn(`Invalid color hex provided to mixColors: ${color1Hex}, ${color2Hex}`);
		return color1Hex; // Fallback to the first color if conversion fails
	}

	const p = percentage / 100; // Convert percentage to a 0-1 ratio for color2

	const r = rgb1.r * (1 - p) + rgb2.r * p;
	const g = rgb1.g * (1 - p) + rgb2.g * p;
	const b = rgb1.b * (1 - p) + rgb2.b * p;

	return rgbObjectToHex({ r, g, b });
}
