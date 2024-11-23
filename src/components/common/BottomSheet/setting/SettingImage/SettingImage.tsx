import DeleteIcon from "@/assets/svg/delete.svg?react";
import StarIcon from "@/assets/svg/star.svg?react";
import DownloadIcon from "@/assets/svg/download.svg?react";
import SettingContainer from "../../container/SettingContainer";
import ImageContainer from "../../container/ImageContainer";
import SettingItem from "../SettingItem/SettingItem";

interface SttingImageProps {
  onClickSetMain?: () => void;
  onClickDownload: () => void;
  onClickDelete?: () => void;
  imgUrl: string;
}

/**
 * 일기 페이지 이미지 설정 시 나오는 모달
 * @returns
 */
const SettingImage = ({
  onClickSetMain,
  onClickDownload,
  onClickDelete,
  imgUrl,
}: SttingImageProps) => {
  return (
    <SettingContainer>
      <ImageContainer imgUrl={imgUrl} />
      <div className="flex h-full flex-col gap-900">
        {onClickSetMain && (
          <SettingItem
            icon={<StarIcon />}
            text={"대표 이미지로 설정하기"}
            onClick={onClickSetMain}
          />
        )}
        <SettingItem icon={<DownloadIcon />} text={"이미지 다운로드"} onClick={onClickDownload} />
        {onClickDelete && (
          <SettingItem
            icon={<DeleteIcon />}
            text={"이미지 삭제하기"}
            className="text-status-negative"
            onClick={onClickDelete}
          />
        )}
      </div>
    </SettingContainer>
  );
};

export default SettingImage;
