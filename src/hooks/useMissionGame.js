import { useState, useEffect } from 'react';
import {BUNDLE_SIZE} from '../constants/game';

export const useMissionGame = () => {
	const [wordLists, setWordLists] = useState({});
	const [selectedList, setSelectedList] = useState(null);
	const [wordsArray, setWordsArray] = useState([]);
	const [loading, setLoading] = useState(true);

	const [currentBundleIndex, setCurrentBundleIndex] = useState(0);
	const [currentWordInBundle, setCurrentWordInBundle] = useState(0);
	const [completedWords, setCompletedWords] = useState([]);
	const [shuffledLetters, setShuffledLetters] = useState([]);
	const [selectedLetters, setSelectedLetters] = useState([]);
	const [showSuccess, setShowSuccess] = useState(false);
	const [showError, setShowError] = useState(false);
	const [showPause, setShowPause] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
  const [completedLists, setCompletedLists] = useState([]);

	useEffect(() => {
		fetch('/lists/words.json')
			.then(res => res.json())
			.then(data => {
				setWordLists(data);
				setLoading(false);
			})
			.catch(err => {
				console.error('Erreur chargement des mots:', err);
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		if (wordsArray.length > 0 && currentBundleIndex < Math.ceil(wordsArray.length / BUNDLE_SIZE)) {
			const startIndex = currentBundleIndex * BUNDLE_SIZE;
			const endIndex = Math.min(startIndex + BUNDLE_SIZE, wordsArray.length);
			const currentBundle = wordsArray.slice(startIndex, endIndex);
			const currentWord = currentBundle[currentWordInBundle];

			if (currentWord) {
				const letters = currentWord.split('').sort(() => Math.random() - 0.5);
				setShuffledLetters(letters);
				setSelectedLetters([]);
				setShowSuccess(false);
			}
		}
	}, [wordsArray, currentBundleIndex, currentWordInBundle]);

	const handleSelectList = (listName) => {
		setSelectedList(listName);
		setWordsArray(wordLists[listName]);
		setCurrentBundleIndex(0);
		setCurrentWordInBundle(0);
		setCompletedWords([]);
	};

	const handleLetterClick = (letter, index) => {
		const newSelected = [...selectedLetters, letter];
		setSelectedLetters(newSelected);
		const newShuffled = shuffledLetters.filter((_, i) => i !== index);
		setShuffledLetters(newShuffled);
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
			setCompletedWords([...completedWords, globalWordIndex]);

			setTimeout(() => {
        const currentBundle = wordsArray.slice(startIndex, endIndex);
				if (currentWordInBundle < currentBundle.length - 1) {
					setCurrentWordInBundle(currentWordInBundle + 1);
				} else if (endIndex < wordsArray.length) {
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
				setShuffledLetters(currentWord.split('').sort(() => Math.random() - 0.5));
				setSelectedLetters([]);
			}, 1000);
		}
	};

	const handleReset = () => {
		setShuffledLetters(currentWord.split('').sort(() => Math.random() - 0.5));
		setSelectedLetters([]);
	};

	const handleContinueAfterPause = () => {
		setShowPause(false);
		setCurrentBundleIndex(currentBundleIndex + 1);
		setCurrentWordInBundle(0);
	};

	const restartMission = () => {
		setSelectedList(null);
		setWordsArray([]);
		setCurrentBundleIndex(0);
		setCurrentWordInBundle(0);
		setCompletedWords([]);
		setIsComplete(false);
	};

	return {
		state: {
			wordLists, selectedList, wordsArray, loading,
			currentBundleIndex, currentWordInBundle, completedWords,
			shuffledLetters, selectedLetters,
			showSuccess, showError, showPause, isComplete, completedLists,
		},
		derived: {startIndex, endIndex, currentBundle, currentWord},
		actions: {
			handleSelectList, handleLetterClick, handleValidate,
			handleReset, handleContinueAfterPause, restartMission,
		},
	};
};
