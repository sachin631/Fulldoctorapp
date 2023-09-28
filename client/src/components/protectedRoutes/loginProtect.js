"use client"
import { useRouter } from "next/navigation";

const LoginProtect = ({ children }) => {
  const router = useRouter();
  if (localStorage.getItem("token")) {
    router.push("/");
  } else {
    return children;
  }
};

export default LoginProtect;
