import { useState } from "react";
import Login from "~/components/authentification/Login";
import SignUp from "~/components/authentification/SignUp";

export default function SignIn() {
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="h-screen">
      {isLogin ? (
        <Login toSignin={toggleLogin} />
      ) : (
        <SignUp toLogin={toggleLogin} />
      )}
    </div>
  );
}
