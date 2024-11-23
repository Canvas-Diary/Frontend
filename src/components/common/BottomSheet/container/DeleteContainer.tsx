import { ReactNode } from "react";

interface DeleteContainerProps {
  children: ReactNode;
}

/**
 * 삭제 확인 창 Container
 * @returns
 */
const DeleteContainer = ({ children }: DeleteContainerProps) => {
  return (
    <div className="flex w-full flex-col gap-600 font-Binggrae text-body-2 font-regular text-gray-900 dark:text-gray-50">
      {children}
    </div>
  );
};

export default DeleteContainer;
