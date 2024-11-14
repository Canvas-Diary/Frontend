import { useState } from "react";
import Appbar from "../components/common/Appbar";
import Divider from "../components/common/Divider";
import Toggle from "../components/common/Toggle";
import { useNavigate } from "react-router-dom";

/**
 * 마이페이지 화면
 * @returns
 */
const Mypage = () => {
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex flex-grow flex-col overflow-scroll">
      <Appbar text="마이페이지"></Appbar>
      <div className="flex flex-col gap-600 p-800 font-Binggrae text-body-1">
        <div className="flex">
          <button className="w-full text-start">다크모드</button>
          <Toggle
            onClickHandler={() => {
              setDark((prev) => !prev);
            }}
            isChecked={dark}
          />
        </div>
        <Divider />
        <button className="w-full text-start" onClick={() => navigate("stats")}>
          통계
        </button>
        <Divider />
        <button className="w-full text-start text-status-negative">회원탈퇴</button>
        <Divider />
        <button className="w-full text-start text-status-negative">로그아웃</button>
      </div>
    </div>
  );
};

export default Mypage;
