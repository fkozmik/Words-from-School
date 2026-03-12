import {Star} from 'lucide-react';
import Button from '../ui/Button';

const PauseScreen = ({completedCount, isBundleComplete, onContinue, onResume, onLeave}) => (
	<div
		className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
		<div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center max-w-md">
			<Star className="w-24 h-24 text-yellow-400 mx-auto mb-6 animate-spin" style={{animationDuration: '3s'}}/>
			<h1 className="text-4xl font-bold text-white mb-4">Petite pause !</h1>
			<p className="text-xl text-blue-300 mb-6">
				Tu as fait {completedCount} mots, c'est super !
			</p>
			<div className="flex gap-4 justify-center flex-col">
			{isBundleComplete ? (
				<Button variant="success" onClick={onContinue}>
					Continuer la mission !
				</Button>
			) : (
				<Button variant="success" onClick={onResume}>
					Reprendre la mission !
				</Button>
			)}
			<Button variant="warning" onClick={onLeave}>
				Retourner à la sélection️
			</Button>
			</div>
		</div>
	</div>
);

export default PauseScreen;
