import Button from "@/components/common/Button/Button";
import ScrollLayout from "@/components/Layout/ScrollLayout";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import img1 from "@/assets/images/onboard1.png";
import img2 from "@/assets/images/onboard2.png";
import img3 from "@/assets/images/onboard3.png";
import img4 from "@/assets/images/onboard4.png";

interface OnboardingProps {
  onClose: () => void;
}

const Onboarding = ({ onClose }: OnboardingProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const handleSelect = () => {
    if (!api) return;
    const selectedIndex = api.selectedScrollSnap();
    setCurrent(selectedIndex);
  };

  useEffect(() => {
    if (!api) return;

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api, handleSelect]);

  return (
    <ScrollLayout className="absolute h-dvh w-full bg-white py-4">
      <ol className="flex justify-center gap-2">
        {Array.from({ length: 4 }, (_, index) => (
          <li
            key={index}
            className={`h-[0.375rem] w-[0.375rem] rounded-full ${
              index === current ? "bg-primary-normal" : "bg-gray-200"
            }`}
          ></li>
        ))}
      </ol>
      <Carousel className="h-full" setApi={setApi}>
        <CarouselContent className="h-full font-Binggrae text-heading-1">
          <CarouselItem key={0} className="flex h-full w-full flex-col items-center justify-center">
            <div className="my-auto flex w-full flex-col items-center">
              <p>날짜를 클릭해</p>
              <p className="text-primary-normal">일기를 작성하거나 확인하세요</p>
            </div>
            <img src={img1} alt="" />
          </CarouselItem>
          <CarouselItem key={1} className="flex h-full w-full flex-col items-center justify-center">
            <div className="my-auto flex w-full flex-col items-center">
              <p>
                일기를 작성하면 AI가 <span className="text-primary-normal">감정을</span>
              </p>
              <p className="text-primary-normal">분석하고 관련 이미지를 생성합니다</p>
            </div>
            <img src={img2} alt="" />
          </CarouselItem>
          <CarouselItem key={2} className="flex h-full w-full flex-col items-center justify-center">
            <div className="my-auto flex w-full flex-col items-center">
              <p>다른 사람들의 일기를 통해</p>
              <p className="text-primary-normal">새로운 이야기를 만나보세요</p>
            </div>
            <img src={img3} alt="" />
          </CarouselItem>
          <CarouselItem key={3} className="flex h-full w-full flex-col items-center justify-center">
            <div className="my-auto flex w-full flex-col items-center">
              <p className="text-primary-normal">내 일기의 감정과 키워드를 분석한</p>
              <p>
                <span className="text-primary-normal">통계</span>를 확인하세요
              </p>
            </div>
            <img src={img4} alt="" />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <Button
        className="mx-auto my-4"
        size="big"
        active={true}
        text="시작하기"
        onClickHandler={onClose}
        bgColor="dark"
      />
    </ScrollLayout>
  );
};

export default Onboarding;
