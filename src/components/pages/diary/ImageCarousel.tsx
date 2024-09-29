import img from "../../../assets/dummy/_Image.png";

const ImageCarousel = () => {
  return (
    <div>
      <div className="flex w-full snap-x snap-mandatory overflow-x-scroll">
        <img src={img} alt="" className="h-auto w-full flex-shrink-0 snap-start" />
        <img src={img} alt="" className="h-auto w-full flex-shrink-0 snap-start" />
        <img src={img} alt="" className="h-auto w-full flex-shrink-0 snap-start" />
        <img src={img} alt="" className="h-auto w-full flex-shrink-0 snap-start" />
      </div>
      <div></div>
    </div>
  );
};

export default ImageCarousel;
