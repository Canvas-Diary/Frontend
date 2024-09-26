interface TagProps {
  text: string;
  selected: boolean;
  onClick?: () => void;
}

const Tag = ({ text, selected, onClick }: TagProps) => {
  return (
    <button
      className={`h-fit w-fit rounded-full px-400 py-200 font-Binggrae text-detail-1 font-regular ${selected ? "bg-primary-medium text-white" : "bg-primary-light-2 text-primary-normal"}`}
      onClick={onClick}
    >{`# ${text}`}</button>
  );
};

export default Tag;
