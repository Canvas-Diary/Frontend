import { forwardRef, HTMLAttributes, ReactNode } from "react";

interface ScrollLayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * 스크롤 영역 Layout 설정
 */
const ScrollLayout = forwardRef<HTMLDivElement, ScrollLayoutProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref || null}
        className={`flex flex-grow flex-col overflow-scroll ${className || ""}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

//디버깅 개선
ScrollLayout.displayName = "ScrollContainer";

export default ScrollLayout;
