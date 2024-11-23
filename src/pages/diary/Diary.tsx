import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DiaryInfo } from "../../types/types";
import { getDiaryInfoById } from "../../api/api";
import DiaryComponent from "../../components/pages/diary/diary/DiaryComponent";
import DiaryFallback from "../../components/pages/diary/diary/Fallback/DiaryFallback";
import useMediaQuery from "../../hooks/useMediaQuery";
import { isValidDate } from "@/utils/util";

/**
 * 일기 화면 레이아웃
 * 로딩, 일기 화면, 일기 없는 화면 관리
 * @returns
 */
const Diary = () => {
  const { diaryId } = useParams<{ diaryId: string }>();
  const [diaryInfo, setDiaryInfo] = useState<DiaryInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { calculatedHeight } = useMediaQuery();
  const [isMyDiary, setIsMyDiary] = useState(false);

  const fetchDiary = async () => {
    if (!diaryId) return;
    try {
      const data = await getDiaryInfoById(diaryId);
      if (data.isMine) setIsMyDiary(true);
      else setIsMyDiary(false);

      setDiaryInfo(data);
    } catch (error) {
      setDiaryInfo(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isValidDate(diaryId!)) fetchDiary();
    else setLoading(false);
  }, []);

  return (
    <>
      {loading && <DiaryFallback />}

      <DiaryComponent
        diaryInfo={diaryInfo!}
        carouselHeight={calculatedHeight}
        isMyDiary={isMyDiary}
        retry={fetchDiary}
      />
    </>
  );
};

export default Diary;
