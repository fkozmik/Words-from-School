import { Rocket } from 'lucide-react';

const ListSelectionScreen = ({ wordLists, onSelectList }) => (
  <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center max-w-md">
      <Rocket className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
      <h1 className="text-4xl font-bold text-white mb-6">Choisis ta mission !</h1>
      <div className="flex flex-col gap-3">
        {Object.keys(wordLists).map(listName => (
          <button
            key={listName}
            onClick={() => onSelectList(listName)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform"
          >
            {listName} ({wordLists[listName].length} mots)
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default ListSelectionScreen;
