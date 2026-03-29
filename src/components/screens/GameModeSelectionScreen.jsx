import SelectionScreen from './SelectionScreen';

const GameModeSelectionScreen = ({ modeList = {}, onSelectMode }) => (
	<SelectionScreen
		title="Choisis ta mission !"
		items={Object.keys(modeList).map(modeName => ({
			key: modeName,
			label: modeName,
			onClick: () => onSelectMode(modeName),
		}))}
	/>
);

export default GameModeSelectionScreen;
