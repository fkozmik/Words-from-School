import { Volume2 } from 'lucide-react';
import { speakWord } from '../../utils/speech';

const CurrentWordCard = ({ word }) => (
  <div className="max-w-4xl mx-auto mb-8">
    <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 flex items-center justify-between">
      <div className="text-white">
        <p className="text-sm opacity-70 mb-1">Mot à construire :</p>
        <p className="text-5xl font-bold">{word}</p>
      </div>
      <button
        onClick={() => speakWord(word)}
        className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-full shadow-xl hover:scale-110 transition-transform active:scale-95"
      >
        <Volume2 className="w-8 h-8" />
      </button>
    </div>
  </div>
);

export default CurrentWordCard;
