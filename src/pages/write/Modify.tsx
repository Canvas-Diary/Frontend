import { useLocation, useNavigate } from "react-router-dom";
import { formatDateWithWeek } from "../../utils/util";
import { FADEINANIMATION } from "../../styles/animations";
import { useEffect, useState } from "react";
import Divider from "../../components/common/Divider";
import { Textarea } from "@/components/ui/textarea";
import Appbar from "@/components/common/Appbar";
import MobileLayout from "../Layout/MobileLayout";
import Button from "@/components/common/Button";
import { DiaryInfo } from "@/types/types";
import { putModifiedDiary } from "@/api/api";

const Modify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [diaryInfo, setDiaryInfo] = useState<DiaryInfo | null>(null);

  const onClickModify = async () => {
    if (diaryInfo) {
      try {
        await putModifiedDiary({
          diaryId: diaryInfo.diaryId,
          content: diaryInfo.content,
          isPublic: diaryInfo.isPublic,
        });
        navigate(`/diary/${diaryInfo.diaryId}`, { state: { isModified: true }, replace: true });
      } catch (error) {
        throw error;
      }
    }
  };

  useEffect(() => {
    setDiaryInfo(location.state.diaryInfo);
  }, []);

  return (
    <MobileLayout>
      <Appbar text="일기 수정" backHandler={() => navigate(-1)}></Appbar>
      <div className="flex-grow overflow-scroll px-800 py-300">
        {diaryInfo && (
          <div className="flex h-full flex-col gap-600 font-Binggrae text-gray-900">
            <div className={`${FADEINANIMATION[0]} font-BinggraeBold text-title-2`}>
              {formatDateWithWeek(diaryInfo.date)}
            </div>
            <Divider style={FADEINANIMATION[1]} />
            <Textarea
              className={`${FADEINANIMATION[2]} flex-grow font-Binggrae text-body-2`}
              value={diaryInfo.content}
              onChange={(e) => {
                setDiaryInfo({ ...diaryInfo, content: e.target.value });
              }}
              placeholder="10자 이상 입력해주세요"
            ></Textarea>
          </div>
        )}
      </div>
      <div className="my-4 flex justify-center">
        <Button
          size="big"
          active={true}
          text="수정 완료"
          onClickHandler={onClickModify}
          bgColor="dark"
        />
      </div>
    </MobileLayout>
  );
};

export default Modify;
