import Appbar from "../components/common/Appbar";
import Tag from "../components/common/Tag";
import SearchBar from "../components/pages/album/SearchBar";
import ThumbnailGrid from "../components/pages/album/ThumbnailGrid";

const Album = () => {
  return (
    <div className="flex flex-col gap-400">
      <Appbar text="앨범" backHandler={() => {}} menuHandler={() => {}} />
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
