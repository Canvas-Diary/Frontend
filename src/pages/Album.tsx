import Tag from "../components/common/Tag";
import SearchBar from "../components/pages/album/SearchBar";
import ThumbnailGrid from "../components/pages/album/ThumbnailGrid";

/**
 * 앨범 화면
 * @returns
 */
const Album = () => {
  return (
    <div className="flex flex-col gap-400">
      <div
        className={`flex w-full items-center justify-center bg-transparent px-800 py-300 text-black dark:text-white`}
      >
        <span className="font-Binggrae text-body-1 font-regular">앨범</span>
      </div>
      <div className="flex flex-col gap-800 px-700">
        <div className="flex flex-col gap-500">
          <SearchBar onEnter={() => {}}></SearchBar>
          <div className="flex gap-400">
            <Tag text="행복" selected={false} />
            <Tag text="행복" selected={false} />
          </div>
        </div>
        <ThumbnailGrid />
      </div>
    </div>
  );
};

export default Album;
