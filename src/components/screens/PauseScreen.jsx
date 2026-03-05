import { Star } from 'lucide-react';

const PauseScreen = ({ completedCount, onContinue }) => (
  <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center max-w-md">
      <Star className="w-24 h-24 text-yellow-400 mx-auto mb-6 animate-spin" style={{ animationDuration: '3s' }} />
      <h1 className="text-4xl font-bold text-white mb-4">Petite pause ! ☕</h1>
      <p className="text-xl text-blue-300 mb-6">
        Tu as fait {completedCount} mots, c'est super !
      </p>
      <button
        onClick={onContinue}
        className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform"
      >
        Reprendre la mission ! 🚀
      </button>
    </div>
  </div>
);

export default PauseScreen;
