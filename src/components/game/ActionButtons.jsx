import { Check } from 'lucide-react';
import Button from '../ui/Button';

const ActionButtons = ({ selectedLetters, currentWord, onReset, onValidate }) => {
  if (selectedLetters.length === 0) return null;

  return (
    <div className="flex gap-4 justify-center">
      <Button variant="danger" onClick={onReset}>
        Recommencer
      </Button>

      {selectedLetters.length === currentWord.length && (
        <Button variant="success" pulse onClick={onValidate}>
          <Check className="w-6 h-6" />
          OK !
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;
