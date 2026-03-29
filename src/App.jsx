import { useMissionGame } from './hooks/useMissionGame';

// Screens
import LoadingScreen from './components/screens/LoadingScreen';
import GameModeSelectionScreen from './components/screens/GameModeSelectionScreen';
import ListSelectionScreen from './components/screens/ListSelectionScreen';
import PauseScreen from './components/screens/PauseScreen';
import CompletionScreen from './components/screens/CompletionScreen';
import GameScreen from './components/screens/GameScreen';

const MissionSpatiale = () => {
	const { state, derived, actions } = useMissionGame();

	if (state.loading) {
		return <LoadingScreen />;
	}

	if (!state.selectedMode) {
		return (
			<GameModeSelectionScreen
				modeList={state.modeList}
				onSelectMode={actions.handleSelectMode}
			/>
		);
	}

	if (!state.selectedList) {
		return (
			<ListSelectionScreen
				wordLists={state.wordLists}
				onSelectList={actions.handleSelectList}
				completedLists={state.completedLists}
			/>
		);
	}

	if (state.showPause) {
		return (
			<PauseScreen
				completedCount={state.completedWords.size}
				isBundleComplete={state.isBundleComplete}
				onContinue={actions.handleContinueAfterPause}
				onResume={actions.handleResumeAfterPause}
				onLeave={actions.handleLeave}
			/>
		);
	}

	if (state.isComplete) {
		return (
			<CompletionScreen
				completedCount={state.completedWords.size}
				totalCount={state.wordsArray.length}
				onRestart={actions.restartMission}
			/>
		);
	}

	return (
		<GameScreen
			startIndex={derived.startIndex}
			selectedList={state.selectedList}
			currentBundleIndex={state.currentBundleIndex}
			currentWordInBundle={state.currentWordInBundle}
			currentBundle={derived.currentBundle}
			completedWords={state.completedWords}
			wordsArray={state.wordsArray}
			currentWord={derived.currentWord}
			selectedLetters={state.selectedLetters}
			shuffledLetters={state.shuffledLetters}
			showSuccess={state.showSuccess}
			showError={state.showError}
			selectedMode={state.selectedMode}
			onLeave={actions.handleLeave}
			onPause={actions.handlePause}
			onLetterClick={actions.handleLetterClick}
			onReset={actions.handleReset}
			onValidate={actions.handleValidate}
		/>
	);
};

export default MissionSpatiale;