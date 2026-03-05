import { Star } from 'lucide-react';

const BackgroundStars = () => (
  <>
    <div className="fixed top-10 left-10 animate-pulse">
      <Star className="w-8 h-8 text-yellow-300" />
    </div>
    <div className="fixed top-20 right-20 animate-pulse" style={{ animationDelay: '0.5s' }}>
      <Star className="w-6 h-6 text-blue-300" />
    </div>
    <div className="fixed bottom-20 left-1/4 animate-pulse" style={{ animationDelay: '1s' }}>
      <Star className="w-10 h-10 text-purple-300" />
    </div>
  </>
);

export default BackgroundStars;
