import AddButton from "./AddButton";

const ImageAddFilter = () => {
  const onClickAddButton = () => {};
  return (
    <div className="backdrop-blur-default flex h-full w-full items-center justify-center bg-transparent bg-opacity-10">
      <AddButton onClickHandler={onClickAddButton}></AddButton>
    </div>
  );
};

export default ImageAddFilter;
