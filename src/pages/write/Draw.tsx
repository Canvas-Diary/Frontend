import dummy from "../../assets/dummy/_Image.png";
import { FADEINANIMATION } from "../../styles/animations";

const Draw = () => {
  return (
    <div className="items-centergap-[2rem] flex h-full flex-col justify-center font-Binggrae text-gray-900">
      <div className="flex flex-col items-center justify-center gap-1000 font-BinggraeBold text-title-2">
        <img
          src={dummy}
          alt=""
          className={`${FADEINANIMATION[0]} h-[9.6rem] w-[9.6rem] rounded-full`}
        />
        <div className={`${FADEINANIMATION[1]}`}>
          <span className="text-primary-medium">그림</span>을 그리고 있어요
        </div>
      </div>
    </div>
  );
};

export default Draw;
