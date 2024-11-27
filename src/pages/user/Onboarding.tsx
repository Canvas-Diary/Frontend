import Button from "@/components/common/Button/Button";
import ScrollLayout from "@/components/Layout/ScrollLayout";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import img1 from "@/assets/images/onboard1.png";
import img2 from "@/assets/images/onboard2.png";
import img3 from "@/assets/images/onboard3.png";
import img4 from "@/assets/images/onboard4.png";
import useInView from "@/hooks/useInView";
import { FADEINANIMATION } from "@/styles/animations";

interface OnboardingProps {
  onClose: () => void;
}

const Onboarding = ({ onClose }: OnboardingProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const { elementRef: ref1, isInView: inView1 } = useInView<HTMLDivElement>(0.7, () => {});
  const { elementRef: ref2, isInView: inView2 } = useInView<HTMLDivElement>(0.7, () => {});
  const { elementRef: ref3, isInView: inView3 } = useInView<HTMLDivElement>(0.7, () => {});
  const { elementRef: ref4, isInView: inView4 } = useInView<HTMLDivElement>(0.7, () => {});
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
          <CarouselItem
            ref={ref1}
            key={0}
            className="flex h-full w-full flex-col items-center justify-center"
          >
            <div className="my-auto flex w-full flex-col items-center">
              <p className={`${inView1 && FADEINANIMATION[0]} opacity-0`}>날짜를 클릭해</p>
              <p className={`${inView1 && FADEINANIMATION[1]} text-primary-normal opacity-0`}>
                일기를 작성하거나 확인하세요
              </p>
            </div>
            <img src={img1} alt="" className={`${inView1 && FADEINANIMATION[2]} opacity-0`} />
          </CarouselItem>

          <CarouselItem
            ref={ref2}
            key={1}
            className="flex h-full w-full animate-fadeInSlideUp flex-col items-center justify-center"
          >
            <div className="my-auto flex w-full flex-col items-center">
              <p className={`${inView2 && FADEINANIMATION[0]} opacity-0`}>
                일기를 작성하면 AI가 <span className="text-primary-normal">감정을</span>
              </p>
              <p className={`${inView2 && FADEINANIMATION[1]} text-primary-normal opacity-0`}>
                분석하고 관련 이미지를 생성합니다
              </p>
            </div>
            <img src={img2} alt="" className={`${inView2 && FADEINANIMATION[2]} opacity-0`} />
          </CarouselItem>

          <CarouselItem
            ref={ref3}
            key={2}
            className="flex h-full w-full animate-fadeInSlideUp flex-col items-center justify-center"
          >
            <div className="my-auto flex w-full flex-col items-center">
              <p className={`${inView3 && FADEINANIMATION[0]} opacity-0`}>
                다른 사람들의 일기를 통해
              </p>
              <p className={`${inView3 && FADEINANIMATION[1]} text-primary-normal opacity-0`}>
                새로운 이야기를 만나보세요
              </p>
            </div>
            <img src={img3} alt="" className={`${inView3 && FADEINANIMATION[2]} opacity-0`} />
          </CarouselItem>

          <CarouselItem
            ref={ref4}
            key={3}
            className="flex h-full w-full animate-fadeInSlideUp flex-col items-center justify-center"
          >
            <div className="my-auto flex w-full flex-col items-center">
              <p className={`${inView4 && FADEINANIMATION[0]} opacity-0`}>
                내 일기의 감정과 키워드를 분석한
              </p>
              <p className={`${inView4 && FADEINANIMATION[1]} opacity-0`}>
                <span className="text-primary-normal">통계</span>를 확인하세요
              </p>
            </div>
            <img src={img4} alt="" className={`${inView4 && FADEINANIMATION[2]} opacity-0`} />
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
