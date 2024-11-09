import { ReactNode } from "react";

interface MobileLayoutProps {
  children: ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  return (
    <div className="flex h-dvh w-screen items-center justify-center">
      <div className="flex h-full w-full flex-col">{children}</div>
    </div>
  );
};

export default MobileLayout;
