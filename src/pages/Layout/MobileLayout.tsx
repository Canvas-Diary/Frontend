import { ReactNode } from "react";

interface MobileLayoutProps {
  children: ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex h-screen w-screen max-w-[27rem] flex-col">{children}</div>
    </div>
  );
};

export default MobileLayout;
