import { createDiaryAndGetId, postKeyword } from "@/api/api";
import { FlowDiaryInfo, Styles } from "@/types/types";
import { getTodayDate } from "@/utils/util";
import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useBlocker, useNavigate, useLocation } from "react-router-dom";
import Appbar from "@/components/common/Appbar";
import Button from "@/components/common/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import ROUTE_PATH from "@/constants/ROUTE_PATH";
import Write from "@/components/pages/diary/diaryflow/Write";
import Style from "@/components/pages/diary/diaryflow/Style";
import Review from "@/components/pages/diary/diaryflow/Review";
import Draw from "@/components/pages/diary/diaryflow/Draw";
import Modify from "@/components/pages/diary/diaryflow/Modify";

export interface ContextProps {
  diaryInfo: FlowDiaryInfo;
  setDiaryInfo: React.Dispatch<React.SetStateAction<FlowDiaryInfo>>;
  isLoaded: boolean;
  keywords: string[];
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  setStyles: React.Dispatch<React.SetStateAction<Styles>>;
  styles: Styles | null;
}
const DiaryFlow = () => {
  const { search } = useLocation(); // 쿼리 파라미터를 읽어옵니다
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  const stepsByFlow: Record<string, string[]> = {
    create: ["write", "style", "review", "draw"],
    add: ["style", "draw"],
    modify: ["modify"],
  };

  // 쿼리에서 flow, currentIndex, diaryId 값을 추출합니다.
  const urlParams = new URLSearchParams(search);
  const flow = urlParams.get("flow") || "create";
  const initialIndex = Number(urlParams.get("currentIndex")) || 0;
  const diaryIdFromQuery = urlParams.get("diaryId") || "0";
  const steps = stepsByFlow[flow] || [];

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [diaryId, setDiaryId] = useState(diaryIdFromQuery);
  const [isLoaded, setIsLoaded] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [styles, setStyles] = useState<Styles | null>(null);
  const [diaryInfo, setDiaryInfo] = useState<FlowDiaryInfo>({
    date: getTodayDate(),
    content: "",
    isPublic: true,
    style: "",
    weightedContents: [],
  });

  const currentStep = steps[currentIndex];

  const onClickNext = async () => {
    if (currentIndex < steps.length - 1) {
      if (currentStep === "style" && flow === "create") {
        try {
          const id = await createDiaryAndGetId(diaryInfo);
          setDiaryId(id);
          setIsLoaded(true);
        } catch (error) {
          showBoundary(error);
        }
      }
      setCurrentIndex((prev) => prev + 1);
    } else {
      // 쿼리 파라미터로 diaryId를 전달하면서 navigate
      navigate(`${ROUTE_PATH.DIARY}/${diaryId}?flow=${flow}&currentIndex=${currentIndex + 1}`, {
        replace: true,
      });
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      navigate(-1);
    }
  };

  const handleActive = () => {
    switch (currentStep) {
      case "write":
        return diaryInfo.content.length >= 10;
      case "style":
        return diaryInfo.style !== "";
      case "review":
        return isLoaded;
      default:
        return true;
    }
  };

  const blocker = useBlocker(() => {
    return currentIndex > 0;
  });

  useEffect(() => {
    const setKeywordToDiary = async () => {
      await postKeyword({ diaryId: diaryId, keywords: keywords });
    };

    if (diaryId !== "0") setKeywordToDiary();
  }, [diaryId]);

  const renderStep = () => {
    switch (currentStep) {
      case "write":
        return <Write diaryInfo={diaryInfo} setDiaryInfo={setDiaryInfo} />;
      case "style":
        return (
          <Style
            diaryInfo={diaryInfo}
            setDiaryInfo={setDiaryInfo}
            styles={styles}
            setStyles={setStyles}
          />
        );
      case "review":
        return <Review diaryInfo={diaryInfo} setKeywords={setKeywords} />;
      case "draw":
        return <Draw isLoaded={isLoaded} styles={styles} diaryInfo={diaryInfo} />;
      case "modify":
        return <Modify diaryInfo={diaryInfo} setDiaryInfo={setDiaryInfo} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Appbar text="일기 작성" backHandler={handleBack}></Appbar>
      <div className="flex-grow overflow-scroll px-800 py-300">{renderStep()}</div>
      <div className="my-4 flex justify-center">
        <Button
          size="big"
          active={handleActive()}
          text="다음으로"
          onClickHandler={onClickNext}
          bgColor="dark"
        />
      </div>

      <Dialog open={blocker.state === "blocked"}>
        <DialogContent
          className="min-w-fit max-w-[95%] rounded-200"
          onClick={() => {
            blocker.state === "blocked" && blocker.reset();
          }}
        >
          <DialogHeader>
            <DialogTitle>정말 나가시겠습니까?</DialogTitle>
            <DialogDescription>
              {currentIndex === 2 ? "홈으로 나가집니다." : "변경사항이 저장되지 않을 수 있습니다."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex w-full flex-row">
            <DialogClose asChild>
              <Button
                size="small"
                active={true}
                text="남아있기"
                bgColor="light"
                onClickHandler={() => {
                  blocker.state === "blocked" && blocker.reset();
                }}
              ></Button>
            </DialogClose>

            <Button
              size="small"
              active={true}
              text="나가기"
              bgColor="dark"
              onClickHandler={() => {
                if (blocker.state === "blocked") {
                  if (currentIndex === 2) {
                    blocker.reset();
                    navigate("/", { replace: true });
                  } else blocker.proceed();
                }
              }}
            ></Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DiaryFlow;
