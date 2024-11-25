import ErrorContent from "@/components/pages/error/ErrorContent";
import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface ApiBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
  message: string;
}

const ApiBoundary = ({ children, fallback, message }: ApiBoundaryProps) => {
  return (
    <ErrorBoundary fallback={<ErrorContent message={message} />}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default ApiBoundary;
