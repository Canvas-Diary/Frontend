interface ImageContainerProps {
  imgUrl: string;
}

const ImageContainer = ({ imgUrl }: ImageContainerProps) => {
  return (
    <div className="flex justify-center">
      <img src={imgUrl} alt="" height={308} width={176} />
    </div>
  );
};

export default ImageContainer;
