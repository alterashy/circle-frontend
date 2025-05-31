import LeftBar from "@/components/common/LeftBar";
import RightBar from "@/components/common/RightBar";
import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "@tanstack/react-router";
import Cookies from "js-cookie";

const DashboardLayout = () => {
  const {
    user: { username },
    setUser,
    logout,
  } = useAuthStore();

  const { isFetched } = useQuery({
    queryKey: ["check-auth"],
    queryFn: async () => {
      try {
        const token = Cookies.get("token");
        const response = await api.post(
          "/auth/check",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data.data);
        return response.data;
      } catch (error) {
        console.log(error);
        Cookies.remove("token");
        logout();
      }
    },
  });

  if (isFetched) {
    if (!username) return <Navigate to="/login" />;

    return (
      <div className="lg:grid lg:grid-cols-[240px_1fr_380px] lg:h-screen">
        <div className="lg:flex lg:flex-col lg:pt-8 lg:p-10">
          <LeftBar />
        </div>
        <div className="lg:flex lg:flex-col lg:pt-8 lg:p-10 lg:border-l-1 lg:border-r-1 lg:overflow-y-auto">
          <Outlet />
        </div>
        <div className="lg:flex lg:flex-col lg:pt-8 lg:p-10">
          <RightBar />
        </div>
      </div>
    );
  }
};

export default DashboardLayout;
