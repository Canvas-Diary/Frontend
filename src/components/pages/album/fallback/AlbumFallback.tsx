import Appbar from "../../../common/Appbar";

const AlbumFallback = () => {
  return (
    <div className="flex flex-grow flex-col overflow-scroll">
      <Appbar text="앨범"></Appbar>
      <div className="flex flex-col px-700">
        <div className="sticky top-0 flex flex-col gap-500 bg-white py-400">
          <div className="flex h-[2.75rem] items-center justify-center gap-400 rounded-50 bg-gray-100 p-400"></div>
          <div className="absolute top-14 flex w-full gap-400 bg-white py-500">
            <div className="h-[1.625rem] w-[3.5625rem] rounded-full bg-gray-100"></div>
            <div className="h-[1.625rem] w-[3.5625rem] rounded-full bg-gray-100"></div>
            <div className="h-[1.625rem] w-[3.5625rem] rounded-full bg-gray-100"></div>
          </div>
        </div>
        <div className="h-4"></div>
        <div className="grid grid-cols-3 place-items-center gap-300 py-800">
          <div className="h-[11.125rem] w-[6.375rem] bg-gray-100"></div>
          <div className="h-[11.125rem] w-[6.375rem] bg-gray-100"></div>
          <div className="h-[11.125rem] w-[6.375rem] bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
};

export default AlbumFallback;
