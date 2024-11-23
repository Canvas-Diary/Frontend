import Button from "@/components/common/Button/Button";
import non from "@/assets/icon/non.png";
import ScrollLayout from "@/components/Layout/ScrollLayout";

interface ErrorContainerProps {
  message: string;
  buttonText: string;
  onClickHandler: () => void;
}

const ErrorContainer = ({ message, buttonText, onClickHandler }: ErrorContainerProps) => {
  return (
    <ScrollLayout>
      <div className="mb-8 flex h-full flex-col items-center">
        <div className="flex grow flex-col items-center justify-center gap-6">
          <img src={non} alt="error-image" className="h-[2.75rem] w-[2.75rem]" />
          <p>{message}</p>
        </div>
        <div className="mt-auto">
          <Button
            size="big"
            active={true}
            text={buttonText}
            onClickHandler={onClickHandler}
            bgColor="light"
          />
        </div>
      </div>
    </ScrollLayout>
  );
};

export default ErrorContainer;
