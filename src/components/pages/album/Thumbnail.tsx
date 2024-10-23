import { useNavigate } from "react-router-dom";
import RoutePaths from "../../../constants/routePath";

interface ThubnailProps {
  src: string;
  alt: string;
  diaryId: number;
}

/**
 * 앨범 썸내일
 * @param src 이미지 img
 * @param alt 이미지 alt
 * @param diaryId 일기 ID
 * @returns
 */
const Thumbnail = ({ src, alt, diaryId }: ThubnailProps) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`${RoutePaths.diary}/${diaryId}`);
  };

  return (
    <img src={src} alt={alt} className="h-[11.125rem] w-[6.375rem]" onClick={onClickHandler}></img>
  );
};

export default Thumbnail;
