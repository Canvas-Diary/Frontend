import { ChangeEvent, KeyboardEvent, useState } from "react";
import SearchIcon from "../../../assets/svg/search.svg?react";

const SearchConst = {
  minSearchLength: 2,
};

interface SearchBarProps {
  onEnter: () => void;
}

const SearchBar = ({ onEnter }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.length > SearchConst.minSearchLength) {
      onEnter();
    }
  };

  return (
    <div className="flex items-center justify-center gap-400 rounded-50 border border-primary-light-3 bg-primary-light-1 p-400">
      <SearchIcon />
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="w-full bg-transparent focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
