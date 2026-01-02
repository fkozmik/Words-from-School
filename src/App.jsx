import React, { useState, useEffect } from 'react';
import { Rocket, Star, Trophy, Volume2, Check } from 'lucide-react';

const BUNDLE_SIZE = 5;

const MissionSpatiale = () => {
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

  // TOUS LES useEffect EN PREMIER (règle des hooks React)
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

  // Fonctions helpers
  const handleSelectList = (listName) => {
    setSelectedList(listName);
    setWordsArray(wordLists[listName]);
    setCurrentBundleIndex(0);
    setCurrentWordInBundle(0);
    setCompletedWords([]);
  };

  const speakWord = (word) => {
    if ('speechSynthesis' in window && word) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleLetterClick = (letter, index) => {
    const newSelected = [...selectedLetters, letter];
    setSelectedLetters(newSelected);
    const newShuffled = shuffledLetters.filter((_, i) => i !== index);
    setShuffledLetters(newShuffled);
  };

  const handleValidate = (currentWord, startIndex, endIndex) => {
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

  const handleReset = (currentWord) => {
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

  // Calculs pour le rendu
  const startIndex = currentBundleIndex * BUNDLE_SIZE;
  const endIndex = Math.min(startIndex + BUNDLE_SIZE, wordsArray.length);
  const currentBundle = wordsArray.slice(startIndex, endIndex);
  const currentWord = currentBundle[currentWordInBundle];
  const globalWordIndex = startIndex + currentWordInBundle;

  // MAINTENANT les rendus conditionnels
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-white text-2xl">Chargement... 🚀</div>
      </div>
    );
  }

  if (!selectedList) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center max-w-md">
          <Rocket className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-6">Choisis ta mission !</h1>
          <div className="flex flex-col gap-3">
            {Object.keys(wordLists).map(listName => (
              <button
                key={listName}
                onClick={() => handleSelectList(listName)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform"
              >
                {listName} ({wordLists[listName].length} mots)
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (showPause) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center max-w-md">
          <Star className="w-24 h-24 text-yellow-400 mx-auto mb-6 animate-spin" style={{ animationDuration: '3s' }} />
          <h1 className="text-4xl font-bold text-white mb-4">Petite pause ! ☕</h1>
          <p className="text-xl text-blue-300 mb-6">
            Tu as fait {completedWords.length} mots, c'est super !
          </p>
          <button
            onClick={handleContinueAfterPause}
            className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform"
          >
            Reprendre la mission ! 🚀
          </button>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center max-w-md">
          <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6 animate-bounce" />
          <h1 className="text-4xl font-bold text-white mb-4">Mission Accomplie ! 🚀</h1>
          <p className="text-2xl text-yellow-300 mb-6">
            {completedWords.length} / {wordsArray.length} mots réussis
          </p>
          <button
            onClick={restartMission}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform"
          >
            Choisir une autre mission
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="text-white">
            <h2 className="text-2xl font-bold">
              {selectedList} - Bundle {currentBundleIndex + 1} - Mot {currentWordInBundle + 1}/{currentBundle.length}
            </h2>
            <p className="text-blue-300">Total: {completedWords.length}/{wordsArray.length}</p>
          </div>
          <Rocket className="w-12 h-12 text-yellow-400 animate-pulse" />
        </div>
        
        <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500"
            style={{ width: `${(completedWords.length / wordsArray.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex gap-3 justify-center flex-wrap">
          {currentBundle.map((word, idx) => {
            const globalIdx = startIndex + idx;
            const isCompleted = completedWords.includes(globalIdx);
            const isCurrent = idx === currentWordInBundle;
            
            return (
              <div
                key={idx}
                className={`px-4 py-2 rounded-lg font-bold text-lg transition-all ${
                  isCompleted
                    ? 'bg-green-500 text-white'
                    : isCurrent
                    ? 'bg-yellow-400 text-gray-900 scale-110'
                    : 'bg-white/20 text-white/50'
                }`}
              >
                {word}
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 flex items-center justify-between">
          <div className="text-white">
            <p className="text-sm opacity-70 mb-1">Mot à construire :</p>
            <p className="text-5xl font-bold">{currentWord}</p>
          </div>
          <button
            onClick={() => speakWord(currentWord)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-full shadow-xl hover:scale-110 transition-transform active:scale-95"
          >
            <Volume2 className="w-8 h-8" />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8 min-h-[200px] flex items-center justify-center">
          <div className="flex gap-2 flex-wrap justify-center">
            {selectedLetters.length === 0 ? (
              <div className="text-white/50 text-3xl font-bold">
                Clique sur les lettres
              </div>
            ) : (
              selectedLetters.map((letter, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-8 py-6 rounded-2xl text-5xl font-bold shadow-lg"
                >
                  {letter}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex gap-4 flex-wrap justify-center mb-6">
          {shuffledLetters.map((letter, index) => (
            <button
              key={index}
              onClick={() => handleLetterClick(letter, index)}
              className="bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-8 rounded-2xl text-4xl font-bold shadow-xl hover:scale-110 transition-transform active:scale-95 touch-manipulation select-none"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {letter}
            </button>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          {selectedLetters.length > 0 && (
            <>
              <button
                onClick={() => handleReset(currentWord)}
                className="bg-red-500/80 hover:bg-red-600 text-white px-8 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform touch-manipulation select-none"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                Recommencer
              </button>
              
              {selectedLetters.length === currentWord.length && (
                <button
                  onClick={() => handleValidate(currentWord, startIndex, endIndex)}
                  className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-full font-bold text-xl flex items-center gap-2 hover:scale-105 transition-transform animate-pulse touch-manipulation select-none"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <Check className="w-6 h-6" />
                  OK !
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="bg-green-500 text-white px-12 py-8 rounded-3xl text-4xl font-bold shadow-2xl animate-bounce">
            Bravo ! 🌟
          </div>
        </div>
      )}

      {showError && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="bg-red-500 text-white px-12 py-8 rounded-3xl text-4xl font-bold shadow-2xl animate-bounce">
            Réessaie ! 🔄
          </div>
        </div>
      )}

      <div className="fixed top-10 left-10 animate-pulse">
        <Star className="w-8 h-8 text-yellow-300" />
      </div>
      <div className="fixed top-20 right-20 animate-pulse" style={{ animationDelay: '0.5s' }}>
        <Star className="w-6 h-6 text-blue-300" />
      </div>
      <div className="fixed bottom-20 left-1/4 animate-pulse" style={{ animationDelay: '1s' }}>
        <Star className="w-10 h-10 text-purple-300" />
      </div>
    </div>
  );
};

export default MissionSpatiale;