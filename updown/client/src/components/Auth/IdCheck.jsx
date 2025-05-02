import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function IdCheck({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('id')) {
      navigate('/login');
    }
  }, []);

  return <>{children}</>;
}