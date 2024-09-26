import { ChangeEvent, KeyboardEvent, useState } from "react";
import SearchIcon from "../../../assets/svg/search.svg?react";

const SearchConst = {
  minSearchLength: 2,
  placeHolderText: "찾고 싶은 내용을 검색해주세요.",
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
        placeholder={SearchConst.placeHolderText}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="w-full bg-transparent font-Binggrae text-body-2 font-regular text-gray-900 placeholder:text-detail-1 placeholder:text-primary-light-3 focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
