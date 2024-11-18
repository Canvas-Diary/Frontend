import Button from "@/components/common/Button";
import sad from "../../assets/icon/sad.png";
import MobileLayout from "../Layout/MobileLayout";

/**
 * 404 오류 화면
 * @returns
 */
const NotFoundError = () => {
  return (
    <MobileLayout>
      <div className="flex h-full flex-col items-center">
        <div className="flex flex-grow items-center justify-center">
          <div className="flex flex-col items-center gap-600">
            <img src={sad} alt="non" className="h-[2.75rem] w-[2.75rem]" />
            <p>{"페이지가 없거나 이동했습니다."}</p>
          </div>
        </div>
        <div className="mb-[1.875rem]">
          <Button
            size="big"
            active={true}
            text="홈으로 돌아가기"
            onClickHandler={() => window.location.replace("/")}
            bgColor="light"
          />
        </div>
      </div>
    </MobileLayout>
  );
};

export default NotFoundError;
