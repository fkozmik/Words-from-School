import { Rocket } from 'lucide-react';

const ProgressHeader = ({
  selectedList,
  currentBundleIndex,
  currentWordInBundle,
  bundleLength,
  completedCount,
  totalCount,
}) => (
  <div className="max-w-4xl mx-auto mb-8">
    <div className="flex items-center justify-between mb-4">
      <div className="text-white">
        <h2 className="text-2xl font-bold">
          {selectedList} - Série {currentBundleIndex + 1} - Mot {currentWordInBundle + 1}/{bundleLength}
        </h2>
        <p className="text-blue-300">Total: {completedCount}/{totalCount}</p>
      </div>
      <Rocket className="w-12 h-12 text-yellow-400 animate-pulse" />
    </div>

    <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500"
        style={{ width: `${(completedCount / totalCount) * 100}%` }}
      />
    </div>
  </div>
);

export default ProgressHeader;
