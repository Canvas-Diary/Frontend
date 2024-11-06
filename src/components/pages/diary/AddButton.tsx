import AddIcon from "../../../assets/svg/plus.svg?react";

const AddButton = () => {
  return (
    <button className="flex items-center justify-center gap-400 rounded-full bg-white px-900 py-600 font-Binggrae text-body-2 text-primary-normal shadow-default">
      <AddIcon />
      <div>이미지 추가하기</div>
    </button>
  );
};

export default AddButton;