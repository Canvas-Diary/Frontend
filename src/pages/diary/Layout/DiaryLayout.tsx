import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DiaryInfo } from "../../../types/types";
import { getDiaryInfoById } from "../../../api/api";
import Diary from "../Diary";
import NoDiary from "../NoDiary";
import MobileLayout from "../../Layout/MobileLayout";
import DiaryFallback from "../Fallback/DiaryFallback";
import useMediaQuery from "../../../hooks/useMediaQuery";

/**
 * 일기 화면 레이아웃
 * 로딩, 일기 화면, 일기 없는 화면 관리
 * @returns
 */
const DiaryLayout = () => {
  const { diaryID } = useParams<{ diaryID: string }>();
  const [diaryInfo, setDiaryInfo] = useState<DiaryInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { calculatedHeight } = useMediaQuery();
  const [isMyDiary, setIsMyDiary] = useState(false);

  useEffect(() => {
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

    fetchDiary();
  }, []);

  return (
    <MobileLayout>
      {loading && <DiaryFallback />}
      {!loading &&
        (diaryInfo ? (
          <Diary diaryInfo={diaryInfo} carouselHeight={calculatedHeight} isMyDiary={isMyDiary} />
        ) : (
          <NoDiary date={diaryID!} />
        ))}
    </MobileLayout>
  );
};

export default DiaryLayout;
