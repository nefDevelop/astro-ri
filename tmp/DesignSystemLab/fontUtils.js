// --- Lógica de Fuentes ---

const loadedFonts = new Set(); // Para evitar cargar la misma fuente/peso múltiples veces

// Preconectar a Google Fonts al inicializar para reducir el tiempo de carga a la mitad
if (typeof document !== 'undefined' && !loadedFonts.has('preconnect')) {
	const preconnect1 = document.createElement('link');
	preconnect1.rel = 'preconnect';
	preconnect1.href = 'https://fonts.googleapis.com';
	const preconnect2 = document.createElement('link');
	preconnect2.rel = 'preconnect';
	preconnect2.href = 'https://fonts.gstatic.com';
	preconnect2.crossOrigin = 'anonymous';
	document.head.append(preconnect1, preconnect2);
	loadedFonts.add('preconnect');
}

export function loadGoogleFont(fontName, weights = '400') {
	if (!fontName) return;

	// Convertir comas a punto y coma para la API css2 de Google Fonts
	const weightsString = (Array.isArray(weights) ? weights.join(';') : String(weights)).replace(
		/,/g,
		';'
	);
	const linkId = `font-${fontName.replace(/\s+/g, '-').toLowerCase()}-${weightsString.replace(/;/g, '-')}`;

	if (!loadedFonts.has(linkId)) {
		const link = document.createElement('link');
		link.id = linkId;
		link.rel = 'stylesheet';
		link.crossOrigin = 'anonymous';
		link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}:wght@${weightsString}&display=swap`;

		// Fallback en caso de que el peso solicitado no exista para esta fuente (evita que la fuente no cargue)
		link.onerror = () => {
			const fallbackLinkId = `font-${fontName.replace(/\s+/g, '-').toLowerCase()}-fallback`;
			if (!loadedFonts.has(fallbackLinkId)) {
				const fallbackLink = document.createElement('link');
				fallbackLink.id = fallbackLinkId;
				fallbackLink.rel = 'stylesheet';
				fallbackLink.crossOrigin = 'anonymous';
				fallbackLink.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}&display=swap`;
				document.head.appendChild(fallbackLink);
				loadedFonts.add(fallbackLinkId);
			}
		};

		document.head.appendChild(link);
		loadedFonts.add(linkId);
	}
}
