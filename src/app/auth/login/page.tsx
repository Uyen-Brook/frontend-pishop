import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import { ROUTES } from "../../../config/routes";

export default function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const handleLoginUser = () => {
    // payload: { accountId, role, email, sub, iat, exp }
    const payload = {
      accountId: 5,
      role: "USER",
      email: "uyenchu98@gmail.com",
      sub: "uyenchu98@gmail.com",
      iat: 1775411236,
      exp: 1775497636,
    };

    // Giả lập JWT: header.payload.signature (payload base64)
    const base64Payload = btoa(JSON.stringify(payload));
    const fakeToken = `header.${base64Payload}.signature`;

    login(fakeToken);
    navigate(ROUTES.HOME);
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLoginUser}>Login as USER</button>
    </div>
  );
  
}
