import Button from "../components/common/Button";
import Calendar from "../components/pages/home/Calendar";

const Home = () => {
  const onClickHandler = () => {
    //일기 작성하기
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <Calendar></Calendar>
      <div className="mb-4 flex justify-center">
        <Button
          size="big"
          active={true}
          text="오늘 일기 작성하기"
          onClickHandler={onClickHandler}
        />
      </div>
    </div>
  );
};

export default Home;
