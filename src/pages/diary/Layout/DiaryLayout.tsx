import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DiaryInfo } from "../../../types/types";
import { getDiaryInfoById, getMyDiaryInfoById } from "../../../api/api";
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
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const [diaryInfo, setDiaryInfo] = useState<DiaryInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { calculatedHeight } = useMediaQuery();
  const [isMyDiary, setIsMyDiary] = useState(false);

  useEffect(() => {
    const fetchDiary = async () => {
      if (!diaryID) return;
      try {
        let data;
        if (type === "my") {
          data = await getMyDiaryInfoById(diaryID);
          setIsMyDiary(true);
        } else {
          data = await getDiaryInfoById(diaryID);
          setIsMyDiary(false);
        }
        setDiaryInfo(data);
      } catch (error) {
        setDiaryInfo(null);
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
