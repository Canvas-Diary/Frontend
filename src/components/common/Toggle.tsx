interface ToggleProps {
  onClickHandler: (isChecked: boolean) => void;
  isChecked: boolean;
}

const Toggle = ({ onClickHandler, isChecked }: ToggleProps) => {
  const handleToggle = () => {
    onClickHandler(!isChecked);
  };

  return (
    <label className="inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={isChecked}
        onClick={() => {
          handleToggle();
        }}
      />
      <div className="peer relative h-[1.75rem] w-[3.25rem] rounded-full bg-gray-200 shadow-default after:absolute after:start-[2px] after:top-[2.4px] after:h-6 after:w-[1.48rem] after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-medium peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
    </label>
  );
};

export default Toggle;
