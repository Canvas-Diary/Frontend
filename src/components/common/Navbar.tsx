import home from "../../assets/images/home.png";
import sns from "../../assets/images/sns.png";
import album from "../../assets/images/album.png";
import who from "../../assets/images/who.png";

const GNB = [
  { icon: home, name: "홈", path: "" },
  { icon: sns, name: "일기 공유", path: "" },
  { icon: album, name: "앨범", path: "" },
  { icon: who, name: "마이페이지", path: "" },
];

const Navbar = () => {
  return (
    <nav className="border-t-[1px] border-gray-100">
      <ul className="flex flex-row justify-center gap-600 px-800 pb-[1.3125rem] pt-500">
        {GNB.map((element) => (
          <li className="flex flex-col items-center gap-200">
            <img src={element.icon} alt={element.name} className="h-7 w-7" />
            <span className="font-Binggrae text-detail-2 font-regular">{element.name}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
