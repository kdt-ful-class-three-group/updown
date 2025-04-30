import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {

    try {
      const res = await fetch("http://localhost:8003/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {

        alert("로그아웃 성공");
        sessionStorage.clear();
        navigate("/login");

      }
      else {

        alert("로그아웃 실패");

      }

    } catch (err) {

      console.log(`${err} 에러발생`)
      
    }
  }

  return logout;

};