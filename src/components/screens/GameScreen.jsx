import ProgressHeader from '../game/ProgressHeader';
import WordBundleDisplay from '../game/WordBundleDisplay';
import CurrentWordCard from '../game/CurrentWordCard';
import LetterArea from '../game/LetterArea';
import ActionButtons from '../game/ActionButtons';
import FeedbackOverlay from '../ui/FeedbackOverlay';
import BackgroundStars from '../ui/BackgroundStars';
import HamburgerMenu from '../ui/HamburgerMenu';

const GameScreen = ({
						startIndex,
						selectedList,
						currentBundleIndex,
						currentWordInBundle,
						currentBundle,
						completedWords,
						wordsArray,
						currentWord,
						selectedLetters,
						shuffledLetters,
						showSuccess,
						showError,
						onLeave,
						onPause,
						onLetterClick,
						onReset,
						onValidate,
						selectedMode,
					}) => (
	<div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 p-4">
		<HamburgerMenu onLeave={onLeave} onPause={onPause} />
		<ProgressHeader
			selectedList={selectedList}
			currentBundleIndex={currentBundleIndex}
			currentWordInBundle={currentWordInBundle}
			bundleLength={currentBundle.length}
			completedCount={completedWords.size}
			totalCount={wordsArray.length}
		/>
		<WordBundleDisplay
			bundle={currentBundle}
			startIndex={startIndex}
			currentWordInBundle={currentWordInBundle}
			completedWords={completedWords}
		/>
		<CurrentWordCard word={currentWord} />
		<LetterArea
			selectedLetters={selectedLetters}
			shuffledLetters={shuffledLetters}
			onLetterClick={onLetterClick}
			selectedMode={selectedMode}
		/>
		<ActionButtons
			selectedLetters={selectedLetters}
			shuffledLetters={shuffledLetters}
			onReset={onReset}
			onValidate={onValidate}
		/>
		<FeedbackOverlay showSuccess={showSuccess} showError={showError} />
		<BackgroundStars />
	</div>
);

export default GameScreen;