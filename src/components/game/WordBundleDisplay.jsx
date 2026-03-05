const WordBundleDisplay = ({ bundle, startIndex, currentWordInBundle, completedWords }) => (
  <div className="max-w-4xl mx-auto mb-6">
    <div className="flex gap-3 justify-center flex-wrap">
      {bundle.map((word, idx) => {
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
);

export default WordBundleDisplay;
