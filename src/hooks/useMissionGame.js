import { useState, useEffect } from 'react';
import { BUNDLE_SIZE } from '../constants/game';
import { syllabify } from '../utils/syllabify';

export const useMissionGame = () => {
	const [wordLists, setWordLists] = useState({});
	const [modeList, setModeList] = useState({});
	const [selectedMode, setSelectedMode] = useState(null);
	const [selectedList, setSelectedList] = useState(null);
	const [wordsArray, setWordsArray] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentBundleIndex, setCurrentBundleIndex] = useState(0);
	const [currentWordInBundle, setCurrentWordInBundle] = useState(0);
	const [completedWords, setCompletedWords] = useState(new Set());
	const [shuffledLetters, setShuffledLetters] = useState([]);
	const [selectedLetters, setSelectedLetters] = useState([]);
	const [showSuccess, setShowSuccess] = useState(false);
	const [showError, setShowError] = useState(false);
	const [showPause, setShowPause] = useState(false);
	const [isBundleComplete, setIsBundleComplete] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const [completedLists, setCompletedLists] = useState([]);

	const handleLeave = () => {
		setShowPause(false);
		setIsBundleComplete(false);
		setSelectedList(null);
	};

	const handlePause = () => {
		setIsBundleComplete(false);
		setShowPause(true);
	};

	useEffect(() => {
		Promise.all([
			fetch('/lists/words.json').then(r => r.json()),
			fetch('/lists/modes.json').then(r => r.json()),
		])
			.then(([words, modes]) => {
				setWordLists(words);
				setModeList(modes);
				setLoading(false);
			})
			.catch(err => {
				console.error('Erreur de chargement:', err);
				setLoading(false);
			});
	}, []);

	const getUnits = (word) =>
		selectedMode === 'Syllabes' ? syllabify(word) : word.split('');

	useEffect(() => {
		if (wordsArray.length > 0 && currentBundleIndex < Math.ceil(wordsArray.length / BUNDLE_SIZE)) {
			const startIndex = currentBundleIndex * BUNDLE_SIZE;
			const endIndex = Math.min(startIndex + BUNDLE_SIZE, wordsArray.length);
			const currentBundle = wordsArray.slice(startIndex, endIndex);
			const currentWord = currentBundle[currentWordInBundle];

			if (currentWord) {
				setShuffledLetters([...getUnits(currentWord)].sort(() => Math.random() - 0.5));
				setSelectedLetters([]);
				setShowSuccess(false);
			}
		}
	}, [wordsArray, currentBundleIndex, currentWordInBundle, selectedMode]);

	const handleSelectMode = (modeName) => {
		setSelectedMode(modeName);
	};

	const handleSelectList = (listName) => {
		setSelectedList(listName);
		setWordsArray(wordLists[listName]);
		setCurrentBundleIndex(0);
		setCurrentWordInBundle(0);
		setCompletedWords(new Set());
	};

	const handleLetterClick = (letter, index) => {
		setSelectedLetters(prev => [...prev, letter]);
		setShuffledLetters(prev => prev.filter((_, i) => i !== index));
	};

	// Calculs dérivés
	const startIndex = currentBundleIndex * BUNDLE_SIZE;
	const endIndex = Math.min(startIndex + BUNDLE_SIZE, wordsArray.length);
	const currentBundle = wordsArray.slice(startIndex, endIndex);
	const currentWord = currentBundle[currentWordInBundle];

	const handleValidate = () => {
		const formedWord = selectedLetters.join('');
		if (formedWord === currentWord) {
			setShowSuccess(true);
			const globalWordIndex = startIndex + currentWordInBundle;
			setCompletedWords(prev => new Set([...prev, globalWordIndex]));

			setTimeout(() => {
				if (currentWordInBundle < currentBundle.length - 1) {
					setCurrentWordInBundle(prev => prev + 1);
				} else if (endIndex < wordsArray.length) {
					setIsBundleComplete(true);
					setShowPause(true);
				} else {
					setIsComplete(true);
					setCompletedLists(prev => [...new Set([...prev, selectedList])]);
				}
			}, 1500);
		} else {
			setShowError(true);
			setTimeout(() => {
				setShowError(false);
				setShuffledLetters([...getUnits(currentWord)].sort(() => Math.random() - 0.5));
				setSelectedLetters([]);
			}, 1000);
		}
	};

	const handleReset = () => {
		setShuffledLetters([...getUnits(currentWord)].sort(() => Math.random() - 0.5));
		setSelectedLetters([]);
	};

	const handleContinueAfterPause = () => {
		setShowPause(false);
		setIsBundleComplete(false);
		setCurrentBundleIndex(prev => prev + 1);
		setCurrentWordInBundle(0);
	};

	const handleResumeAfterPause = () => {
		setShowPause(false);
		setIsBundleComplete(false);
	};

	const restartMission = () => {
		setSelectedMode(null);
		setSelectedList(null);
		setWordsArray([]);
		setCurrentBundleIndex(0);
		setCurrentWordInBundle(0);
		setCompletedWords(new Set());
		setIsComplete(false);
	};

	return {
		state: {
			wordLists, modeList, selectedMode, selectedList, wordsArray, loading,
			currentBundleIndex, currentWordInBundle, completedWords,
			shuffledLetters, selectedLetters,
			showSuccess, showError, showPause, isBundleComplete, isComplete, completedLists,
		},
		derived: {
			startIndex, endIndex, currentBundle, currentWord
		},
		actions: {
			handleSelectList, handleLetterClick, handleValidate, handleSelectMode,
			handleReset, handleContinueAfterPause, handleResumeAfterPause, restartMission,
			handleLeave, handlePause,
		},
	};
};
