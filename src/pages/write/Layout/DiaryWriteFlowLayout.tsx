import { Outlet, useBlocker, useLocation, useNavigate } from "react-router-dom";
import Appbar from "../../../components/common/Appbar";
import Button from "../../../components/common/Button";
import RoutePaths from "../../../constants/routePath";
import { useEffect, useState } from "react";
import { createDiaryAndGetId, getStyles, postKeyword } from "../../../api/api";
import { useErrorBoundary } from "react-error-boundary";
import MobileLayout from "../../Layout/MobileLayout";
import { getTodayDate } from "../../../utils/util";
import { NewDiaryInfo, Styles } from "../../../types/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

const pageOrder = [
  RoutePaths.diaryWrite,
  RoutePaths.diaryStyle,
  RoutePaths.diaryReview,
  RoutePaths.diaryDraw,
];

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

const DiaryWriteFlowLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showBoundary } = useErrorBoundary();
  const [diaryId, setDiaryId] = useState("0");
  const [isLoaded, setIsLoaded] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [styles, setStyles] = useState<Styles | null>(null);
  const [diaryInfo, setDiaryInfo] = useState<NewDiaryInfo>({
    date: getTodayDate(),
    content: "",
    isPublic: true,
    style: "",
    weightedContents: [],
  });

  const onClickNext = async () => {
    const currentIndex = pageOrder.indexOf(location.pathname);

    if (currentIndex < pageOrder.length - 1) {
      if (currentIndex === 0) {
        navigate(pageOrder[currentIndex + 1]);
      } else if (currentIndex === 1) {
        createDiaryAndGetId(diaryInfo)
          .then((id) => {
            setDiaryId(id);
            setIsLoaded(true);
          })
          .catch((error) => {
            showBoundary(error);
          });
        navigate(pageOrder[currentIndex + 1], { replace: true });
      } else navigate(pageOrder[currentIndex + 1]);
    } else {
      navigate(`${RoutePaths.diary}/${diaryId}`, {
        state: { from: RoutePaths.diaryDraw },
        replace: true,
      });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleActive = () => {
    const currentIndex = pageOrder.indexOf(location.pathname);

    switch (currentIndex) {
      case 0:
        if (diaryInfo.content.length < 10) return false;
        else return true;
      case 1:
        if (diaryInfo.style === "") return false;
        else return true;
      case 3:
        if (!isLoaded) return false;
        else return true;
    }

    return true;
  };

  const blocker = useBlocker(({ nextLocation, historyAction }) => {
    const isInternalNavigation = pageOrder.some((path) => nextLocation.pathname === path);
    const currentIndex = pageOrder.indexOf(location.pathname);

    if (currentIndex === 1 && nextLocation.pathname === RoutePaths.diaryStyle) {
      navigate(RoutePaths.diaryWrite, { replace: true });
      return true;
    }

    if (historyAction === "PUSH") {
      return false;
    } else if (historyAction === "REPLACE") {
      if (isInternalNavigation) {
        return false;
      }
    } else if (historyAction === "POP") {
      if (currentIndex === 0 || currentIndex === 2) {
        return true;
      } else return false;
    }

    return false;
  });

  useEffect(() => {
    const setKeywordToDiary = async () => {
      await postKeyword({ diaryId: diaryId, keywords: keywords });
    };

    if (diaryId !== "0") setKeywordToDiary();
  }, [diaryId]);

  return (
    <MobileLayout>
      <Appbar text="일기 작성" backHandler={handleBack}></Appbar>
      <div className="flex-grow overflow-scroll px-800 py-300">
        <Outlet
          context={{
            diaryInfo,
            setDiaryInfo,
            isLoaded,
            setKeywords,
            setIsLoaded,
            styles,
            setStyles,
          }}
        />
      </div>
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
            blocker.state === "blocked" && blocker!.reset();
          }}
        >
          <DialogHeader>
            <DialogTitle>정말 나가시겠습니까?</DialogTitle>
            <DialogDescription>
              {pageOrder.indexOf(location.pathname) === 2
                ? "홈으로 나가집니다."
                : "변경사항이 저장되지 않을 수 있습니다."}
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
                  if (pageOrder.indexOf(location.pathname) === 2) {
                    blocker.reset();
                    navigate("/", { replace: true });
                  } else blocker.proceed();
                }
              }}
            ></Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
};

export default DiaryWriteFlowLayout;
