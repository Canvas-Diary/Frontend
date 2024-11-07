import BottomSheet from "./BottomSheet";
import testImg from "../../../assets/dummy/_Image.png";
import DeleteIcon from "../../../assets/svg/delete.svg?react";
import StarIcon from "../../../assets/svg/star.svg?react";
import DownloadIcon from "../../../assets/svg/download.svg?react";

interface DiaryImageSettingsProps {
  onClose: () => void;
}

/**
 * 일기 페이지 이미지 설정 시 나오는 모달
 * @returns
 */
const DiaryImageSettings = ({ onClose }: DiaryImageSettingsProps) => {
  return (
    <BottomSheet onClose={onClose}>
      <div className="flex w-full flex-col gap-600 font-Binggrae text-body-2 font-regular text-gray-700">
        <div className="flex justify-center">
          <img src={testImg} alt="" width={176} height={308} />
        </div>
        <div className="flex h-full flex-col gap-900">
          <button className="flex gap-500 text-start">
            <StarIcon />
            <span>대표 이미지로 설정하기</span>
          </button>
          <button className="flex gap-500 text-start">
            <DownloadIcon />
            <span>이미지 다운로드</span>
          </button>
          <button className="flex gap-500 text-start text-status-negative">
            <DeleteIcon />
            <span>이미지 삭제하기</span>
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};

export default DiaryImageSettings;
