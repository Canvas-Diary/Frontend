interface ThubnailProps {
  src: string;
  alt: string;
}

const Thumbnail = ({ src, alt }: ThubnailProps) => {
  return <img src={src} alt={alt} className="h-[11.125rem] w-[6.375rem] bg-gray-200"></img>;
};

export default Thumbnail;
