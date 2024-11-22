import bgImg from "../assets/images/loginBackground.png";
import kakao from "../assets/images/kakaoSymbol.png";

const clientId = import.meta.env.VITE_KAKAO_REST_API_KEY;
const redirectUrl = import.meta.env.VITE_KAKAO_REDIRECT_URL;
const responseType = import.meta.env.VITE_KAKAO_RESPONSE_TYPE;

const Login = () => {
  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=${responseType}`;

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-end"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mb-[2.75rem] flex w-[20.5rem] flex-col gap-800 text-white">
        <div className="flex flex-col gap-300">
          <div className="font-BinggraeBold text-title-2">환영합니다!</div>
          <div className="font-Binggrae text-body-2">
            Create your visual diary with
            <br /> AI-generated drawings.
          </div>
        </div>
        <a
          href={url}
          className="flex items-center justify-center gap-300 rounded-100 bg-[#FEE500] p-4 text-black text-opacity-85"
        >
          <img src={kakao}></img>
          <div className="font-Pretendard text-body-1 font-semibold">카카오 로그인</div>
        </a>
      </div>
    </div>
  );
};

export default Login;
