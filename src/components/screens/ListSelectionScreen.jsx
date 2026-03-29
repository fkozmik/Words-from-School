import SelectionScreen from './SelectionScreen';

const ListSelectionScreen = ({ wordLists, onSelectList, completedLists = [] }) => (
	<SelectionScreen
		title="Choisis ta liste !"
		items={Object.keys(wordLists).map(listName => ({
			key: listName,
			label: `${listName} (${wordLists[listName].length} mots)`,
			variant: completedLists.includes(listName) ? 'completed' : 'primary',
			onClick: () => onSelectList(listName),
		}))}
	/>
);

export default ListSelectionScreen;
