import { ReactNode } from "react";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";

interface BottomSheetProps {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

/**
 * 바텀 시트 레이아웃
 * @param children 바텀 시트 구성 요소들
 * @returns
 */
const BottomSheet = ({ children, onClose, isOpen }: BottomSheetProps) => {
  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader className="mb-[2.5rem] flex h-fit w-[22rem] flex-col items-center rounded-300 bg-white px-500 pb-600 pt-300 shadow-default">
          <div className="mb-600 h-[0.375rem] w-8 rounded-full bg-gray-200"></div>
          {children}
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default BottomSheet;
