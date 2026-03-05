const LetterArea = ({ selectedLetters, shuffledLetters, onLetterClick }) => (
  <div className="max-w-4xl mx-auto">
    {/* Zone des lettres sélectionnées */}
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

    {/* Boutons des lettres mélangées */}
    <div className="flex gap-4 flex-wrap justify-center mb-6">
      {shuffledLetters.map((letter, index) => (
        <button
          key={index}
          onClick={() => onLetterClick(letter, index)}
          className="bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-8 rounded-2xl text-4xl font-bold shadow-xl hover:scale-110 transition-transform active:scale-95 touch-manipulation select-none"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          {letter}
        </button>
      ))}
    </div>
  </div>
);

export default LetterArea;
