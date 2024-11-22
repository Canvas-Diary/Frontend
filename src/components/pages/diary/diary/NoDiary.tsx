import { useNavigate } from "react-router-dom";
import Appbar from "../../../common/Appbar";
import non from "../../assets/icon/non.png";
import Button from "../../../common/Button";
import ROUTE_PATH from "../../../../constants/ROUTE_PATH";

interface NoDiaryProps {
  date: string;
}

/**
 * 아직 작성한 일기가 없는 경우
 * @returns
 */
const NoDiary = ({ date }: NoDiaryProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col items-center">
      <Appbar
        backHandler={() => {
          navigate(-1);
        }}
      ></Appbar>
      <div className="flex flex-grow items-center justify-center">
        <div className="flex flex-col items-center gap-600">
          <img src={non} alt="non" className="h-[2.75rem] w-[2.75rem]" />
          <p>아직 일기를 작성하지 않았어요</p>
        </div>
      </div>
      <div className="mb-[1.875rem]">
        <Button
          size="big"
          active={true}
          text="일기 작성하기"
          onClickHandler={() => {
            navigate(ROUTE_PATH.DIARY, { state: { date: date } });
          }}
          bgColor="light"
        />
      </div>
    </div>
  );
};

export default NoDiary;
