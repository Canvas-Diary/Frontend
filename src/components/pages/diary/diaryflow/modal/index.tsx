import Button from "@/components/common/Button/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { DIARY_STEP, Step } from "@/constants/DIARY_FLOW";
import ROUTE_PATH from "@/constants/ROUTE_PATH";
import { useBlocker } from "react-router-dom";

interface DiaryFlowModalContainerProps {
  currentStep: Step;
  currentIndex: number;
}

const DiaryFlowModalContainer = ({ currentStep, currentIndex }: DiaryFlowModalContainerProps) => {
  const blocker = useBlocker(() => {
    return currentIndex === 0 || currentIndex === 2;
  });
  return (
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
            {currentStep === DIARY_STEP.WRITE
              ? "홈으로 나가집니다."
              : "변경사항이 저장되지 않을 수 있습니다."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex w-full flex-row">
          <Button
            size="small"
            active={true}
            text="남아있기"
            bgColor="light"
            onClickHandler={() => {
              blocker.state === "blocked" && blocker.reset();
            }}
          ></Button>
          <Button
            size="small"
            active={true}
            text="나가기"
            bgColor="dark"
            onClickHandler={() => {
              if (blocker.state === "blocked") {
                if (currentStep === DIARY_STEP.REVIEW) {
                  blocker.reset();
                  window.location.href = ROUTE_PATH.HOME;
                } else blocker.proceed();
              }
            }}
          ></Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DiaryFlowModalContainer;
