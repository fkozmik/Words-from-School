import { Rocket } from 'lucide-react';
import Button from '../ui/Button';

const ListSelectionScreen = ({ wordLists, onSelectList }) => (
  <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center max-w-md">
      <Rocket className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
      <h1 className="text-4xl font-bold text-white mb-6">Choisis ta mission !</h1>
      <div className="flex flex-col gap-3">
        {Object.keys(wordLists).map(listName => (
          <Button key={listName} onClick={() => onSelectList(listName)}>
            {listName} ({wordLists[listName].length} mots)
          </Button>
        ))}
      </div>
    </div>
  </div>
);

export default ListSelectionScreen;
