import { Outlet, useBlocker, useLocation, useNavigate } from "react-router-dom";
import Appbar from "../../../components/common/Appbar";
import Button from "../../../components/common/Button";
import RoutePaths from "../../../constants/routePath";
import { useState } from "react";
import { createDiaryAndGetId } from "../../../api/api";
import { useErrorBoundary } from "react-error-boundary";
import MobileLayout from "../../Layout/MobileLayout";
import { getTodayDate } from "../../../utils/util";
import { NewDiaryInfo } from "../../../types/types";
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
  setDiaryInfo: Function;
  diaryId: string;
}

const DiaryWriteFlowLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showBoundary } = useErrorBoundary();
  const [diaryId, setDiaryId] = useState("0");
  const [diaryInfo, setDiaryInfo] = useState<NewDiaryInfo>({
    date: getTodayDate(),
    content: "",
    isPublic: true,
    style: "",
  });

  const onClickNext = async () => {
    console.log(diaryInfo);
    const currentIndex = pageOrder.indexOf(location.pathname);

    if (currentIndex !== -1 && currentIndex < pageOrder.length - 1) {
      if (currentIndex === 1) {
        createDiaryAndGetId(diaryInfo)
          .then((id) => {
            setDiaryId(id);
          })
          .catch((error) => {
            showBoundary(error);
          });
        navigate(pageOrder[currentIndex + 1]);
      } else {
        navigate(pageOrder[currentIndex + 1]);
      }
    } else {
      navigate(`${RoutePaths.diary}/${diaryId}`, { state: { from: RoutePaths.diaryDraw } });
    }
  };

  const handleBack = () => {
    const currentIndex = pageOrder.indexOf(location.pathname);

    switch (currentIndex) {
      case 2:
        //do nothing
        break;
      default:
        navigate(-1);
        break;
    }
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
        if (diaryId === "0") return false;
        else return true;
    }

    return true;
  };

  const blocker = useBlocker(({ currentLocation, nextLocation, historyAction }) => {
    const isInternalNavigation =
      currentLocation.pathname.startsWith("/diary/") && nextLocation.pathname.startsWith("/diary/");
    if (isInternalNavigation) {
      return false;
    }

    if (historyAction === "PUSH") {
      return false;
    } else if (historyAction === "REPLACE") {
      // 현재 페이지를 대체하려고 할 때 허용
      return false;
    } else if (historyAction === "POP") {
      // 브라우저의 뒤로 가기 또는 앞으로 가기 버튼을 눌렀을 때 확인 메시지 표시
      return true;
    }
    return false; // 기본적으로 차단하지 않음
  });

  return (
    <MobileLayout>
      <Appbar text="일기 작성" backHandler={handleBack}></Appbar>
      <div className="flex-grow overflow-scroll px-800 py-300">
        <Outlet context={{ diaryInfo, setDiaryInfo, diaryId }} />
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
            <DialogDescription>변경사항이 저장되지 않을 수 있습니다.</DialogDescription>
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
                blocker.state === "blocked" && blocker.proceed();
              }}
            ></Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
};

export default DiaryWriteFlowLayout;
