import Appbar from "@/components/common/Appbar/Appbar";
import Divider from "@/components/common/Divider/Divider";
import Toggle from "@/components/common/Toggle/Toggle";
import ROUTE_PATH from "@/constants/ROUTE_PATH";
import { useDarkModeStore } from "@/global/globalState";
import { useNavigate } from "react-router-dom";

/**
 * 마이페이지 화면
 * @returns
 */
const Mypage = () => {
  const navigate = useNavigate();
  const { dark, toggleDarkMode } = useDarkModeStore();

  return (
    <div className="flex flex-grow flex-col overflow-scroll">
      <Appbar text="마이페이지" />
      <div className="flex flex-col gap-600 p-800 font-Binggrae text-body-1">
        <div className="flex">
          <button className="w-full text-start">다크모드</button>
          <Toggle
            onClickHandler={toggleDarkMode} // Toggle 클릭 시 다크모드 상태를 전환
            isChecked={dark} // 현재 다크모드 상태
          />
        </div>
        <Divider />
        <button className="w-full text-start" onClick={() => navigate(ROUTE_PATH.STAT)}>
          통계
        </button>
        <Divider />
        <button className="w-full text-start" onClick={() => navigate(ROUTE_PATH.LIKE)}>
          좋아요
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
