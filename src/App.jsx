import {useMissionGame} from './hooks/useMissionGame';

// Screens
import LoadingScreen from './components/screens/LoadingScreen';
import ListSelectionScreen from './components/screens/ListSelectionScreen';
import PauseScreen from './components/screens/PauseScreen';
import CompletionScreen from './components/screens/CompletionScreen';

// Game components
import ProgressHeader from './components/game/ProgressHeader';
import WordBundleDisplay from './components/game/WordBundleDisplay';
import CurrentWordCard from './components/game/CurrentWordCard';
import LetterArea from './components/game/LetterArea';
import ActionButtons from './components/game/ActionButtons';

// UI components
import FeedbackOverlay from './components/ui/FeedbackOverlay';
import BackgroundStars from './components/ui/BackgroundStars';

const MissionSpatiale = () => {
	const {state, derived, actions} = useMissionGame();
	const {
		wordLists,
		selectedList,
		wordsArray,
		loading,
		currentBundleIndex,
		currentWordInBundle,
		completedWords,
		shuffledLetters,
		selectedLetters,
		showSuccess,
		showError,
		showPause,
		isComplete,
	} = state;
	const {startIndex, endIndex, currentBundle, currentWord} = derived;
	const {
		handleSelectList, handleLetterClick, handleValidate, handleReset, handleContinueAfterPause, restartMission,
	} = actions;

	if (loading) {
		return <LoadingScreen/>;
	}

  if (!selectedList) {
    return (
      <ListSelectionScreen
        wordLists={wordLists}
        onSelectList={handleSelectList}
        completedLists={completedLists}
      />
    );
  }

	if (showPause) {
		return (<PauseScreen
			completedCount={completedWords.length}
			onContinue={handleContinueAfterPause}
		/>);
	}

	if (isComplete) {
		return (<CompletionScreen
			completedCount={completedWords.length}
			totalCount={wordsArray.length}
			onRestart={restartMission}
		/>);
	}

	return (<div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 p-4">
		<ProgressHeader
			selectedList={selectedList}
			currentBundleIndex={currentBundleIndex}
			currentWordInBundle={currentWordInBundle}
			bundleLength={currentBundle.length}
			completedCount={completedWords.length}
			totalCount={wordsArray.length}
		/>

		<WordBundleDisplay
			bundle={currentBundle}
			startIndex={startIndex}
			currentWordInBundle={currentWordInBundle}
			completedWords={completedWords}
		/>

		<CurrentWordCard word={currentWord}/>

		<LetterArea
			selectedLetters={selectedLetters}
			shuffledLetters={shuffledLetters}
			onLetterClick={handleLetterClick}
		/>

		<ActionButtons
			selectedLetters={selectedLetters}
			currentWord={currentWord}
			onReset={handleReset}
			onValidate={handleValidate}
		/>

		<FeedbackOverlay showSuccess={showSuccess} showError={showError}/>
		<BackgroundStars/>
	</div>);
};

export default MissionSpatiale;
