import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DiaryInfo } from "../../types/types";
import { getDiaryInfoById } from "../../api/api";
import DiaryComponent from "../../components/pages/diary/DiaryComponent";
import NoDiary from "../../components/pages/diary/NoDiary";
import DiaryFallback from "../../components/pages/diary/Fallback/DiaryFallback";
import useMediaQuery from "../../hooks/useMediaQuery";
import { isValidDate } from "@/utils/util";

/**
 * 일기 화면 레이아웃
 * 로딩, 일기 화면, 일기 없는 화면 관리
 * @returns
 */
const Diary = () => {
  const { diaryID } = useParams<{ diaryID: string }>();
  const [diaryInfo, setDiaryInfo] = useState<DiaryInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { calculatedHeight } = useMediaQuery();
  const [isMyDiary, setIsMyDiary] = useState(false);

  const fetchDiary = async () => {
    if (!diaryID) return;
    try {
      const data = await getDiaryInfoById(diaryID);
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
    if (!isValidDate(diaryID!)) fetchDiary();
    else setLoading(false);
  }, []);

  return (
    <>
      {loading && <DiaryFallback />}
      {!loading &&
        (diaryInfo ? (
          <DiaryComponent
            diaryInfo={diaryInfo}
            carouselHeight={calculatedHeight}
            isMyDiary={isMyDiary}
            retry={fetchDiary}
          />
        ) : (
          <NoDiary date={diaryID!} />
        ))}
    </>
  );
};

export default Diary;
