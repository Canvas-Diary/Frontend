interface ThubnailProps {
  src: string;
  alt: string;
}

/**
 * 앨범 썸내일
 * @param src 이미지 img
 * @param alt 이미지 alt
 * @returns
 */
const Thumbnail = ({ src, alt }: ThubnailProps) => {
  return <img src={src} alt={alt} className="h-[11.125rem] w-[6.375rem] bg-gray-200"></img>;
};

export default Thumbnail;
