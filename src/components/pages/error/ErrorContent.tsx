import non from "@/assets/icon/non.png";

interface ErrorContentProps {
  message: string;
}
/**
 * 에러 내용 표시
 * @returns
 */
const ErrorContent = ({ message }: ErrorContentProps) => {
  return (
    <div className="flex grow flex-col items-center justify-center gap-6">
      <img src={non} alt="error-image" className="h-[2.75rem] w-[2.75rem]" />
      <p>{message}</p>
    </div>
  );
};

export default ErrorContent;
