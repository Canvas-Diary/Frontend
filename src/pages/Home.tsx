import Button from "../components/common/Button";
import Calendar from "../components/pages/home/Calendar";

const Home = () => {
  const onClickCreateDiary = () => {
    //일기 작성하기
  };

  const onClickDate = () => {
    //일기 조회 페이지
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
