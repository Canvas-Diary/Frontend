import dummy from "@/assets/dummy/_Image.png";
import { FADEINANIMATION } from "@/styles/animations";
import { FlowDiaryInfo, Styles } from "@/types/types";
import DiaryFlowLayout from "../Layout";
import Button from "@/components/common/Button/Button";
import ROUTE_PATH from "@/constants/ROUTE_PATH";
import { useNavigate } from "react-router-dom";

interface DrawProps {
  isLoaded: boolean;
  styles: Styles | null;
  diaryInfo: FlowDiaryInfo;
  onClickNext: () => void;
}

const Draw = ({ isLoaded, styles, diaryInfo, onClickNext }: DrawProps) => {
  const matchingStyle = styles?.styles.find((style) => style.name === diaryInfo.style);
  const imageUrl = matchingStyle ? matchingStyle.imageUrl : "";
  const navigate = useNavigate();

  const onClickNextHandler = () => {
    navigate(`${ROUTE_PATH.DIARY}/${diaryInfo.diaryId}`, {
      replace: true,
    });
    onClickNext();
  };

  return (
    <>
      <DiaryFlowLayout>
        <div className="flex h-full flex-col items-center justify-center font-BinggraeBold text-title-2">
          <div className="relative h-[9.6rem] w-[9.6rem]">
            <img
              src={dummy}
              alt=""
              className={`absolute h-[9.6rem] w-[9.6rem] rounded-full ${
                isLoaded ? "opacity-0" : "animate-fade1"
              }`}
            />
            <img
              src={imageUrl === "" ? dummy : imageUrl}
              alt=""
              className={`absolute h-[9.6rem] w-[9.6rem] rounded-full ${
                isLoaded ? "opacity-100" : "animate-fade2"
              }`}
            />
          </div>
          <div className={`${FADEINANIMATION[1]} flex flex-col overflow-hidden pt-1000`}>
            <div
              className={`${isLoaded && "-translate-y-3 opacity-0"} transition-all duration-1000`}
            >
              <span className="text-primary-medium dark:text-primary-light-3">그림</span>을 그리고
              있어요
            </div>
            <div
              className={`${isLoaded ? "-translate-y-10 opacity-100" : "opacity-0"} transition-all delay-300 duration-1000`}
            >
              <span className="text-primary-medium dark:text-primary-light-3">그림</span>이 다
              그려졌어요
            </div>
          </div>
        </div>
      </DiaryFlowLayout>
      <Button
        className="mx-auto mb-4"
        size="big"
        active={isLoaded}
        text="다음으로"
        onClickHandler={onClickNextHandler}
        bgColor="dark"
      />
    </>
  );
};

export default Draw;
