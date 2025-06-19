import { LeftBar } from "@/components/common/LeftBar";
import { RightBar } from "@/components/common/RightBar";
import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "@tanstack/react-router";
import Cookies from "js-cookie";

export const DashboardLayout = () => {
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
      <div className="h-screen md:grid md:grid-cols-[0.5fr_3fr_0fr] lg:grid lg:grid-cols-[1fr_3fr_1.75fr] lg:h-screen">
        <div className="p-4 hidden md:p-6 md:block">
          <LeftBar />
        </div>
        <div className="p-4 overflow-y-scroll md:border md:border-border md:p-6 lg:border lg:border-border">
          <Outlet />
        </div>
        <div className="p-4 hidden md:p-6 md:block">
          <RightBar />
        </div>
      </div>
    );
  }
};
