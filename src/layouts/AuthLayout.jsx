import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Outlet />
    </div>
  );
};

export default AuthLayout;