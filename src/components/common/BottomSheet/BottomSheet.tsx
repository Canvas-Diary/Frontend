import { ReactNode } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

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
        <DrawerHeader className="mb-[2.5rem] flex h-fit w-[22rem] flex-col items-center rounded-300 bg-background px-800 pb-700 pt-300 shadow-default">
          <DrawerTitle>
            <div className="mb-600 h-[0.375rem] w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </DrawerTitle>
          <DrawerDescription className="w-full">{children}</DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default BottomSheet;
