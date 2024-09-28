import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Calendar from "../components/pages/home/Calendar";

const Home = () => {
  const navigate = useNavigate();
  const onClickCreateDiary = () => {
    //일기 작성하기
  };

  const onClickDate = () => {
    //작성된 일기가 없으면
    navigate("diary/0");
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <Calendar onClickDate={onClickDate}></Calendar>
      <div className="mb-4 flex justify-center">
        <Button
          size="big"
          active={true}
          text="오늘 일기 작성하기"
          onClickHandler={onClickCreateDiary}
        />
      </div>
    </div>
  );
};

export default Home;
