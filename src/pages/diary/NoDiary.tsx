import { useNavigate, useParams } from "react-router-dom";
import Appbar from "@/components/common/Appbar/Appbar";
import ROUTE_PATH from "@/constants/ROUTE_PATH";
import ErrorContainer from "@/components/pages/error/ErrorContainer";

/**
 * 아직 작성한 일기가 없는 경우
 * @returns
 */
const NoDiary = () => {
  const { date } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <Appbar
        backHandler={() => {
          navigate(-1);
        }}
      ></Appbar>
      <ErrorContainer
        message={"아직 일기를 작성하지 않았어요"}
        buttonText={"일기 작성하기"}
        onClickHandler={() => {
          navigate(ROUTE_PATH.DIARY, { state: { date: date }, replace: true });
        }}
      />
    </>
  );
};

export default NoDiary;
