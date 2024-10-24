interface TagProps {
  text: string;
  selected: boolean;
  onClick?: () => void;
}

/**
 * 감정 태그
 * @param text 태그 글귀
 * @param selected 선택된 여부
 * @param onClick 태그 클릭 콜백 함수
 * @returns
 */
const Tag = ({ text, selected, onClick }: TagProps) => {
  return (
    <button
      className={`h-fit w-fit whitespace-nowrap rounded-full px-400 py-200 font-Binggrae text-detail-1 font-regular ${selected ? "bg-primary-medium text-white" : "bg-primary-light-2 text-primary-normal"}`}
      onClick={onClick}
    >{`# ${text}`}</button>
  );
};

export default Tag;
