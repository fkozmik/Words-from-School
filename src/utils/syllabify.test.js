import { describe, it, expect } from 'vitest';
import { syllabify } from './syllabify';

describe('syllabify', () => {
	describe('règle V-C-V (consonne ouvre la syllabe suivante)', () => {
		it('découpe correctement les mots simples', () => {
			expect(syllabify('tomate')).toEqual(['to', 'ma', 'te']);
			expect(syllabify('balade')).toEqual(['ba', 'la', 'de']);
			expect(syllabify('farine')).toEqual(['fa', 'ri', 'ne']);
			expect(syllabify('banane')).toEqual(['ba', 'na', 'ne']);
			expect(syllabify('rapide')).toEqual(['ra', 'pi', 'de']);
		});
	});

	describe('onsets valides (bl, br, tr, ch...)', () => {
		it('garde les deux consonnes avec la syllabe suivante', () => {
			expect(syllabify('table')).toEqual(['ta', 'ble']);
			expect(syllabify('arbre')).toEqual(['ar', 'bre']);
			expect(syllabify('sablé')).toEqual(['sa', 'blé']);
			expect(syllabify('étable')).toEqual(['é', 'ta', 'ble']);
			expect(syllabify('flute')).toEqual(['flu', 'te']);
			expect(syllabify('prune')).toEqual(['pru', 'ne']);
		});
	});

	describe('clusters consonantiques invalides (rt, rn, rd...)', () => {
		it('coupe après la première consonne', () => {
			expect(syllabify('tartine')).toEqual(['tar', 'ti', 'ne']);
			expect(syllabify('journal')).toEqual(['jour', 'nal']);
			expect(syllabify('foulard')).toEqual(['fou', 'lard']);
			expect(syllabify('armure')).toEqual(['ar', 'mu', 're']);
		});
	});

	describe('digrammes vocaliques (ou, ai, au, eu...)', () => {
		it('traite les digrammes comme une seule unité', () => {
			expect(syllabify('doudou')).toEqual(['dou', 'dou']);
			expect(syllabify('journée')).toEqual(['jour', 'née']);
			expect(syllabify('salade')).toEqual(['sa', 'la', 'de']);
		});
	});

	describe('monosyllabes', () => {
		it('retourne le mot entier dans un tableau', () => {
			expect(syllabify('blé')).toEqual(['blé']);
			expect(syllabify('dos')).toEqual(['dos']);
			expect(syllabify('trou')).toEqual(['trou']);
			expect(syllabify('bras')).toEqual(['bras']);
			expect(syllabify('boue')).toEqual(['boue']);
		});
	});

	describe('mots de la liste Lettres 3', () => {
		it('découpe correctement des mots complexes', () => {
			expect(syllabify('amazonie')).toEqual(['a', 'ma', 'zo', 'nie']);
			expect(syllabify('jardinerie')).toEqual(['jar', 'di', 'ne', 'rie']);
			expect(syllabify('piano')).toEqual(['pia', 'no']);
			expect(syllabify('bizarre')).toEqual(['bi', 'zar', 're']);
		});
	});

	describe('cas limites', () => {
		it('retourne le mot entier si aucune voyelle', () => {
			expect(syllabify('brrr')).toEqual(['brrr']);
		});

		it('préserve la casse du mot original', () => {
			expect(syllabify('Tomate')).toEqual(['To', 'ma', 'te']);
		});
	});
});
