import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Appbar from "../../../components/common/Appbar";
import Button from "../../../components/common/Button";
import RoutePaths from "../../../constants/routePath";
import { useState } from "react";
import { createDiaryAndGetId, NewDiaryInfo } from "../../../api/api";
import { useErrorBoundary } from "react-error-boundary";

const pageOrder = [
  RoutePaths.diaryWrite,
  RoutePaths.diaryStyle,
  RoutePaths.diaryReview,
  RoutePaths.diaryDraw,
];

export interface ContextProps {
  diaryInfo: {
    content: string;
    isPublic: boolean;
    style: string;
  };
  setDiaryInfo: Function;
}

const DiaryLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showBoundary } = useErrorBoundary();
  const [diaryId, setDiaryId] = useState("0");

  const [diaryInfo, setDiaryInfo] = useState<NewDiaryInfo>({
    date: new Date(),
    content:
      "오늘, 혼자 조용한 여름 해변을 다녀왔다. 파란 하늘과 잔잔한 바다, 그리고 나를 감싸는 부드러운 바람이 마치 오랫동안 찾아 헤맸던 휴식의 상징처럼 느껴졌다. 아무 말 없이 파도 소리에 귀를 기울이니, 머릿속에서 걱정과 피로가 하나씩 흩어졌다.요즘 바쁜 일상 속에서 워라밸을 맞추려 애쓰는 나에게 이 순간은 소중했다. 일과 삶의 균형을 잡으려 매일 노력하지만, 정작 나 자신에게 주는 쉼은 턱없이 부족했던 것 같다. 해변에서의 고요한 시간은 그 부족한 부분을 채워주는 듯했다.발밑으로 스며드는 따뜻한 모래의 감촉과 해안선을 따라 흐르는 고요함 속에서, 행복이란 바로 이런 순간에 존재한다는 걸 느꼈다. 복잡한 계획이나 커다란 성취가 아니어도, 내가 온전히 나에게 집중할 수 있는 시간. 그 순간이 바로 내가 찾던 행복이었다.오늘은 나에게 주는 작은 선물 같은 날이었다. 이런 여유와 쉼을 통해 내 삶에 더 많은 균형과 행복을 채워가야겠다는 다짐을 해본다.",
    isPublic: true,
    style: "",
  });

  const onClickNext = async () => {
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
      navigate(`${RoutePaths.diary}/${diaryId}`);
    }
  };

  const handleActive = () => {
    const currentIndex = pageOrder.indexOf(location.pathname);

    switch (currentIndex) {
      case 0:
        if (diaryInfo.content === "") return false;
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

  return (
    <div className="flex h-screen w-screen flex-col">
      <Appbar
        text="일기 작성"
        backHandler={() => {
          navigate(-1);
        }}
      ></Appbar>
      <div className="flex-grow overflow-scroll px-800 py-300">
        <Outlet context={{ diaryInfo, setDiaryInfo }} />
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
    </div>
  );
};

export default DiaryLayout;
