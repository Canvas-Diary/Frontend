import { Tag } from "lucide-react";

interface KeywordTagProps {
  text: string;
  onClick: () => void;
}

const KeywordTag = ({ text, onClick }: KeywordTagProps) => {
  return (
    <button
      className="flex items-center justify-center gap-300 whitespace-nowrap rounded-full bg-primary-light-2 px-400 py-200 font-Binggrae text-detail-1 font-regular text-primary-normal dark:bg-gray-600 dark:text-gray-200"
      onClick={onClick}
    >
      <Tag height={12} width={12} />
      {text}
    </button>
  );
};

export default KeywordTag;
