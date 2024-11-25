import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

const GlobalFallback = () => {
  return (
    <div className="flex flex-grow items-center justify-center">
      <LoaderCircle className={cn("animate-spin h-50 w-50")} />
    </div>
  );
};

export default GlobalFallback;
