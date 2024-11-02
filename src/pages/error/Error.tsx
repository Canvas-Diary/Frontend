import { FallbackProps } from "react-error-boundary";

/**
 * 오류 화면
 * @returns
 */
const Error = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>{error.message || "An unexpected error occurred."}</p>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
};

export default Error;
