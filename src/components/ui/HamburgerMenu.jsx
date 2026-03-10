import { useState } from "react";
import { LogOut, Menu, Pause, X } from "lucide-react";
import Button from "./Button";

const HamburgerMenu = ({ onLeave, onPause }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 left-4 z-50">
      <Button
        variant="ghost"
        size="iconSm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>
      {isOpen && (
        <div className="mt-2 bg-white/10 backdrop-blur-lg rounded-2xl p-2 flex flex-col gap-1 min-w-48">
          <Button
            variant="menuItem"
            size="menu"
            rounded="xl"
            onClick={() => {
              onLeave();
              setIsOpen(false);
            }}
          >
            <LogOut className="w-5 h-5" /> Changer de liste
          </Button>
          <Button
            variant="menuItem"
            size="menu"
            rounded="xl"
            onClick={() => {
              onPause();
              setIsOpen(false);
            }}
          >
            <Pause className="w-5 h-5" /> Mettre en pause
          </Button>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
