import {useState} from "react";
import {LogOut, Menu, Pause, X} from "lucide-react";

const HamburgerMenu = ({onLeave, onPause}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="fixed top-4 left-4 z-50">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="bg-white/10 backdrop-blur-lg text-white p-3 rounded-full hover:bg-white/20 transition-all"
			>
				{isOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
			</button>
			{isOpen && (
				<div className="mt-2 bg-white/10 backdrop-blur-lg rounded-2xl p-2 flex flex-col gap-1 min-w-48">
					<button
						onClick={() => {
							onLeave();
							setIsOpen(false);
						}}
						className="flex items-center gap-3 text-white px-4 py-3 rounded-xl hover:bg-white/20 transition-all text-left font-bold"
					>
						<LogOut className="w-5 h-5"/> Changer de liste
					</button>
					<button
						onClick={() => {
							onPause();
							setIsOpen(false);
						}}
						className="flex items-center gap-3 text-white px-4 py-3 rounded-xl hover:bg-white/20 transition-all text-left font-bold"
					>
						<Pause className="w-5 h-5"/> Mettre en pause
					</button>
				</div>
			)}
		</div>
	);
};

export default HamburgerMenu;