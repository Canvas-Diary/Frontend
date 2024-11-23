import DeleteIcon from "@/assets/svg/delete.svg?react";
import StarIcon from "@/assets/svg/star.svg?react";
import DownloadIcon from "@/assets/svg/download.svg?react";

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
    <div className="flex w-full flex-col gap-600 font-Binggrae text-body-2 font-regular text-gray-700 dark:text-gray-200">
      <div className="flex justify-center">
        <img src={imgUrl} alt="" height={308} width={176} />
      </div>
      <div className="flex h-full flex-col gap-900">
        {onClickSetMain && (
          <button className="flex gap-500 text-start" onClick={onClickSetMain}>
            <StarIcon />
            <span>대표 이미지로 설정하기</span>
          </button>
        )}
        <button className="flex gap-500 text-start" onClick={onClickDownload}>
          <DownloadIcon />
          <span>이미지 다운로드</span>
        </button>
        {onClickDelete && (
          <button className="flex gap-500 text-start text-status-negative" onClick={onClickDelete}>
            <DeleteIcon />
            <span>이미지 삭제하기</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SettingImage;
