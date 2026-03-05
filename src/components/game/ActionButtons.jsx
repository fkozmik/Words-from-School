import { Check } from 'lucide-react';

const ActionButtons = ({ selectedLetters, currentWord, onReset, onValidate }) => {
  if (selectedLetters.length === 0) return null;

  return (
    <div className="flex gap-4 justify-center">
      <button
        onClick={onReset}
        className="bg-red-500/80 hover:bg-red-600 text-white px-8 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform touch-manipulation select-none"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        Recommencer
      </button>

      {selectedLetters.length === currentWord.length && (
        <button
          onClick={onValidate}
          className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-full font-bold text-xl flex items-center gap-2 hover:scale-105 transition-transform animate-pulse touch-manipulation select-none"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <Check className="w-6 h-6" />
          OK !
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
