import { ReactNode } from "react";

interface BottomSheetProps {
  children: ReactNode;
}

/**
 * 바텀 시트 레이아웃
 * @param children 바텀 시트 구성 요소들
 * @returns
 */
const BottomSheet = ({ children }: BottomSheetProps) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-end bg-black opacity-70">
      <div className="mb-[2.5rem] flex h-fit w-[22rem] flex-col items-center gap-600 rounded-300 bg-white px-500 pb-600 pt-300 shadow-default">
        <div className="h-[0.375rem] w-8 rounded-full bg-gray-200"></div>
        {children}
      </div>
    </div>
  );
};

export default BottomSheet;
