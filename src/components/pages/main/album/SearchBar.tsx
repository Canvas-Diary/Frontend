import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import SearchIcon from "../../../assets/svg/search.svg?react";

const SearchConst = {
  minSearchLength: 0,
  placeHolderText: "찾고 싶은 내용을 검색해주세요.",
};

interface SearchBarProps {
  onEnter: (input: string) => void;
  content: string;
}

/**
 * 앨범 화면 검색창
 * @param onEnter 엔터를 눌러 검색했을 때 실행할 콜백 함수
 * @returns
 */
const SearchBar = ({ onEnter, content }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(content);

  useEffect(() => {
    setInputValue(content);
  }, [content]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  /**
   * Enter 눌렀을 경우 실행할 함수
   * @param event
   */
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.length >= SearchConst.minSearchLength) {
      onEnter(inputValue);
    }
  };

  return (
    <div className="flex items-center justify-center gap-400 rounded-50 border border-primary-light-3 bg-primary-light-1 p-400 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-500 dark:focus-within:border dark:focus-within:border-primary-light-3">
      <SearchIcon />
      <input
        type="text"
        placeholder={SearchConst.placeHolderText}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="w-full bg-transparent font-Binggrae text-body-2 font-regular text-gray-900 placeholder:text-detail-1 placeholder:text-primary-light-3 focus:outline-none dark:text-gray-400 dark:placeholder:text-gray-400"
      />
    </div>
  );
};

export default SearchBar;
