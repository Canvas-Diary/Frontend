import { KeyboardEvent } from "react";
import SearchIcon from "../../../assets/svg/search.svg?react";

interface SearchBarProps {
  onEnter: () => void;
}

const SearchBar = ({ onEnter }: SearchBarProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onEnter();
    }
  };

  return (
    <div className="flex items-center justify-center gap-400 rounded-50 border border-primary-light-3 bg-primary-light-1 p-400">
      <SearchIcon />
      <input
        type="text"
        className="w-full bg-transparent focus:outline-none"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
