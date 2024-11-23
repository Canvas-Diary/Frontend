import { ReactNode } from "react";

interface SettingContainerProps {
  children: ReactNode;
}

/**
 * 삭제 확인 창 Container
 * @returns
 */
const SettingContainer = ({ children }: SettingContainerProps) => {
  return (
    <div className="flex w-full flex-col gap-600 font-Binggrae text-body-2 font-regular text-gray-700 dark:text-gray-200">
      {children}
    </div>
  );
};

export default SettingContainer;
