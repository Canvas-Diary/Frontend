import Button from "@/components/common/Button/Button";
import ScrollLayout from "@/components/Layout/ScrollLayout";
import ErrorContent from "./ErrorContent";

interface ErrorContainerProps {
  message: string;
  buttonText: string;
  onClickHandler: () => void;
}

/**
 * 에러 페이지 구성
 * @returns
 */
const ErrorContainer = ({ message, buttonText, onClickHandler }: ErrorContainerProps) => {
  return (
    <ScrollLayout>
      <div className="mb-8 flex h-full flex-col items-center">
        <ErrorContent message={message} />
        <Button
          size="big"
          active={true}
          text={buttonText}
          onClickHandler={onClickHandler}
          bgColor="light"
          className="mt-auto"
        />
      </div>
    </ScrollLayout>
  );
};

export default ErrorContainer;
