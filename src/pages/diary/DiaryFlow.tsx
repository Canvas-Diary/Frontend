import { createDiaryAndGetId, postKeyword } from "@/api/api";
import { NewDiaryInfo, Styles } from "@/types/types";
import { getTodayDate } from "@/utils/util";
import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useBlocker, useNavigate, useSearchParams } from "react-router-dom";
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

export interface ContextProps {
  diaryInfo: NewDiaryInfo;
  setDiaryInfo: React.Dispatch<React.SetStateAction<NewDiaryInfo>>;
  isLoaded: boolean;
  keywords: string[];
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  setStyles: React.Dispatch<React.SetStateAction<Styles>>;
  styles: Styles | null;
}
const DiaryFlow = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { showBoundary } = useErrorBoundary();

  const steps = ["write", "style", "review", "done"];
  const currentStep = searchParams.get("step") || "write";
  const currentIndex = steps.indexOf(currentStep);

  const [diaryId, setDiaryId] = useState("0");
  const [isLoaded, setIsLoaded] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [styles, setStyles] = useState<Styles | null>(null);
  const [diaryInfo, setDiaryInfo] = useState<NewDiaryInfo>({
    date: getTodayDate(),
    content: "",
    isPublic: true,
    style: "",
    weightedContents: [],
  });

  const onClickNext = async () => {
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];

      if (currentStep === "style") {
        try {
          const id = await createDiaryAndGetId(diaryInfo);
          setDiaryId(id);
          setIsLoaded(true);
        } catch (error) {
          showBoundary(error);
        }
      }

      setSearchParams({ step: nextStep }); // 다음 스텝으로 이동
    } else {
      navigate(`${ROUTE_PATH.DIARY}/${diaryId}`, {
        state: { from: ROUTE_PATH.DIARY },
        replace: true,
      });
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      const prevStep = steps[currentIndex - 1];
      setSearchParams({ step: prevStep }); // 이전 스텝으로 이동
    } else {
      navigate(-1); // 첫 스텝에서 뒤로가기
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

  const blocker = useBlocker(({ nextLocation, historyAction }) => {
    const isInternalNavigation = steps.some((path) => nextLocation.search.includes(`step=${path}`));

    if (historyAction === "PUSH" || (historyAction === "REPLACE" && isInternalNavigation)) {
      return false;
    }

    if (historyAction === "POP") {
      return currentIndex > 0;
    }

    return true;
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
      case "done":
        return <Draw isLoaded={isLoaded} styles={styles} diaryInfo={diaryInfo} />;
      default:
        return <Write diaryInfo={diaryInfo} setDiaryInfo={setDiaryInfo} />;
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
