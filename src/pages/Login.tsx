const clientId = process.env.KAKAO_CLIENT_ID;
const redirectUrl = process.env.KAKAO_REDIRECT_URL;
const responseType = process.env.KAKAO_RESPONSE_TYPE;
const clientSecret = process.env.KAKAO_CLIENT_SECRET;

const Login = () => {
  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=${responseType}&client_secret=${clientSecret}`;
  return (
    <div>
      <a href={url}>login</a>
    </div>
  );
};

export default Login;
