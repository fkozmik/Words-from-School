import { Trophy } from 'lucide-react';

const CompletionScreen = ({ completedCount, totalCount, onRestart }) => (
  <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center max-w-md">
      <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6 animate-bounce" />
      <h1 className="text-4xl font-bold text-white mb-4">Mission Accomplie ! 🚀</h1>
      <p className="text-2xl text-yellow-300 mb-6">
        {completedCount} / {totalCount} mots réussis
      </p>
      <button
        onClick={onRestart}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform"
      >
        Choisir une autre mission
      </button>
    </div>
  </div>
);

export default CompletionScreen;
