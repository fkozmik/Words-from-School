const VOWELS_SIMPLE = new Set([...'aeiouyéèêëàâîïôùûüœæ']);
const DIGRAPHS = ['eau', 'ou', 'au', 'eu', 'ai', 'ei', 'oi', 'ui'];

// Onsets consonantiques valides en français
const VALID_ONSETS = new Set([
	'bl','br','cl','cr','dr','fl','fr','gl','gr','pl','pr','tr','vr',
	'ch','gn','ph','qu','th',
]);

// Tokenise un mot en blocs alternés V/C (digrammes vocaliques comme unités)
function tokenize(word) {
	const w = word.toLowerCase();
	const tokens = [];
	let i = 0;

	while (i < w.length) {
		// Vérifier les digrammes/trigrammes vocaliques en priorité
		let matched = false;
		for (const dg of DIGRAPHS) {
			if (w.startsWith(dg, i)) {
				tokens.push({ type: 'V', text: word.slice(i, i + dg.length) });
				i += dg.length;
				matched = true;
				break;
			}
		}
		if (matched) continue;

		if (VOWELS_SIMPLE.has(w[i])) {
			tokens.push({ type: 'V', text: word.slice(i, i + 1) });
		} else {
			tokens.push({ type: 'C', text: word.slice(i, i + 1) });
		}
		i++;
	}

	// Fusionner les tokens contigus de même type
	const merged = [];
	for (const tok of tokens) {
		if (merged.length > 0 && merged[merged.length - 1].type === tok.type) {
			merged[merged.length - 1].text += tok.text;
		} else {
			merged.push({ ...tok });
		}
	}

	return merged;
}

// Renvoie l'index de coupure dans un cluster consonantique
function splitPoint(cons) {
	// Chercher le suffixe d'onset valide le plus long
	for (let len = Math.min(cons.length, 2); len >= 1; len--) {
		if (VALID_ONSETS.has(cons.slice(-len))) return cons.length - len;
	}
	// Par défaut : couper après la première consonne
	return 1;
}

/**
 * Découpe un mot français en syllabes.
 * Ex: "tomate" → ["to","ma","te"], "table" → ["ta","ble"]
 * @param {string} word
 * @returns {string[]}
 */
export function syllabify(word) {
	const tokens = tokenize(word);
	const hasVowel = tokens.some(t => t.type === 'V');
	if (!hasVowel) return [word];

	const syllables = [];
	let pending = ''; // consonnes en attente (préfixe de la prochaine syllabe)

	for (let i = 0; i < tokens.length; i++) {
		const tok = tokens[i];

		if (tok.type === 'C') {
			pending += tok.text;
			continue;
		}

		// Token vocalique
		const vowel = tok.text;
		const nextC = tokens[i + 1]; // prochain token (consonnes)
		const nextV = tokens[i + 2]; // voyelle suivante

		if (!nextC || !nextV) {
			// Dernière voyelle du mot : absorber le reste
			const trailing = nextC ? nextC.text : '';
			syllables.push(pending + vowel + trailing);
			pending = '';
			if (nextC) i++; // consommer le token C final
		} else {
			const cons = nextC.text;
			if (cons.length === 1) {
				// V-C-V : la consonne ouvre la syllabe suivante
				syllables.push(pending + vowel);
				pending = cons;
				i++; // consommer le token C
			} else {
				// V-CC...-V : déterminer la coupure
				const cut = splitPoint(cons);
				syllables.push(pending + vowel + cons.slice(0, cut));
				pending = cons.slice(cut);
				i++; // consommer le token C
			}
		}
	}

	if (pending) {
		// Consonnes restantes → rattacher à la dernière syllabe
		if (syllables.length > 0) {
			syllables[syllables.length - 1] += pending;
		} else {
			syllables.push(pending);
		}
	}

	return syllables.length > 0 ? syllables : [word];
}
