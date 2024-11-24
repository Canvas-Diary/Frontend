import ScrollLayout from "@/components/Layout/ScrollLayout";
import { ReactNode } from "react";

interface DiaryFlowLayoutProps {
  children: ReactNode;
}

const DiaryFlowLayout = ({ children }: DiaryFlowLayoutProps) => {
  return (
    <ScrollLayout className="h-full gap-600 px-800 py-300 font-Binggrae text-gray-900 dark:text-gray-50">
      {children}
    </ScrollLayout>
  );
};

export default DiaryFlowLayout;
